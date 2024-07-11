import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';


const routes: Routes = [ { path: '', component: RegisterpageComponent },
  { path: 'home/:emailId', component: HomecomponentComponent }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
