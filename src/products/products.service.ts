/**
 * Created by Andrey Maznyak on 19.01.2017.
 */
import { Injectable } from "@angular/core";
import { Product, ProductFields } from "./product";
import * as _ from 'lodash';
import Dictionary = _.Dictionary;

@Injectable()
export class ProductsService {
  private _products : Product[];
  constructor() {
    console.log('ProductsService constructor');
    let productsJSON : string = localStorage.getItem('products');
    if(!!productsJSON){
      try {
        this._products = JSON.parse( productsJSON ).map( obj => new Product( obj ) );
      }catch( e ){
        console.error( e );
        this._products = [];
      }
    }else{
      this._products = [];
    }


  }
  getAll( params ) : Product[] {
    let field : string = 'createdAt';
    let direction : number = 0;
    if(!!params.sort){
      field = params.sort.substr(0,params.sort.length - 1);
      direction = (params.sort.substr(params.sort.length - 1) == 'A') ? 0 : 2;
    }
    return this._products.sort( (left,right) => ( left[field] > right[field] ? 1 - direction : -1 + direction) );//_.filter(, (prod) => prod.sku === '1');
  }
  getElementBySku( sku: string ) : Product {
    return _.find(this._products, { sku: sku });
  }
  add( product : Product ): void;
  add( product : ProductFields ): void {
    if ( product instanceof Product )
      this._products.push( product );
    else
      this._products.push( new Product(product) );
    this.saveOnLocalStorage();
  }
  remove( sku: string ): void {
    let element = this.getElementBySku( sku );
    if(!!element){
      this._products.splice(this._products.indexOf(element),1);
    }
    this.saveOnLocalStorage();
  }
  save( sku: string , product : Product ) : void {
    let element = this.getElementBySku( sku );
    if(!!element){
      element.save(product);
    }
    this.saveOnLocalStorage();
  }
  private saveOnLocalStorage() : void {
    localStorage.setItem('products', JSON.stringify(this._products));
  }
}
