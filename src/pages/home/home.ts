import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController } from 'ionic-angular';

import { FirebaseService } from '../../services/firebase.service';
import { ChatPage } from '../chat/chat';
import { ProfilePage } from '../profile/profile';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ FirebaseService ]
})
export class HomePage implements OnInit {
    loader: any;
    prompt: any;
    error: any;
    chats: any;
    loggedIn: boolean;

    constructor(public navCtrl: NavController, private _fb: FirebaseService, public loadingCtrl: LoadingController,
                public storage: Storage, public alertCtrl: AlertController, public toastCtrl: ToastController) {
        this.loader = this.loadingCtrl.create({
            spinner: 'ios'
        });
        this.prompt = this.alertCtrl.create({
            title: 'Welcome to messApp',
            message: 'Enter your telephone number',
            inputs: [
                {
                    name: 'telNum',
                    placeholder: 'Your telephone number'
                },
                {
                    name: 'password',
                    placeholder: 'Your password'
                }
            ],
            buttons: [
                {
                    text: 'ok',
                    handler: (data) => {
                        this.actionLogin(data.telNum, data.password);
                    }
                },
                {
                    text: 'register',
                    handler: () => {
                        this.navCtrl.setRoot(ProfilePage);
                    }
                }
            ]
        });
        this.loggedIn = false;
        this.storage.remove('userId');
        storage.ready().then(() => {
            storage.get('userId').then((val) => {
                if (!val) {
                    this.showPrompt();
                } else {
                    this.loggedIn = true;
                }
            })
        });
    }

    actionLogin(telNumber, password) {
        this.showLoader();
        this._fb.logIn(telNumber, password).then((resp) => {
            this.storage.set('userId', resp);
            this.hideLoader();
            this.loggedIn = true;
        }).catch((err) => {
            this.hideLoader();
            this.storage.remove('userId');
            this.showError(err);
        });
    }

    showLoader() {
        this.loader.present();
    }

    hideLoader() {
        this.loader.dismiss();
    }

    ionViewDidLoad() {

    }

    showPrompt() {
        this.prompt.present();
    }

    showError(err) {
        this.error = this.alertCtrl.create({
            title: 'An error occured',
            subTitle: err,
            buttons: [
                {
                    text: 'ok',
                    handler: (data) => {
                        this.navCtrl.setRoot(HomePage);
                    }
                }
            ]
        });
        this.error.present();
    }

    handleItemClick(itemKey) {
        this.navCtrl.push(ChatPage, {key: itemKey});
    }

    ngOnInit() {
        this._fb.getChatThemes().subscribe(result => {
            this.chats = result;
        });
    }
}
