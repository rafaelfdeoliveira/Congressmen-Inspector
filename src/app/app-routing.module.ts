import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchAreaComponent } from './search-area/search-area.component';

const routes: Routes = [
  {path: "", component: SearchAreaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
