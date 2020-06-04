import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class showIfLoggedDirective implements OnInit{

    constructor(
        private element: ElementRef,
        private renderer: Renderer,
        private userService: UserService
    ){}

    ngOnInit(): void {
        !this.userService.isLogged() 
            && this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    }


}