import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { WarframesComponent } from './pages/warframes/warframes.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'warframes', component: WarframesComponent },
];
