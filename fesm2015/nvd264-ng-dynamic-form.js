import { tap, debounceTime, distinctUntilKeyChanged, exhaustMap, map, switchMap, takeUntil } from 'rxjs/operators';
import { isObservable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Validators, FormControl, FormGroup, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Injectable, Directive, ViewContainerRef, NgModule, Component, EventEmitter, Input, Output, ViewChildren, defineInjectable, ComponentFactoryResolver, ViewChild, inject } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const ControlTypes = {
    CHECKBOX: 'CHECKBOX',
    DROPDOWN: 'DROPDOWN',
    RADIO: 'RADIO',
    TEXTAREA: 'TEXTAREA',
    TEXTBOX: 'TEXTBOX',
    CUSTOM: 'CUSTOM',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const ErrorTypes = {
    REQUIRED: 'required',
    MIN: 'min',
    MAX: 'max',
    MIN_LENGTH: 'minlength',
    MAX_LENGTH: 'maxlength',
    EMAIL: 'email',
    PATTERN: 'pattern',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || [];
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
    /**
     * @return {?}
     */
    get isRequired() {
        return this.validators.findIndex((/**
         * @param {?} v
         * @return {?}
         */
        v => v.validate === ErrorTypes.REQUIRED)) > -1;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DropdownControl extends FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.controlType = ControlTypes.DROPDOWN;
        this.options = [];
        this.multiple = false;
        this.hideSearchBox = false;
        this.searchText = '';
        this.loading = false;
        this.searchOnServer = false;
        this.supportLoadMore = false;
        this.labelValue = options['labelValue'] || '';
        this.labelName = options['labelName'] || '';
        this.multiple = !!options['multiple'];
        this.searchText = options['searchText'] || '';
        this.hideSearchBox = !!options['hideSearchBox'];
        if (this.multiple && !Array.isArray(this.value)) {
            // convert value to array for multi select
            this.value = [this.value];
        }
        if (typeof options['onSearch'] === 'function') {
            this.onSearch = options['onSearch'];
            this.searchOnServer = true;
        }
        if (typeof options['loadMore'] === 'function') {
            this.loadMore = options['loadMore'];
            this.supportLoadMore = true;
        }
        // set options base type
        if (isObservable(options['options'])) {
            options['options'].pipe(tap((/**
             * @return {?}
             */
            () => this.loading = true))).subscribe((/**
             * @param {?} options
             * @return {?}
             */
            options => {
                this.options = options;
                this.loading = false;
            }));
        }
        else {
            this.options = options['options'] || [];
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormErrorService {
    constructor() { }
    /**
     * Map validates into instance of angular
     * @param {?} validators
     * @return {?}
     */
    getValidatesInstance(validators) {
        /** @type {?} */
        const validatorsList = [];
        for (let i = 0; i < validators.length; i++) {
            /** @type {?} */
            const validator = validators[i];
            if (validator.validate === ErrorTypes.REQUIRED) {
                validatorsList.push(Validators.required);
            }
            if (validator.validate === ErrorTypes.MIN) {
                validatorsList.push(Validators.min(validator.data));
            }
            if (validator.validate === ErrorTypes.MAX) {
                validatorsList.push(Validators.max(validator.data));
            }
            if (validator.validate === ErrorTypes.MIN_LENGTH) {
                validatorsList.push(Validators.minLength(validator.data));
            }
            if (validator.validate === ErrorTypes.MAX_LENGTH) {
                validatorsList.push(Validators.maxLength(validator.data));
            }
            if (validator.validate === ErrorTypes.EMAIL) {
                validatorsList.push(Validators.email);
            }
        }
        return validatorsList;
    }
    /**
     * Get error message base error type
     * @param {?} validators
     * @param {?} errorType
     * @return {?}
     */
    getErrorMessage(validators, errorType) {
        /** @type {?} */
        const validator = validators.find((/**
         * @param {?} v
         * @return {?}
         */
        v => v.validate === errorType));
        return validator ? validator.message : '';
    }
    /**
     * Get validate by error type
     * @param {?} validators
     * @param {?} errorType
     * @return {?}
     */
    getValidateByErrorType(validators, errorType) {
        return validators.find((/**
         * @param {?} v
         * @return {?}
         */
        v => v.validate === errorType));
    }
}
FormErrorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FormErrorService.ctorParameters = () => [];
/** @nocollapse */ FormErrorService.ngInjectableDef = defineInjectable({ factory: function FormErrorService_Factory() { return new FormErrorService(); }, token: FormErrorService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} min
 * @return {?}
 */
function minSelectedCheckboxes(min = 1) {
    /** @type {?} */
    const validator = (/**
     * @param {?} formArray
     * @return {?}
     */
    (formArray) => {
        /** @type {?} */
        const totalSelected = formArray.controls
            // get a list of checkbox values (boolean)
            .map((/**
         * @param {?} control
         * @return {?}
         */
        control => control.value))
            // total up the number of checked checkboxes
            .reduce((/**
         * @param {?} prev
         * @param {?} next
         * @return {?}
         */
        (prev, next) => (next ? prev + next : prev)), 0);
        // if the total is not greater than the minimum, return the error message
        return totalSelected >= min ? null : { required: true };
    });
    return validator;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormControlService {
    /**
     * @param {?} formErrorService
     */
    constructor(formErrorService) {
        this.formErrorService = formErrorService;
    }
    /**
     * Convert controls into form group
     * \@params controls
     * @param {?} controls
     * @return {?} form group instance
     */
    toFormGroup(controls) {
        /** @type {?} */
        const group = {};
        controls.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            if (c.controlType === ControlTypes.CHECKBOX) {
                group[c.key] = this.generateCheckboxes(c);
            }
            else {
                /** @type {?} */
                const validators = this.formErrorService.getValidatesInstance(c.validators);
                group[c.key] = new FormControl(c.value || '', validators);
            }
        }));
        return new FormGroup(group);
    }
    /**
     * Generate FormArray check boxes
     * @private
     * @param {?} control <FormControlBase>
     * @return {?} <FormArray>
     */
    generateCheckboxes(control) {
        /** @type {?} */
        const chkControls = control['options'].map((/**
         * @param {?} opt
         * @return {?}
         */
        opt => {
            // set checked for checkbox if value equal option
            /** @type {?} */
            const value = control['labelValue'] || 'value';
            /** @type {?} */
            let checked = false;
            if (Array.isArray(control.value)) {
                checked = control.value.indexOf(opt[value]) !== -1;
            }
            else {
                checked = opt[value] === control.value;
            }
            return new FormControl(checked);
        }));
        // set required validate for checkbox
        /** @type {?} */
        const validateRequired = this.formErrorService.getValidateByErrorType(control.validators, ErrorTypes.REQUIRED);
        if (validateRequired) {
            // set numbers of checked box is required
            return new FormArray(chkControls, minSelectedCheckboxes(+validateRequired.data || 1));
        }
        return new FormArray(chkControls);
    }
    /**
     * Marks all controls in a form group as touched
     * @param {?} formGroup - The form group to touch
     * @return {?}
     */
    markFormGroupTouched(formGroup) {
        ((/** @type {?} */ (Object))).values(formGroup.controls).forEach((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        }));
    }
    /**
     * Get controls data for form
     * @param {?} controls FormControlBase<any>[]
     * @return {?}
     */
    getControlsData(controls) {
        /** @type {?} */
        const result = {};
        controls.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            result[c.key] = c.value;
        }));
        return result;
    }
    /**
     * Get selected checkboxes data
     * @param {?} formData
     * @param {?} controls
     * @return {?}
     */
    getSelectedCheckboxesData(formData, controls) {
        /** @type {?} */
        let checkboxControls = controls.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => c.controlType === ControlTypes.CHECKBOX));
        if (checkboxControls.length) {
            for (let key in formData) {
                /** @type {?} */
                const control = (/** @type {?} */ (checkboxControls.find((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c.key === key))));
                if (!control) {
                    continue;
                }
                /** @type {?} */
                const options = control.options || [];
                if (formData[key].length !== options.length) {
                    throw Error(`Number of checkboxes and options doesn't equal.`);
                }
                /** @type {?} */
                const checkboxesData = [];
                for (let i = 0; i < formData[key].length; i++) {
                    if (formData[key][i] === true) {
                        checkboxesData.push(options[i][control.labelValue]);
                    }
                }
                formData[key] = checkboxesData;
            }
        }
        return formData;
    }
    /**
     * Convert checkboxes to form data
     * @param {?} checkedValues
     * @param {?} control
     * @return {?}
     */
    convertCheckboxesToFormData(checkedValues, control) {
        return control.options.map((/**
         * @param {?} checkbox
         * @return {?}
         */
        checkbox => {
            return !!(checkedValues.indexOf(checkbox[control['labelValue']]) > -1);
        }));
    }
    /**
     * Reset Selected Options From Form Data
     * @param {?} formData
     * @param {?} control
     * @param {?} controls
     * @return {?}
     */
    resetSelectedOptionsFromFormData(formData, control, controls) {
        formData = this.getSelectedCheckboxesData(formData, controls);
        /** @type {?} */
        const selectedOptions = formData[control.key];
        /** @type {?} */
        const newSelectedOptions = [];
        control.options.map((/**
         * @param {?} opt
         * @return {?}
         */
        opt => {
            if (selectedOptions.indexOf(opt[control.labelValue]) > -1) {
                // option exist on new list
                newSelectedOptions.push(opt[control.labelValue]);
            }
        }));
        return newSelectedOptions;
    }
}
FormControlService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FormControlService.ctorParameters = () => [
    { type: FormErrorService }
];
/** @nocollapse */ FormControlService.ngInjectableDef = defineInjectable({ factory: function FormControlService_Factory() { return new FormControlService(inject(FormErrorService)); }, token: FormControlService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HelperService {
    constructor() { }
    /**
     * Set scroll position into top
     * @return {?}
     */
    scrollDropdownToTop() {
        document.querySelector('.panel-searchbox').scrollTop = 0;
    }
}
HelperService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
HelperService.ctorParameters = () => [];
/** @nocollapse */ HelperService.ngInjectableDef = defineInjectable({ factory: function HelperService_Factory() { return new HelperService(); }, token: HelperService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DynamicFormComponent {
    /**
     * @param {?} formControlService
     * @param {?} helperService
     */
    constructor(formControlService, helperService) {
        this.formControlService = formControlService;
        this.helperService = helperService;
        this.controls = [];
        this.submit = new EventEmitter();
        this.unsubscribe$ = new Subject();
        this.controlTypes = ControlTypes;
        this.filterOptions$ = new Subject();
        this.loadMoreOptions$ = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.originControls = JSON.parse(JSON.stringify(this.controls));
        this.form = this.formControlService.toFormGroup(this.controls);
        this.watchFilterDropdownOptions();
        this.watchLoadMoreDropdownOptions();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // loop through and add scroll event listener for each dropdown
        this.dynamicDropdown.forEach((/**
         * @param {?} dropdown
         * @return {?}
         */
        dropdown => {
            dropdown.openedChange.pipe(takeUntil(this.unsubscribe$)).subscribe((/**
             * @param {?} isOpen
             * @return {?}
             */
            (isOpen) => {
                if (isOpen) {
                    /** @type {?} */
                    const select = dropdown._elementRef.nativeElement;
                    /** @type {?} */
                    const panel = dropdown.panel.nativeElement;
                    /** @type {?} */
                    const controlKey = select.getAttribute('data-key');
                    /** @type {?} */
                    const control = (/** @type {?} */ (this.getControl(controlKey)));
                    if (control && control.supportLoadMore) {
                        panel.addEventListener('scroll', (/**
                         * @param {?} event
                         * @return {?}
                         */
                        event => this.loadMoreOptionsOnScroll(event, control)));
                    }
                }
                else {
                    this.filterControl = null;
                    this.loadMoreControl = null;
                }
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    /**
     * Get form controls
     * @return {?}
     */
    get formControls() {
        return this.form.controls;
    }
    /**
     * Get control by key
     * @param {?} key
     * @param {?=} type ControlTypes
     * @return {?}
     */
    getControl(key, type = null) {
        return this.controls.find((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            if (type) {
                return c.key === key && c.controlType === type;
            }
            return c.key === key;
        }));
    }
    /**
     * Load more when scrolled to bottom
     * @param {?} event
     * @param {?} control
     * @return {?}
     */
    loadMoreOptionsOnScroll(event, control) {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        if ((scrollTop + clientHeight) >= scrollHeight && control.supportLoadMore) {
            this.loadMoreOptions$.next(control);
        }
    }
    /**
     * Update form data
     * @param {?} data
     * @return {?}
     */
    updateFormData(data) {
        Object.keys(data).forEach((/**
         * @param {?} controlKey
         * @return {?}
         */
        controlKey => {
            /** @type {?} */
            const checkboxControl = this.getControl(controlKey, ControlTypes.CHECKBOX);
            /** @type {?} */
            let value;
            if (checkboxControl) {
                value = this.formControlService
                    .convertCheckboxesToFormData(data[controlKey], (/** @type {?} */ (checkboxControl)));
            }
            else {
                value = data[controlKey];
            }
            if (this.form.get(controlKey)) {
                this.form.get(controlKey).setValue(value);
            }
        }));
    }
    /**
     * Reset form
     * @param {?} e
     * @return {?}
     */
    resetForm(e) {
        e.preventDefault();
        for (let i = 0; i < this.controls.length; i++) {
            if (this.controls[i] instanceof DropdownControl) {
                // override only options of dropdown
                // avoid error when function lost connect with parent
                ((/** @type {?} */ (this.controls[i]))).options = ((/** @type {?} */ (this.originControls[i]))).options;
            }
        }
        /** @type {?} */
        const formData = this.formControlService.getControlsData(this.originControls);
        this.updateFormData(formData);
    }
    /**
     * Filter options
     * @param {?} searchText
     * @param {?} control
     * @return {?}
     */
    onFilterOptions(searchText, control) {
        if (control.searchOnServer) {
            this.filterOptions$.next({
                control,
                searchText
            });
        }
        else {
            control.options.map((/**
             * @param {?} opt
             * @return {?}
             */
            opt => {
                // just set attribute hidden for selectop
                // prevent lost data
                if (opt[control.labelName].toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                    opt['hidden'] = false;
                }
                else {
                    opt['hidden'] = true;
                }
            }));
        }
    }
    /**
     * Watch filter dropdown options
     * @return {?}
     */
    watchFilterDropdownOptions() {
        this.filterOptions$.pipe(debounceTime(400), distinctUntilKeyChanged('searchText'), map((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.filterControl = value.control;
            this.filterControl.loading = true;
            this.helperService.scrollDropdownToTop();
            return value;
        })), switchMap((/**
         * @param {?} filter
         * @return {?}
         */
        filter => filter.control.onSearch(filter.searchText))), takeUntil(this.unsubscribe$)).subscribe((/**
         * @param {?} options
         * @return {?}
         */
        options => {
            if (Array.isArray(options) && this.filterControl) {
                const { key, labelValue } = this.filterControl;
                /** @type {?} */
                let formData = Object.assign({}, this.form.value);
                formData = this.formControlService.getSelectedCheckboxesData(formData, this.controls);
                /** @type {?} */
                const selectedOptionsValue = formData[key];
                /** @type {?} */
                const selectedOptions = this.filterControl.options.filter((/**
                 * @param {?} opt
                 * @return {?}
                 */
                opt => selectedOptionsValue.indexOf(opt[labelValue]) > -1));
                // remove duplicated item on selected options
                /** @type {?} */
                const newOptions = options.filter((/**
                 * @param {?} opt
                 * @return {?}
                 */
                opt => {
                    /** @type {?} */
                    const optionValue = opt[labelValue];
                    if (selectedOptions.find((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => ((/** @type {?} */ (s)))[labelValue] === optionValue))) {
                        return false;
                    }
                    return true;
                }));
                // make selected element on top of dropdown
                this.setDropdownOptions(key, [...selectedOptions, ...newOptions]);
                this.filterControl.loading = false;
            }
        }));
    }
    /**
     * Watch load more dropdown option
     * @return {?}
     */
    watchLoadMoreDropdownOptions() {
        this.loadMoreOptions$
            .pipe(debounceTime(400), map((/**
         * @param {?} control
         * @return {?}
         */
        control => {
            this.loadMoreControl = control;
            this.loadMoreControl.loading = true;
            return control;
        })), exhaustMap((/**
         * @param {?} control
         * @return {?}
         */
        control => control.loadMore(control.searchText))), takeUntil(this.unsubscribe$))
            .subscribe((/**
         * @param {?} options
         * @return {?}
         */
        options => {
            /** @type {?} */
            const dropdownControl = (/** @type {?} */ (this.getControl(this.loadMoreControl.key)));
            const { labelValue } = dropdownControl;
            if (Array.isArray(options) && options.length) {
                // filter options
                /** @type {?} */
                const filteredOptions = options.filter((/**
                 * @param {?} opt
                 * @return {?}
                 */
                opt => {
                    if (dropdownControl.options.find((/**
                     * @param {?} o
                     * @return {?}
                     */
                    o => o[labelValue] === opt[labelValue]))) {
                        return false;
                    }
                    return true;
                }));
                dropdownControl.options = [...dropdownControl.options, ...filteredOptions];
            }
            this.loadMoreControl.loading = false;
        }));
    }
    /**
     * Set dropdown options
     * @param {?} controlKey
     * @param {?} options
     * @return {?}
     */
    setDropdownOptions(controlKey, options) {
        /** @type {?} */
        const control = (/** @type {?} */ (this.getControl(controlKey, ControlTypes.DROPDOWN)));
        if (control) {
            control.options = options;
            // reset selected data from form
            /** @type {?} */
            const newSelectedOptions = this.formControlService
                .resetSelectedOptionsFromFormData(this.form.value, control, this.controls);
            this.updateFormData({
                [controlKey]: newSelectedOptions
            });
        }
    }
    /**
     * Emit form data to parent
     * @param {?} e
     * @return {?}
     */
    onSubmit(e) {
        e.preventDefault();
        if (this.form.invalid) {
            this.formControlService.markFormGroupTouched(this.form);
            return false;
        }
        /** @type {?} */
        let formData = Object.assign({}, this.form.value);
        formData = this.formControlService.getSelectedCheckboxesData(formData, this.controls);
        this.submit.emit(formData);
    }
}
DynamicFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-dynamic-form',
                template: "<form [formGroup]=\"form\" class=\"container\">\n  <!-- Form controls -->\n  <div *ngFor=\"let control of controls\" class=\"form-row\">\n    <div [ngSwitch]=\"control.controlType\">\n      <!-- Text box -->\n      <mat-form-field *ngSwitchCase=\"controlTypes.TEXTBOX\">\n        <input\n          matInput\n          [formControlName]=\"control.key\"\n          [type]=\"control['type']\"\n          [placeholder]=\"control.label\"\n          [required]=\"control.isRequired\"\n          [autocomplete]=\"control['type'] === 'password'\"\n        />\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </mat-form-field>\n      <!-- End text box -->\n\n      <!-- Textarea -->\n      <mat-form-field *ngSwitchCase=\"controlTypes.TEXTAREA\">\n        <textarea\n          matInput\n          [formControlName]=\"control.key\"\n          [placeholder]=\"control.label\"\n          [required]=\"control.isRequired\"\n        ></textarea>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </mat-form-field>\n      <!-- End textarea -->\n\n      <!-- Dropdown -->\n      <mat-form-field *ngSwitchCase=\"controlTypes.DROPDOWN\">\n        <mat-select\n          [placeholder]=\"control.label\"\n          [formControlName]=\"control.key\"\n          [required]=\"control.isRequired\"\n          [multiple]=\"control['multiple']\"\n          [attr.data-key]=\"control.key\"\n          disableOptionCentering\n          #dynamicDropdown\n          [panelClass]=\"!control['hideSearchBox'] ? 'panel-searchbox' : ''\"\n        >\n          <mat-option [class.multiple-select]=\"control['multiple']\" class=\"search-box\" *ngIf=\"!control['hideSearchBox']\" [disabled]=\"true\">\n            <input\n              matInput\n              (ngModelChange)=\"onFilterOptions($event, control)\"\n              [(ngModel)]=\"control['searchText']\"\n              [ngModelOptions]=\"{standalone: true}\"\n              placeholder=\"Enter your search text...\"\n              autocomplete=\"false\"\n              (keydown)=\"$event.stopPropagation()\"\n            >\n            <mat-progress-spinner\n              *ngIf=\"control['loading']\"\n              class=\"search-box-spinner\"\n              color=\"primary\"\n              mode=\"indeterminate\"\n              diameter=\"20\"\n            >\n            </mat-progress-spinner>\n          </mat-option>\n          <ng-container *ngFor=\"let opt of control['options']\">\n            <mat-option\n              *ngIf=\"!opt['hidden']\"\n              [value]=\"\n                control['labelValue'] ? opt[control['labelValue']] : opt.value\n              \"\n            >\n              {{ control['labelName'] ? opt[control['labelName']] : opt.label }}\n            </mat-option>\n          </ng-container>\n        </mat-select>\n      </mat-form-field>\n      <!-- End dropdown -->\n\n      <!-- Checkbox -->\n      <div *ngSwitchCase=\"controlTypes.CHECKBOX\" class=\"custom-section\">\n        <label\n          class=\"custom-mat-form-field-label\"\n          [class.required]=\"control.isRequired\"\n          >{{ control.label }}</label\n        >\n        <section [formArrayName]=\"control.key\" class=\"checkbox-section\">\n          <mat-checkbox\n            *ngFor=\"let chk of form.get(control.key)['controls']; let i = index\"\n            [formControlName]=\"i\"\n            class=\"dyn-checkbox\"\n          >\n            {{\n              control['labelName']\n                ? control['options'][i][control['labelName']]\n                : control['options'][i].label\n            }}\n          </mat-checkbox>\n        </section>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </div>\n      <!-- End checkbox -->\n\n      <!-- Radio -->\n      <div *ngSwitchCase=\"controlTypes.RADIO\" class=\"custom-section\">\n        <label\n          class=\"custom-mat-form-field-label\"\n          [class.required]=\"control.isRequired\"\n          >{{ control.label }}</label\n        >\n        <section>\n          <mat-radio-group\n            class=\"example-radio-group\"\n            [formControlName]=\"control.key\"\n          >\n            <mat-radio-button\n              class=\"dyn-radio\"\n              *ngFor=\"let opt of control['options']\"\n              [value]=\"\n                control['labelValue'] ? opt[control['labelValue']] : opt.value\n              \"\n            >\n              {{ control['labelName'] ? opt[control['labelName']] : opt.label }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </section>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </div>\n      <!-- End radio -->\n\n      <!-- Custom form field -->\n      <div *ngSwitchCase=\"controlTypes.CUSTOM\" class=\"custom-section\">\n        <custom-field [form]=\"form\" [control]=\"control\"></custom-field>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </div>\n      <!-- End Custom form field -->\n    </div>\n  </div>\n  <!-- End form controls -->\n\n  <!-- Actions -->\n  <div class=\"button-row\">\n    <button\n      mat-raised-button\n      [color]=\"actions?.submit?.color || 'primary'\"\n      (click)=\"onSubmit($event)\"\n    >\n      {{ actions?.submit?.label || 'Submit' }}\n    </button>\n\n    <button\n      mat-raised-button\n      [color]=\"actions?.reset?.color || ''\"\n      type=\"button\"\n      (click)=\"resetForm($event)\"\n    >\n      {{ actions?.reset?.label || 'Reset' }}\n    </button>\n  </div>\n  <!-- End actions -->\n</form>\n",
                styles: [".container{display:flex;flex-direction:column;font-family:Roboto,\"Helvetica Neue\",sans-serif}.container :not(button){width:100%}.button-row a,.button-row button{margin-right:8px}.form-row{margin-bottom:10px}.dyn-checkbox{margin-right:8px}.dyn-radio{margin-bottom:8px}.custom-mat-form-field-label{font-size:12px}.custom-mat-form-field-label.required::after{content:\" *\";display:inline;color:#f44336}::ng-deep .mat-option.search-box .mat-pseudo-checkbox{display:none}::ng-deep .mat-option.search-box{position:absolute;top:0;left:0;background:#fff;z-index:999;border-bottom:1px solid #e7e7e7;min-width:calc(100% + 32px)}::ng-deep .mat-option.search-box.multiple-select{min-width:calc(100% + 64px)}.panel-searchbox{-webkit-transform:none!important;transform:none!important;padding-top:48px}::ng-deep .panel-searchbox{-webkit-transform:none!important;transform:none!important;padding-top:48px!important}.search-box-spinner{position:absolute;right:14px;top:14px}.checkbox-section{display:flex;flex-direction:column}"]
            }] }
];
/** @nocollapse */
DynamicFormComponent.ctorParameters = () => [
    { type: FormControlService },
    { type: HelperService }
];
DynamicFormComponent.propDecorators = {
    controls: [{ type: Input }],
    actions: [{ type: Input }],
    submit: [{ type: Output }],
    dynamicDropdown: [{ type: ViewChildren, args: ['dynamicDropdown',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ErrorMessagesComponent {
    /**
     * @param {?} formErrorService
     */
    constructor(formErrorService) {
        this.formErrorService = formErrorService;
        this.validators = [];
        this.errorTypes = ErrorTypes;
    }
    /**
     * @param {?} errorType
     * @return {?}
     */
    getErrorMessage(errorType) {
        return this.formErrorService.getErrorMessage(this.validators, errorType);
    }
}
ErrorMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: 'error-messages',
                template: "<div class=\"errors\">\n  <div *ngIf=\"errors.required\">\n    {{ getErrorMessage(errorTypes.REQUIRED) }}\n  </div>\n  <div *ngIf=\"errors.min\">\n    {{ getErrorMessage(errorTypes.MIN) }}\n  </div>\n  <div *ngIf=\"errors.max\">\n    {{ getErrorMessage(errorTypes.MAX) }}\n  </div>\n  <div *ngIf=\"errors.minlength\">\n    {{ getErrorMessage(errorTypes.MIN_LENGTH) }}\n  </div>\n  <div *ngIf=\"errors.maxlength\">\n    {{ getErrorMessage(errorTypes.MAX_LENGTH) }}\n  </div>\n  <div *ngIf=\"errors.email\">\n    {{ getErrorMessage(errorTypes.EMAIL) }}\n  </div>\n  <div *ngIf=\"errors.pattern\">\n    {{ getErrorMessage(errorTypes.PATTERN) }}\n  </div>\n</div>\n",
                styles: [".errors{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}"]
            }] }
];
/** @nocollapse */
ErrorMessagesComponent.ctorParameters = () => [
    { type: FormErrorService }
];
ErrorMessagesComponent.propDecorators = {
    errors: [{ type: Input }],
    validators: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DynamicFieldDirective {
    /**
     * @param {?} viewContainerRef
     */
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
DynamicFieldDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appDynamicField]'
            },] }
];
/** @nocollapse */
DynamicFieldDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CustomFieldControl extends FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.controlType = ControlTypes.CUSTOM;
        if (options['component']) {
            this.component = options['component'];
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CustomFieldComponent {
    /**
     * @param {?} componentFactoryResolver
     */
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadComponent();
    }
    /**
     * @return {?}
     */
    loadComponent() {
        /** @type {?} */
        let componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(this.control.component);
        /** @type {?} */
        let viewContainerRef = this.customFieldHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        let componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance['form'] = this.form;
        componentRef.instance['controlKey'] = this.control.key;
    }
}
CustomFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'custom-field',
                template: "<div [formGroup]=\"form\">\n    <ng-template appDynamicField></ng-template>\n</div>\n\n",
                styles: [""]
            }] }
];
/** @nocollapse */
CustomFieldComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
CustomFieldComponent.propDecorators = {
    form: [{ type: Input }],
    control: [{ type: Input }],
    customFieldHost: [{ type: ViewChild, args: [DynamicFieldDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DynamicFormModule {
}
DynamicFormModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DynamicFormComponent,
                    ErrorMessagesComponent,
                    DynamicFieldDirective,
                    CustomFieldComponent
                ],
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    CommonModule,
                    // BrowserAnimationsModule,
                    MatInputModule,
                    MatSelectModule,
                    MatCheckboxModule,
                    MatRadioModule,
                    MatButtonModule,
                    MatProgressSpinnerModule
                ],
                exports: [DynamicFormComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CheckboxControl extends FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.controlType = ControlTypes.CHECKBOX;
        this.options = [];
        this.labelValue = options['labelValue'] || '';
        this.labelName = options['labelName'] || '';
        this.options = options['options'] || [];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RadioGroupControl extends FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.controlType = ControlTypes.RADIO;
        this.options = [];
        this.labelValue = options['labelValue'] || '';
        this.labelName = options['labelName'] || '';
        this.options = options['options'] || [];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TextareaControl extends FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.controlType = ControlTypes.TEXTAREA;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TextboxControl extends FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.controlType = ControlTypes.TEXTBOX;
        // set type for text box
        // exam: text, number...
        this.type = options['type'] || '';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DynamicFormComponent, DynamicFormModule, CheckboxControl, DropdownControl, FormControlBase, RadioGroupControl, TextareaControl, TextboxControl, CustomFieldControl, ErrorTypes, DynamicFieldDirective as ɵe, CustomFieldComponent as ɵf, ErrorMessagesComponent as ɵd, FormControlService as ɵa, FormErrorService as ɵb, HelperService as ɵc };

//# sourceMappingURL=nvd264-ng-dynamic-form.js.map