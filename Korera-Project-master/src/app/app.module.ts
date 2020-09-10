import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SideNavBarComponent } from "./side-nav-bar/side-nav-bar.component";
import { ResourcePageComponent } from "./resource-page/resource-page.component";
import { ProjectPageComponent } from "./project-page/project-page.component";
import { FormulaPageComponent } from "./formula-page/formula-page.component";
import { TemplatePageComponent } from "./template-page/template-page.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ReactiveFormsModule } from "@angular/forms";
//import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavBarComponent,
    ResourcePageComponent,
    ProjectPageComponent,
    FormulaPageComponent,
    TemplatePageComponent,
    ErrorPageComponent
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxPaginationModule
     // MatSidenavModule
    // MatToolbarModule,
    // MatSidenavModule,
    // MatListModule,
    // MatButtonModule,
    // MatIconModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
