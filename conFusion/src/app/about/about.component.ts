import { Component, OnInit, Inject } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import {LeaderService} from '../services/leader.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { flyInOut, expand } from '../animations/app.animation';
import { baseURL } from '../shared/baseurl';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];

  constructor(private leaderservice: LeaderService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') private BaseURL) {
    }

  ngOnInit() {
    // this.leaders = this.leaderservice.getLeaders();
    this.leaderservice.getLeaders().subscribe(leaders => this.leaders = leaders);
  }


}
