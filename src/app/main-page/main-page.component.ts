import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaintingService } from '../shared/services/painting/painting.service';
import EuropeanaModel from '../shared/models/europeana.model';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  constructor(
    private readonly paintingService: PaintingService,
    private readonly formBuilder: FormBuilder
  ) {}

  apiResult!: any;
  galleryList: EuropeanaModel[] = [];
  searchForm!: FormGroup;
  index!: number;
  first!: number;
  loadResults!: boolean;

  ngOnInit() {
    this.buildSearchForm();
    this.getPaintings('europe');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getPaintings(e: string) {
    this.paintingService
      .getPainting(e)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.galleryList = [];

        this.apiResult = response;
        console.log(this.apiResult);

        this.index = 4;
        this.first = 0;

        this.loadResults = true;
        this.apiResult.itemsCount === 12
          ? (this.loadResults = true)
          : (this.loadResults = false);
        this.apiResult.items.map((item: any) => {
          this.galleryList = [
            ...this.galleryList,
            {
              country: item.country[0],
              creator: item.dcCreator,
              image: item.edmPreview[0],
              provider: item.provider[0],
              title: item.title[0],
              link: item.guid,
            },
          ];
        });
      });
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      text: [''],
    });
  }

  nextPage(index: number) {
    this.first = index;
    this.index = this.index + 4;
  }

  previousPage(index: number) {
    this.first = this.index - 8;
    this.index = index - 4;
  }
}
