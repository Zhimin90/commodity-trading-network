import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractBrowserComponent } from './contract-browser.component';

describe('ContractBrowserComponent', () => {
  let component: ContractBrowserComponent;
  let fixture: ComponentFixture<ContractBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
