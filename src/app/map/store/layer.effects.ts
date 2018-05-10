import {Actions, Effect} from '@ngrx/effects';


import {catchError, map, mergeMap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as layerActions from './layer.actions';
import {Layer} from '../../shared/layer.model';
import {environment} from '../../../environments/environment';
import {ClientPresentation} from '../../shared/client-presentation.model';
import {ClickStrategy} from '../../shared/click-strategy.model';
import {Observable} from 'rxjs';
import {ClickFormatterInfo} from '../../shared/click-formatter-info.model';
import {uniqueId} from 'lodash';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class LayerEffects {

  @Effect()
  layerFetch = this.actions$
    .ofType(layerActions.FETCH_LAYER)
    .pipe(mergeMap((action: layerActions.FetchLayer) => {
      return this.httpClient.get<Layer>(`${environment.mapapiUrl}/layers/${action.payload.layerId}`).pipe(map(
        (layer) => {
          layer.uniqueId = action.payload.uniqueId;
          if (layer.urlBehaviors != null) {
            layer.urlBehaviors.forEach((behavior) => {
              behavior.uniqueId = uniqueId();
              behavior.layerUniqueId = layer.uniqueId;
            });
          }
          return layer;
        }
      ));
    }), map(
      (layer) => {
        return {
          type: layerActions.FETCH_CLICK_STRATEGY,
          payload: layer
        };
      }
    ));

  @Effect()
  clickStrategyFetch = this.actions$
    .ofType(layerActions.FETCH_CLICK_STRATEGY)
    .pipe(mergeMap((action: layerActions.FetchClickStrategy) => {
        return this.httpClient.get<ClickStrategy>(`${environment.mapapiUrl}/layers/${action.payload.id}/click-strategies`).pipe(
          map(
            (clickStrategy) => {
              action.payload.clickStrategy = clickStrategy;
              return action.payload;
            }
          ), catchError((err: HttpErrorResponse) => {
            return of(action.payload);
          }));
      })
      , map(
        (layer) => {
          return {
            type: layerActions.FETCH_CLICK_FORMATTER,
            payload: layer
          };
        }
      ));
  @Effect()
  clickFormatterFetch = this.actions$
    .ofType(layerActions.FETCH_CLICK_FORMATTER)
    .pipe(mergeMap((action: layerActions.FetchClickFormatter) => {
        return this.httpClient.get<ClickFormatterInfo>(`${environment.mapapiUrl}/layers/${action.payload.id}/click-formatters`).pipe(
          map(
            (clickFormatterInfo) => {
              action.payload.clickFormatterInfo = clickFormatterInfo;
              return action.payload;
            }
          ), catchError((err: HttpErrorResponse) => {
            return of(action.payload);
          }));
      })
      , map(
        (layer) => {
          return {
            type: layerActions.FETCH_CLIENT_PRESENTATIONS,
            payload: layer
          };
        }
      ));
  @Effect()
  clientPresentationsFetch = this.actions$
    .ofType(layerActions.FETCH_CLIENT_PRESENTATIONS)
    .pipe(mergeMap((action: layerActions.FetchClientPresentations) => {
        return this.httpClient.get<ClientPresentation[]>(
          `${environment.mapapiUrl}/layers/${action.payload.id}/client-presentations`).pipe(map(
          (clientPresentations) => {
            // Add clientPresentations to the layer and set the default as the current one
            action.payload.currentClientPresentation = clientPresentations.find((cp: ClientPresentation) => {
              return cp.isDefault;
            });
            action.payload.clientPresentations = clientPresentations;
            return action.payload;
          }
        ));
      })
      , map(
        (layer) => {
          return {
            type: layerActions.ADD_LAYER,
            payload: layer
          };
        }
      ));

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}
