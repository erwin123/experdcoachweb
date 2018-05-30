import { EmployeeTask } from './../../../shared/sdk/models/EmployeeTask';
import { EmployeeTaskApi } from './../../../shared/sdk/services/custom/EmployeeTask';
import { Subscription } from 'rxjs/subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { CommunicationService } from './../../../shared/services/communication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  public subs: Subscription[] = [];
  public showBack = false;
  public tasks: EmployeeTask[] = [];

  constructor(
    public communicationService: CommunicationService,
    public router: Router,
    public route: ActivatedRoute,
    public employeetaskApi: EmployeeTaskApi
  ) { }

  ngOnInit() {
    if (!this.router.url.includes('/team/')) {
      this.showBack = false;
      this.subs.push(this.route.parent.params.subscribe(params => {
        console.log(params);
        if (params['employeeId']) {
          console.log('ketemu', params['employeeId']);

          this.subs.push(
            this.employeetaskApi
              .find({
                where: {
                  and: [{
                    employeeId: +params['employeeId']
                  }]
                },
                include: ['employeeTaskDevelopments', 'assignedBy', 'competence', 'employeeTaskSupervisor']
              })
              .subscribe((tasks: EmployeeTask[]) => {
                this.tasks = tasks;
              })
          );
        }
      }));
    } else {
      this.showBack = true;
      this.subs.push(this.route.params.subscribe(params => {
        console.log(params);
        if (params['teamId']) {
          console.log('ketemu', params['teamId']);

          this.subs.push(
            this.employeetaskApi
              .find({
                where: {
                  and: [{
                    employeeId: +params['teamId']
                  }]
                },
                include: ['employeeTaskDevelopments', 'assignedBy', 'competence', 'employeeTaskSupervisor']
              })
              .subscribe((tasks: EmployeeTask[]) => {
                this.tasks = tasks;
              })
          );
        }
      }));
    }



  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
