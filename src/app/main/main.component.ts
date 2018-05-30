import { Breadcrumb } from './../shared/classes/announcement';
import { EmployeeApi } from './../shared/sdk/services/custom/Employee';
import { Employee } from './../shared/sdk/models/Employee';
import { CommunicationService } from './../shared/services/communication.service';
import { CompanyApi } from './../shared/sdk/services/custom/Company';
import { Company } from './../shared/sdk/models/Company';
import { Subscription } from 'rxjs/subscription';
import { Menu } from './../shared/classes/menu';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoopBackAuth } from '../shared/sdk/index';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public breadcrumbs: Array<Breadcrumb> = [{
    label: 'Home',
    url: ['main']
  }];
  public menu: Array<Menu> = this.communicationService.menuSet();
  public activeButton: number;
  public sub: Subscription;
  public company: Company = new Company();
  public employee: Employee = new Employee();
  public title: String = '';

  constructor(
    public router: Router,
    public employeeApi: EmployeeApi,
    public communicationService: CommunicationService,
    public auth: LoopBackAuth
  ) { }

  ngOnInit() {
    this.menu = this.communicationService.menuSet();

    this.communicationService.mainListener$.subscribe(
      announcement => {
        console.log('announcement', announcement);
        this.breadcrumbs = [];
        for (const breadcrumb of announcement.breadcrumbs) {
          if (this.auth.getCurrentUserData().email !== 'dmastag@yahoo.com'
            && (breadcrumb.label === 'Company' || breadcrumb.label === 'Edit Company')) {
            console.log('should be main');
            this.breadcrumbs.push({
              label: breadcrumb.label,
              url: ['main']
            });
          } else {
            console.log('should be ' + breadcrumb.url);
            this.breadcrumbs.push({
              label: breadcrumb.label,
              url: breadcrumb.url
            });
          }
        }
        if (announcement.sidemenus) { this.menu = announcement.sidemenus; }
      });

    this.employee = this.employeeApi.getCachedCurrent();
    this.title = localStorage.getItem('title');
  }

  changeRoute(url, index = null) {
    if (index != null) {
      this.activeButton = index;
    } else {
      this.activeButton = null;
    }
    this.communicationService.announceMain({
      breadcrumbs: [{ label: 'Home', url: ['main'] }],
      sidemenus: this.communicationService.menuSet()
    });
    this.router.navigate(url);
  }

  logout() {
    this.employeeApi.logout();
    this.router.navigate(['./login']);
  }
}
