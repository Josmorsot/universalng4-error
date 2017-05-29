import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';
import { BrowserModule } from '@angular/platform-browser';

import { AppModule, AppComponent } from '../+app/app.module';
import { SharedModule } from '../+app/shared/shared.module';
import { CacheService } from '../+app/shared/cache.service';

// Will be merged into @angular/platform-browser in a later release
// see https://github.com/angular/angular/pull/12322

// import * as LRU from 'modern-lru';

export function getLRU(lru?: any) {
  // use LRU for node
  // return lru || new LRU(10);
  return lru || new Map();
}


// TODO(gdi2290): refactor into Universal
export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule.withServerTransition({ 
      appId: 'my-app-id' // <-- 
    }),

    FormsModule,
    RouterModule.forRoot([], { useHash: false, preloadingStrategy: IdlePreload }),
    IdlePreloadModule.forRoot(),
    SharedModule.forRoot(),
    AppModule,
  ],
  providers: [
    { provide: 'LRU', useFactory: getLRU, deps: [] },
    { provide: LocationStrategy, useClass: PathLocationStrategy},

    CacheService,
  ]
})
export class MainModule {
  constructor(public cache: CacheService) {
    // TODO(gdi2290): refactor into a lifecycle hook
    this.doRehydrate();
  }

  doRehydrate() {
    let defaultValue = {};
    let serverCache = this._getCacheValue(CacheService.KEY, defaultValue);
    this.cache.rehydrate(serverCache);
  }

  _getCacheValue(key: string, defaultValue: any): any {
    // browser
    const win: any = window;
    if (win[UNIVERSAL_KEY] && win[UNIVERSAL_KEY][key]) {
      let serverCache = defaultValue;
      try {
        serverCache = JSON.parse(win[UNIVERSAL_KEY][key]);
        if (typeof serverCache !== typeof defaultValue) {
          console.log('Angular Universal: The type of data from the server is different from the default value type');
          serverCache = defaultValue;
        }
      } catch (e) {
        console.log('Angular Universal: There was a problem parsing the server data during rehydrate');
        serverCache = defaultValue;
      }
      return serverCache;
    } else {
      console.log('Angular Universal: UNIVERSAL_CACHE is missing');
    }
    return defaultValue;
  }
}
