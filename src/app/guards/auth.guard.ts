import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {

  const authStatus = inject(AdminService) //dependency injection

  const toaster=inject(ToastrService)
  const route=inject(Router)

  if(authStatus.isLoggedIn()){
    return true;
  }else{
    toaster.warning("Operation denied....Please login!!")
    route.navigateByUrl("")
    return false;
  }
  
};
