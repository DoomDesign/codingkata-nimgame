import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NimGameModule } from './nim-game/nim-game.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
		NimGameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
