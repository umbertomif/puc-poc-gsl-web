import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IventoryComponent } from './iventory.component';

describe('IventoryComponent', () => {
  let component: IventoryComponent;
  let fixture: ComponentFixture<IventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
