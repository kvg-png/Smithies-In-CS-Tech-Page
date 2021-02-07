import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechresourcesComponent } from './techresources.component';

describe('TechresourcesComponent', () => {
  let component: TechresourcesComponent;
  let fixture: ComponentFixture<TechresourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechresourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
