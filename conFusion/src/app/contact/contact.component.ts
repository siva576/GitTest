import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
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
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  errMess: string;
  showResponse: boolean;
  showSpinner: boolean;
  showFeedBackInput: boolean;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder, private feedbackservice: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
   this.showResponse = false;
   this.showFeedBackInput = true;
   this.showSpinner = false;
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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

    this.showFeedBackInput = false;

    this.feedback = this.feedbackForm.value;
      this.feedbackservice.submitFeedback(this.feedback)
    .subscribe(feedback => {
      this.feedback = feedback;
     // this.showResponse = true;
      console.log(this.feedback);
    },
    errmess => { this.feedback = null;  this.errMess = <any>errmess; });

    this.showSpinner = true;
    this.showResponse = false;

    setInterval(() => {
      this.showSpinner = false;
      this.showFeedBackInput = false;
      this.showResponse = true;
  }, 3000);
    setInterval(() => {
      this.showSpinner = false;
      this.showResponse = false;
    this.showFeedBackInput = true;
  }, 5000);

  this.feedbackForm.reset({
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contacttype: 'None',
    message: ''
   });
    this.feedbackFormDirective.resetForm();
    // this.feedbackForm.reset({
    //   firstname: this.feedback.firstname,
    //   lastname: this.feedback.lastname,
    //   telnum: this.feedback.telnum,
    //   email: this.feedback.email,
    //   agree: this.feedback.agree,
    //   contacttype: this.feedback.contacttype,
    //   message: this.feedback.message
    // });
    // this.showFeedBackInput = true;
    // this.feedbackForm.reset({
    //   firstname: '',
    //   lastname: '',
    //   telnum: '',
    //   email: '',
    //   agree: false,
    //   contacttype: 'None',
    //   message: ''
    // });
    // this.feedbackFormDirective.resetForm();
  }

}
