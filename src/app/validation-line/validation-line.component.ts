import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidatorMessageFn } from './validation-errors.pipe';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-validation-line',
    templateUrl: './validation-line.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppValidationLineComponent implements OnInit, OnDestroy {
    @Input() control: AbstractControl;
    @Input() note: string;
    @Input() validationMessages: { [ validator: string ]: ValidatorMessageFn } = {};

    subscriptions = new Subscription();

    constructor(
        private cdr: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        if (!this.control) {
            return;
        }

        this.subscriptions.add(this.control.statusChanges.subscribe(() => this.cdr.markForCheck()));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
