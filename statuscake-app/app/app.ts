import {App, Platform} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabsPanel';
import {Type} from "angular2/core";
import {StatuscakeService} from './services/statuscake-service'
import {ConfigService} from './services/config-service'
import {LoadingModal} from "./components/loading/loadingModal";
import {IonicApp, Config} from "ionic-angular/index";

/**
 * Simple app that shows Statuscake tests
 *
 * TODO:
 * loading spinners to show network activity
 *
 * @author R. Sonke
 */
@App({
  template: '<ion-nav [root]="rootPage"></ion-nav><loading-modal id="loading"></loading-modal>',
  config: {
    iconMode: 'ios',
    modalEnter: 'modal-slide-in',
    modalLeave: 'modal-slide-out',
    tabbarPlacement: 'bottom',
    pageTransition: 'ios',
    favoriteColor: 'orange'
  },
  directives: [LoadingModal],
  providers: [StatuscakeService, ConfigService]
})
export class MyApp {
  rootPage:Type = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {

    });
  }
}
