/**
 * Created by Andrey Maznyak on 20.01.2017.
 */

import { Component, Input } from '@angular/core';
import { ProductsService } from './products.service';
import { StateService } from 'ui-router-ng2';
import { CommonProductComponentFields } from "./product";

@Component({
  selector:'product-detail',
  template:`
  <h5>
    products detail component
  </h5>
  <label>sku: {{product.sku}}</label><br>
  <label>Name: {{product.name}}</label><br>
  <label>Price: {{product.price}}$</label><br>
  <label>CreateAt: {{product.createdAt}}</label><br>
  <a class="btn btn-primary" uiSref=".edit"> Edit </a>
  <button class="btn btn-danger" (click)="remove(product.sku)"> Delete </button>
  <button type="button" class="btn" uiSref="app.products"> Back to list </button>
  `
})
export class ProductDetailComponent extends CommonProductComponentFields{
  @Input('product') product;

  constructor( protected productService: ProductsService, protected state : StateService ){
    super( productService, state );
  }

}
