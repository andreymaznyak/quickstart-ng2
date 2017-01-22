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
        <th (click)="sort('sku')"> sku
          <span [ngClass]="{'glyphicon-sort-by-attributes': (sorting_config['sku'] === 'A'),
           'glyphicon-sort-by-attributes-alt': sorting_config['sku'] === 'D',
            'glyphicon':true}" aria-hidden="true"></span></th>
        <th (click)="sort('name')"> name
          <span [ngClass]="{'glyphicon-sort-by-attributes': sorting_config['name'] === 'A',
           'glyphicon-sort-by-attributes-alt': sorting_config['name'] === 'D',
            'glyphicon':true}" aria-hidden="true"></span></th>
        <th (click)="sort('price')"> price
          <span [ngClass]="{'glyphicon-sort-by-attributes': sorting_config['price'] === 'A',
           'glyphicon-sort-by-attributes-alt': sorting_config['price'] === 'D',
            'glyphicon':true}" aria-hidden="true"></span></th>
        <th (click)="sort('createdAt')"> createdAt
          <span [ngClass]="{'glyphicon-sort-by-attributes': sorting_config['createdAt'] === 'A',
           'glyphicon-sort-by-attributes-alt': sorting_config['createdAt'] === 'D',
           'glyphicon':true}" aria-hidden="true"></span></th>
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
  sorting_config = {};
  constructor( @Inject("productsList") public products, protected productService: ProductsService, protected state : StateService ){
    super( productService, state );
    let sorting_config_json = localStorage.getItem('sorting_config');
    if(!!sorting_config_json && sorting_config_json.length > 0){
      try{
        this.sorting_config = JSON.parse(sorting_config_json);
      }catch( e ){
        this.sorting_config = {};
      }
    }
  }
  sort( attr : string ){
    // ASC --> DESC --> NOPE --> ASC --> e.t.c
    let state_config = { sort:'' };
    if(!this.sorting_config[attr]){
      this.sorting_config = {};
      this.sorting_config[attr] = 'A';
      state_config = { sort:attr + this.sorting_config[attr] };
    }else if(this.sorting_config[attr] === 'A'){
      this.sorting_config[attr] = 'D';
      state_config = { sort:attr + this.sorting_config[attr] };
    }else{
      this.sorting_config = undefined;
    }
    localStorage.setItem('sorting_config', JSON.stringify(this.sorting_config));
    this._state.go('app.products', state_config);
  }
}
