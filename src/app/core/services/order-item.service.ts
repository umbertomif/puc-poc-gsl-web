import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { GlobalSettings } from '../models/settings.model';
import { OrderItemModel } from '../models/order-item.model';

@Injectable({
    providedIn: 'root'
})
export class OrderItemService extends ResourceService<OrderItemModel> {

    constructor(
        http: HttpClient,
        settings: GlobalSettings) {
        super(http, "order-item", settings.teamScanBFFApiUrl)
    }

    list(): Observable<Array<OrderItemModel>> {
        return this.get();
    }

    read(id: string): Observable<OrderItemModel> {
        return this.getBy(id).pipe(tap(console.log));
    }

    FindByCustom(filter: string, value: string): Observable<OrderItemModel> {
        return this.getByQuery(filter + '/' + value).pipe(tap(console.log));
    }

    save(userAccountModel: OrderItemModel): Observable<OrderItemModel> {
        if (userAccountModel.id == undefined) {
            return this.create(userAccountModel);
        }
        else {
            return this.replaceWithQuery(userAccountModel.id, userAccountModel);
        }
    }

    remove(id: string): Observable<OrderItemModel>{
        return this.delete(id).pipe(tap(console.log));
    }
}