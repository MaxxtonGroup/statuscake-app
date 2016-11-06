import { ConfigService } from "../../services/config.service";
import { TestsPanelComponent } from "../tests/tests.component";
import { NavController } from "ionic-angular";
import { Component } from "@angular/core";

/**
 * Panel that shows all settings.
 * @author R. Sonke
 */
@Component({
  //templateUrl: 'settings.component.html'
  template: `

<ion-header>
  <ion-navbar>
    <ion-title>
      Statuscake Settings
    </ion-title>
    <ion-buttons>
      <button ion-button menuToggle icon-only>
        <ion-icon name='menu'></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>
</ion-header>

<ion-content class="settings-page" padding>

  <h2>Statuscake settings</h2>

  <ion-list>
    <ion-item>
      <ion-label floating>Username</ion-label>
      <ion-input type="text" [(ngModel)]="scUsername"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label floating>API Key</ion-label>
      <ion-input type="text" [(ngModel)]="scApiKey"></ion-input>
    </ion-item>
    <a href="https://app.statuscake.com/APIKey.php" target="_blank">Get the api key here.</a>
    
    <ion-item>
      <ion-label floating>Tags (comma separated)</ion-label>
      <ion-input type="text" [(ngModel)]="scTags"></ion-input>
    </ion-item>
    <ion-item>
      <button ion-button (click)="saveSettings()">Save</button>
    </ion-item>
  </ion-list>
</ion-content>

`
})
export class SettingsPanelComponent {
  private scUsername:string;
  private scApiKey:string;
  private scTags:string;

  constructor(private configService: ConfigService, private nav: NavController) {
    configService.getStatusCakeApiKey().then((key) => {
      this.scApiKey = key;
    });
    configService.getStatusCakeUsername().then((user) => {
      this.scUsername = user;
    });
    configService.getStatusCakeTags().then((tags) => {
      this.scTags = tags;
    });
  }

  private saveSettings(): void {
    this.configService.setStatusCakeApiKey(this.scApiKey);
    this.configService.setStatusCakeUsername(this.scUsername);
    this.configService.setStatusCakeTags(this.scTags);
    this.nav.push(TestsPanelComponent);
  }
}
