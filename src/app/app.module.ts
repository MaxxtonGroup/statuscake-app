import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { SettingsPanelComponent } from "../pages/settings/settings.component";
import { TestsPanelComponent } from "../pages/tests/tests.component";
import { DetailPanelComponent } from "../pages/detail/detail.component";
import { SortTestPipe } from "../pipes/sort-filter.pipe";
import { ConfigService } from "../services/config.service";
import { StatuscakeService } from "../services/statuscake.service";
import { BulkActionComponent } from "../pages/bulk/bulk.component";
import { StatusHeaderComponent } from "../components/status-header/status-header.component";
import { LineChartComponent } from "../components/chart/linechart.component";

@NgModule({
  declarations: [
    MyApp,
    SettingsPanelComponent, 
    TestsPanelComponent,
    DetailPanelComponent,
    BulkActionComponent,
    StatusHeaderComponent,
    SortTestPipe,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPanelComponent,
    TestsPanelComponent,
    BulkActionComponent,
    DetailPanelComponent
  ],
  providers: [
    ConfigService,
    StatuscakeService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
