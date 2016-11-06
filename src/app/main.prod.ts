import { enableProdMode } from '@angular/core';
import { AppModule } from "src/app/app.module";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";


enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
