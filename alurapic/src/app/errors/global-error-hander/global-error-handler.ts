import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { environment } from '../../../environments/environment';

import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log.service';
import { Router } from '@angular/router';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector){};
    handleError(error: any): void {
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const serverLog = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);
        const url = (location instanceof PathLocationStrategy
            ? location.path
            : '') as string;
        const message = error.message 
            ? error.message 
            : error.toString();
        
        if(environment.production) router.navigate(['error']);
        
        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');
                console.log(message);
                console.log(stackAsString);
                console.log('Enviado para O servidor');
                serverLog.log({
                    message,
                    url,
                    userName: userService.getUserName(),
                    stack: stackAsString})
                .subscribe(
                    () => {
                        console.log('Error logged on server');},
                    err => {
                        console.log(err);
                        console.log('Fail to sendo error to server');
                });
            })
    }
}