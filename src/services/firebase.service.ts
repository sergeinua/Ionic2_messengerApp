import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import firebase from 'firebase';


@Injectable()
export class FirebaseService {
    userName: string;

    constructor() {
        this.userName = null;
    }

    logIn(user, password) {
        return new Promise(resolve => {
            const db = firebase.database().ref();
            const users = db.child('user');
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