import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxParticlesModule } from '@tsparticles/angular';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GameTypeComponent } from './components/game-type/game-type.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'


@NgModule({
  declarations: [
    AppComponent,
    GameTypeComponent,
    GameCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxParticlesModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
