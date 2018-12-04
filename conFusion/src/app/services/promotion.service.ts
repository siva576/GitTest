
import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
// import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {ProcessHttpmsgService} from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  // constructor() { }
   constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion> {
   //  return of(PROMOTIONS).pipe(delay(2000));
   return this.http.get<Promotion>(baseURL + 'PROMOTIONS').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
   // return of(PROMOTIONS.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return of(PROMOTIONS.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // getPromotions(): Promise<Promotion[]> {
  //   return of(PROMOTIONS).pipe(delay(2000)).toPromise();
  // }

  // getPromotion(id: string): Promise<Promotion> {
  //   return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000)).toPromise();
  // }

  // getFeaturedPromotion(): Promise<Promotion> {
  //   return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)).toPromise();
  // }


  // getPromotions(): Promise<Promotion[]> {
  //   // return Promise.resolve(PROMOTIONS);
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(PROMOTIONS), 2000);
  //   });
  // }

  // getPromotion(id: string): Promise<Promotion> {
  //   // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
  //   });
  // }

  // getFeaturedPromotion(): Promise<Promotion> {
  //   // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
  //   });
  // }

  // getPromotions(): Promotion[] {
  //   return PROMOTIONS;
  // }

  // getPromotion(id: string): Promotion {
  //   return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  // }

  // getFeaturedPromotion(): Promotion {
  //   return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  // }
}
