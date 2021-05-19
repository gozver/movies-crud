import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  langs: string[] = [];

  constructor(
    public translate: TranslateService
  ) {
    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
    this.translate.addLangs(['en', 'es']);
    this.langs = this.translate.getLangs();
  }
}
