import {Page, IonicApp, NavController} from "ionic-framework/ionic";
import {StatuscakeService} from "../../services/statuscake-service";
import {Test} from "../../domain/test";
import {Observable} from "rxjs/Observable";
import {OnInit} from "angular2/core";
import {NgClass} from "angular2/common";
import {ConfigService} from "../../services/config-service";
import {SettingsPanel} from "../settings/settingsPanel";
import {DetailsPanel} from "../testdetails/detailsPanel";
import {SortTestPipe} from "../../pipes/sort";
import {LoadingModal} from "../../components/loading/loadingModal";
import {Response} from "angular2/http";

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
  private filterQuery:string = '';
  private filterStatus:string = 'all';
  private loading:LoadingModal;

  constructor(private statuscakeService:StatuscakeService, private nav:NavController, private configService:ConfigService, private app:IonicApp) {
    this.loading = app.getComponent('loading');
  }

  /**
   * Just make sure we load all tests on opening the app.
   * In case there's no config yet in the settings tab, load that.
   */
  ngOnInit():any {
    // fetch all tests or move to settings page if the settings are missing
    this.configService.getStatusCakeApiKey().then((key) => {
      if (key) {
        this.refreshTests();
      }
      else this.nav.push(SettingsPanel);
    });
  }

  /**
   * Get all tests and show a loading modal during the call
   *
   * @param $event
   */
  public refreshTests($event?):void {
    this.loading.show();
    this.tests = this.statuscakeService.getTests();
    this.allTests = this.tests;
    this.tests.subscribe((response:Response) => {
      this.loading.hide();
    });

    if ($event != null) {
      $event.complete();
    }
  }

  /**
   * Fetch one specific test details and navigate to the details page
   * @param testId
   */
  public goToDetailPage(testId:number):void {
    this.loading.show();
    this.statuscakeService.getTest(testId).subscribe((response) => {
      this.nav.push(DetailsPanel, {test: response});
      this.loading.hide();
    });
  }

  public togglePauseTest(test:Test):void {
    // pause or unpause tests
    this.statuscakeService.togglePauseTest(test);
    test.Paused = !test.Paused;
  }
}
