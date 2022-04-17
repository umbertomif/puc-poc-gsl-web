import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Transaction } from './dashboard.model';

import { transactions } from './data';
import { UserAccountModel } from '../../core/models/user-account.model';
import { UserAccountService } from '../../core/services/user-account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  term: any;
  transactions: Transaction[];
  userAccountModel: UserAccountModel = new UserAccountModel;
  
  constructor(public formBuilder: FormBuilder, private userAccountService: UserAccountService) {
  }

  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submit
  formData: FormGroup;
  
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'POC GSL' }, { label: 'Home', active: true }];
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this.getUser();
    this._fetchData();
  }

  getUser(){
    this.userAccountService.FindByCustom('Uid',sessionStorage.getItem('uid')).subscribe((userAccount: UserAccountModel) => {
      this.userAccountModel = userAccount;
    });
  }

  private _fetchData() {
    this.transactions = transactions;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

 }
