import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();
  constructor(private http:HttpClient) { }

  //current user: who is logged in
  public getCurrentUser()
    {
      return this.http.get(`${baseUrl}/current-user`);
    }
  

  //generate token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user:set token in LocalStorage
  public loginUser(token: string)
  {
    localStorage.setItem('token',token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  //isLogin:user is logged in or not
  public isLoggedIn()
  {
    let tokenStr=localStorage.getItem("token")
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null)
      return false;
    return true;
  }

  //logout:remove token from local storage
  public logOut()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get Token
  public getToken()
  {
    return localStorage.getItem('token');
  }

  //set user detail
  public setUser(user: any)
  {
    localStorage.setItem("user",JSON.stringify(user));
  }

  //get user
  public getUser()
  {
    let userStr=localStorage.getItem('user');
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    else{
      this.logOut();
      return null;
    }
  }

  //get user role
  public getUserRole()
  {
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
