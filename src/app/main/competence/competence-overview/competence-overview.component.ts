import { CommunicationService } from './../../../shared/services/communication.service';
import { Observable } from 'rxjs/Observable';
import { Competence } from './../../../shared/sdk/models/Competence';
import { Subscription } from 'rxjs/subscription';
import { CompetenceApi } from './../../../shared/sdk/services/custom/Competence';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-competence-overview',
  templateUrl: './competence-overview.component.html',
  styleUrls: ['./competence-overview.component.scss']
})
export class CompetenceOverviewComponent implements OnInit, OnDestroy {

  public competenceId: number;
  public competence: Competence = new Competence();
  public error = '';
  public sub: Subscription;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public competenceApi: CompetenceApi,
    public communicationService: CommunicationService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
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
        .subscribe((result: Competence) => {
          this.competence = result;
          this.communicationService.announceMain({
            breadcrumbs: [{
              label: 'Home',
              url: ['main']
            }, {
              label: 'Competence',
              url: ['main/competence']
            }, {
              label: this.competence.name,
              url: ['main/competence', this.competence.id]
            }],
            sidemenus: this.communicationService.menuSet()
          });
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
