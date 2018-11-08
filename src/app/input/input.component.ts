import { Component, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { ValidatorMessageFn } from '../validation-line/validation-errors.pipe';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AppInputComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AppInputComponent),
            multi: true,
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppInputComponent implements ControlValueAccessor, Validator {
    @Input() validationControl: AbstractControl;
    @Input() note: string;
    @Input() validationMessages: { [ validator: string ]: ValidatorMessageFn } = {};

    value = '';
    disabled = false;

    onChanged = (_: any) => {};
    onTouched = (_: any) => {};

    writeValue(obj: any): void {
        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onBlur() {
        this.onTouched(undefined);
    }

    onValueChange(newValue) {
        this.value = newValue;
        this.onChanged(newValue);
    }

    validate(control: AbstractControl): ValidationErrors {
        if (control.value === 'foo') {
            return { foobar: true };
        }
        return null;
    }
}
