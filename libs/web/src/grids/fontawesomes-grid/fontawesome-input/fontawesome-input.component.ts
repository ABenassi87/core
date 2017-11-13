import 'rxjs/add/operator/takeUntil';

import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Fontawesome, translate } from '@rucken/core';
import { FontawesomeService } from '@rucken/core';

import {
  BaseResourceInputComponent,
} from './../../../base/base-resources-grid/base-resource-input/base-resource-input.component';
import { FontawesomesListModalComponent } from './../fontawesomes-list-modal/fontawesomes-list-modal.component';

@Component({
  selector: 'fontawesome-input',
  templateUrl: './fontawesome-input.component.html',
  styleUrls: ['./fontawesome-input.component.scss'],
  entryComponents: [FontawesomesListModalComponent]
})

export class FontawesomeInputComponent extends BaseResourceInputComponent {

  @ViewChild('inputElement')
  inputElement: ElementRef;

  @Input()
  name = 'fontawesome';
  @Input()
  model: any | Fontawesome = new Fontawesome();
  @Output()
  modelChange: EventEmitter<any | Fontawesome> = new EventEmitter<any | Fontawesome>();

  items: any | Fontawesome[];
  cachedResourcesService: FontawesomeService;

  fontawesomeService: FontawesomeService;

  constructor(
    public injector: Injector,
    public resolver: ComponentFactoryResolver
  ) {
    super(injector);
    this.fontawesomeService = injector.get(FontawesomeService);
    this.cachedResourcesService = this.fontawesomeService.createCache();
  }
  onLookup() {
    const itemModal: FontawesomesListModalComponent =
      this.app.modals(this.resolver).create(FontawesomesListModalComponent);
    itemModal.name = 'selectFontawesomes';
    itemModal.hardReadonly = this.hardReadonly;
    itemModal.okTitle = translate('Select');
    itemModal.title = translate('Fontawesomes');
    itemModal.onOk.subscribe(($event: any) => {
      this.value = itemModal.item;
      if (this.inputReadonly === false) {
        this.valueAsString = '';
      }
      itemModal.modal.hide();
    });
    itemModal.onClose.subscribe(() => this.focus());
    itemModal.item = this.value;
    itemModal.modal.show();
  }
}
