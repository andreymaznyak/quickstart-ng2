/**
 * Created by Andrey Maznyak on 21.01.2017.
 */
import { Ng2StateDeclaration, Transition } from "ui-router-ng2";
import { AuthService } from "./auth.service";
import { LoginComponent } from "./login.component";

/**
 * This file defines the states for the `products` module.
 * The states are exported as an array and imported in the productsModule.
 */
export let AUTH_STATES: Ng2StateDeclaration[] = [
  {
    name: 'app.index',
    url: '',
    views: {
      $default: { component: LoginComponent },
    },
    resolve: [
      {
        token: 'loginAuth',
        deps: [AuthService, Transition],
        resolveFn: ( auth : AuthService, trans ) =>{
          let params = trans.params();
          console.log( params, auth );
          return true;
        }
      }
    ]
  },
];
