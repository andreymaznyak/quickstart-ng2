/**
 * Created by Andrey Maznyak on 21.01.2017.
 */

import { Component } from "@angular/core";

import { AuthService } from "./auth.service";

import { StateService } from "ui-router-ng2";

@Component({
  template : `
  <div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
    <div class="panel panel-info" >
      <div class="panel-heading"><div class="panel-title">Sign In</div></div>  
        <div style="padding-top:30px" class="panel-body" >
          <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>    
          <form (ngSubmit)="onSubmit()" #authForm="ngForm" class="form-horizontal" role="form">       
            <div style="margin-bottom: 25px" class="input-group">
              <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
              <input id="login-username" type="text" class="form-control" name="login" [(ngModel)]="login" placeholder="login">                                        
            </div>
                
            <div style="margin-bottom: 25px" class="input-group">
              <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
              <input id="login-password" type="password" class="form-control" name="password" [(ngModel)]="password" placeholder="password">
            </div>
                     
            <div class="input-group">
              <div class="checkbox">
                <label>
                  <input id="login-remember" type="checkbox" name="remember" value="1" [(ngModel)]="remember" > Save session
                </label>
              </div>
            </div>

            <div style="margin-top:10px" class="form-group">
              <!-- Button -->

              <div class="col-sm-12 controls">
                <button type="submit" class="btn btn-lg btn-primary btn-block" [disabled]="!authForm.form.valid">Login  </button>
              </div>
            </div> 
            </form>     
          </div>                     
        </div>  
  </div>
  `
})
export class LoginComponent {
  login : string;
  password : string;
  remember : boolean = true;
  private _authService : AuthService;
  private _state : StateService;
  constructor( private authService : AuthService, private stateService : StateService ){
    this._authService = authService;
    this._state = stateService;
    if(authService.authorized){
      stateService.go('app.products');
    }
  }
  onSubmit(){
    console.log(this.login, this.password);
    this._authService.auth( this.login, this.password, this.remember ).then(
      ()=>{ this._state.go('app.products') },
      ( auth_resolve )=>{ console.log(auth_resolve.error); }
    );
  }
}
