import { ClienteFormComponent } from './views/home/cliente-form/cliente-form.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteResolverGuard } from './guards/cliente-resolver.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'homePage',
    component: HomeComponent
  },
  {
    path: 'add',
    component: ClienteFormComponent
  },
  { 
    path: 'novo', 
    component: HomeComponent,
  resolve: {
    cliente: ClienteResolverGuard
  }},
  { 
    path: 'editar/:id', 
    component: HomeComponent ,
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
