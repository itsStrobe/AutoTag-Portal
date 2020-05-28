import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Project, ProjectTypeUtil } from '../projects/project';
import { ManualTagComponent } from '../manual-tag/manual-tag.component';
import { ProjectsService } from '../projects/projects.service';
import * as FileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

const minTagPercentForAutoTag = 30;
const hundredPercent = 100;

@Component({
  selector: 'app-project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.scss']
})
export class ProjectMainComponent implements OnInit {
  project: Project = this.data.project;
  projectType: string;
  completion: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public projectsService: ProjectsService,
              public dialogRef: MatDialogRef<ProjectMainComponent>, public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.projectType = ProjectTypeUtil.getProjectTypeName(this.project.type);
    this.completion = Math.floor(this.project.numTaggedRows * 100 / this.project.numTotalRows);
  }

  autoTagDisabled() {
    return this.completion < minTagPercentForAutoTag;
  }

  exportDisabled() {
    return this.completion < hundredPercent;
  }

  getAutoTagTooltip() {
    if (this.autoTagDisabled) {
      return 'Tag at least 30% of the examples to enable';
    }
    return 'Tag examples automatically';
  }

  getExportTooltip() {
    if (this.exportDisabled) {
      return 'Tag all of the examples to enable';
    }
    return 'Download project as a JSON';
  }

  autoTag() {
    this.projectsService.autoTag(this.project.uuid);
    this.snackBar.open('Pre tagging project. This might take a while.', 'Dismiss');
  }

  async export() {
    const fileData = await this.projectsService.exportProject(this.project.uuid);
    const content = new Blob([fileData.tagsContent], {type: 'text/csv;charset=utf-8'});
    FileSaver.saveAs(content, 'projectExport.csv');
  }

  manualTag() {
    const manualTagDialogRef = this.dialog.open(ManualTagComponent, {
      data: { project: this.project },
      minWidth: '500px',
      maxWidth: '60vw',
      autoFocus: false,
      disableClose: true
    });

    manualTagDialogRef.afterClosed().subscribe(result => {
      this.project = result.project;
      this.completion = Math.floor(this.project.numTaggedRows * 100 / this.project.numTotalRows);
    });
  }
}
