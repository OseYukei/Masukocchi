import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { UserRegistComponent } from './pages/user-regist/user-regist.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { CharacterSelectComponent } from './pages/character-select/character-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatMessageComponent,
    LoadingComponent,
    UserRegistComponent,
    DiscussionComponent,
    CharacterSelectComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
