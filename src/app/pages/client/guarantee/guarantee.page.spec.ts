import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteePage } from './guarantee.page';

describe('GuaranteePage', () => {
  let component: GuaranteePage;
  let fixture: ComponentFixture<GuaranteePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
