/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExperdBackComponent } from './experd-back.component';

describe('ExperdBackComponent', () => {
  let component: ExperdBackComponent;
  let fixture: ComponentFixture<ExperdBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperdBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperdBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
