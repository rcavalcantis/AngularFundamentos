import { UserService } from '../User/User.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn:'root' })
export class AuthGuard implements CanActivate{

    constructor(
            private userService: UserService,
            private router: Router){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            
            if( this.userService.isLogged() ){
                this.router.navigate(['user', this.userService.getuserName()]);
                return false;
            }
            return true;
        }
}