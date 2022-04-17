import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  term: any;
  listCustomer: CustomerModel[];
  customer: CustomerModel = new CustomerModel;
  mode: any = 'view';

  constructor(public formBuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'POC GSL' }, { label: 'Clientes', active: true }];
    console.log('Call loadCustomer');
    this.loadCustomer();
  }

  loadCustomer() {
    this.customerService.list().subscribe((listCustomerModel: CustomerModel[]) => {
      this.listCustomer = listCustomerModel;
      this.alterMode('view', null);
    });
  }

  alterMode(mode: string, id: string) {
    if(mode == 'add'){
      this.customer = new CustomerModel;
      this.mode = mode;
    }
    else if(mode == 'edit') {
      this.customerService.read(id).subscribe((customerModel: CustomerModel) => {
        this.customer = customerModel;
        console.log(customerModel)
        setTimeout(() => {
          this.mode = mode;  
        }, 500);
      })
    }
    else
      this.mode = mode;
  }

  deleteCustomer(id: string){
    this.customerService.remove(id).subscribe((customerModel: CustomerModel) => {
      this.loadCustomer();
    })
  }

  saveCustomer() {
    this.customerService.save(this.customer).subscribe((customerModel: CustomerModel) => { this.loadCustomer(); });
  }

  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submit
  formData: FormGroup;

}
