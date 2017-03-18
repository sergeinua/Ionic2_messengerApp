import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ FirebaseService ]
})
export class HomePage {
    isLogged: boolean;

    constructor(public navCtrl: NavController, private _fb: FirebaseService) {
        this.isLogged = false;
    }

    actionLogin(data: {name: string, password: string}) {

        this._fb.logIn(data.name, data.password).then(
            data => this.isLogged = true
        )
    }


}
