import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  index = 4;
  first = 0;

  ngOnInit() {
    this.buildSearchForm();
    this.getPaintings('beethoven');
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
        console.log(response);
        this.apiResult = response;

        this.apiResult.items.map((item: any, index: number) => {
          this.galleryList = [
            ...this.galleryList,
            {
              country: item.country[0],
              creator: item.dcCreator,
              image: item.edmPreview[0],
              provider: item.provider[0],
            },
          ];
        });
      });
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(4)]],
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
