import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Directive, ElementRef, Inject, NgZone, Optional, Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MAT_INPUT_VALUE_ACCESSOR, MatInput } from '@angular/material/input';

/**
 * Custom directive that extends Angular Material's MatInput,
 * allowing it to be used with a custom selector (`customMatInput`).
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[customMatInput], textarea[customMatInput]',
  exportAs: 'customMatInput',
  standalone: true,
  providers: [
    { provide: MatFormFieldControl, useExisting: CustomMatInputDirective }
  ],
})
export class CustomMatInputDirective extends MatInput {
  constructor(
    elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    platform: Platform,
    @Optional() ngControl: NgControl,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    errorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() @Inject(MAT_INPUT_VALUE_ACCESSOR) inputValueAccessor: unknown,
    autofillMonitor: AutofillMonitor,
    ngZone: NgZone,
    @Optional() @Inject(MAT_FORM_FIELD) protected override _formField?: MatFormField
  ) {
    super(
      elementRef,
      platform,
      ngControl,
      parentForm,
      parentFormGroup,
      errorStateMatcher,
      inputValueAccessor,
      autofillMonitor,
      ngZone,
      _formField
    );
  }
}
