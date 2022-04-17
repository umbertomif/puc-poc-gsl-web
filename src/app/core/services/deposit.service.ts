import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { GlobalSettings } from '../models/settings.model';
import { DepositModel } from '../models/deposit.model';

@Injectable({
    providedIn: 'root'
})
export class DepositService extends ResourceService<DepositModel> {

    constructor(
        http: HttpClient,
        settings: GlobalSettings) {
        super(http, "deposit", settings.teamScanBFFApiUrl)
    }

    list(): Observable<Array<DepositModel>> {
        return this.get();
    }

    read(id: string): Observable<DepositModel> {
        return this.getBy(id).pipe(tap(console.log));
    }

    FindByCustom(filter: string, value: string): Observable<DepositModel> {
        return this.getByQuery(filter + '/' + value).pipe(tap(console.log));
    }

    save(userAccountModel: DepositModel): Observable<DepositModel> {
        if (userAccountModel.id == undefined) {
            return this.create(userAccountModel);
        }
        else {
            return this.replaceWithQuery(userAccountModel.id, userAccountModel);
        }
    }

    remove(id: string): Observable<DepositModel>{
        return this.delete(id).pipe(tap(console.log));
    }
}