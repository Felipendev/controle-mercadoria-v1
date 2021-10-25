import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteResolverGuard } from './guards/cliente-resolver.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { MenuComponent } from './views/home/menu/menu.component';
import { SearchComponent } from './views/home/search/search.component';
import { ClienteEditComponent } from './views/home/cliente-edit/cliente-edit.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'produtos',
    component: HomeComponent,
    resolve: {
      cliente: ClienteResolverGuard
    }},
  {
    path: 'search',
    component: SearchComponent,
    resolve: {
      cliente: ClienteResolverGuard
    }},
  {
    path: 'menu',
    component: MenuComponent
  },
  { 
    path: 'produtos/editar/:id', 
    component: ClienteEditComponent,
    resolve: {
      cliente: ClienteResolverGuard
    }},
  {
      path: 'not-found',
      component: NotFoundComponent,
      data: {
        title: 'Not Found'
      }
  },
  { 
      path: '**', 
      redirectTo: 'not-found' 
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
