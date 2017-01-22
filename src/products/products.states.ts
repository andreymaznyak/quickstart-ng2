import { ProductTableComponent } from "./productTable.component";
import { ProductDetailComponent } from "./productDetail.component";
import { ProductEditComponent } from "./productEdit.component";
import { Ng2StateDeclaration, Transition, StateService } from "ui-router-ng2";
import { ProductsService } from "./products.service";
import { Product } from "./product";
import { AuthService } from "../auth/auth.service";
/**
 * This file defines the states for the `products` module.
 * The states are exported as an array and imported in the productsModule.
 */
export let PRODUCTS_STATES: Ng2StateDeclaration[] = [
  // A state for the 'app.products' submodule.
  // - Fills in the unnamed <ui-view> ($default) from `app` state with `BarListComponent`
  // - Fills in the footer <ui-view name="footer"> from `app` state with `BarFooterComponent`
  // - Fetches barList data using a resolve, then the component displays the data
  {
    name: 'app.products',
    url: '/products?sort&filter',
    views: {
      $default: { component: ProductTableComponent },
    },
    resolve: [
      {
        token: 'productsList',
        deps: [ProductsService, Transition],
        resolveFn: (products: ProductsService, trans) =>{
          let params = trans.params();
          console.log(params);
          return products.getAll(params);
        }
      },
      {
        token: 'authenticated',
        deps: [StateService, AuthService],
        resolveFn: ($state, auth) =>{
          console.log(auth);
          if(auth.authorized){
            return auth;
          }else{
            console.log('auth false');
            $state.go('app.index');
            return Promise.reject('auth false');
          }
        }
      }
    ]
  },

  // A child state of app.bar
  // - This state fills the unnnamed <ui-view> (in `BarListComponent` from  `app.foo` state) with `BarDetailsComponent`
  // - Has a parameter :barId which appears in the URL
  // - Resolves barDetail, then the component displays the data
  {
    name: 'app.products.details', url: '/:Id',
    views: {
      '$default@app': { component: ProductDetailComponent },
    },
    resolve: [
      // Inject the barList (from the parent) and find the correct
      {
        token: 'product',
        deps: ['productsList', Transition],
        resolveFn: (productsList, trans) =>
          new Product(productsList.find(item => item.sku == trans.params().Id) || {sku:'new', name:'', price:0})
      }
    ]
  },
  {
    name: 'app.products.details.edit',
    url: '/edit',
    views: {
      '$default@app': { component: ProductEditComponent },
    },
  },
];
