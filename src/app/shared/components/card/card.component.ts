import { Component, OnInit, Input } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}
}
