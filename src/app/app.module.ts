import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProjectsDashboardComponent } from './projects-dashboard/projects-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { NewProjectComponent } from './new-project/new-project.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ConfirmationDialogComponent } from './utils/dialog/confirmation-dialog/confirmation-dialog.component';
import { ProjectMainComponent } from './project-main/project-main.component';
import { ManualTagComponent } from './manual-tag/manual-tag.component';


const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('236918430689691')
  }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    TopBarComponent,
    ProjectsDashboardComponent,
    NewProjectComponent,
    UpdateProjectComponent,
    ConfirmationDialogComponent,
    ProjectMainComponent,
    ManualTagComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
    SocialLoginModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatRippleModule,
    MatPaginatorModule
  ],
  entryComponents: [
    NewProjectComponent,
    UpdateProjectComponent,
    ProjectMainComponent,
    ManualTagComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000 }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
