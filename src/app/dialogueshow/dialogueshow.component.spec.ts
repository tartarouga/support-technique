import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueshowComponent } from './dialogueshow.component';

describe('DialogueshowComponent', () => {
  let component: DialogueshowComponent;
  let fixture: ComponentFixture<DialogueshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
