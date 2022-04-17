import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { UserAccountService } from '../../../core/services/user-account.service';
import { UserAccountModel } from '../../../core/models/user-account.model';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  userAccountModel: UserAccountModel = new UserAccountModel;
  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public authenticationService: AuthenticationService, public authFackservice: AuthfakeauthenticationService, private userAccountService: UserAccountService) { }

  ngOnInit() {
    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.loginForm = this.formBuilder.group({
      email: ['umberto.mif@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  getUser(){
    console.log('getUser');
    this.userAccountService.FindByCustom('Uid',sessionStorage.getItem('uid')).subscribe((userAccount: UserAccountModel) => {
      console.log('teste');
      sessionStorage.setItem("UserId", userAccount.id);
      sessionStorage.setItem("profile", userAccount.profile);
      this.userAccountModel = userAccount;
      this.router.navigate(['/']);
    });
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
          console.log('firebase')
          console.log(res.uid);
          sessionStorage.setItem('uid', res.uid)
          sessionStorage.setItem('token','bearer ' + res.xa)
          this.getUser();
        })
          .catch(error => {
            this.error = error ? error : '';
          });
      } else {
        this.authFackservice.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate(['/']);
            },
            error => {
              this.error = error ? error : '';
            });
      }
    }
  }

}
