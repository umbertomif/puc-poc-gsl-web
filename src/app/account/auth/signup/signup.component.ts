import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
//import { UserProfileService } from '../../../core/services/user.service';
import { UserAccountModel } from '../../../core/models/user-account.model';
import { UserAccountService } from '../../../core/services/user-account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  userAccountModel: UserAccountModel = new UserAccountModel;


  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userAccountService: UserAccountService,
  ) { }

  ngOnInit() {
    this.spinner.hide();
    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */

  onCreateUser() {
    console.log('onCreateUser');
    this.userAccountService.signup(this.userAccountModel).subscribe((userAccount: UserAccountModel) => {
      console.log('signup 2');
      this.spinner.hide();
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {

        this.spinner.show();

        this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
          this.successmsg = true;
          if (this.successmsg) {

            sessionStorage.setItem('token', 'bearer ' + res.xa)
            sessionStorage.setItem('uid', res.uid)

            this.userAccountModel.uid = res.uid;
            this.userAccountModel.mail = this.f.email.value;
            this.userAccountModel.name = this.f.firstName.value + " " + this.f.lastName.value;

            console.log(this.userAccountModel);

            this.onCreateUser();


          }
        })
          .catch(error => {
            this.spinner.hide();
            this.error = error ? error : '';
          });
      }
    }
  }
}
