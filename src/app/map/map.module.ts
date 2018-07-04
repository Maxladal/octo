/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularDraggableModule} from 'angular2-draggable';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {mapReducers} from './store';
import {LayerInformationEffects} from './store/effects/layer-information.effects';
import {CatalogEffects} from './store/effects/catalog.effects';
import {TopicEffects} from './store/effects/topic.effects';
import {LayerEffects} from './store/effects/layer.effects';
import * as fromComponents from './components';

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    CalendarModule,
    AngularDraggableModule,
    StoreModule.forFeature('map', mapReducers),
    EffectsModule.forFeature([LayerEffects, CatalogEffects, TopicEffects, LayerInformationEffects]),
  ],
  declarations: [...fromComponents.components]
})

export class MapModule {
}
