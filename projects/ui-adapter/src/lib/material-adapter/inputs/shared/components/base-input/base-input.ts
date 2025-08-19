import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { InputAttributeConfig, InputFieldConfig, InputErrorMessageConfig } from '../../types';

const defaultInputFieldConfig: InputFieldConfig = {
  appearance: 'outline',
  color: 'primary',
};

@Component({
  selector: 'lib-base-input',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseInput<
  Config extends InputFieldConfig = InputFieldConfig,
  Attribute extends InputAttributeConfig = InputAttributeConfig,
  ErrorMessage extends InputErrorMessageConfig = InputErrorMessageConfig
> {

  @Input({ required: true }) attribute?: Attribute;
  @Input() errorMessage?: ErrorMessage;
  @Input() inputConfig?: Config;
  @Input() disabled: boolean = false;

  @Output() blurred = new EventEmitter<FocusEvent>();

  constructor(@Optional() protected readonly ngControl: NgControl) { }

  get mergedConfig(): Pick<Required<Config>, 'appearance' | 'color'>  & Omit<Config, 'appearance' | 'color'> {
    return {
      ...defaultInputFieldConfig,
      ...this.inputConfig,
    } as Pick<Required<Config>, 'appearance' | 'color'>  & Omit<Config, 'appearance' | 'color'>;
  }

  get key(): string {
    if (!this.attribute?.key) {
      throw new Error('Attribute key is missing');
    }
    return this.attribute?.key;
  }

  get readonly(): boolean {
    return !!this.mergedConfig?.readonly;
  }

  onBlur(event: FocusEvent): void {
    this.blurred.emit(event);
  }

}
