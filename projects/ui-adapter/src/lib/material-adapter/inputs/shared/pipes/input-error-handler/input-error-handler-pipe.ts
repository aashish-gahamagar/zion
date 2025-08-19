import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { InputErrorMessageConfig } from '../../types';

interface ErrorMessageRule<T extends InputErrorMessageConfig = InputErrorMessageConfig> {
  errorMessage: T;
  priorityErrorKeys: string[];
}

@Pipe({
  name: 'inputErrorHandler'
})
export class InputErrorHandlerPipe<
  T extends InputErrorMessageConfig = InputErrorMessageConfig
> implements PipeTransform {

  transform(
    validationErrors: ValidationErrors | null,
    errorMessageRule: ErrorMessageRule<T>
  ): string | null {
    if (!errorMessageRule.errorMessage || !validationErrors) {
      return null;
    }
    const errorKeys = this.#getErrorKeys(validationErrors);
    return this.#getErrorMessage(errorKeys, errorMessageRule);
  }

  #getErrorKeys(errors: Record<string, unknown>): string[] {
    return Object.keys(errors);
  }

  #getErrorMessage(
    errorKeys: string[],
    rule: ErrorMessageRule<T>
  ): string | null {
    if (rule.priorityErrorKeys?.length) {
      const priorityMessage = this.#findMatchingErrorMessage(
        rule.priorityErrorKeys,
        errorKeys,
        rule.errorMessage
      );

      if (priorityMessage) {
        return priorityMessage
      }
    }

    return this.#findMatchingErrorMessage(
      this.#getErrorKeys(rule.errorMessage),
      errorKeys,
      rule.errorMessage
    );
  }

  #findMatchingErrorMessage(
    priorityErrorKeys: string[],
    formErrorKeys: string[],
    errorMessages: T
  ): string | null {
    const matchingKey = priorityErrorKeys.find(
      (key) => formErrorKeys.includes(key) && errorMessages[key]
    );
    return matchingKey ? errorMessages[matchingKey] : null
  }

}
