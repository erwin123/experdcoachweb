import { CommunicationService } from './../../shared/services/communication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  public activeTab: string;

  constructor(
    public router: Router,
    public communicationService: CommunicationService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log(this.router.url);
    if (this.router.url.includes('/profil')) {
      this.activeTab = 'profile';
    } else if (this.router.url.includes('/team')) {
      this.activeTab = 'team';
    } else if (this.router.url.includes('/task')) {
      this.activeTab = 'task';
    }

  }

  gotoPath(toLink) {
    this.activeTab = toLink;
    this.router.navigate([toLink], { relativeTo: this.route });
  }

}
