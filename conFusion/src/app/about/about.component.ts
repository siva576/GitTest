import { Component, OnInit } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import {LeaderService} from '../services/leader.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  leader: Leader[] = LEADERS;

  constructor(private leaderservice: LeaderService,
    private route: ActivatedRoute,
    private location: Location) {

      console.log(JSON.stringify(this.leader));
    }

  ngOnInit() {

  }


}
