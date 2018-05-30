import { CommunicationService } from './../../../shared/services/communication.service';
import { CompetenceLevel } from './../../../shared/sdk/models/CompetenceLevel';
import { CompetenceApi } from './../../../shared/sdk/services/custom/Competence';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { Competence } from './../../../shared/sdk/models/Competence';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-competence-add',
  templateUrl: './competence-add.component.html',
  styleUrls: ['./competence-add.component.scss']
})
export class CompetenceAddComponent implements OnInit, OnDestroy {

  public competenceId: number;
  public competence: Competence = new Competence();
  public competenceLevels: Array<CompetenceLevel> = [
    new CompetenceLevel({ 'level': 0, 'description': '' }),
    new CompetenceLevel({ 'level': 1, 'description': '' }),
    new CompetenceLevel({ 'level': 2, 'description': '' }),
    new CompetenceLevel({ 'level': 3, 'description': '' }),
    new CompetenceLevel({ 'level': 4, 'description': '' }),
    new CompetenceLevel({ 'level': 5, 'description': '' })
  ];
  public error = '';
  public sub: Subscription;
  public formTitle = 'Add New Competence';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public competenceApi: CompetenceApi,
    public communicationService: CommunicationService
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      if (params['competenceId']) {
        console.log('ketemu', params['competenceId']);
        this.formTitle = 'Edit Competence';
        this.competenceId = +params['competenceId']; // (+) converts string 'id' to a number

        this.competenceApi
          .findById(this.competenceId, {
            include: {
              relation: 'competenceLevels',
              scope: {
                order: 'level ASC'
              }
            }
          })
          .subscribe((competence: Competence) => {
            console.log(competence);
            this.competence = competence;
            this.competenceLevels = competence.competenceLevels;
            this.communicationService.announceMain({
              breadcrumbs: [{
                label: 'Home',
                url: ['main']
              }, {
                label: 'Competence',
                url: ['main/competence']
              }, {
                label: 'Edit Competence',
                url: ['main/competence/edit', this.competence.id]
              }],
              sidemenus: this.communicationService.menuSet()
            });
          });
      } else {
        this.communicationService.announceMain({
          breadcrumbs: [{
            label: 'Home',
            url: ['main']
          }, {
            label: 'Competence',
            url: ['main/competence']
          }, {
            label: 'Add New Competence',
            url: ['main/competence/add']
          }],
          sidemenus: this.communicationService.menuSet()
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit() {
    console.log(this.competence);
    console.log(this.competenceLevels);

    if (this.competenceId) {
      console.log('has company');

      this.competenceApi.updateAttributes(this.competenceId, this.competence)
        .subscribe(
        result => {
          console.log(result);
          this.competenceApi.deleteCompetenceLevels(this.competenceId)
            .subscribe(result2 => {
              this.competenceApi.createCompetenceLevels(this.competenceId, this.competenceLevels)
                .subscribe(
                result3 => {
                  console.log(result3);
                  this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error => console.log(error));
            },
            error => console.log(error));
        },
        error => console.log(error)
        );
    } else {
      this.competenceApi.create(this.competence)
        .subscribe(
        result => {
          console.log(result);
          this.competenceApi.createManyCompetenceLevels(result.id, this.competenceLevels)
            .subscribe(
            result2 => {
              console.log(result2);
              this.router.navigate(['../'], { relativeTo: this.route });
            },
            error => this.errorCB(error));
        },
        error => this.errorCB(error)
        );
    }
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
