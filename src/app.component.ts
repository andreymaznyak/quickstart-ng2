import { Component } from '@angular/core';
import { StateService } from "ui-router-ng2";
import { AuthService } from "./auth/auth.service";

let template = `

<div class="container">
  <a class="btn-right" (click)="logout()" [hidden]="!_authService.authorized"> Logout </a>
  <ui-view></ui-view>
</div>


<ui-view name="footer"></ui-view>
`;

@Component({
  selector: 'my-app',
  template: template
})
export class AppComponent {
  private _authService : AuthService;
  private _state : StateService;
  constructor( private authService : AuthService, private stateService : StateService ){
    this._authService = authService;
    this._state = stateService;
  }
  logout() : void {
    this._authService.logout();
    this._state.go('app.index');
  }
}
