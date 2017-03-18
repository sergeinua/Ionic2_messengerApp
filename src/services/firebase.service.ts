import { AngularFire } from 'angularfire2';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import firebase from 'firebase';


@Injectable()
export class FirebaseService {
    userName: string;
    db: any;

    constructor(private af: AngularFire) {
        this.userName = null;
        this.db = firebase.database().ref();
    }

    logIn(user, password) {
        return new Promise(resolve => {
            const users = this.db.child('user');
            const query = users.orderByChild('name').equalTo(user);
            query.on('value', snap => {
                let _data = snap.toJSON();
                if (_data && _data[user].password == password) {
                    this.userName = _data[user].name;
                    resolve(true);
                }
            });
        }).catch(err => console.log('error', err));
    }
}