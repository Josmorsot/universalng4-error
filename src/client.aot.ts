import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { bootloader } from '@angularclass/bootloader';
// for AoT use platformBrowser
// import { platformUniversalDynamic } from 'angular2-universal/browser';

import { load as loadWebFont } from 'webfontloader';

// enable prod for faster renders
enableProdMode();

import { MainModuleNgFactory } from './platform-modules/browser.module.ngfactory';


// on document ready bootstrap Angular 2
export function main():any {
  // Load fonts async
  // https://github.com/typekit/webfontloader#configuration
  loadWebFont({
    google: {
      families: ['Droid Sans']
    }
  });

  return platformBrowser().bootstrapModuleFactory(MainModuleNgFactory);
}

// support async tag or hmr
bootloader(main);
