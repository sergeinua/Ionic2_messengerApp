import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { FirebaseService } from '../../services/firebase.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ FirebaseService ]
})
export class HomePage {
    loader: any;
    prompt: any;
    error: any;

    constructor(public navCtrl: NavController, private _fb: FirebaseService,
                public loadingCtrl: LoadingController, public storage: Storage,
                public alertCtrl: AlertController) {
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
            ],
            buttons: [
                {
                    text: 'OK',
                    handler: (data) => {
                        this.actionLogin(data.telNum);
                    }
                }
            ]
        });
        this.error = this.alertCtrl.create({
            title: 'Tel num error',
            subTitle: 'Look, we\'ve got no tel num matching your\'s',
            buttons: [
                {
                    text: 'OK',
                    handler: (data) => {
                        this.navCtrl.setRoot(HomePage);
                    }
                }
            ]
        });
        storage.ready()
        .then(() => {
            storage.get('tel')
            .then((val) => {
                if (!val) {
                    this.showPrompt();
                }
            })
        });
    }

    actionLogin(telNumber) {
        this.showLoader();
        this._fb.logIn(telNumber)
        .then((resp) => {
            console.log('succ',resp);
            this.storage.set('tel', telNumber);
            this.hideLoader();
        })
        .catch((err) => {
            this.hideLoader();
            this.storage.remove('tel');
            this.showError();
        });
    }

    showLoader() {
        this.loader.present();
    }

    hideLoader() {
        this.loader.dismiss();
    }

    ionViewDidLoad() {
        // this.storage.clear();
    }

    showPrompt() {
        this.prompt.present();
    }

    showError() {
        this.error.present();
    }
}
