import { Inject, Injectable, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { LangStorage } from './lang.storage';
import { LanguagesItem } from './languages-item';

export const LANGUAGES = new InjectionToken<LanguagesItem[]>('LANGUAGES');
export const APP_LANG = new InjectionToken<string>('APP_LANG');
export const DEFAULT_LANG = new InjectionToken<string>('DEFAULT_LANG');

@Injectable()
export class LangService {

  get languages() {
    return this._languages;
  }
  get current() {
    return this._translateService.currentLang;
  }
  set current(value: string) {
    this._translateService.use(value);
    this._langStorage.set(value);
    this.current$.next(value);
  }
  current$ = new BehaviorSubject<string>(undefined);

  constructor(
    private _langStorage: LangStorage,
    private _translateService: TranslateService,
    @Inject(LANGUAGES) private _languages: LanguagesItem[] = [],
    @Inject(APP_LANG) private _appLang: string = 'en',
    @Inject(DEFAULT_LANG) private _defaultLang: string = 'en'
  ) {
    this._translateService.setDefaultLang(this._appLang);
    this._translateService.addLangs(
      this._languages.map(lang => lang.code)
    );
    this._languages.map(
      lang => {
        let translations = {};
        lang.translations.map(translation =>
          translations = { ...translations, ...translation }
        );
        this._translateService.setTranslation(lang.code, translations);
      }
    );
    this._translateService.onLangChange.subscribe(
      event => {
        this.current = event.lang;
      }
    );
    if (!this._langStorage.get()) {
      this.current = this._defaultLang;
    } else {
      this.current = this._langStorage.get();
    }
  }
}