import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LangModuleConfig } from './lang-module.config';
import { APP_LANG, DEFAULT_LANG, LANGUAGES, LangService } from './lang.service';
import { LangStorage } from './lang.storage';
import { CookiesModule } from '../cookies/cookies.module';

@NgModule({
  imports: [
    CommonModule,
    CookiesModule.forRoot(),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
    })
  ],
  providers: [
    LangStorage,
    LangService
  ]
})
export class LangModule {
  static forRoot(config: LangModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: LangModule,
      providers: [
        LangStorage,
        LangService,
        { provide: LANGUAGES, useValue: config.languages },
        { provide: APP_LANG, useValue: config.appLang },
        { provide: DEFAULT_LANG, useValue: config.defaultLang },
      ]
    };
  }
}
