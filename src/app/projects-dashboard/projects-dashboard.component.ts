import { Component, EventEmitter, OnInit, OnChanges, SimpleChange, SimpleChanges, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Input } from '@angular/core';
import { Project, ProjectTypeUtil } from '../projects/project';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../utils/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss']
})
export class ProjectsDashboardComponent implements OnInit, OnChanges {
  @Input() projects: Project[];
  @Output() projectSelected = new EventEmitter<Project>();
  @Output() projectUpdate = new EventEmitter<Project>();
  @Output() projectDeleted = new EventEmitter<Project>();
  cards = null;
  /** Based on the screen size, switch from standard to one column per row */
  columns = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return 1;
      }
      return 3;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog) { }

  setCards() {
    this.cards = this.projects.map(project => {
      return {
        title: project.name,
        rows: 1,
        cols: 1,
        created: project.created,
        lastUpdate: project.lastUpdate,
        description: project.description,
        projectType: ProjectTypeUtil.getProjectTypeName(project.type),
        project,
      };
    });
  }

  ngOnInit() {
    this.setCards();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.projects) {
      this.setCards();
    }
  }

  selectProject(project: Project) {
    this.projectSelected.emit(project);
  }

  updateProject(project: Project) {
    this.projectUpdate.emit(project);
  }

  deleteProject(project: Project) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Are you sure you want to delete the project '${project.name}'? This cannot be undone.`,
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.projectDeleted.emit(project);
      }
    });
  }
}
