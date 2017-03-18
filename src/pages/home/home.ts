import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { LoadingController } from 'ionic-angular';
import { ListPage } from '../list/list';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ FirebaseService ]
})
export class HomePage {
    isLogged: boolean;
    loader: any;

    constructor(public navCtrl: NavController, private _fb: FirebaseService,
                public loadingCtrl: LoadingController) {
        this.isLogged = false;
        this.loader = this.loadingCtrl.create({
            spinner: 'ios'
        });
    }

    actionLogin(data: {name: string, password: string}) {
        this.showLoader();
        setTimeout(() => this.hideLoader(), 5000);
        this._fb.logIn(data.name, data.password).then(
            data => {
                this.isLogged = true;
                this.hideLoader();
                this.navCtrl.push(ListPage);
            }
        );
    }

    showLoader() {
        this.loader.present();
    }

    hideLoader() {
        this.loader.dismiss();
    }


}
