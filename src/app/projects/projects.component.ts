import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ProjectsService } from './projects.service';
import { Project } from './project';
import { NewProjectComponent } from '../new-project/new-project.component';
import { FileUploadService } from '../file-upload/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { ProjectMainComponent } from '../project-main/project-main.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects = [];
  selectedProject: Project = new Project();
  loading = false;

  constructor(public projectsService: ProjectsService, public fileUploadService: FileUploadService,
              public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.projectsService.getProjects();
    this.projects = data;
    this.loading = false;
  }

  async updateProject() {
    if (this.selectedProject.uuid !== undefined) {
      await this.projectsService.updateProject(this.selectedProject);
      await this.refresh();
    }
    this.selectedProject = new Project();
  }

  async createProject(files: File[]) {
    await this.projectsService.createProject(this.selectedProject, files);
    this.selectedProject = new Project();
    await this.refresh();
  }

  editProject(project: Project) {
    this.selectedProject = project;
  }

  clearProject() {
    this.selectedProject = new Project();
  }

  newProject() {
    const newProjectDialogRef = this.dialog.open(NewProjectComponent, new MatDialogConfig());
    let files: File[];
    newProjectDialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.selectedProject = result.project;
        files = result.files;
        const snackBarRef = this.snackBar.open(
          `Creating project "${this.selectedProject.name}" and uploading files. Please do not close this tab.`,
          'Dismiss');
        await this.createProject(files);
      }
    });
  }

  onProjectSelected(project: Project) {
    this.selectedProject = project;
    const projectDialogRef = this.dialog.open(ProjectMainComponent, {
      data: {
        project
      },
      minWidth: '35vw',
      maxWidth: '50vw',
      autoFocus: false
    });
  }

  onProjectUpdate(project: Project) {
    const projectUpdateDialogRef = this.dialog.open(UpdateProjectComponent, {
      data: {
        project
      }
    });

    projectUpdateDialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const snackBarRef = this.snackBar.open(`Updating project "${project.name}"`,
          'Dismiss');
        this.selectedProject = result.project;
        await this.updateProject();
      }
    });
  }

  async onProjectDeleted(project: Project) {
    const snackBarRef = this.snackBar.open(`Deleting project "${project.name}"`,
          'Dismiss');
    this.loading = true;
    await this.projectsService.deleteProject(project.uuid);
    await this.refresh();
  }
}
