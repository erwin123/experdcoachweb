import { EmployeeCompetence } from './../../../../shared/sdk/models/EmployeeCompetence';
import { CompetenceLevel } from './../../../../shared/sdk/models/CompetenceLevel';
import { EmployeeCompetenceApi } from './../../../../shared/sdk/services/custom/EmployeeCompetence';
import { CompetenceApi } from './../../../../shared/sdk/services/custom/Competence';
import { EmployeeApi } from './../../../../shared/sdk/services/custom/Employee';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';
import { Competence } from './../../../../shared/sdk/models/Competence';
import { CommunicationService } from './../../../../shared/services/communication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-competence-detail',
  templateUrl: './competence-detail.component.html',
  styleUrls: ['./competence-detail.component.scss']
})
export class CompetenceDetailComponent implements OnInit, OnDestroy {

  public subs: Subscription[] = [];
  public companyId: number;
  public employeeId: number;
  public competenceId: number;
  public competence: Competence = new Competence();
  public competencelevel: CompetenceLevel = new CompetenceLevel();
  public competencelevelId: number;
  public empcompetencecurrent = 0;


  constructor(
    public employeeApi: EmployeeApi,
    public communicationService: CommunicationService,
    public route: ActivatedRoute,
    public competenceApi: CompetenceApi,
    public employeecompetenceApi: EmployeeCompetenceApi
  ) { }

  ngOnInit() {

    this.subs.push(this.route.parent.parent.params
      .subscribe(params => {
        console.log(params);

        this.companyId = +params['companyId']; // (+) converts string 'id' to a number
        this.employeeId = +params['employeeId']; // (+) converts string 'id' to a number

        this.subs.push(this.route.params.subscribe(innerParams => {
          console.log(innerParams);
          this.competenceId = +innerParams['competenceId']; // (+) converts string 'id' to a number
          this.getCompetence();
        }));

      }));

  }

  getCompetence() {
    this.subs.push(
      this.competenceApi
        .findById(this.competenceId, {
          include: {
            relation: 'competenceLevels',
            scope: {
              order: 'level ASC'
            }
          }
        })
        .subscribe((result: Competence) => {
          console.log(result);
          this.competence = result;
          this.competencelevel = this.competence.competenceLevels[0];
          this.competencelevelId = 0;
          this.getEmployeeCompetence();
        })
    );
  }

  getEmployeeCompetence() {
    this.subs.push(
      this.employeecompetenceApi
        .find({
          where: {
            and: [{
              employeeId: this.employeeId
            }, {
              competenceId: this.competenceId
            }]

          }
        })
        .subscribe((result: EmployeeCompetence[]) => {
          console.log(result);
          if (result.length) {
            this.competencelevel = this.competence.competenceLevels.find(compLevel => compLevel.level === result[0].value);
            this.empcompetencecurrent = this.competence.competenceLevels.findIndex(compLevel => compLevel.level === result[0].value);
            this.competencelevelId = this.empcompetencecurrent;
          } else {
            this.subs.push(
              this.employeeApi
                .linkCompetences(this.employeeId, this.competenceId, { value: this.competencelevel.level }).subscribe()
            );
          }
        })
    );
  }

  prevCompetence() {
    this.competencelevelId -= 1;
    this.competencelevel = this.competence.competenceLevels[this.competencelevelId];
  }

  nextCompetence() {
    this.competencelevelId += 1;
    this.competencelevel = this.competence.competenceLevels[this.competencelevelId];
  }

  updateCompetence() {

    this.subs.push(
      this.employeeApi.unlinkCompetences(this.employeeId, this.competenceId).subscribe(result => {
        console.log(result);

        this.subs.push(
          this.employeeApi
            .linkCompetences(this.employeeId, this.competenceId, {
              value: this.competencelevel.level,
              oldValue: this.empcompetencecurrent
            })
            .subscribe(response => {
              console.log(response);
              this.getEmployeeCompetence();
            })
        );

      })
    );

  }

  ngOnDestroy() {
    for (const subscription of this.subs) {
      subscription.unsubscribe();
    }
  }

}
