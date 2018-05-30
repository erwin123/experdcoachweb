import { CommunicationService } from './../../../shared/services/communication.service';
import { TableCompany } from './../../../shared/table-company';
import { Observable } from 'rxjs/Observable';
import { Competence } from './../../../shared/sdk/models/Competence';
import { CompetenceApi } from './../../../shared/sdk/services/custom/Competence';
import { TableColumns } from './../../../shared/table-columns';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-competence-list',
  templateUrl: './competence-list.component.html',
  styleUrls: ['./competence-list.component.scss']
})
export class CompetenceListComponent implements OnInit {

  public columns: Array<TableColumns>;
  public competences: Observable<Competence[]>;

  constructor(
    public competenceApi: CompetenceApi,
    public communicationService: CommunicationService
  ) { }

  ngOnInit() {
    this.columns = [{
      name: 'name',
      title: 'Competence',
      classes: ['experd-color'],
      hasRouter: true
    }, {
      name: 'definition',
      title: 'Definition',
      classes: ['white'],
      hasRouter: true
    }];

    this.competences = this.competenceApi.find();

    this.communicationService.announceMain({
      breadcrumbs: [{
        label: 'Home',
        url: ['main']
      }, {
        label: 'Competence',
        url: ['main/competence']
      }],
      sidemenus: this.communicationService.menuSet()
    });
  }

  delete(competence) {
    console.log(competence);

    const that = this;
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(function () {
      that.competenceApi
        .deleteById(competence.id)
        .subscribe(result => {
          swal(
            'Deleted!',
            'Competence has been deleted.',
            'success'
          );
          that.competences = that.competenceApi.find();
        });
    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Competence is safe :)',
          'error'
        );
      }
    });


  }
}
