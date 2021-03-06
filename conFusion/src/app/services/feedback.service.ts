import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {ProcessHttpmsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }


    submitFeedback(feedback: Feedback): Observable<Feedback> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
console.log(feedback);
      return this.http.post<Feedback>(baseURL + 'Feedback/', feedback, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
