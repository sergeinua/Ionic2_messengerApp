import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {

    }

    handleHome() {
        this.navCtrl.setRoot(HomePage);
    }

}
