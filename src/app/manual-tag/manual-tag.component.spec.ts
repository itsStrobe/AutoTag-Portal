import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualTagComponent } from './manual-tag.component';

describe('ManualTagComponent', () => {
  let component: ManualTagComponent;
  let fixture: ComponentFixture<ManualTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
