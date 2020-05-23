import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { ProfileComponent } from './profile';
import { EditComponent } from './edit';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent },
    { path: 'edit', component: EditComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);