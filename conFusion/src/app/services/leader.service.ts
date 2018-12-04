import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {ProcessHttpmsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

   // constructor() { }
   constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]> {
    // return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leadership/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leader => leader[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // getLeaders(): Promise<Leader[]> {
  //   return of(LEADERS).pipe(delay(2000)).toPromise();
  // }

  // getLeader(id: string): Promise<Leader> {
  //   return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)).toPromise();
  // }

  // getFeaturedLeader(): Promise<Leader> {
  //   return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000)).toPromise();
  // }

  // getLeaders(): Promise<Leader[]> {
  //   // return Promise.resolve(LEADERS);
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(LEADERS), 2000);
  //   });
  // }

  // getLeader(id: string): Promise<Leader> {
  //  // return Promise.resolve(LEADERS.filter((dish) => (dish.id === id))[0]);
  //  return new Promise(resolve => {
  //   // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(LEADERS.filter((dish) => (dish.id === id))[0]), 2000);
  // });
  // }

  // getFeaturedLeader(): Promise<Leader> {
  //  // return Promise.resolve(LEADERS.filter((dish) => dish.featured)[0]);
  //  return new Promise(resolve => {
  //   // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(LEADERS.filter((dish) => dish.featured)[0]), 2000);
  // });
  // }

  // getLeaders(): Leader[] {
  //   return LEADERS;
  // }

  // getLeader(id: string): Leader {
  //   return LEADERS.filter((leader) => (leader.id === id))[0];
  // }

  // getFeaturedDish(): Leader {
  //   return LEADERS.filter((leader) => leader.featured)[0];
  // }
}
