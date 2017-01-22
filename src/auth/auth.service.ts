/**
 * Created by Andrey Maznyak on 21.01.2017.
 */
import { Injectable } from "@angular/core";
@Injectable()
export class AuthService {
  private _authorized : boolean = false;
  get authorized () : boolean {
    let result : boolean = this._authorized;
    if(!result){
      this._authorized = result = (localStorage.getItem('session') === 'ok');
    }
    return result;
  }
  logout() : void{
    localStorage.removeItem('session');
    this._authorized = false;
  }
  constructor() {}
  auth( login : string, password : string, remember : boolean = false ) : Promise<any> {
        return new Promise<any>((resolve, reject)=>{

      if(login === 'test' && password === '123'){
        this._authorized = true;
        if( remember ){
          localStorage.setItem('session', 'ok');
        }
        resolve( { authorized:this._authorized } );
      }else{
        this._authorized = false;
        reject( { authorized:false, error:'Incorrect login or password' } );
      }
    });
  }
}
