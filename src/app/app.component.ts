import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { ValidatorMessageFn } from './validation-line/validation-errors.pipe';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    modelVal = 'val1';
    formControl = new FormControl('val2', [ Validators.required, this.required2Validator ], [ this.asyncValidator ]);
    form = new FormGroup({
        foo: new FormControl('val3', [ Validators.required ]),
        bar: new FormControl('bar'),
    }, this.foobarValidator);


    validationMessages: { [ validator: string ]: ValidatorMessageFn } = {
        required: () => 'NOPE You cannot leave me empty',
        bar: () => 'bar failed',
        helloworld: () => 'If first input is hello the second must not be bar',
        required2: () => 'Also required, but different',
    };

    asyncValidator(control: FormControl): Observable<ValidationErrors> {
        return of(control.value === 'bar' ? { 'bar': true } : null)
            .pipe(
                delay(500),
            );
    }

    foobarValidator(control: AbstractControl): ValidationErrors {
        const foo = control.get('foo');
        const bar = control.get('bar');

        if (foo.value === 'hello' && bar.value === 'world') {
            return { 'helloworld': true };
        }
        return null;
    }

    required2Validator(control: AbstractControl): ValidationErrors {
        if (!control.value) {
            return { required2: true };
        }
        return null;
    }
}
