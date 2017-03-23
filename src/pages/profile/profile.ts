import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../services/firebase.service';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
    providers: [ FirebaseService ]
})
export class ProfilePage implements OnInit {
    loggedIn: boolean;
    title: string;
    btnLabel: string;
    name: string;
    tel: string;
    userId: string;
    password: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
                private _fb: FirebaseService, public toastCtrl: ToastController) {
    }

    ngOnInit() {
        this.storage.ready().then(() => {
            this.storage.get('userId').then((val) => {
                if (!val) {
                    this.loggedIn = false;
                } else {
                    this.userId = val;
                    this._fb.getUserData(val).then((userData: User) => {
                        this.name = userData.name;
                        this.tel = userData.tel;
                        this.password = userData.password;
                    });
                    this.loggedIn = true;
                }
            }).then(() => {
                this.title = this.loggedIn ? 'Profile' : 'Register';
                this.btnLabel = this.loggedIn ? 'update' : 'create';
            })
        })
    }

    ionViewDidLoad() {

    }

    handleHome() {
        this.navCtrl.setRoot(HomePage);
    }

    handleUser() {
        if (this.loggedIn) {
            this._fb.updateUser(this.userId, this.tel, this.name, this.password).then((data) => {
                this.presentToast(data);
            });
        } else {
            this._fb.createNewUser(this.tel, this.name).then((data) => {
                setTimeout(() => {
                    this.handleHome();
                }, 3000);
                this.presentToast(data);
            })
        }
    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }
}