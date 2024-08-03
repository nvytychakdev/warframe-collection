import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { CollectionComponent } from './pages/collection/collection.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'collection', component: CollectionComponent },
];
