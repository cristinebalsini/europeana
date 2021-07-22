import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [BrowserModule, HttpClientModule, MatCardModule, MatButtonModule],
  exports: [CardComponent],
})
export class SharedModule {}
