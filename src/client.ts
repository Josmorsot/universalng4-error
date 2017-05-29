import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/bootloader';

import { load as loadWebFont } from 'webfontloader';

// enableProdMode();

import { MainModule } from './platform-modules/browser.module';

export function main():any{
  loadWebFont({
    google: {
      families: ['Roboto Condensed']
    }
  });
  return platformBrowserDynamic().bootstrapModule(MainModule);
}
bootloader(main);