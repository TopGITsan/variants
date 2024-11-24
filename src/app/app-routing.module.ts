import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateVariantsGuard } from './guards/can-activate-variants.guard';

const routes: Routes = [
  {
    path: 'variants',
    canActivate: [canActivateVariantsGuard],
    loadComponent: () =>
      import('./features/variants/variants.component').then(
        (m) => m.VariantsComponent
      ),
  },
  { path: '', redirectTo: '/variants', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
