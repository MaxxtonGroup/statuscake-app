import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SettingsPanel } from "src/app/pages/settings/settingsPanel";
import { TestsPanel } from "src/app/pages/tests/testsPanel";
import { DetailsPanel } from "src/app/pages/testdetails/detailsPanel";

@NgModule({
  declarations: [
    MyApp,
    SettingsPanel,
    TestsPanel,
    DetailsPanel
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPanel,
    TestsPanel,
    DetailsPanel
  ],
  providers: []
})
export class AppModule {}
