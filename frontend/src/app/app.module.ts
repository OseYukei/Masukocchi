import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CharacterSelectComponent } from './pages/character-select/character-select.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { HomeComponent } from './pages/home/home.component';
import { ResultComponent } from './pages/result/result.component';
import { UserRegistComponent } from './pages/user-regist/user-regist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatMessageComponent,
    LoadingComponent,
    UserRegistComponent,
    DiscussionComponent,
    CharacterSelectComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
