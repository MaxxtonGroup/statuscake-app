import {Page} from 'ionic-framework/ionic';
import {ConfigService} from "../../services/config-service";
import {NavController} from "ionic-framework/ionic";
import {TestsPanel} from "../tests/testsPanel";

/**
 * Panel that shows all settings.
 * @author R. Sonke
 */
@Page({
  templateUrl: 'build/pages/settings/detailsPanel.html'
})
export class SettingsPanel {
  private scUsername;
  private scApiKey;

  constructor(private configService:ConfigService, private nav:NavController) {
    configService.getStatusCakeApiKey().then((key) => {
      this.scApiKey = key;
    })
    configService.getStatusCakeUsername().then((user) => {
      this.scUsername = user;
    })
  }

  private saveSettings():void {
    this.configService.setStatusCakeApiKey(this.scApiKey);
    this.configService.setStatusCakeUsername(this.scUsername);
    this.nav.push(TestsPanel);
  }
}
