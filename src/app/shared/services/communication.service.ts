import { LoopBackAuth } from './../sdk/services/core/auth.service';
import { Employee } from './../sdk/models/Employee';
import { Company } from './../sdk/models/Company';
import { Menu } from './../classes/menu';
import { Announcement } from './../classes/announcement';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class CommunicationService {

  // Observable string sources
  public mainSource = new Subject<Announcement>();
  // Observable string streams
  mainListener$ = this.mainSource.asObservable();
  // Service message commands

  constructor(
    public auth: LoopBackAuth
  ) { }


  announceMain(accouncement: Announcement) {
    this.mainSource.next(accouncement);
  }

  menuSet(type = 'main', company: Company = new Company(), employee: number = 0) {

    let myMenu: Array<Menu>;
    if (this.auth.getCurrentUserData().email === 'dmastag@yahoo.com') {
      switch (type) {
        case 'company':
          myMenu = [
            {
              title: company.name,
              link: ['main/company/list']
            },
            {
              title: 'Add Emplooyee',
              link: ['main/company', company.id, 'employee', 'add']
            },
            {
              title: 'View Team',
              link: ['main/company', company.id, 'employee', 'team']
            },
            {
              title: 'Company Competence',
              link: ['main/company', company.id, 'competence']
            },
            {
              title: 'Competence Set',
              link: ['main/company', company.id, 'competence-set']
            },
            {
              title: 'Introduction',
              link: ['main/company', company.id, 'introduction']
            }
          ];
          break;
        case 'employee':
          myMenu = [
            {
              title: company.name,
              link: ['main/company/list']
            },
            {
              title: 'Edit Emplooyee',
              link: ['main/company', company.id, 'employee', employee, 'edit']
            },
            {
              title: 'Edit Account',
              link: ['main/company', company.id, 'employee', employee, 'editAccount']
            }
          ];
          break;
        default:
          myMenu = [
            {
              title: 'Company',
              link: ['main/company/list']
            },
            {
              title: 'Add Company',
              link: ['main/company/add']
            },
            {
              title: 'Edit Company',
              link: ['main/company/edit']
            },
            {
              title: 'Competence',
              link: ['main/competence']
            },
          ];
      }
    } else {
      switch (type) {
        case 'company':
          myMenu = [
            {
              title: 'Employee',
              link: ['main/company', this.auth.getCurrentUserData().companyId]
            },
            {
              title: 'Team',
              link: ['main/company', this.auth.getCurrentUserData().companyId, 'employee', 'team']
            },
            {
              title: 'Competence Set',
              link: ['main/company', this.auth.getCurrentUserData().companyId, 'competence-set']
            },
            {
              title: 'Introduction',
              link: ['main/company', company.id, 'introduction']
            }
          ];
          break;
        case 'employee':
          myMenu = [
            {
              title: 'Employee',
              link: ['main/company', this.auth.getCurrentUserData().companyId]
            },
            {
              title: 'Edit Emplooyee',
              link: ['main/company', this.auth.getCurrentUserData().companyId, 'employee', employee, 'edit']
            }
          ];
          break;
        default:
          myMenu = [
            {
              title: 'Employee',
              link: ['main/company', this.auth.getCurrentUserData().companyId]
            },
            {
              title: 'Team',
              link: ['main/company', this.auth.getCurrentUserData().companyId, 'employee', 'team']
            },
            {
              title: 'Competence Set',
              link: ['main/company', this.auth.getCurrentUserData().companyId, 'competence-set']
            },
            {
              title: 'Introduction',
              link: ['main/company', company.id, 'introduction']
            }
          ];
      }
    }


    return myMenu;

  }
}
