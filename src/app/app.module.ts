import { CommunicationService } from './shared/services/communication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { SDKBrowserModule } from './shared/sdk/index';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FileUploadModule } from 'ng2-file-upload';
import { NgDatepickerModule } from 'ng2-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CompanyListComponent } from './main/company/list/company-list.component';
import { CompanyDetailComponent } from './main/company/detail/company-detail.component';
import { IntroductionComponent } from './main/employee/introduction/introduction.component';
import { EmployeeComponent } from './main/employee/employee.component';
import { ProfileComponent } from './main/employee/profile/profile.component';
import { CompetenceComponent } from './main/employee/profile/competence/competence.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { CompetenceManageComponent } from './main/employee/profile/competence-manage/competence-manage.component';
import { CompetenceDetailComponent } from './main/employee/profile/competence-detail/competence-detail.component';
import { ExperdBackComponent } from './shared/components/experd-back/experd-back.component';
import { TaskComponent } from './main/employee/task/task.component';
import { TeamComponent } from './main/employee/team/team.component';
import { CompanyAddComponent } from './main/company/add/company-add.component';
import { CompanyListEditComponent } from './main/company/list-edit/company-list-edit.component';
import { CompetenceListComponent } from './main/competence/competence-list/competence-list.component';
import { CompetenceAddComponent } from './main/competence/competence-add/competence-add.component';
import { CompetenceOverviewComponent } from './main/competence/competence-overview/competence-overview.component';
import { CompanyCompetenceComponent } from './main/company/company-competence/company-competence.component';
import { CompetenceSetComponent } from './main/company/competence-set/competence-set.component';
import { CompetenceSetDetailComponent } from './main/company/competence-set-detail/competence-set-detail.component';
import { AddFormComponent } from './main/employee/add-form/add-form.component';
import { ProfileFormComponent } from './main/employee/profile-form/profile-form.component';
import { TeamListComponent } from './main/employee/team-list/team-list.component';
import { TeamEditComponent } from './main/employee/team-edit/team-edit.component';
import { AgePipe } from './shared/pipes/age.pipe';
import { TitleCasePipe } from './shared/pipes/title-case.pipe';
import { ProfileEditFormComponent } from './main/employee/profile-edit-form/profile-edit-form.component';
import { ReportComponent } from './main/report/report.component';
import { ProfileEditCompetenceComponent } from './main/employee/profile-edit-competence/profile-edit-competence.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    IntroductionComponent,
    EmployeeComponent,
    ProfileComponent,
    CompetenceComponent,
    ProgressBarComponent,
    CompetenceManageComponent,
    CompetenceDetailComponent,
    ExperdBackComponent,
    TaskComponent,
    TeamComponent,
    CompanyAddComponent,
    CompanyListEditComponent,
    CompetenceListComponent,
    CompetenceAddComponent,
    CompetenceOverviewComponent,
    CompanyCompetenceComponent,
    CompetenceSetComponent,
    CompetenceSetDetailComponent,
    AddFormComponent,
    ProfileFormComponent,
    TeamListComponent,
    TeamEditComponent,
    AgePipe,
    TitleCasePipe,
    ProfileEditFormComponent,
    ReportComponent,
    ProfileEditCompetenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SDKBrowserModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgDatepickerModule,
    BrowserAnimationsModule,
    FileUploadModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
