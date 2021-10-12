import { ClienteListComponent } from './../cliente-list/cliente-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from './home.component';
import { TabViewModule } from 'primeng/tabview';

import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { SearchComponent } from '../search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    ClienteFormComponent,
    ClienteListComponent,
    HomeComponent,
    SearchComponent  
  ],
  exports:[
      HomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabViewModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule
  ]
})
export class HomeModule { }
