import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';
import { GlobalSettings } from '../models/settings.model';
import { ProfileModel } from '../models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends ResourceService<ProfileModel> {

    constructor(
        http: HttpClient,
        settings: GlobalSettings) {
        super(http, "profile", settings.teamScanBFFApiUrl)
    }

    list(): Observable<Array<ProfileModel>> {
        return this.get();
    }

    read(id: string): Observable<Array<ProfileModel>> {
        return this.getBy(id).pipe(tap(console.log));
    }

    FindByCustom(filter: string, value: string): Observable<ProfileModel> {
        return this.getByQuery(filter + '/' + value).pipe(tap(console.log));
    }

    save(userAccountModel: ProfileModel): Observable<ProfileModel> {
        if (userAccountModel.id == undefined) {
            return this.create(userAccountModel);
        }
        else {
            return this.patchWithQuery(userAccountModel.id, userAccountModel);
        }
    }

    remove(id: string): Observable<ProfileModel>{
        return this.delete(id).pipe(tap(console.log));
    }
}