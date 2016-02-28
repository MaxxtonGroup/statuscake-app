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


/**
 * Panel that shows a list of tests.
 * @author R. Sonke
 */
@Page({
  templateUrl: 'build/pages/tests/testsPanel.html',
  directives: [NgClass]
})
export class TestsPanel implements OnInit {
  private tests:Observable<Array<Test>>;

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

  refreshTests($event?):void {
    this.tests = this.statuscakeService.getTests();


    if($event != null)
      $event.complete();
  }

  goToDetailPage(testId:number) {
    //this.nav.push(TestDetailPage);
  }

}
