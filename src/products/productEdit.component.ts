/**
 * Created by Andrey Maznyak on 20.01.2017.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { StateService } from 'ui-router-ng2';
import {CommonProductComponentFields, Product} from './product';
@Component({
  selector:'product-edit',
  template:`
  <div class="container">
    <h1>{{ _is_new_element ? 'Create' : 'Edit'}} product</h1>
    <form (ngSubmit)="onSubmit()" #productForm="ngForm">
      <div class="form-group">
        <label for="name">Sku</label>
        <input type="text" class="form-control" required id="sku" name="sku" [(ngModel)]="product.sku" #sku="ngModel" (ngModelChange)="onChangeSku($event)">
        <div [hidden]="sku.valid || sku.pristine"
             class="alert alert-danger">
          Sku is required
        </div>
        <div [hidden]="_sku_valid"
             class="alert alert-danger">
          Sku must be unique
        </div>
      </div>
      <div class="form-group">
        <label for="alterEgo">Name</label>
        <input type="text" class="form-control" required id="name" name="name" [(ngModel)]="product.name" #name="ngModel">
        <div [hidden]="name.valid || name.pristine"
             class="alert alert-danger">
          Name is required
        </div>
        
      </div>
      <div class="form-group">
        <label for="alterEgo">Price</label>
        <input type="number" min="0.01" step="0.01" class="form-control" required id="price" name="price" [(ngModel)]="product.price" #price="ngModel">
        <div [hidden]="price.valid || price.pristine"
             class="alert alert-danger">
          Price is required
        </div>
      </div>
      
      <button class="btn btn-success" type="submit" class="btn btn-success" [disabled]="!productForm.form.valid || !_sku_valid" > Save </button>
      <button type="button" class="btn btn-danger" *ngIf="!_is_new_element" (click)="remove(product.sku)"> Delete </button>
      <button type="button" class="btn" uiSref="app.products"> Back to list </button>
    </form>
  </div>
  `
})
export class ProductEditComponent extends CommonProductComponentFields implements OnInit {
  @Input('product') product;
  private _is_new_element : boolean = false;
  private _id : string;
  private _sku_valid : boolean = true;
  onSubmit(){
    if(this._is_new_element){
      this._productsService.add( this.product );
    }else{
      this._productsService.save( this._id, this.product );
    }

    this._state.go('app.products');
  }
  constructor( protected productService: ProductsService, protected state : StateService ){
    super( productService, state );

  }
  ngOnInit() {
    this._id = this.product.sku;
    if( this.product.sku === 'new' ){
      this.product.sku = ''; this._is_new_element = true;
    }
  }
  onChangeSku() : void {
    this._sku_valid = this.isValidSku(this.product.sku);
  }
  isValidSku( sku : string ) : boolean{
    let element : Product | undefined = this._productsService.getElementBySku( sku );
    let result : boolean = false;

    if(!element || element.sku === this._id){
      result = true;
    }

    return result;
  }
}
