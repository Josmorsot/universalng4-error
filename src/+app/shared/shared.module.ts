import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

////////////////////////////////////////////////////////////////////////////
// Shared Components Imports                                              //
////////////////////////////////////////////////////////////////////////////
/*import { RaddarSelectComponent } from './elements/select.component'*/

const MODULES = [
  MaterialModule,
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule
];

const PIPES = [
  // put pipes here
];

const COMPONENTS = [
  /*RaddarSelectComponent*/
];

const PROVIDERS = [
]

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
