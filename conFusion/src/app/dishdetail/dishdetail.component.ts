import { Component, OnInit, Input, ViewChild , Inject } from '@angular/core';
 import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { DISHES } from '../shared/dishes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import {formatDate} from '@angular/common';

import { visibility, flyInOut,expand } from '../animations/app.animation';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]

})
export class DishdetailComponent implements OnInit {


  @ViewChild('cform') cFormDirective;
  commentForm: FormGroup;
  comment: Comment;
    errMess: string;
    dishcopy: Dish;

  formErrors = {
    'author': '',
    'comment': '',
    'rating': ''
  };

  validationMessages = {
    'author': {
      'required':      ' Name is required.',
      'minlength':     ' Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'comment is required.',
      'minlength':     'comment must be at least 2 characters long.',
      'maxlength':     'comment cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'comment is required.',
      'minlength':     'comment must be at least 2 characters long.',
      'maxlength':     'comment cannot be more than 25 characters long.'
    }
  };

  dishIds: string[];
  prev: string;
  next: string;
  visibility = 'shown';

  dish = DISHES[0];
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
     @Inject('BaseURL') private BaseURL
  ) {

       this.createForm();
    }

  ngOnInit() {
        this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);


this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); }))
        .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
          errmess => this.errMess = <any>errmess);

        // this.route.params
        // .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
        // .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        //   errmess => this.errMess = <any>errmess );
    // this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    // .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); }, errmess => this.errMess = <any>errmess);

    //  const id = +this.route.snapshot.params['id'];
    //  this.dishservice.getDish(id).then(dishes => this.dish = dishes);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: ['', ]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    if ( !this.commentForm.invalid )    {

      console.log(this.commentForm.value);
      this.commentForm.value.rating  = this.commentForm.value.rating + ' Stars' ;
      this.commentForm.value.date  = formatDate(new Date(), 'yyyy/MM/dd', 'en');
      //  new Date().toISOString();
       this.dish.comments.push(this.commentForm.value);
        this.comment = this.commentForm.value;

    this.comment = this.commentForm.value;

    this.dishcopy.comments.push( this.commentForm.value);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    });
    this.cFormDirective.resetForm();
  }
  }

}
