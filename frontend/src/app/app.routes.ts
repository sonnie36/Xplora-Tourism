import { Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { UserComponent } from './component/user/user.component';
import { AdminComponent } from './component/admin/admin.component';
import { HomeComponent } from './component/home/home.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { ExploreTourComponent } from './component/explore-tour/explore-tour.component';


export const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'login',component: LoginComponent},
    {path:'user',component:UserComponent},
    {path:'admin',component:AdminComponent},
    {path : 'userDetails', component: UserDetailsComponent},
    {path: 'register',component: RegisterComponent},
    {path:'explore',component:ExploreTourComponent}
];
