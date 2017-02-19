import { ConfigService } from "../../services/config.service";
import { TestsPanelComponent } from "../tests/tests.component";
import { NavController } from "ionic-angular";
import { Component } from "@angular/core";

/**
 * Panel that shows all settings.
 * @author R. Sonke
 */
@Component({
  templateUrl: 'settings.component.html'
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

  public saveSettings(): void {
    this.configService.setStatusCakeApiKey(this.scApiKey);
    this.configService.setStatusCakeUsername(this.scUsername);
    this.configService.setStatusCakeTags(this.scTags);
    this.nav.push(TestsPanelComponent);
  }
}
