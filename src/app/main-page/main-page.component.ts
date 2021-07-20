import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaintingService } from '../shared/services/painting/painting.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  constructor(private readonly paintingService: PaintingService) {}

  apiResult!: any;
  galleryList: any = [];
  first = 0;
  last = 4;

  ngOnInit() {
    this.getPaintings();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getPaintings() {
    this.paintingService
      .getPainting()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log(response);
        this.apiResult = response;

        this.apiResult.items.map((item: any, index: number) => {
          console.log(item);

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

        console.log(this.galleryList);
      });
  }

  nextPage() {
    console.log('working');
  }
}
