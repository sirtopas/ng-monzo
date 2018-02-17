import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MonzoService } from './shared/services/monzo.service';

import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC92hg32lGCwYB4YjX3RlWSb4WypLya2N8'
        }),
        ChartsModule
    ],
    providers: [
        MonzoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
