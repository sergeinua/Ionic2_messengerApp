import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class FirebaseService {
    db: any;

    constructor(private af: AngularFire) {
        this.db = firebase.database().ref();
    }

    logIn(telNum, password) {
        return new Promise((resolve, reject) => {
            this.db.child('user').orderByChild('tel').equalTo(telNum).once('value',
                (data) => {
                    let _data = data.val();
                    if (_data){
                        let _key = Object.keys(_data),
                            userData = _data[_key[0]];
                        if (userData.password == password) {
                            resolve(_key[0]);
                        } else {
                            reject('Wrong password');
                        }
                    } else {
                        reject('User not found');
                    }
                },
                (err) => {
                    console.log('err', err);
                });

        })
    }

    getChatThemes() {
        return this.af.database.list('/chat') as FirebaseListObservable<Chat[]>;
    }

    getChatThemeMsg(key) {
        return this.af.database.object('/chat/' + key) as FirebaseObjectObservable<Chat>;
    }

    createNewMessage(themeId, sender, message) {
        let _message = {
                message: message,
                sender: sender,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };
        //TODO: listen for response
        this.db.child('chat').child(themeId).child('messages').push(_message);
    }

    createNewUser(tel, name) {
        let _user = {
            tel: tel,
            name: name
        };
        return new Promise((resolve, reject) => {
            this.db.child('user').push(_user)
                .then(() => {
                    resolve('Saved');
                }, (err) => {
                    reject(err);
                });
        });
    }

    updateUser(userId, tel, name, password) {
        let _user = {
            tel: tel,
            name: name,
            password: password
        };
        return new Promise((resolve, reject) => {
            this.db.child('/user/' + userId).set(_user)
                .then(() => {
                    resolve('Saved');
                }, (err) => {
                    reject(err);
                });
        });

    }

    getUserData(userId) {
        // return this.af.database.object('/user/' + userId) as FirebaseObjectObservable<User>;
        return new Promise ((resolve, reject) => {
            this.db.child('/user/' + userId).once('value',
                (data) => {
                    resolve(data.val());
                },
                (err) => {
                    reject(err)
                }
            )
        })
    }
}

interface Chat {
    $key?: string;
    messages?: any;
}

export interface User {
    $key?: string;
    tel?: string;
    name?: string;
    password?: string;
}