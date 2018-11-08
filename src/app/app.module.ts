import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppInputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppValidationLineComponent } from './validation-line/validation-line.component';
import { ValidationErrorsPipe } from './validation-line/validation-errors.pipe';

@NgModule({
    declarations: [
        AppComponent,
        AppInputComponent,
        AppValidationLineComponent,
        ValidationErrorsPipe,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
