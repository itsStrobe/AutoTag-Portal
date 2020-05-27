import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../projects/project';
import { MatPaginator } from '@angular/material/paginator';
import { switchMap, startWith } from 'rxjs/operators';
import { RowService } from '../row/row.service';
import { Row } from '../row/row';

const colors = ['#ffab91', '#b39ddb', ' #ffe082', '#c5e1a5', '#80cbc4', ' #e6ee9c ', '#f48fb1', ' #9fa8da', ' #ce93d8', ' #ef9a9a'];

@Component({
  selector: 'app-manual-tag',
  templateUrl: './manual-tag.component.html',
  styleUrls: ['./manual-tag.component.scss']
})
export class ManualTagComponent implements OnInit, AfterViewInit {
  project: Project = this.data.project;
  tags: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['example', 'content'];
  rows: Row[] = [];
  selectedRow: Row;

  loadingResults = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public rowService: RowService) { }

  ngOnInit(): void {
    this.tags = this.project.tags.map(tagObject => tagObject.tag);
    this.rows = [
      {dataName: 'example', rowId: 1, content: 'lorem ipsum etc etc etc etc', status: 'NotTagged', tag: null},
      {dataName: 'example', rowId: 2, content: 'lorem ipsum etc etc etc etc', status: 'NotTagged', tag: null},
      {dataName: 'example', rowId: 3, content: 'lorem ipsum etc etc etc etc', status: 'PreTagged', tag: 'lorem'},
      {dataName: 'example', rowId: 4, content: 'lorem ipsum etc etc etc etc', status: 'PreTagged', tag: 'ipsum'},
      {dataName: 'example', rowId: 5, content: 'lorem ipsum etc etc etc etc', status: 'Tagged', tag: 'l'},
      {dataName: 'example', rowId: 6, content: 'lorem ipsum etc etc etc etc', status: 'Tagged', tag: 'i'},
      {dataName: 'example', rowId: 7, content: 'lorem ipsum etc etc etc etc', status: 'Tagged', tag: 'lorem'}
    ];
    this.selectedRow = this.rows[0];
  }

  ngAfterViewInit() {
    // this.paginator.page.pipe(
    //   startWith({}),
    //   switchMap(() => {
    //     this.loadingResults = true;
    //     return this.rowService.getDataBatch(this.project.uuid,
    //       this.paginator.pageIndex * this.paginator.pageSize,
    //       this.paginator.pageSize);
    //   })
    // ).subscribe(data => {
    //   this.rows = data;
    //   this.selectedRow = this.rows[0];
    //   this.loadingResults = false;
    // });
  }

  tagToColor(tag: string) {
    if (tag) {
      const index = this.tags.indexOf(tag);
      return colors[index % colors.length];
    }
    return '';
  }

  selectExample(example) {
    this.selectedRow = example;
  }

  setTag(tag: string) {
    this.selectedRow.tag = tag;
    this.selectedRow.status = 'Tagged';
  }

  previousExample() {

  }

  nextExample() {

  }
}
