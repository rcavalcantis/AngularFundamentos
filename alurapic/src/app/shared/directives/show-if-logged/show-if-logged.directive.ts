import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class showIfLoggedDirective implements OnInit{

    currentyDisplay: string;

    constructor(
        private element: ElementRef,
        private renderer: Renderer,
        private userService: UserService
    ){}

    ngOnInit(): void {
        this.currentyDisplay = getComputedStyle(this.element.nativeElement).display;
        this.userService.getUser().subscribe(user => {
            if(user){
                this.renderer.setElementStyle(this.element.nativeElement, 'display', this.currentyDisplay);
            } else {
                this.currentyDisplay = getComputedStyle(this.element.nativeElement).display;
                this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
            }
        })
    }


}