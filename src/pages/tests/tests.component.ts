import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { StatuscakeService } from "../../services/statuscake.service";
import { NavController, IonicApp, ItemSliding } from "ionic-angular";
import { ConfigService } from "../../services/config.service";
import { SettingsPanel } from "../settings/settingsPanel";
import { Test } from "../../domain/test";
import { DetailsPanel } from "../testdetails/detailsPanel";

/**
 * Panel that shows a list of tests.
 * @author R. Sonke
 */
@Component({
  selector: 'tests-panel',
  templateUrl: 'tests.component.html'
})
export class TestsPanelComponent implements OnInit {
  private tests:Observable<Array<Test>>;
  private allTests:Observable<Array<Test>>;
  private filterQuery:string = '';
  private filterStatus:string = 'all';

  constructor(private statuscakeService:StatuscakeService, private nav:NavController, private configService:ConfigService, private app:IonicApp) {

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
  public refreshTests(refresher?:any):void {
    this.tests = this.statuscakeService.getTests();
    this.allTests = this.tests;

    if (refresher != null) {
      this.tests.subscribe( () => refresher.complete() );
    }
  }

  /**
   * Fetch one specific test details and navigate to the details page
   * @param testId
   */
  public goToDetailPage(testId:number):void {
    this.statuscakeService.getTest(testId).subscribe((response) => {
      this.nav.push(DetailsPanel, {test: response});
    });
  }

  public togglePauseTest(test:Test, slidingItem:ItemSliding):void {
    // pause or unpause tests
    this.statuscakeService.togglePauseTest(test);
    test.Paused = !test.Paused;
    slidingItem.close();
  }
}
