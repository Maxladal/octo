/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers';

export const selectLayerInformationState = createSelector(
  selectMapState,
  state => state.layerInformation,
);
