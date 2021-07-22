import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaintingService {
  private readonly apiUrl = environment.baseApiUrl;
  private readonly apiKey = environment.apiKey;

  constructor(private readonly http: HttpClient) {}

  getPainting(query: string) {
    const url = `${this.apiUrl}wskey=${this.apiKey}&query=what:${query}&media=true&qf=IMAGE_SIZE:large&qf=IMAGE_SIZE:extra_large&reusability=open`;
    console.log(url);
    return this.http
      .get(url, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map((response) => response));
  }
}
