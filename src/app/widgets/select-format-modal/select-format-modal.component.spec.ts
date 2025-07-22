import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectFormatModalComponent} from './select-format-modal.component';

describe('SelectFormatModalComponent', () => {
  let component: SelectFormatModalComponent;
  let fixture: ComponentFixture<SelectFormatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectFormatModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectFormatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
