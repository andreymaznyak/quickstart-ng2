/**
 * Created by Andrey Maznyak on 21.01.2017.
 */

/* imported modules */
import { UIRouterModule } from "ui-router-ng2";
import { SharedModule } from "../shared.module";
import { NgModule } from "@angular/core";
import { FormsModule }   from '@angular/forms';

import { AUTH_STATES } from "./auth.states";

import { AuthService }   from "./auth.service";

import { LoginComponent } from "./login.component";

/** The Bar NgModule */
@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    UIRouterModule.forChild({ states: AUTH_STATES })
  ],
  declarations: [
    LoginComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
