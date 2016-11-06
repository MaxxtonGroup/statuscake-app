import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { StatuscakeService } from "../../services/statuscake.service";
import { NavController, IonicApp, ItemSliding } from "ionic-angular";
import { ConfigService } from "../../services/config.service";
import { SettingsPanelComponent } from "../settings/settings.component";
import { Test } from "../../domain/test";
import { DetailPanelComponent } from "../detail/detail.component";

/**
 * Panel that shows a list of tests.
 * @author R. Sonke
 */
@Component({
  selector: 'tests-panel',
  //templateUrl: 'tests.component.html'
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>
          All tests
        </ion-title>
        <ion-buttons right>
          <img width="50px" src="https://newyse-res.cloudinary.com/image/upload/maxxton2/logo.png" />
        </ion-buttons>
        
        <ion-buttons left>
            
          <button ion-button menuToggle icon-only>
            <ion-icon name='menu'></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>
    
    <ion-content class="tests-page">
    
      <ion-segment [(ngModel)]="filterStatus">
        <ion-segment-button value="all">All</ion-segment-button>
        <ion-segment-button value="up">Up</ion-segment-button>
        <ion-segment-button value="down">Down</ion-segment-button>
        <ion-segment-button value="paused">Paused</ion-segment-button>
      </ion-segment>
    
      <ion-searchbar [(ngModel)]="filterQuery"></ion-searchbar>
      <ion-list>
        <ion-refresher #$event (ionRefresh)="refreshTests($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <ion-item-sliding *ngFor="let test of tests | async | sortTest:filterQuery:filterStatus" [ngClass]="{ 'text-muted': test.Paused}" #slidingItem>
    
          <ion-item [ngClass]="{ 'text-muted': test.Paused}">
            <ion-thumbnail item-left>
              <ion-icon *ngIf="test.Status == 'Up' && !test.Paused" name="checkmark"></ion-icon>
              <ion-icon *ngIf="test.Status == 'Down'" name="close"></ion-icon>
              <ion-icon *ngIf="test.Status != 'Down' && test.Paused" name="pause"></ion-icon>
            </ion-thumbnail>
            <h2>{{test.WebsiteName}}</h2>
            <p>Uptime: <ion-badge item-right>{{test.Uptime}}%</ion-badge></p>
    
            <button clear ion-button small item-right (click)="goToDetailPage(test.TestID)">Details</button>
          </ion-item>
          <ion-item-options>
            <button ion-button expandable (click)="togglePauseTest(test, slidingItem)">
              <ion-icon *ngIf="!test.Paused" name="pause"></ion-icon>
              <ion-icon *ngIf="test.Paused" name="play"></ion-icon>
            </button>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    
      <ion-card *ngIf="(tests | async | sortTest:filterQuery:filterStatus)?.length == 0">
        <ion-card-content>
          There are no tests matching your filter.
        </ion-card-content>
      </ion-card>
    
    </ion-content>
  `
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
      else this.nav.push(SettingsPanelComponent);
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
      this.nav.push(DetailPanelComponent, {test: response});
    });
  }

  public togglePauseTest(test:Test, slidingItem:ItemSliding):void {
    // pause or unpause tests
    this.statuscakeService.togglePauseTest(test);
    test.Paused = !test.Paused;
    slidingItem.close();
  }
}
