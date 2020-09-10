import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
    imports: [
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports: [

        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule
    ],
    providers: [
    ]
})
export class MaterialModule {}
