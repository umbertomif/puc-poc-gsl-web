import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { GlobalSettings } from '../models/settings.model';
import { SupplierModel } from '../models/supplier.model';

@Injectable({
    providedIn: 'root'
})
export class SupplierService extends ResourceService<SupplierModel> {

    constructor(
        http: HttpClient,
        settings: GlobalSettings) {
        super(http, "supplier", settings.teamScanBFFApiUrl)
    }

    list(): Observable<Array<SupplierModel>> {
        return this.get();
    }

    read(id: string): Observable<SupplierModel> {
        return this.getBy(id).pipe(tap(console.log));
    }

    FindByCustom(filter: string, value: string): Observable<SupplierModel> {
        return this.getByQuery(filter + '/' + value).pipe(tap(console.log));
    }

    save(userAccountModel: SupplierModel): Observable<SupplierModel> {
        if (userAccountModel.id == undefined) {
            return this.create(userAccountModel);
        }
        else {
            return this.patchWithQuery(userAccountModel.id, userAccountModel);
        }
    }

    remove(id: string): Observable<SupplierModel>{
        return this.delete(id).pipe(tap(console.log));
    }
}