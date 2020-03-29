import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GyDynamicFormComponent } from './gy-dynamic-form.component';
import { DynamicFieldDirective } from './components/dynamic-field.directive';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { CheckboxValuePosterService } from './service/checkbox-value-poster.service';

import { ZrValidationMessageModule } from 'zr-validation-message';

@NgModule({
  declarations: [
    GyDynamicFormComponent,
    DynamicFieldDirective,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    FormRadioComponent,
    FormCheckboxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ZrValidationMessageModule
  ],
  exports: [
    GyDynamicFormComponent,
  ],
  entryComponents: [
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    FormCheckboxComponent,
    FormRadioComponent
  ],
  providers: [CheckboxValuePosterService]
})
export class GyDynamicFormModule { }
