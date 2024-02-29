import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string=""
  password:string=""

  constructor(private toaster:ToastrService,private api:AdminService,private router:Router){

  }

  login(){
    if(this.email && this.password){
      // this.toaster.success("Proceed to api call")
      this.api.getAdmin().subscribe({
        next:(res:any)=>{
          console.log(res);
          const {email,password}=res
          if(email==this.email && password==this.password){
            this.toaster.success("login successfull")
            sessionStorage.setItem("adminDetails",JSON.stringify(res))

            this.email=""
            this.password=""
            
            //navigate to dashboard
            this.router.navigateByUrl("/dashboard")


          }else{
            this.toaster.error("Invalid Email/Password")
          }
        },
        error:(reason:any)=>{
          this.toaster.error(reason.message)
        }
      })
    }else{
      this.toaster.info("Please fill the Form completely!!!")

    }
  }

}
