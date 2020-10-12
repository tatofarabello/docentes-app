import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FechayhoraPage } from './fechayhora.page';

describe('FechayhoraPage', () => {
  let component: FechayhoraPage;
  let fixture: ComponentFixture<FechayhoraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechayhoraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FechayhoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
