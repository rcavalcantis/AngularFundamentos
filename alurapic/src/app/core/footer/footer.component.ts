import { Component, OnInit } from '@angular/core';
import { UserService } from '../User/User.service';
import { Observable } from 'rxjs';
import { User } from '../User/user';

@Component({
    selector: 'ap-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit{
    user$: Observable<User>;
    constructor(private userService: UserService){

    }

    ngOnInit(): void {
        this.user$ = this.userService.getUser();
    }

}