import { EmployeeCompetenceTargetApi } from './../../../shared/sdk/services/custom/EmployeeCompetenceTarget';
import { EmployeeCompetenceTarget } from './../../../shared/sdk/models/EmployeeCompetenceTarget';
import { EmployeeApi } from './../../../shared/sdk/services/custom/Employee';
import { CompetenceLevel } from './../../../shared/sdk/models/CompetenceLevel';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { CompetenceSetApi } from './../../../shared/sdk/services/custom/CompetenceSet';
import { CommunicationService } from './../../../shared/services/communication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetenceSet } from './../../../shared/sdk/models/CompetenceSet';
import { Competence } from './../../../shared/sdk/models/Competence';
import { Company } from './../../../shared/sdk/models/Company';
import { Subscription } from 'rxjs/subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import swal from 'sweetalert2';
import { CompetenceApi } from 'app/shared/sdk';

@Component({
  selector: 'app-profile-edit-competence',
  templateUrl: './profile-edit-competence.component.html',
  styleUrls: ['./profile-edit-competence.component.scss']
})
export class ProfileEditCompetenceComponent implements OnInit, OnDestroy {

  public error = '';
  public sub: Subscription;
  public formTitle = 'Competence Set';
  public company: Company = new Company();
  public competences: Competence[];
  public competenceSets: CompetenceSet[] = [];
  public competenceSet: CompetenceSet = new CompetenceSet;
  public competenceTargets: any[] = [];
  public isNew = true;
  public employeeId: number;

  constructor(
    public route: ActivatedRoute,
    public communicationService: CommunicationService,
    public competencesetApi: CompetenceSetApi,
    public employeecompetencetargetApi: EmployeeCompetenceTargetApi,
    public companyApi: CompanyApi,
    public employeeApi: EmployeeApi,
    public router: Router,
  ) {
    // this.competenceSet.competenceLevels = []
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      console.log('ketemu', params['companyId'], params['setId']);



      this.employeeId = +params['employeeId'];
      this.companyApi
        .getCompetences(+params['companyId'], {
          include: {
            relation: 'competenceLevels',
            scope: {
              order: 'level ASC'
            }
          }
        })
        .subscribe((companyCompetence: Competence[]) => {
          this.competences = companyCompetence;
        });

      this.competencesetApi
        .find({
          where: {
            companyId: +params['companyId']
          },
          include: {
            relation: 'competenceLevels',
            scope: {
              order: 'level ASC',
              include: {
                relation: 'competence',
                scope: {
                  include: {
                    relation: 'competenceLevels',
                    scope: {
                      order: 'level ASC'
                    }
                  }
                }
              }
            }
          }
        })
        .subscribe((competencesets: CompetenceSet[]) => {
          this.competenceSets = competencesets;
          this.employeeApi
            .getCompetenceSet(+params['employeeId'])
            .subscribe(myCompetenceSet => {
              console.log(myCompetenceSet);
              if (Object.keys(myCompetenceSet).length === 0 && myCompetenceSet.constructor === Object) {
                this.competenceSet = this.competenceSets[0];
              } else {
                this.competenceSet = this.competenceSets.find(value => myCompetenceSet.id === value.id);
              }
              this.employeeApi
                .getEmployeeCompetenceTarget(+params['employeeId'], {
                  include: {
                    relation: 'competence',
                    scope: {
                      include: {
                        relation: 'competenceLevels',
                        scope: {
                          order: 'level ASC'
                        }
                      }
                    }
                  }
                })
                .subscribe(myCompetenceTargets => {
                  console.log(myCompetenceTargets);
                  if (myCompetenceTargets.length === 0) {
                    // this.competenceTargets = this.competenceSets[0].competenceLevels
                    for (const complevel of this.competenceSets[0].competenceLevels) {
                      if (complevel.competence) {
                        this.competenceTargets.push({
                          target: complevel.level,
                          competenceId: complevel.competenceId,
                          employeeId: +params['employeeId'],
                          competence: complevel.competence
                        });
                      }
                    }
                  } else {
                    this.competenceTargets = myCompetenceTargets;
                  }
                }, error => {
                  console.log(error);
                  this.competenceSet = this.competenceSets[0];
                }, () => console.log(this.competenceSet));
            }, error => {
              console.log(error);
              this.competenceSet = this.competenceSets[0];
            }, () => console.log(this.competenceSet));

        });

    });
  }

  updateLevel(competence: EmployeeCompetenceTarget, newCompetencelevel: Number) {
    competence.target = newCompetencelevel;
    console.log(this.competenceTargets);
  }

  updateSet(competenceSet) {
    this.competenceSet = competenceSet;

    this.competenceTargets = [];

    for (const complevel of competenceSet.competenceLevels) {
      if (complevel.competence) {
        this.competenceTargets.push({
          target: complevel.level,
          competenceId: complevel.competenceId,
          employeeId: this.employeeId,
          competence: complevel.competence
        });
      }
    }

    console.log(competenceSet);
    console.log(this.competenceTargets);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit() {
    console.log(this.competenceSet);
    this.employeeApi.updateAttributes(this.employeeId, {
      competenceSetId: this.competenceSet.id
    })
      .subscribe(
      response => {
        this.employeeApi
          .deleteEmployeeCompetenceTarget(this.employeeId)
          .subscribe(success => {
            this.employeeApi
              .createManyEmployeeCompetenceTarget(this.employeeId, this.competenceTargets)
              .subscribe(response2 => {
                this.router.navigate(['../edit'], { relativeTo: this.route });
                console.log('success');
              });
          });
      });
  }

  addCompetence() {
    const that = this;
    const newcomps = {};
    const unusedComps = this.competences.filter(
      competence => !this.competenceTargets.find(target => competence.id === target.competenceId)
    );

    for (const item of unusedComps) {
      newcomps[JSON.parse(JSON.stringify(item.name))] = JSON.parse(JSON.stringify(item.name));
    }
    console.log(this.competences);
    swal({
      title: 'Select New Competence',
      input: 'select',
      inputOptions: newcomps,
      inputPlaceholder: 'Select competence',
      showCancelButton: true,
    })
      .then(function (result) {
        const myComp = that.competences.find(competence => competence.name === result);
        console.log(that.competences);
        console.log(myComp);
        const newTarget = {
          target: 0,
          competenceId: myComp.id,
          employeeId: that.employeeId,
          competence: myComp
        };
        that.competenceTargets.push(newTarget);
        console.log(that.competenceTargets);
      });
  }

  deleteCompetence(competence) {
    this.competenceTargets = this.competenceTargets.filter(target => target.competenceId !== competence.competenceId);
  }

  toCompetence() {
    this.router.navigate(['addCompetence'], { relativeTo: this.route });
  }

  toCompetenceSet() {
    this.router.navigate(['competenceSet', this.competenceSet.id], { relativeTo: this.route });
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }

  errorCB(error) {
    console.log(error);
    this.error = error.message;
  }
}
