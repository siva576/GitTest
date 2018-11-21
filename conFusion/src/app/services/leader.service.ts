import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: string): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((dish) => dish.featured)[0]);
  }

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
