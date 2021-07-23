import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import EuropeanaModel from '../../models/europeana.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  @Input() gallery: EuropeanaModel[] = [];
  @Input() first!: number;
  @Input() index!: number;

  constructor(private readonly dialog: MatDialog) {}

  openDialog(
    title: [string],
    provider: [string],
    country: [string],
    link: string
  ) {
    return this.dialog.open(DialogComponent, {
      data: {
        text: {
          title,
          provider,
          country,
          link,
        },
      },
    });
  }
}
