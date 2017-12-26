import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {PlayersComponent} from './players/players.component';
import {PlayersService} from './players/players.service';

@NgModule({
    declarations: [
        AppComponent,
        PlayersComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [PlayersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
