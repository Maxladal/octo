/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerOpacityComponent } from './layer-opacity.component';

describe('LayerOpacityComponent', () => {
  let component: LayerOpacityComponent;
  let fixture: ComponentFixture<LayerOpacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerOpacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerOpacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
