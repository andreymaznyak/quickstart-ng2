/**
 * Created by Andrey Maznyak on 18.01.2017.
 */

import { Component, Inject } from '@angular/core';
import { ProductsService } from './products.service';
import { StateService } from 'ui-router-ng2';
import { CommonProductComponentFields } from './product';
@Component({
  template:`
  <h1>
    Products table
  </h1>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th> sku </th>
        <th> name </th>
        <th> price </th>
        <th> createdAt </th>
        <th> Actions </th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let product of products" uiSrefActive="active">
        <td>{{ product.sku }}</td>
        <td>{{ product.name }}</td>
        <td>{{ '$'+product.price }}</td>
        <td>{{ product.createdAt.toLocaleString() }}</td>
        <td>
            <button class="btn" uiSref=".details" [uiParams]="{ Id: product.sku }">Show</button>
            <button class="btn btn-primary" uiSref=".details.edit" [uiParams]="{ Id: product.sku }">Edit</button>
            <button class="btn btn-danger" (click)=" remove( product.sku ) "> Delete </button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="btn btn-success" uiSref=".details.edit" [uiParams]="{ Id: 'new' }" > Create </button>
  `
})
export class ProductTableComponent extends CommonProductComponentFields{

  constructor( @Inject("productsList") public products, protected productService: ProductsService, protected state : StateService ){
    super( productService, state );

  }
}
