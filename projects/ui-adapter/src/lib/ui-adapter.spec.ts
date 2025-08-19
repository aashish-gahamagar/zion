import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdapter } from './ui-adapter';

describe('UiAdapter', () => {
  let component: UiAdapter;
  let fixture: ComponentFixture<UiAdapter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdapter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdapter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
