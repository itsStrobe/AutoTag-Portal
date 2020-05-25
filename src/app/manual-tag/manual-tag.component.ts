import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../projects/project';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const colors = ['#ffab91', '#b39ddb', ' #ffe082', '#c5e1a5', '#80cbc4', ' #e6ee9c ', '#f48fb1', ' #9fa8da', ' #ce93d8', ' #ef9a9a'];

@Component({
  selector: 'app-manual-tag',
  templateUrl: './manual-tag.component.html',
  styleUrls: ['./manual-tag.component.scss']
})
export class ManualTagComponent implements OnInit {
  project: Project = this.data.project;

  displayedColumns: string[] = ['example', 'content'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSize = 5;
  selectedExample;

  examples = [
    { name : 'e1', content: 'cm dolor sit amet, consectetur adipiscing elit,\
     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
     quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in ' },
    { name : 'e2', content: 'cm dolor sit amet, consectetur adipiscing elit,\
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute', tag: '1' },
    { name : 'e21', content: 'cont ent13 jakl;kjf  dasjfkdla jfkdlajfkdaj', tag: '4' },
    { name : 'e13', content: 'content1 4jakl;kjfdasjfkdl ajfkdlaj fkdaj', tag: '5' },
    { name : 'e14', content: 'content15  jakl;k jfd asjfkd lajfkd lajfkdaj', tag: '3' },
    { name : 'e15', content: 'conten t16 jakl;kjf  dasjfkdl ajfkdlajfkdaj', tag: '2' },
    { name : 'e16', content: 'content 17 jakl;kjfdasjfkdla jfkdlaj fkdaj', tag: '8' },
    { name : 'e17', content: 'content18 jakl; kjfdasjfk dlajf kdlajfkdaj', tag: '1' },
    { name : 'e18', content: 'content19 jakl;kjfda sjfkdlajfkdlajfkdaj', tag: '1' },
    { name : 'e19', content: 'content1 0 jakl;k jfda sjfkdla  jfkdla jfkdaj', tag: '1' }
  ];
  dataSource: MatTableDataSource<any>;
  tags = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.examples);
    this.dataSource.paginator = this.paginator;
    this.selectedExample = this.examples[1];
  }

  tagToColor(tag: string) {
    if (tag) {
      const index = this.tags.indexOf(tag);
      return colors[index % colors.length];
    }
    return '';
  }

  selectExample(example) {
    this.selectedExample = example;
  }
}
