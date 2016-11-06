

import { Component, OnInit } from "@angular/core";
import { TestDetail } from "../../domain/testdetail";
import { NavController, NavParams } from "ionic-angular";
import { StatuscakeService } from "../../services/statuscake.service";
import { InAppBrowser } from "ionic-native";
/**
 * Panel that shows all details for one test.
 * @author R. Sonke
 */
@Component({
  templateUrl: 'detailsPanel.html'
})
export class DetailsPanel implements OnInit {
  private test:TestDetail = null;
  private testFields:Array<any>;

  constructor(private statuscakeService:StatuscakeService, private nav:NavController, private navParams: NavParams) {
    this.test = this.navParams.get('test');
    this.testFields = Object.keys(this.test);
  }

  ngOnInit():void {

  }

  public openWebsite(url) {
    // cordova.InAppBrowser.open(url, "_system", "location=true");
    let browser = new InAppBrowser(url, '_system');
    browser.show();
  }
}
