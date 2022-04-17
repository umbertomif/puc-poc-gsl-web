import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { GlobalSettings } from '../models/settings.model';
import { CustomerModel } from '../models/customer.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends ResourceService<CustomerModel> {

    constructor(
        http: HttpClient,
        settings: GlobalSettings) {
        super(http, "customer", settings.teamScanBFFApiUrl)
    }

    list(): Observable<Array<CustomerModel>> {
        return this.get();
    }

    read(id: string): Observable<CustomerModel> {
        return this.getBy(id).pipe(tap(console.log));
    }

    remove(id: string): Observable<CustomerModel>{
        return this.delete(id).pipe(tap(console.log));
    }

    FindByCustom(filter: string, value: string): Observable<CustomerModel> {
        return this.getByQuery(filter + '/' + value).pipe(tap(console.log));
    }

    save(userAccountModel: CustomerModel): Observable<CustomerModel> {
        if (userAccountModel.id == undefined) {
            return this.create(userAccountModel);
        }
        else {
            return this.patchWithQuery(userAccountModel.id, userAccountModel);
        }
    }
}