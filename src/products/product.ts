/**
 * Created by Andrey Maznyak on 19.01.2017.
 */
import { ProductsService } from './products.service';
import { StateService } from 'ui-router-ng2';

export interface ProductFields {
  sku : string;
  name : string;
  price : number;
  createdAt ? : Date;
  _price ? : number;
}

export class Product implements ProductFields{
  sku : string;
  name : string;
  _price : number;
  createdAt : Date;
  public get price() : number {
    return this._price / 100;
  }
  public set price(val : number){
    this._price = Math.floor(val * 100);
  }
  private copy_attr(product : ProductFields ) : void {
    this.sku = product.sku;
    this.name = product.name;
    this.price = product.price;
    if(typeof product._price == 'number')
      this._price = product._price;
  }
  constructor( product : ProductFields ){

      this.copy_attr(product);
      this.createdAt = new Date();

  }
  save( product : ProductFields ) : void {
    this.copy_attr(product);
  }
}

export class CommonProductComponentFields{
  protected _productsService : ProductsService;
  protected _state : StateService;
  constructor( protected productService: ProductsService, protected state : StateService ){
    this._productsService = productService;
    this._state = state;
  }
  /* used this func on template */
  public remove( sku : string ) : void {
    this._productsService.remove( sku );
    this._state.go('app.products');
  }
}
