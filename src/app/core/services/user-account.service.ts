import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { GlobalSettings } from '../models/settings.model';
import { UserAccountModel } from '../models/user-account.model';

@Injectable({
    providedIn: 'root'
})
export class UserAccountService extends ResourceService<UserAccountModel> {

    constructor(
        http: HttpClient,
        settings: GlobalSettings) {
        super(http, "user", settings.teamScanBFFApiUrl)
    }

    list(): Observable<Array<UserAccountModel>> {
        return this.get();
    }

    read(id: string): Observable<UserAccountModel> {
        return this.getBy(id).pipe(tap(console.log));
    }

    FindByCustom(filter: string, value: string): Observable<UserAccountModel> {
        console.log('FindByCustom')
        return this.getByQuery(filter + '/' + value).pipe(tap(console.log));
    }

    FindAllByCustom(filter: string, value: string): Observable<Array<UserAccountModel>> {
        return this.getByQuery(filter + '/' + value).pipe(tap(console.log));
    }

    save(userAccountModel: UserAccountModel): Observable<UserAccountModel> {
        if (userAccountModel.id == undefined) {
            var user = this.create(userAccountModel);



            return user;
        }
        else {
            return this.replaceWithQuery(userAccountModel.id, userAccountModel);
        }
    }

    signup(userAccountModel: UserAccountModel): Observable<UserAccountModel> {
        if (userAccountModel.id == undefined) {
            return this.postWithQuery('signup',userAccountModel);
        }
    }

    remove(id: string): Observable<UserAccountModel>{
        return this.delete(id).pipe(tap(console.log));
    }
}