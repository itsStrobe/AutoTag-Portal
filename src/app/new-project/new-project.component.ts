import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectTypeUtil, ProjectType, Project, ProjectDataFormat, Tag } from '../projects/project';
import { CustomValidators } from '../form-validators/custom-validators';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  projectTypeNames: string[];
  files = [];
  tags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  newProjectForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    type: [null, Validators.required],
    tags: [this.tags, CustomValidators.validateRequired],
    files: [this.files, CustomValidators.validateRequired]
  });

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<NewProjectComponent>) { }

  ngOnInit() {
    // Get all numeric keys in `ProjectType` enum.
    const projectTypes = Object.keys(ProjectType)
      .filter(key => !isNaN(Number(key)))
      .map(Number);
    this.projectTypeNames = projectTypes.map(ProjectTypeUtil.getProjectTypeName);

    this.newProjectForm.controls.tags.setValue(this.tags);
    this.newProjectForm.controls.files.setValue(this.files);
  }

  onClickFileUpload() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let i = 0; i < fileUpload.files.length; i++) {
        this.files.push({ name: fileUpload.files[i].name, data: fileUpload.files[i] });
        this.validateOneCsvFile();
        this.newProjectForm.controls.files.updateValueAndValidity();
      }
    };
    fileUpload.click();
  }

  // Makes sure that there is either only one .csv file or multiple .txt files.
  // If there is more than one .csv file or the file types are mixed, it will delete
  // every file from `this.files` except for the first .csv file in the array.
  validateOneCsvFile() {
    const firstCsvFile = this.files.find(file => file.data.type === 'text/csv');
    if (firstCsvFile !== undefined) {
      this.files.length = 0; // Deletes elements in array without losing reference to actual array.
      this.files.push(firstCsvFile);
    }
  }

  removeFile(file) {
    const index = this.files.indexOf(file);

    if (index >= 0) {
      this.files.splice(index, 1);
      this.newProjectForm.controls.files.updateValueAndValidity();
    }
  }

  removeAllFiles() {
    this.files.length = 0; // Deletes elements in array without losing reference to actual array.
    this.newProjectForm.controls.files.updateValueAndValidity();
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.newProjectForm.controls.tags.setErrors(null);
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.newProjectForm.controls.tags.updateValueAndValidity();
  }

  onSubmit() {
    const newProject = new Project();
    newProject.name = this.newProjectForm.get('title').value;
    newProject.description = this.newProjectForm.get('description').value;
    newProject.type = Number(this.newProjectForm.get('type').value);
    newProject.tags = this.newProjectForm.get('tags').value.map(tag => {
      const tagObject = new Tag();
      tagObject.tag = tag;
      return tagObject;
    });
    newProject.projectDataFormat =
      this.files[0].data.type === 'text/plain' ? ProjectDataFormat.TXT : ProjectDataFormat.CSV;
    const filesData = this.files.map(file => file.data);
    this.dialogRef.close({ project: newProject, files: filesData });
  }
}
