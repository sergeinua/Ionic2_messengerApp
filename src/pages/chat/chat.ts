import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})
export class ChatPage {
    chatData: any;
    messages: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.chatData = this.navParams.get('chatData');
        this.messages = this.objAsArray(this.chatData.messages);
        console.log('mess_',this.messages);
    }

    ionViewDidLoad() {

    }

    objAsArray(obj){
        return Object.keys(obj).map((key)=>{ return obj[key]});
    }

}
