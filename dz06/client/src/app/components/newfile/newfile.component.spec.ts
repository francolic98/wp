import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfileComponent } from './newfile.component';

describe('NewfileComponent', () => {
  let component: NewfileComponent;
  let fixture: ComponentFixture<NewfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
