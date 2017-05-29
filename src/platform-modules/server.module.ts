import { NgModule, APP_BOOTSTRAP_LISTENER, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';

import { AppModule, AppComponent } from '../+app/app.module';
import { SharedModule } from '../+app/shared/shared.module';
import { CacheService } from '../+app/shared/cache.service';


export function getLRU() {
  return new Map();
}
export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

@NgModule({
  bootstrap: [AppComponent],
  providers: [
    { provide: 'LRU', useFactory: getLRU, deps: [] },
    CacheService
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    RouterModule.forRoot([], { useHash: false }),
    ServerModule,
    AppModule
  ]
})
export class ServerAppModule {
  constructor(cacheService:CacheService){}
}