import {Page} from 'ionic-framework/ionic';

import {AlertsPanel} from '../alerts/alertsPanel';
import {SettingsPanel} from '../settings/settingsPanel';
import {Type} from 'angular2/core';
import {TestsPanel} from "../tests/testsPanel";

/**
 * Tabbed index page.
 * @author R. Sonke
 */
@Page({
  templateUrl: 'build/pages/tabs/tabsPanel.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: Type = TestsPanel;
  tab2Root: Type = AlertsPanel;
  tab3Root: Type = SettingsPanel;

  constructor() {

  }
}
