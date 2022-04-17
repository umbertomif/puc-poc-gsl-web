import { Injectable } from "@angular/core";

@Injectable()
export class GlobalSettings {
    teamScanBFFApiUrl: string = "https://localhost:7121/poc/gsl/v1"
    //teamScanBFFApiUrl: string = "https://teamscan-bff.herokuapp.com/poc/gsl/v1"
}

