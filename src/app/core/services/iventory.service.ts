import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { GlobalSettings } from '../models/settings.model';
import { IventoryModel } from '../models/iventory.model';

@Injectable({
    providedIn: 'root'
})
export class IventoryService extends ResourceService<IventoryModel> {

    constructor(
        http: HttpClient,
        settings: GlobalSettings) {
        super(http, "iventory", settings.teamScanBFFApiUrl)
    }

    list(): Observable<Array<IventoryModel>> {
        return this.get();
    }

    read(id: string): Observable<IventoryModel> {
        return this.getBy(id).pipe(tap(console.log));
    }

    FindByCustom(filter: string, value: string): Observable<IventoryModel> {
        return this.getByQuery(filter + '/' + value).pipe(tap(console.log));
    }

    save(userAccountModel: IventoryModel): Observable<IventoryModel> {
        if (userAccountModel.id == undefined) {
            return this.create(userAccountModel);
        }
        else {
            return this.replaceWithQuery(userAccountModel.id, userAccountModel);
        }
    }

    remove(id: string): Observable<IventoryModel>{
        return this.delete(id).pipe(tap(console.log));
    }
}