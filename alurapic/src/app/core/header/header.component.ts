import { Component } from '@angular/core';
import { UserService } from '../User/User.service';
import { Observable } from 'rxjs';
import { User } from '../User/user';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    user$: Observable<User>;
    //user: User;
    constructor(private userService: UserService){
        this.user$ = userService.getUser();
        //this.user$.subscribe(user => this.user = user);
    }
}