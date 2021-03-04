import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FulfillMajorComponent } from './fulfill-major/fulfill-major.component';
import { TechresourcesComponent } from './techresources/techresources.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'resources/course-selection', component: FulfillMajorComponent },
  { path: 'techresources', component: TechresourcesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
