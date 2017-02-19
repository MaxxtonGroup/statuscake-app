import { Component } from "@angular/core";
import { TestDetail } from "../../domain/testdetail";
import { NavParams } from "ionic-angular";
import { InAppBrowser } from "ionic-native";

/**
 * Panel that shows all details for one test.
 * @author R. Sonke
 */
@Component({
  templateUrl: 'detail.component.html'
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
