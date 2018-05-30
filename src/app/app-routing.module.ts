import { ProfileEditCompetenceComponent } from './main/employee/profile-edit-competence/profile-edit-competence.component';
import { ReportComponent } from './main/report/report.component';
import { ProfileEditFormComponent } from './main/employee/profile-edit-form/profile-edit-form.component';
import { TeamEditComponent } from './main/employee/team-edit/team-edit.component';
import { TeamListComponent } from './main/employee/team-list/team-list.component';
import { ProfileFormComponent } from './main/employee/profile-form/profile-form.component';
import { AddFormComponent } from './main/employee/add-form/add-form.component';
import { CompetenceSetDetailComponent } from './main/company/competence-set-detail/competence-set-detail.component';
import { CompetenceSetComponent } from './main/company/competence-set/competence-set.component';
import { CompanyCompetenceComponent } from './main/company/company-competence/company-competence.component';
import { CompetenceOverviewComponent } from './main/competence/competence-overview/competence-overview.component';
import { CompetenceAddComponent } from './main/competence/competence-add/competence-add.component';
import { CompetenceListComponent } from './main/competence/competence-list/competence-list.component';
import { CompanyListEditComponent } from './main/company/list-edit/company-list-edit.component';
import { CompanyAddComponent } from './main/company/add/company-add.component';
import { TeamComponent } from './main/employee/team/team.component';
import { TaskComponent } from './main/employee/task/task.component';
import { CompetenceDetailComponent } from './main/employee/profile/competence-detail/competence-detail.component';
import { CompetenceManageComponent } from './main/employee/profile/competence-manage/competence-manage.component';
import { CompetenceComponent } from './main/employee/profile/competence/competence.component';
import { ProfileComponent } from './main/employee/profile/profile.component';
import { EmployeeComponent } from './main/employee/employee.component';
import { IntroductionComponent } from './main/employee/introduction/introduction.component';
import { CompanyDetailComponent } from './main/company/detail/company-detail.component';
import { CompanyListComponent } from './main/company/list/company-list.component';
// import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: '', children: [] },
      { path: 'company/add', component: CompanyAddComponent },
      { path: 'company/edit', component: CompanyListEditComponent },
      { path: 'company/edit/:companyId', component: CompanyAddComponent },
      { path: 'company/list', component: CompanyListComponent },
      { path: 'company/:companyId', component: CompanyDetailComponent },
      { path: 'company/:companyId/report', component: ReportComponent },
      { path: 'company/:companyId/competence', component: CompanyCompetenceComponent },
      { path: 'company/:companyId/competence-set', component: CompetenceSetComponent },
      { path: 'company/:companyId/competence-set/add', component: CompetenceSetDetailComponent },
      { path: 'company/:companyId/competence-set/:setId', component: CompetenceSetDetailComponent },
      { path: 'company/:companyId/introduction', component: IntroductionComponent },
      { path: 'company/:companyId/employee', component: EmployeeComponent },
      { path: 'company/:companyId/employee/add', component: AddFormComponent },
      { path: 'company/:companyId/employee/add/:employeeId', component: ProfileFormComponent },
      { path: 'company/:companyId/employee/team', component: TeamListComponent },
      { path: 'company/:companyId/employee/team/:employeeId', component: TeamEditComponent },
      // { path: 'company/:companyId/employee/:employeeId', component: AddFormComponent },
      { path: 'company/:companyId/employee/:employeeId/edit', component: ProfileEditFormComponent },
      { path: 'company/:companyId/employee/:employeeId/editAccount', component: AddFormComponent },
      { path: 'company/:companyId/employee/:employeeId/editCompetence', component: ProfileEditCompetenceComponent },
      { path: 'company/:companyId/employee/:employeeId/editCompetence/addCompetence', component: CompanyCompetenceComponent },
      { path: 'company/:companyId/employee/:employeeId/editCompetence/competenceSet/:setId', component: CompetenceSetDetailComponent },
      { path: 'competence', component: CompetenceListComponent },
      { path: 'competence/add', component: CompetenceAddComponent },
      { path: 'competence/edit/:competenceId', component: CompetenceAddComponent },
      { path: 'competence/:competenceId', component: CompetenceOverviewComponent },
      {
        path: 'company/:companyId/employee/:employeeId', component: EmployeeComponent, children: [
          { path: '', children: [] },
          {
            path: 'profile', component: ProfileComponent, children: [
              { path: '', component: CompetenceComponent },
              { path: 'competence', component: CompetenceComponent },
              { path: 'manage', component: CompetenceManageComponent },
              { path: 'manage/:competenceId', component: CompetenceDetailComponent }
            ]
          },
          { path: 'task', component: TaskComponent },
          { path: 'team', component: TeamComponent },
          { path: 'team/:teamId', component: TaskComponent },
        ]
      },
    ]
  },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
