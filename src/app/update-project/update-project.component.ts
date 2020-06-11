import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../projects/project';
import { CustomValidators } from '../form-validators/custom-validators';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent {
  project: Project = this.data.project;
  newProjectForm = this.fb.group({
    title: [this.project.name, [Validators.required, CustomValidators.validateNoWhitespace]],
    description: [this.project.description, [Validators.required, CustomValidators.validateNoWhitespace]]
  });

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UpdateProjectComponent>) { }

  onSubmit() {
    this.project.name = this.newProjectForm.get('title').value;
    this.project.description = this.newProjectForm.get('description').value;
    this.dialogRef.close({project: this.project});
  }
}
