import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TestsPanelComponent } from "../pages/tests/tests.component";
import { SettingsPanelComponent } from "../pages/settings/settings.component";
import { BulkActionComponent } from "../pages/bulk/bulk.component";


@Component({
  // templateUrl: 'app.component.html'
  template: `
    <ion-menu [content]="content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
          <ion-buttons right>
            <img width="50px" src="https://newyse-res.cloudinary.com/image/upload/maxxton2/logo.png" />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    
      <ion-content>
        <ion-list>
          <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
            {{p.title}}
          </button>
        </ion-list>
      </ion-content>
    
    </ion-menu>
    
    <!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
    <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
  `
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TestsPanelComponent;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Tests', component: TestsPanelComponent },
      { title: 'Bulk actions', component: BulkActionComponent },
      { title: 'Settings', component: SettingsPanelComponent }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.hide();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
