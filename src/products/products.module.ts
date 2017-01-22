/**
 * Created by Andrey Maznyak on 19.01.2017.
 */

/* imported modules */
import { UIRouterModule } from "ui-router-ng2";
import { SharedModule } from "../shared.module";
import { NgModule } from "@angular/core";
import { FormsModule }   from "@angular/forms";

import { AuthModule } from "../auth/auth.module";

import { PRODUCTS_STATES } from "./products.states";

import { ProductTableComponent } from "./productTable.component";
import { ProductDetailComponent } from "./productDetail.component";
import { ProductEditComponent } from "./productEdit.component";
import { ProductsService }   from "./products.service";

/** The Bar NgModule */
@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    AuthModule,
    UIRouterModule.forChild({ states: PRODUCTS_STATES })
  ],
  declarations: [
    ProductTableComponent,
    ProductEditComponent,
    ProductDetailComponent,
  ],
  providers: [ProductsService]
})
export class ProductsModule { }
