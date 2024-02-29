import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  SERVER_URL:string="https://empportal-server-2.onrender.com"

  constructor(private http:HttpClient) { }

  getAdmin(){
    return this.http.get(`${this.SERVER_URL}/users/1`)
  }

  updateAdminAPI(adminDetails:any){
    return this.http.put(`${this.SERVER_URL}/users/1`,adminDetails)

  }

  isLoggedIn(){
   return !!sessionStorage.getItem("adminDetails")
  }
}
