import * as popupActions from './popup.actions';
import {PopupStatus} from './popup.actions';
import {cloneDeep} from 'lodash';


export interface State {
  popupStatuses: Array<PopupStatus>;
}

const initialState: State = {
  popupStatuses: [],
};


export function popupReducer(state = initialState, action: popupActions.PopupActions) {
  switch (action.type) {
    case popupActions.ADD_POPUP:
      const clonedState = cloneDeep(state);
      clonedState.popupStatuses.push({...action.payload});
      return clonedState;
    case popupActions.DELETE_POPUP:
      const clownState = cloneDeep(state);
      return clownState.filter((p: PopupStatus) => {
        return p.id !== action.payload;
      });
    case popupActions.TOGGLE_POPUP:
      const cloneState = cloneDeep(state);
      const popupStatus = cloneState.popupStatuses.filter((ps) => {
        return ps.id === action.payload;
      })[0];
      popupStatus.isOpen = !popupStatus.isOpen;
      return cloneState;
    default:
      return state;
  }
}