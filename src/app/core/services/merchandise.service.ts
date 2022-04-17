import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { GlobalSettings } from '../models/settings.model';
import { MerchandiseModel } from '../models/merchandise.model';

@Injectable({
    providedIn: 'root'
})
export class MerchandiseService extends ResourceService<MerchandiseModel> {

    constructor(
        http: HttpClient,
        settings: GlobalSettings) {
        super(http, "merchandise", settings.teamScanBFFApiUrl)
    }

    list(): Observable<Array<MerchandiseModel>> {
        return this.get();
    }

    read(id: string): Observable<MerchandiseModel> {
        return this.getBy(id).pipe(tap(console.log));
    }

    FindByCustom(filter: string, value: string): Observable<MerchandiseModel> {
        return this.getByQuery(filter + '/' + value).pipe(tap(console.log));
    }

    save(userAccountModel: MerchandiseModel): Observable<MerchandiseModel> {
        if (userAccountModel.id == undefined) {
            return this.create(userAccountModel);
        }
        else {
            return this.replaceWithQuery(userAccountModel.id, userAccountModel);
        }
    }

    remove(id: string): Observable<MerchandiseModel>{
        return this.delete(id).pipe(tap(console.log));
    }
}