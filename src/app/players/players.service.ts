import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PlayersService {
    constructor(private http: HttpClient) {
    }

    getStats(): Observable<any> {
        // return this.http.get('http://web.profootballfocus.com.s3-website-us-east-1.amazonaws.com/quarterbacks.json');
        return this.http.get('assets/quarterbacks.json');
    }
}
