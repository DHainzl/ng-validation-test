import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors, Validators } from '@angular/forms';

export type ValidatorMessageFn = (validatorParams: any) => string;

@Pipe({
    name: 'validationErrors',
})
export class ValidationErrorsPipe implements PipeTransform {
    private static readonly angularValidators: { [ key: string ]: ValidatorMessageFn } = {
        min: ({ min, actual }) => `NG: Required min value of ${min}, got ${actual}`,
        max: ({ max, actual }) => `NG: Required max value of ${max}, got ${actual}`,
        required: () => `NG: Required field.`,
        email: () => `NG: This is not a valid email address.`,
        minlength: ({ requiredLength, actualLength }) => `NG: Please enter at least ${requiredLength} chars`,
        maxlength: ({ requiredLength, actualLength }) => `NG: Please enter max ${requiredLength} chars`,
        pattern: ({ requiredPattern, actualvalue }) => `NG: The value you entered does not match the pattern ${requiredPattern}`,
    };

    private static readonly libValidators: { [ key: string ]: ValidatorMessageFn } = {
        foobar: () => `LIB: Value must not be foo`,
        minlength: (length) => `LIB: Please enter at least ${length} characters.`,
    };

    transform(errors: ValidationErrors, customValidators: { [ key: string ]: ValidatorMessageFn }): string {
        if (!errors) {
            return '';
        }

        const stringMap = Object.assign({}, ValidationErrorsPipe.angularValidators, ValidationErrorsPipe.libValidators, customValidators);

        const errorMessages = Object.keys(errors).map(validator => {
            return stringMap[validator] ? stringMap[validator](errors[validator]) : `Generic error: ${validator}`;
        });

        // Only show the first error
        return errorMessages.length ? errorMessages[0] : '';
    }
}
