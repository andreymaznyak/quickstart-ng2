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
  <h3>
    Product detail
  </h3>
  <label>sku: </label>      <p>{{ product.sku }}</p><br>
  <label>Name: </label>     <p>{{ product.name }}</p> <br>
  <label>Price: </label>    <p>{{ product.price }}$</p> <br>
  <label>CreateAt: </label> <p>{{ product.createdAt.toLocaleString() }}</p> <br>
  <button class="btn btn-primary" uiSref=".edit"> Edit </button>
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
