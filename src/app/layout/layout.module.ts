import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

const components = [
  NavbarComponent,
  FooterComponent,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule
  ],
  exports: [components],
})
export class LayoutModule { }
