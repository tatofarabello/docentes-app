import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClasePage } from './clase.page';

describe('ClasePage', () => {
  let component: ClasePage;
  let fixture: ComponentFixture<ClasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
