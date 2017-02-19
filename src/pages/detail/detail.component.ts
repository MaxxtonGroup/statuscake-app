import { Component } from "@angular/core";
import { TestDetail } from "../../domain/testdetail";
import { NavParams } from "ionic-angular";
import { InAppBrowser } from "ionic-native";
import { StatuscakeService } from "../../services/statuscake.service";
import { TestPerformanceStats } from "../../domain/testperformancestats";
import { Observable } from "rxjs";


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
  private statsData:Observable<Array<TestPerformanceStats>>;

  constructor(private navParams: NavParams, private statuscakeService:StatuscakeService, ) {
    this.test = this.navParams.get('test');
    this.testFields = Object.keys(this.test);

    // get performance stats
    this.statsData = statuscakeService.getPerformanceStats(this.test.TestID);

  }

  public openWebsite(url) {
    let browser = new InAppBrowser(url, '_system');
    browser.show();
  }
}
