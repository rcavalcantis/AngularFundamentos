import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlataformDetectorService } from 'src/app/core/plataform-Detector/plataform-detector.service';
import { userNamePasswordValidator } from './userNamePassword.validator';

@Component({
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
            private formBuilder: FormBuilder,
            private userNotTakenValidatorService: UserNotTakenValidatorService,
            private signupService: SignUpService,
            private router: Router,
            private platformDetectorService: PlataformDetectorService
    ){}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['', 
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['', 
                [ 
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['', 
                [ 
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        }, {
            validator: userNamePasswordValidator
        });
        // tslint:disable-next-line: no-unused-expression
        this.platformDetectorService.isPlatformBrowser() &&
        this.emailInput.nativeElement.focus();
    }

    signup(){
        if(this.signupForm.valid && !this.signupForm.pending){
            const newUser = this.signupForm.getRawValue() as NewUser;
            this.signupService.signup(newUser)
                .subscribe(
                    () => this.router.navigate(['']),
                    err => console.log(err)
                );
        }
    }
 }