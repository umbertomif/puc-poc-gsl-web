import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { GlobalSettings } from '../models/settings.model';
import { OrderModel } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService extends ResourceService<OrderModel> {

    constructor(
        http: HttpClient,
        settings: GlobalSettings) {
        super(http, "order", settings.teamScanBFFApiUrl)
    }

    list(): Observable<Array<OrderModel>> {
        return this.get();
    }

    read(id: string): Observable<OrderModel> {
        return this.getBy(id).pipe(tap(console.log));
    }

    FindByCustom(filter: string, value: string): Observable<OrderModel> {
        return this.getByQuery(filter + '/' + value).pipe(tap(console.log));
    }

    save(userAccountModel: OrderModel): Observable<OrderModel> {
        if (userAccountModel.id == undefined) {
            return this.create(userAccountModel);
        }
        else {
            return this.replaceWithQuery(userAccountModel.id, userAccountModel);
        }
    }

    remove(id: string): Observable<OrderModel>{
        return this.delete(id).pipe(tap(console.log));
    }
}