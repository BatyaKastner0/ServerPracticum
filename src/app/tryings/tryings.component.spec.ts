import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryingsComponent } from './tryings.component';

describe('TryingsComponent', () => {
  let component: TryingsComponent;
  let fixture: ComponentFixture<TryingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TryingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TryingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
