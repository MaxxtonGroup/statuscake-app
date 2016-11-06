import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { SettingsPanel } from "../pages/settings/settingsPanel";
import { TestsPanelComponent } from "../pages/tests/tests.component";
import { DetailsPanel } from "../pages/testdetails/detailsPanel";
import { SortTestPipe } from "../pipes/sort-filter.pipe";
import { ConfigService } from "../services/config.service";
import { StatuscakeService } from "../services/statuscake.service";

@NgModule({
  declarations: [
    MyApp,
    SettingsPanel,
    TestsPanelComponent,
    DetailsPanel,
    SortTestPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPanel,
    TestsPanelComponent,
    DetailsPanel
  ],
  providers: [
    ConfigService,
    StatuscakeService,
    Storage
  ]
})
export class AppModule {}
