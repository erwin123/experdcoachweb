import { Company } from './../shared/sdk/models/Company';
import { CompanyApi } from './../shared/sdk/services/custom/Company';
import { EmployeeApi } from './../shared/sdk/services/custom/Employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleHierarchyApi } from '../shared/sdk/services/custom/RoleHierarchy';
import { RoleHierarchy } from '../shared/sdk/models/RoleHierarchy';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = { email: '', password: '' };
  error = '';
  roleHierarchy: RoleHierarchy[];

  constructor(
    public router: Router,
    public employeeApi: EmployeeApi,
    public companyApi: CompanyApi,
    public roleHierarchyApi: RoleHierarchyApi
  ) { }

  ngOnInit() {
    console.log(this.employeeApi.isAuthenticated());
  }

  login() {
    this.employeeApi
      .login(this.model).subscribe(
        result => {
          this.roleHierarchyApi
            .find({
                where: { roleId: result.user.roleId }
              
            })
            .subscribe((roleHierarchy: RoleHierarchy[]) => {
              this.roleHierarchy = roleHierarchy;
              localStorage.setItem('hierarchy', JSON.stringify(this.roleHierarchy));
            });


          if (result.user.email === 'dmastag@yahoo.com') {
            localStorage.setItem('title', 'dmastag');
            localStorage.setItem('isAdmin', 'true');
            
            this.router.navigate(['/main']);
          } else {
            this.companyApi.findById(result.user.companyId)
              .subscribe((company: Company) => {
                // if (company.adminId === result.userId) {
                //   localStorage.setItem('isAdmin', 'true');
                //   localStorage.setItem('title', company.name);

                //   this.router.navigate(['/main']);
                // } else {
                //   localStorage.setItem('isAdmin', 'false');
                //   localStorage.setItem('title', result.user.name);
                //   this.error = 'You are not Admin!';
                // }
                localStorage.setItem('isAdmin', 'true');
                  localStorage.setItem('title', company.name);
                  localStorage.setItem('myRole',result.user.roleId );
                  this.router.navigate(['/main']);
              });
          }
        },
        error => {
          console.log(error);
          this.error = error.message;
        }
      );
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

}
