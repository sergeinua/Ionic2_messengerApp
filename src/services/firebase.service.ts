import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class FirebaseService {
    db: any;

    constructor(private af: AngularFire) {
        this.db = firebase.database().ref();
    }

    logIn(telNum) {
        return new Promise((resolve, reject) => {
            const users = this.db.child('user');
            users.on('value', snap => {
                let _data = snap.toJSON();
                if (_data && (typeof _data[telNum] != 'undefined') && (_data[telNum].name != null)) {
                    resolve(true);
                } else {
                    reject('User doesn\'t exist');
                }
            });
        });
    }

    getChatThemes() {
        return this.af.database.list('/chat') as FirebaseListObservable<Chat[]>;
    }

    getChatThemeMsg(key) {
        return this.af.database.object('/chat/' + key) as FirebaseObjectObservable<Chat>;
    }

    createNewMessage(themeId, sender, message) {
        let newMessage = {
            message: message,
            sender: sender,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        this.db.child('chat').child(themeId).child('messages').push(newMessage);
    }
}

interface Chat {
    $key?: string;
    messages?: any;
}