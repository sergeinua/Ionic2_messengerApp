import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { ChatPage } from '../pages/chat/chat';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './firebase.config';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ProfilePage,
        SettingsPage,
        ChatPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ProfilePage,
        SettingsPage,
        ChatPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
