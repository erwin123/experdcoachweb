import { EmployeeApi } from './shared/sdk/services/custom/Employee';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
        public employee: EmployeeApi
    ) { }

    canActivate() {
        console.log('AuthGuard#canActivate called', this.employee.isAuthenticated());

        if (this.employee.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}
