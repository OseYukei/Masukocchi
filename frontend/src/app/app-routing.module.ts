import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserRegistComponent } from './pages/user-regist/user-regist.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserRegistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
