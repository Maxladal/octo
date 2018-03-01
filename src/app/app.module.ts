import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CategoryComponent } from './catalog/category/category.component';
import { CatalogEffects } from './catalog/store/catalog.effects';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { OpenLayersComponent } from './map/open-layers/open-layers.component';
import { LayerEffects } from './map/store/layer.effects';
import { PopupComponent } from './popup/popup.component';
import { reducers } from './store/app.reducers';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    OpenLayersComponent,
    HeaderComponent,
    CatalogComponent,
    PopupComponent,
    CategoryComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LayerEffects, CatalogEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
