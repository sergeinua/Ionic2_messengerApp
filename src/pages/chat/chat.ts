import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker';

import { FirebaseService } from '../../services/firebase.service';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
    providers: [ FirebaseService, ImagePicker ]
})
export class ChatPage implements OnInit {
    chatKey: any;
    messages: any;
    message: any;
    sender: string;
    @ViewChild(Content) content: Content;

    constructor(public navCtrl: NavController, public navParams: NavParams, private _fb: FirebaseService,
                private storage: Storage, private imagePicker: ImagePicker) {
        storage.ready().then(() => {
            storage.get('userId').then((val) => {
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
        this._fb.getChatThemeMsg(this.chatKey).subscribe((data) => {
            this.messages = this.objAsArray(data.messages);
            this.content.scrollToBottom();
        });
    }

    objAsArray(obj){
        return Object.keys(obj).map((key)=>{ return obj[key]});
    }

    ionViewDidEnter() {
        this.content.scrollToBottom();
    }

    addPic() {
        this.imagePicker.getPictures({}).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, (err) => { });
    }

}
