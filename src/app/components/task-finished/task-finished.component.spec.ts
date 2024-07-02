import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFinishedComponent } from './task-finished.component';

describe('TaskFinishedComponent', () => {
  let component: TaskFinishedComponent;
  let fixture: ComponentFixture<TaskFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFinishedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
