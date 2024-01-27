import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { HomeComponent } from './pages/home/home.component';
import { UserRegistComponent } from './pages/user-regist/user-regist.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user-regist', component: UserRegistComponent },
  { path: 'discussion', component: DiscussionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
