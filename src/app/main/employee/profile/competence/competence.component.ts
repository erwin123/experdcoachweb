import { EmployeeCompetenceTarget } from './../../../../shared/sdk/models/EmployeeCompetenceTarget';
import { CompetenceSet } from './../../../../shared/sdk/models/CompetenceSet';
import { CompetenceSetApi } from './../../../../shared/sdk/services/custom/CompetenceSet';
import { Competence } from './../../../../shared/sdk/models/Competence';
import { Company } from './../../../../shared/sdk/models/Company';
import { Subscription } from 'rxjs/subscription';
import { EmployeeCompetence } from './../../../../shared/sdk/models/EmployeeCompetence';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyApi } from './../../../../shared/sdk/services/custom/Company';
import { EmployeeApi } from './../../../../shared/sdk/services/custom/Employee';
import { EmployeeCompetenceApi } from './../../../../shared/sdk/services/custom/EmployeeCompetence';
import { CommunicationService } from './../../../../shared/services/communication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']
})
export class CompetenceComponent implements OnInit, OnDestroy {

  public employeecompetence: EmployeeCompetenceTarget[] = [];
  public subs: Subscription[] = [];
  public companyId: number;
  public employeeId: number;
  public companycompetences: Competence[] = [];
  public competences: EmployeeCompetence[] = [];

  constructor(
    public employeecompetenceApi: EmployeeCompetenceApi,
    public communicationService: CommunicationService,
    public competencesetApi: CompetenceSetApi,
    public companyApi: CompanyApi,
    public employeeApi: EmployeeApi,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subs.push(this.route.parent.parent.params.subscribe(params => {
      console.log(params);

      this.companyId = +params['companyId']; // (+) converts string 'id' to a number
      this.employeeId = +params['employeeId']; // (+) converts string 'id' to a number

      this.subs.push(
        this.companyApi
          .getCompetences(this.companyId)
          .subscribe(companycompetences => {
            console.log(companycompetences);
            this.companycompetences = companycompetences;
            this.getEmployeeCompetences();
          })
      );


      this.companyApi
        .getCompetences(this.companyId)
        .subscribe(competences => {
          for (const competence of competences) {
            competence['value'] = 0;
            competence['target'] = 0;
            this.competences.push(competence);
          }

          this.employeecompetenceApi
            .find({
              where: {
                employeeId: this.employeeId
              },
              include: 'competence'
            })
            .subscribe((employeecompetence: EmployeeCompetence[]) => {
              for (const competence of employeecompetence) {
                const myComp = this.competences.find(value => value.id === competence.competenceId);
                if (myComp) { myComp.value = competence.value; }
              }
            });

          this.employeeApi
            .getEmployeeCompetenceTarget(this.employeeId, {
              include: 'competence'
            })
            .subscribe(myTargets => {

              if (myTargets.length > 0) {
                for (const competence of myTargets) {
                  const myComp = this.competences.find(value => value.id === competence.competenceId);
                  if (myComp) { myComp['target'] = competence.target; }
                }
              } else {
                this.employeeApi
                  .getCompetenceSet(this.employeeId)
                  .subscribe(myCompetenceSet => {
                    console.log(myCompetenceSet);
                    if (Object.keys(myCompetenceSet).length === 0 && myCompetenceSet.constructor === Object) {
                      // Nothing Happens
                    } else {
                      // this.competenceSet = this.competenceSets.find(value => myCompetenceSet.id == value.id)
                      this.competencesetApi
                        .findById(myCompetenceSet.id, {
                          include: {
                            relation: 'competenceLevels',
                            scope: {
                              order: 'level ASC',
                              include: 'competence'
                            }
                          }
                        })
                        .subscribe((competenceSet: CompetenceSet) => {
                          for (const competence of competenceSet.competenceLevels) {
                            const myComp = this.competences.find(value => value.id === competence.competenceId);
                            if (myComp) { myComp['target'] = competence.level; }
                          }
                        });
                    }
                  });
              }

            });

        });

    }));
  }

  getEmployeeCompetences() {
    this.employeeApi
      .getEmployeeCompetenceTarget(this.employeeId)
      .subscribe((employeecompetence: EmployeeCompetenceTarget[]) => {
        this.employeecompetence = employeecompetence;
        // this.communicationService.announceMain({
        //   //breadcrumbs: ['Home', 'Company', this.company.name, employee.name],
        //   sidemenus: this.communicationService.menuSet('employee', this.company.name, this.company.id)
        // })
        console.log(employeecompetence);
      });
  }

  getCompleted(competence: Competence) {
    const value = this.employeecompetence.find(empComp => empComp.competenceId === competence.id);
    return value ? value.target : 0;
  }

  ngOnDestroy() {
    for (const subscription of this.subs) {
      subscription.unsubscribe();
    }
  }

}
