import { Component } from "@angular/core";
import { TestDetail } from "../../domain/testdetail";
import { NavParams } from "ionic-angular";
import { InAppBrowser } from "ionic-native";

/**
 * Panel that shows all details for one test.
 * @author R. Sonke
 */
@Component({
  //templateUrl: 'detail.component.html'
  template: `
    <ion-header>
      <status-header title="{{test.WebsiteName}}"></status-header>
    </ion-header>
    
    <ion-content class="details-page" padding>
    
      <button ion-button (click)="openWebsite(test.URI)"><ion-icon name="link"></ion-icon> Open website</button>
    
      <ion-list>
        <span *ngFor="let field of testFields">
        <ion-item *ngIf="field != 'URI'">
          <ion-label>{{field}}</ion-label>
          <ion-note item-right>{{test[field]}}</ion-note>
        </ion-item>
        </span>
      </ion-list>
    
    </ion-content>
  `
})
export class DetailPanelComponent {
  private test:TestDetail = null;
  private testFields:Array<any>;

  constructor(private navParams: NavParams) {
    this.test = this.navParams.get('test');
    this.testFields = Object.keys(this.test);
  }

  public openWebsite(url) {
    let browser = new InAppBrowser(url, '_system');
    browser.show();
  }
}
