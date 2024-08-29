import { Routes } from '@angular/router';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SignUpDetailsComponent } from './components/sign-up-details/sign-up-details.component';
import { ChartsComponent } from './components/charts/charts.component';

export const routes: Routes = [
  { path: '', component: SignupFormComponent },
  // { path: '', component: SignUpDetailsComponent },
  { path: 'charts', component: ChartsComponent },
];
