import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FirebaseService } from '../../services/firebase.service';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
    providers: [ FirebaseService ]
})
export class ChatPage implements OnInit {
    chatKey: any;
    messages: any;
    message: any;
    sender: string;
    @ViewChild(Content) content: Content;

    constructor(public navCtrl: NavController, public navParams: NavParams, private _fb: FirebaseService,
                private storage: Storage) {
        storage.ready()
        .then(() => {
            storage.get('tel')
            .then((val) => {
                this.sender = val;
            });
        });
    }

    ionViewDidLoad() {

    }

    handleNewMessage() {
        this._fb.createNewMessage(this.chatKey, this.sender, this.message);
        this.message = null;
    }

    ngOnInit() {
        this.chatKey = this.navParams.get('key');
        this._fb.getChatThemeMsg(this.chatKey)
        .subscribe((data) => {
            this.messages = this.objAsArray(data.messages);
        });
    }

    objAsArray(obj){
        return Object.keys(obj).map((key)=>{ return obj[key]});
    }

    ionViewDidEnter() {
        this.content.scrollToBottom();
    }

}
