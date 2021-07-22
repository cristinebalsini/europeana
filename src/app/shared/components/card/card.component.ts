import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import EuropeanaModel from '../../models/europeana.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  @Input() gallery: EuropeanaModel[] = [];
  @Input() first!: number;
  @Input() index!: number;

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog(['teste'], ['oi'], ['oi'], 'https://www.google.com');
  }

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
