import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NimGameModule } from './nim-game/nim-game.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
		NimGameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
