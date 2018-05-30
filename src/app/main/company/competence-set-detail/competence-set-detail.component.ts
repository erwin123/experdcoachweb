import { CompetenceLevel } from './../../../shared/sdk/models/CompetenceLevel';
import { CompetenceSet } from './../../../shared/sdk/models/CompetenceSet';
import { Competence } from './../../../shared/sdk/models/Competence';
import { CommunicationService } from './../../../shared/services/communication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from './../../../shared/sdk/models/Company';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { CompetenceSetApi } from './../../../shared/sdk/services/custom/CompetenceSet';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import { trigger, state, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'app-competence-set-detail',
  templateUrl: './competence-set-detail.component.html',
  styleUrls: ['./competence-set-detail.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('100ms')),
    ])
  ]
})
export class CompetenceSetDetailComponent implements OnInit, OnDestroy {

  public error = '';
  public sub: Subscription;
  public formTitle = 'Add New Competence Set';
  public company: Company = new Company();
  public competences: Competence[];
  public competenceSet: CompetenceSet = new CompetenceSet();
  public isNew = true;

  public selectedCompetency: Competence = new Competence();
  public competencyAvailable: Competence[];
  public dummyCompetencyLevel: CompetenceLevel = new CompetenceLevel();
  added = 'hidden';

  constructor(
    public route: ActivatedRoute,
    public communicationService: CommunicationService,
    public competencesetApi: CompetenceSetApi,
    public companyApi: CompanyApi,
    public router: Router,
  ) {
    this.competenceSet.competenceLevels = [];
  }

  ngOnInit() {
    this.selectedCompetency.name = "Select Competency";
    this.sub = this.route.params.subscribe(params => {
      if (params['companyId']) {
        console.log('ketemu', params['companyId'], params['setId']);
        this.companyApi
          .findById(+params['companyId'], {
            include: {
              relation: 'competences',
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
          .subscribe((company: Company) => {
            this.company = company;
            this.competences = company.competences;

            for (const competence of this.competences) {
              this.competenceSet.competenceLevels.push(competence.competenceLevels[0]);
            }

            if (params['setId']) {
              this.isNew = false;
              this.competencesetApi
                .findById(+params['setId'], {
                  include: {
                    relation: 'competenceLevels',
                    scope: {
                      order: 'level ASC'
                    }
                  }
                })
                .subscribe((competenceset: CompetenceSet) => {
                  this.communicationService.announceMain({
                    breadcrumbs: [{
                      label: 'Home',
                      url: ['main']
                    }, {
                      label: 'Company',
                      url: ['main/company/list']
                    }, {
                      label: company.name,
                      url: ['main/company', company.id]
                    }, {
                      label: 'Competence Set',
                      url: ['main/company', company.id, 'competence-set']
                    }, {
                      label: competenceset.name,
                      url: ['main/company', company.id, 'competence-set', competenceset.id]
                    }],
                    sidemenus: this.communicationService.menuSet('company', company)
                  });

                  this.competenceSet = competenceset;

                  for (const competence of this.competences) {
                    let findMe: CompetenceLevel;
                    // Cari apakah datanya ada
                    findMe = this.competenceSet.competenceLevels.find(competencelevel => competencelevel.competenceId === competence.id);

                    if (!findMe) {
                      this.competenceSet.competenceLevels.push(competence.competenceLevels[0]);
                    }


                    // Push datanya jika memang tidak ada

                    // this.competenceSet.competenceLevels.push(competence.competenceLevels[0])
                  }
                  
                  this.reindexDdl();
                });
            } else {
              this.isNew = true;

              this.communicationService.announceMain({
                breadcrumbs: [{
                  label: 'Home',
                  url: ['main']
                }, {
                  label: 'Company',
                  url: ['main/company/list']
                }, {
                  label: company.name,
                  url: ['main/company', company.id]
                }, {
                  label: 'Competence Set',
                  url: ['main/company', company.id, 'competence-set']
                }, {
                  label: 'New',
                  url: ['main/company', company.id, 'competence-set', 'add']
                }],
                sidemenus: this.communicationService.menuSet('company', company)
              });

              this.competenceSet.companyId = company.id;
              this.reindexDdl("add");
            }
            

          });
      }
            
    });



  }

  reindexDdl(mode:string = "edit"){
    if(mode === "edit")
    {
     //copy array
     this.competencyAvailable = Object.assign([], this.company.competences);
     this.competenceSet.competenceLevels.filter(i => i.level > 0).forEach(j=>{
       this.competencyAvailable = this.competencyAvailable.filter(k=>k.id != j.competenceId);
     });
    }else{
      //copy array
     this.competencyAvailable = Object.assign([], this.company.competences);
    //  this.competenceSet.competenceLevels.filter(i => i.level > 0).forEach(j=>{
    //    this.competencyAvailable = this.competencyAvailable.filter(k=>k.id != j.competenceId);
    //  });
    }
  }

  getcompetenceSetLevel(competence: Competence) {
    return this.competenceSet.competenceLevels.find(competencelevel => competencelevel.competenceId === competence.id);
  }

  updateLevel(competence: Competence, newCompetencelevel: CompetenceLevel) {
    this.competenceSet.competenceLevels = this.competenceSet.competenceLevels.map(
      competencelevel => competencelevel.competenceId === competence.id ? newCompetencelevel : competencelevel
    );
    this.reindexDdl();
  }

  updateSelectedCompetence(competence: Competence) {
    this.selectedCompetency = competence;
  }

  updateCompetencyLevel(competence: Competence, newCompetencelevel: CompetenceLevel) {
    this.dummyCompetencyLevel = newCompetencelevel;
  }

  addCompetencyLevel() {
    let i = this.competenceSet.competenceLevels.find(x => x.competenceId === this.dummyCompetencyLevel.competenceId);
    if (i) {
      this.competenceSet.competenceLevels = this.competenceSet.competenceLevels.filter(x => x.competenceId !== this.dummyCompetencyLevel.competenceId);
    }
    this.competenceSet.competenceLevels.push(this.dummyCompetencyLevel);
    this.dummyCompetencyLevel = new CompetenceLevel();
    this.selectedCompetency = new Competence();
    this.selectedCompetency.name = "Select Competency";
    this.reindexDdl();
    this.added = 'shown';
    setTimeout(()=> {
      this.added = 'hidden';
    }, 1000)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit() {

    console.log(this.competenceSet);

    this.competencesetApi.upsert(this.competenceSet)
      .subscribe(
        (newCompetenceSet: CompetenceSet) => {
          console.log(newCompetenceSet);
          this.competencesetApi
            .deleteCompetenceLevels(newCompetenceSet.id)
            .subscribe(result => {
              console.log(result);

              const obsArr = [];
              for (const competencelevel of this.competenceSet.competenceLevels) {
                obsArr.push(this.competencesetApi.linkCompetenceLevels(newCompetenceSet.id, competencelevel.id));
              }

              Observable.forkJoin(obsArr)
                .subscribe((res) => {
                  console.log(res);
                  this.router.navigate(['../'], { relativeTo: this.route });
                });

            });

        });

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
