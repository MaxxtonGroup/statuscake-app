import {Page} from 'ionic-framework/ionic';
import {ConfigService} from "../../services/config-service";

/**
 * Panel that shows all settings.
 * @author R. Sonke
 */
@Page({
  templateUrl: 'build/pages/settings/settingsPanel.html'
})
export class SettingsPanel {
  private scUsername;
  private scApiKey;

  constructor(private configService:ConfigService) {
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
  }
}
