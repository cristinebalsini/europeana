import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';

import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [CardComponent, DialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [CardComponent, DialogComponent],
})
export class SharedModule {}
