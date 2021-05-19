import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, OnDestroy, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnDestroy {
  @Input() sidebarTitle: string;
  @Input() langs?: string[];

  public selected: string;
  public mobileQuery: MediaQueryList;
  public shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  public fillerNav = [
    { title: 'Movies',    url: 'movies',    icon: 'movie' },
    { title: 'Actors',    url: 'actors',    icon: 'person' }
  ];

  private mobileQueryListener: () => void;

  constructor(
    public translate: TranslateService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.selected = 'en';
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  public changeLang(lang: string): void {
    this.translate.use(lang);
  }
}
