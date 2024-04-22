import { ComponentFixture, TestBed } from '@angular/core/testing';

import AllRegistrosComponent from './all-registros.component';

describe('AllRegistrosComponent', () => {
  let component: AllRegistrosComponent;
  let fixture: ComponentFixture<AllRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRegistrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
