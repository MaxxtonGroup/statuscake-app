import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
    IonicModule.forRoot(MyApp)
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
    Storage
  ]
})
export class AppModule {}
