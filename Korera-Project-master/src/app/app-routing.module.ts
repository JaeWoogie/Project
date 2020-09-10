import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { ResourcePageComponent } from "./resource-page/resource-page.component";
import { FormulaPageComponent } from "./formula-page/formula-page.component";
import { ProjectPageComponent } from "./project-page/project-page.component";
import { TemplatePageComponent } from "./template-page/template-page.component";
import { ErrorPageComponent } from "./error-page/error-page.component";

// import { LoginComponent } from './header/header.component';
// replace with next page after login import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  // { path: "", component: HeaderComponent },
  { path: "resource", component: ResourcePageComponent , canActivate:[AuthGuard] },
  { path: "formula", component: FormulaPageComponent, canActivate:[AuthGuard]  },
  { path: "project", component: ProjectPageComponent, canActivate:[AuthGuard] },
  { path: "template", component: TemplatePageComponent, canActivate:[AuthGuard]  },
  { path: "login", component: HeaderComponent },
  // { path: "**", component: ErrorPageComponent }



  //replace with next { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
