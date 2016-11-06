import { ConfigService } from "../../services/config.service";
import { TestsPanelComponent } from "../tests/tests.component";
import { NavController } from "ionic-angular";
import { Component } from "@angular/core";

/**
 * Panel that shows all settings.
 * @author R. Sonke
 */
@Component({
  templateUrl: 'settingsPanel.html'
})
export class SettingsPanel {
  private scUsername;
  private scApiKey;

  constructor(private configService: ConfigService, private nav: NavController) {
    configService.getStatusCakeApiKey().then((key) => {
      this.scApiKey = key;
    })
    configService.getStatusCakeUsername().then((user) => {
      this.scUsername = user;
    })
  }

  private saveSettings(): void {
    this.configService.setStatusCakeApiKey(this.scApiKey);
    this.configService.setStatusCakeUsername(this.scUsername);
    this.nav.push(TestsPanelComponent);
  }
}
