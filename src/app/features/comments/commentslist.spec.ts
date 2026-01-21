import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Commentslist } from './commentslist';

describe('Commentslist', () => {
  let component: Commentslist;
  let fixture: ComponentFixture<Commentslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Commentslist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Commentslist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
