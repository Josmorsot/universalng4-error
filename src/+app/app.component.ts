import { Component, Directive, ElementRef, Renderer, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  template: `
      <input type="text" [(ngModel)]="title">
      {{title}}
  `
})
export class AppComponent {
  title = 'ftw';
}
