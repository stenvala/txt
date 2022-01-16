import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {path: '', redirectTo: '/page/201', pathMatch: 'full'},  
  {path: 'page/:page', component: PageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
