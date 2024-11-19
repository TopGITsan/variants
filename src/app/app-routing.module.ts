import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'variants',
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
