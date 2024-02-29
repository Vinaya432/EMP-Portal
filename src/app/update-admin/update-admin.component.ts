import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit{

  @Output() onAdminChange = new EventEmitter()
  editAdminStatus:boolean=false
  adminDetails:any={}

  profilePicture:string="https://img.freepik.com/premium-vector/education-design_24877-28980.jpg"

  constructor(private adminAPI:AdminService,private toaster:ToastrService){}

  ngOnInit(): void {
    this.adminAPI.getAdmin().subscribe((res:any)=>{
      this.adminDetails=res
      if(res.profilePic){
        this.profilePicture=res.profilePic
      }
    })
  }

  editAdminBtn(){
    this.editAdminStatus=true
  }

  onCancel(){
    this.editAdminStatus=false
  }

  getFile(event:any){
    let file=event.target.files[0]

    //creating img url
    let fr= new FileReader()
    fr.readAsDataURL(file)
    fr.onload= (event:any)=>{
      console.log(event);
      console.log(event.target.result);
      this.profilePicture=event.target.result
      this.adminDetails.profilePic=event.target.result
      
    }
  }

  updateAdmin(){
    this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.editAdminStatus=false
        this.toaster.success("Admin details updated Sucessfully!!!")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.onAdminChange.emit(res.name)
      },
      error:(reason:any)=>{
        this.toaster.warning('updation failed!!!')
      }
    })
  }
}
