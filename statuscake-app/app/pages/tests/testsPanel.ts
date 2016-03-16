import {Page} from 'ionic-framework/ionic';
import {StatuscakeService} from "../../services/statuscake-service";
import {Inject} from "angular2/core";
import {Test} from "../../domain/test";
import {Observable} from "rxjs/Observable";
import {OnInit} from "angular2/core";
import {NavController} from "ionic-framework/ionic";
import {NgClass} from "angular2/common";
import {ConfigService} from "../../services/config-service";
import {SettingsPanel} from "../settings/settingsPanel";
import {DetailsPanel} from "../testdetails/detailsPanel";
import {SortTestPipe} from "../../pipes/sort";



/**
 * Panel that shows a list of tests.
 * @author R. Sonke
 */
@Page({
  templateUrl: 'build/pages/tests/testsPanel.html',
  directives: [NgClass],
  pipes: [SortTestPipe]
})
export class TestsPanel implements OnInit {
  private tests:Observable<Array<Test>>;
  private allTests:Observable<Array<Test>>;
  private filterQuery = '';
  private filterStatus = 'all';

  constructor(private statuscakeService:StatuscakeService, private nav: NavController, private configService:ConfigService) {
  }

  ngOnInit():any {
    // fetch all tests or move to settings page if the settings are missing
    this.configService.getStatusCakeApiKey().then((key) => {
      if(key){
        this.refreshTests();
      }
      else this.nav.push(SettingsPanel);
    });
  }

  public refreshTests($event?):void {
    this.tests = this.statuscakeService.getTests();
    this.allTests = this.tests;

    if($event != null)
      $event.complete();
  }

  public goToDetailPage(testId:number) {
    this.statuscakeService.getTest(testId).subscribe((response) => { this.nav.push(DetailsPanel, { test: response }); });
  }
}
