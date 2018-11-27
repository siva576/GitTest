import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import {LeaderService} from '../services/leader.service';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private featuredleader: LeaderService,
     @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    // this.dish = this.dishservice.getFeaturedDish();
    // this.promotion = this.promotionservice.getFeaturedPromotion();
    // this.leader = this.featuredleader.getFeaturedLeader();

    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish, dishErrMess => this.dishErrMess = <any>dishErrMess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    this.featuredleader.getFeaturedLeader().subscribe(leader => this.leader = leader);
  }

}
