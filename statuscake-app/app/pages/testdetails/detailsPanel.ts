import {Page} from 'ionic-framework/ionic';
import {ConfigService} from "../../services/config-service";
import {NavController} from "ionic-framework/ionic";
import {TestsPanel} from "../tests/testsPanel";
import {TestDetail} from "../../domain/testdetail";
import {StatuscakeService} from "../../services/statuscake-service";
import {OnInit} from "angular2/core";
import {NavParams} from "ionic-framework/ionic";
import {Observable} from "rxjs/Observable";

/**
 * Panel that shows all details for one test.
 * @author R. Sonke
 */
@Page({
  templateUrl: 'build/pages/testdetails/detailsPanel.html'
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
}
