import { Component, Injector } from '@angular/core';
import { BasePageComponent } from '@rucken/web';

@Component({
  selector: 'demo-home-page',
  templateUrl: './home-page.component.html'
})
export class DemoHomePageComponent extends BasePageComponent {

  constructor(
    public injector: Injector
  ) {
    super(injector);
    const readme = require('html-loader!markdown-loader!./../../../../../../README.md');
    this.readme = readme.replace('<h1 id="rucken">rucken</h1>', '');
  }
}
