import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterSelectComponent } from './pages/character-select/character-select.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { HomeComponent } from './pages/home/home.component';
import { ResultComponent } from './pages/result/result.component';
import { TopComponent } from './pages/top/top.component';
import { UserRegistComponent } from './pages/user-regist/user-regist.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'top', component: TopComponent },
  { path: 'user-regist', component: UserRegistComponent },
  { path: 'discussion', component: DiscussionComponent },
  { path: 'character-select', component: CharacterSelectComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
