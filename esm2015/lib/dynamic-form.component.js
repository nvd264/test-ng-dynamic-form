/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
import { ControlTypes } from '../enums/control-types.enum';
import { debounceTime, distinctUntilKeyChanged, exhaustMap, map, switchMap, takeUntil } from 'rxjs/operators';
import { DropdownControl } from './../models/DropdownControl';
import { FormControlService } from './../services/form-control.service';
import { HelperService } from '../services/helper.service';
import { Subject } from 'rxjs';
export class DynamicFormComponent {
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
                styles: [".container{display:flex;flex-direction:column;font-family:Roboto,\"Helvetica Neue\",sans-serif;max-width:100%!important}.container :not(button){width:100%}.button-row a,.button-row button{margin-right:8px}.form-row{margin-bottom:10px}.dyn-checkbox{margin-right:8px}.dyn-radio{margin-bottom:8px}.custom-mat-form-field-label{font-size:12px}.custom-mat-form-field-label.required::after{content:\" *\";display:inline;color:#f44336}::ng-deep .mat-option.search-box .mat-pseudo-checkbox{display:none}::ng-deep .mat-option.search-box{position:absolute;top:0;left:0;background:#fff;z-index:999;border-bottom:1px solid #e7e7e7;min-width:calc(100% + 32px)}::ng-deep .mat-option.search-box.multiple-select{min-width:calc(100% + 64px)}.panel-searchbox{-webkit-transform:none!important;transform:none!important;padding-top:48px}::ng-deep .panel-searchbox{-webkit-transform:none!important;transform:none!important;padding-top:48px!important}.search-box-spinner{position:absolute;right:14px;top:14px}.checkbox-section{display:flex;flex-direction:column}"]
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
if (false) {
    /** @type {?} */
    DynamicFormComponent.prototype.controls;
    /** @type {?} */
    DynamicFormComponent.prototype.actions;
    /** @type {?} */
    DynamicFormComponent.prototype.submit;
    /** @type {?} */
    DynamicFormComponent.prototype.dynamicDropdown;
    /** @type {?} */
    DynamicFormComponent.prototype.unsubscribe$;
    /** @type {?} */
    DynamicFormComponent.prototype.form;
    /** @type {?} */
    DynamicFormComponent.prototype.controlTypes;
    /** @type {?} */
    DynamicFormComponent.prototype.originControls;
    /** @type {?} */
    DynamicFormComponent.prototype.filterOptions$;
    /** @type {?} */
    DynamicFormComponent.prototype.filterControl;
    /** @type {?} */
    DynamicFormComponent.prototype.loadMoreOptions$;
    /** @type {?} */
    DynamicFormComponent.prototype.loadMoreControl;
    /**
     * @type {?}
     * @private
     */
    DynamicFormComponent.prototype.formControlService;
    /**
     * @type {?}
     * @private
     */
    DynamicFormComponent.prototype.helperService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BudmQyNjQvbmctZHluYW1pYy1mb3JtLyIsInNvdXJjZXMiOlsibGliL2R5bmFtaWMtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQ0wsWUFBWSxFQUNaLHVCQUF1QixFQUN2QixVQUFVLEVBQ1YsR0FBRyxFQUNILFNBQVMsRUFDVCxTQUFTLEVBRVYsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSTNELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFPL0IsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFlL0IsWUFDVSxrQkFBc0MsRUFDdEMsYUFBNEI7UUFENUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWhCN0IsYUFBUSxHQUEyQixFQUFFLENBQUM7UUFFckMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFHM0MsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBRWxDLGlCQUFZLEdBQUcsWUFBWSxDQUFDO1FBRTVCLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFFaEQscUJBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7SUFNbEQsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsK0RBQStEO1FBQy9ELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTzs7OztRQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3RDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUN4QixTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUM3QixDQUFDLFNBQVM7Ozs7WUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNyQixJQUFJLE1BQU0sRUFBRTs7MEJBQ0osTUFBTSxHQUFnQixRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWE7OzBCQUN4RCxLQUFLLEdBQWdCLFFBQVEsQ0FBQyxLQUFLLENBQUMsYUFBYTs7MEJBQ2pELFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzs7MEJBQzVDLE9BQU8sR0FBRyxtQkFBaUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQTtvQkFDNUQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRTt3QkFDdEMsS0FBSyxDQUFDLGdCQUFnQixDQUNwQixRQUFROzs7O3dCQUNSLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUNuQyxLQUFLLEVBQUUsT0FBTyxDQUNmLEVBQUMsQ0FBQztxQkFDTjtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7aUJBQzdCO1lBQ0gsQ0FBQyxFQUFDLENBQUE7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBS0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUM1QixDQUFDOzs7Ozs7O0lBT0QsVUFBVSxDQUFDLEdBQVcsRUFBRSxJQUFJLEdBQUcsSUFBSTtRQUNqQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLElBQUksSUFBSSxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUM7YUFDaEQ7WUFDRCxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDO1FBQ3ZCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQU9ELHVCQUF1QixDQUFDLEtBQUssRUFBRSxPQUF3QjtjQUMvQyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU07UUFDOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxZQUFZLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRTtZQUN6RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsY0FBYyxDQUFDLElBQVk7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBVSxDQUFDLEVBQUU7O2tCQUMvQixlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQzs7Z0JBQ3RFLEtBQUs7WUFDVCxJQUFJLGVBQWUsRUFBRTtnQkFDbkIsS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0I7cUJBQzVCLDJCQUEyQixDQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsbUJBQWlCLGVBQWUsRUFBQSxDQUNuRCxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMxQjtZQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBTUQsU0FBUyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxlQUFlLEVBQUU7Z0JBQy9DLG9DQUFvQztnQkFDcEMscURBQXFEO2dCQUNyRCxDQUFDLG1CQUFpQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFBLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxtQkFBaUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBQSxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQ2pHO1NBQ0Y7O2NBQ0ssUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7Ozs7SUFPRCxlQUFlLENBQUMsVUFBa0IsRUFBRSxPQUF3QjtRQUMxRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZCLE9BQU87Z0JBQ1AsVUFBVTthQUNYLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUc7Ozs7WUFBQyxHQUFHLENBQUMsRUFBRTtnQkFDeEIseUNBQXlDO2dCQUN6QyxvQkFBb0I7Z0JBQ3BCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQy9FLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZCO3FCQUFNO29CQUNMLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQ3RCO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7O0lBS0QsMEJBQTBCO1FBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxFQUNyQyxHQUFHOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUN6QyxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsRUFBQyxFQUNGLFNBQVM7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBQyxFQUMvRCxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUM3QixDQUFDLFNBQVM7Ozs7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNwQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtzQkFDMUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWE7O29CQUMxQyxRQUFRLHFCQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFO2dCQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O3NCQUVoRixvQkFBb0IsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDOztzQkFDcEMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU07Ozs7Z0JBQ3ZELEdBQUcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUMxRDs7O3NCQUdLLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTTs7OztnQkFBQyxHQUFHLENBQUMsRUFBRTs7MEJBQ2hDLFdBQVcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO29CQUNuQyxJQUFJLGVBQWUsQ0FBQyxJQUFJOzs7O29CQUFDLENBQUMsQ0FBQyxFQUFFLENBQzNCLENBQUMsbUJBQWlCLENBQUMsRUFBQSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssV0FBVyxFQUFDLEVBQ2pEO3dCQUNBLE9BQU8sS0FBSyxDQUFDO3FCQUNkO29CQUNELE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUMsRUFBQztnQkFDRiwyQ0FBMkM7Z0JBQzNDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLGVBQWUsRUFBRSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUNwQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFLRCw0QkFBNEI7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQjthQUNsQixJQUFJLENBQ0gsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixHQUFHOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDWixJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztZQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEMsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxFQUFDLEVBQ0YsVUFBVTs7OztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsRUFDM0QsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDN0I7YUFDQSxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7O2tCQUNiLGVBQWUsR0FBRyxtQkFBaUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFBO2tCQUM1RSxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQWU7WUFDdEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7OztzQkFFdEMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxNQUFNOzs7O2dCQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSTs7OztvQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUMsRUFBRTt3QkFDeEUsT0FBTyxLQUFLLENBQUM7cUJBQ2Q7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQyxFQUFDO2dCQUNGLGVBQWUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQzthQUM1RTtZQUNELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN2QyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7Ozs7SUFPRCxrQkFBa0IsQ0FBQyxVQUFrQixFQUFFLE9BQWM7O2NBQzdDLE9BQU8sR0FBRyxtQkFBaUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFBO1FBQ25GLElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7OztrQkFHcEIsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQjtpQkFDL0MsZ0NBQWdDLENBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUNmLE9BQU8sRUFDUCxJQUFJLENBQUMsUUFBUSxDQUNkO1lBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDbEIsQ0FBQyxVQUFVLENBQUMsRUFBRSxrQkFBa0I7YUFDakMsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDOzs7Ozs7SUFNRCxRQUFRLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEQsT0FBTyxLQUFLLENBQUM7U0FDZDs7WUFFRyxRQUFRLHFCQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFO1FBQ3JDLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMseUJBQXlCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7WUFoUkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHNsTkFBNEM7O2FBRTdDOzs7O1lBWFEsa0JBQWtCO1lBQ2xCLGFBQWE7Ozt1QkFZbkIsS0FBSztzQkFDTCxLQUFLO3FCQUNMLE1BQU07OEJBQ04sWUFBWSxTQUFDLGlCQUFpQjs7OztJQUgvQix3Q0FBK0M7O0lBQy9DLHVDQUE4Qjs7SUFDOUIsc0NBQTJDOztJQUMzQywrQ0FBMEQ7O0lBRTFELDRDQUFrQzs7SUFDbEMsb0NBQWdCOztJQUNoQiw0Q0FBNEI7O0lBQzVCLDhDQUF1Qzs7SUFDdkMsOENBQWdEOztJQUNoRCw2Q0FBK0I7O0lBQy9CLGdEQUFrRDs7SUFDbEQsK0NBQWlDOzs7OztJQUcvQixrREFBOEM7Ozs7O0lBQzlDLDZDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkcmVuXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hlY2tib3hDb250cm9sIH0gZnJvbSAnLi4vbW9kZWxzL0NoZWNrYm94Q29udHJvbCc7XG5pbXBvcnQgeyBDb250cm9sVHlwZXMgfSBmcm9tICcuLi9lbnVtcy9jb250cm9sLXR5cGVzLmVudW0nO1xuaW1wb3J0IHtcbiAgZGVib3VuY2VUaW1lLFxuICBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZCxcbiAgZXhoYXVzdE1hcCxcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG4gIHRha2VVbnRpbCxcbiAgZmluYWxpemVcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRHJvcGRvd25Db250cm9sIH0gZnJvbSAnLi8uLi9tb2RlbHMvRHJvcGRvd25Db250cm9sJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1Db250cm9sQmFzZSB9IGZyb20gJy4vLi4vbW9kZWxzL0Zvcm1Db250cm9sQmFzZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2Zvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJRHluYW1pY09wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL0lEeW5hbWljT3B0aW9ucyc7XG5pbXBvcnQgeyBJRm9ybUFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvSUZvcm1BY3Rpb24nO1xuaW1wb3J0IHsgTWF0U2VsZWN0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZHluYW1pYy1mb3JtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtZm9ybS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2R5bmFtaWMtZm9ybS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBjb250cm9sczogRm9ybUNvbnRyb2xCYXNlPGFueT5bXSA9IFtdO1xuICBASW5wdXQoKSBhY3Rpb25zOiBJRm9ybUFjdGlvbjtcbiAgQE91dHB1dCgpIHN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAVmlld0NoaWxkcmVuKCdkeW5hbWljRHJvcGRvd24nKSBkeW5hbWljRHJvcGRvd24gITogYW55W107XG5cbiAgdW5zdWJzY3JpYmUkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBmb3JtOiBGb3JtR3JvdXA7XG4gIGNvbnRyb2xUeXBlcyA9IENvbnRyb2xUeXBlcztcbiAgb3JpZ2luQ29udHJvbHM6IEZvcm1Db250cm9sQmFzZTxhbnk+W107XG4gIGZpbHRlck9wdGlvbnMkID0gbmV3IFN1YmplY3Q8SUR5bmFtaWNPcHRpb25zPigpO1xuICBmaWx0ZXJDb250cm9sOiBEcm9wZG93bkNvbnRyb2w7XG4gIGxvYWRNb3JlT3B0aW9ucyQgPSBuZXcgU3ViamVjdDxEcm9wZG93bkNvbnRyb2w+KCk7XG4gIGxvYWRNb3JlQ29udHJvbDogRHJvcGRvd25Db250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybUNvbnRyb2xTZXJ2aWNlOiBGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBoZWxwZXJTZXJ2aWNlOiBIZWxwZXJTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9yaWdpbkNvbnRyb2xzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmNvbnRyb2xzKSk7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQ29udHJvbFNlcnZpY2UudG9Gb3JtR3JvdXAodGhpcy5jb250cm9scyk7XG5cbiAgICB0aGlzLndhdGNoRmlsdGVyRHJvcGRvd25PcHRpb25zKCk7XG4gICAgdGhpcy53YXRjaExvYWRNb3JlRHJvcGRvd25PcHRpb25zKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gbG9vcCB0aHJvdWdoIGFuZCBhZGQgc2Nyb2xsIGV2ZW50IGxpc3RlbmVyIGZvciBlYWNoIGRyb3Bkb3duXG4gICAgdGhpcy5keW5hbWljRHJvcGRvd24uZm9yRWFjaChkcm9wZG93biA9PiB7XG4gICAgICBkcm9wZG93bi5vcGVuZWRDaGFuZ2UucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUkKVxuICAgICAgKS5zdWJzY3JpYmUoKGlzT3BlbikgPT4ge1xuICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0OiBIVE1MRWxlbWVudCA9IGRyb3Bkb3duLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgcGFuZWw6IEhUTUxFbGVtZW50ID0gZHJvcGRvd24ucGFuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBjb250cm9sS2V5ID0gc2VsZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcbiAgICAgICAgICBjb25zdCBjb250cm9sID0gPERyb3Bkb3duQ29udHJvbD50aGlzLmdldENvbnRyb2woY29udHJvbEtleSk7XG4gICAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5zdXBwb3J0TG9hZE1vcmUpIHtcbiAgICAgICAgICAgIHBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICdzY3JvbGwnLFxuICAgICAgICAgICAgICBldmVudCA9PiB0aGlzLmxvYWRNb3JlT3B0aW9uc09uU2Nyb2xsKFxuICAgICAgICAgICAgICAgIGV2ZW50LCBjb250cm9sXG4gICAgICAgICAgICAgICkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmZpbHRlckNvbnRyb2wgPSBudWxsO1xuICAgICAgICAgIHRoaXMubG9hZE1vcmVDb250cm9sID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmUkLm5leHQoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmb3JtIGNvbnRyb2xzXG4gICAqL1xuICBnZXQgZm9ybUNvbnRyb2xzKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm0uY29udHJvbHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbnRyb2wgYnkga2V5XG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHR5cGUgQ29udHJvbFR5cGVzXG4gICAqL1xuICBnZXRDb250cm9sKGtleTogc3RyaW5nLCB0eXBlID0gbnVsbCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xzLmZpbmQoYyA9PiB7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICByZXR1cm4gYy5rZXkgPT09IGtleSAmJiBjLmNvbnRyb2xUeXBlID09PSB0eXBlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGMua2V5ID09PSBrZXk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBtb3JlIHdoZW4gc2Nyb2xsZWQgdG8gYm90dG9tXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgbG9hZE1vcmVPcHRpb25zT25TY3JvbGwoZXZlbnQsIGNvbnRyb2w6IERyb3Bkb3duQ29udHJvbCkge1xuICAgIGNvbnN0IHsgc2Nyb2xsVG9wLCBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodCB9ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmICgoc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0KSA+PSBzY3JvbGxIZWlnaHQgJiYgY29udHJvbC5zdXBwb3J0TG9hZE1vcmUpIHtcbiAgICAgIHRoaXMubG9hZE1vcmVPcHRpb25zJC5uZXh0KGNvbnRyb2wpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZm9ybSBkYXRhXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICB1cGRhdGVGb3JtRGF0YShkYXRhOiBPYmplY3QpIHtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGNvbnRyb2xLZXkgPT4ge1xuICAgICAgY29uc3QgY2hlY2tib3hDb250cm9sID0gdGhpcy5nZXRDb250cm9sKGNvbnRyb2xLZXksIENvbnRyb2xUeXBlcy5DSEVDS0JPWCk7XG4gICAgICBsZXQgdmFsdWU7XG4gICAgICBpZiAoY2hlY2tib3hDb250cm9sKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5mb3JtQ29udHJvbFNlcnZpY2VcbiAgICAgICAgICAuY29udmVydENoZWNrYm94ZXNUb0Zvcm1EYXRhKFxuICAgICAgICAgICAgZGF0YVtjb250cm9sS2V5XSwgPENoZWNrYm94Q29udHJvbD5jaGVja2JveENvbnRyb2xcbiAgICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBkYXRhW2NvbnRyb2xLZXldO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZm9ybS5nZXQoY29udHJvbEtleSkpIHtcbiAgICAgICAgdGhpcy5mb3JtLmdldChjb250cm9sS2V5KS5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgZm9ybVxuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgcmVzZXRGb3JtKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRyb2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5jb250cm9sc1tpXSBpbnN0YW5jZW9mIERyb3Bkb3duQ29udHJvbCkge1xuICAgICAgICAvLyBvdmVycmlkZSBvbmx5IG9wdGlvbnMgb2YgZHJvcGRvd25cbiAgICAgICAgLy8gYXZvaWQgZXJyb3Igd2hlbiBmdW5jdGlvbiBsb3N0IGNvbm5lY3Qgd2l0aCBwYXJlbnRcbiAgICAgICAgKDxEcm9wZG93bkNvbnRyb2w+dGhpcy5jb250cm9sc1tpXSkub3B0aW9ucyA9ICg8RHJvcGRvd25Db250cm9sPnRoaXMub3JpZ2luQ29udHJvbHNbaV0pLm9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtQ29udHJvbFNlcnZpY2UuZ2V0Q29udHJvbHNEYXRhKHRoaXMub3JpZ2luQ29udHJvbHMpO1xuICAgIHRoaXMudXBkYXRlRm9ybURhdGEoZm9ybURhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBvcHRpb25zXG4gICAqIEBwYXJhbSBzZWFyY2hUZXh0XG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBvbkZpbHRlck9wdGlvbnMoc2VhcmNoVGV4dDogc3RyaW5nLCBjb250cm9sOiBEcm9wZG93bkNvbnRyb2wpIHtcbiAgICBpZiAoY29udHJvbC5zZWFyY2hPblNlcnZlcikge1xuICAgICAgdGhpcy5maWx0ZXJPcHRpb25zJC5uZXh0KHtcbiAgICAgICAgY29udHJvbCxcbiAgICAgICAgc2VhcmNoVGV4dFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRyb2wub3B0aW9ucy5tYXAob3B0ID0+IHtcbiAgICAgICAgLy8ganVzdCBzZXQgYXR0cmlidXRlIGhpZGRlbiBmb3Igc2VsZWN0b3BcbiAgICAgICAgLy8gcHJldmVudCBsb3N0IGRhdGFcbiAgICAgICAgaWYgKG9wdFtjb250cm9sLmxhYmVsTmFtZV0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xuICAgICAgICAgIG9wdFsnaGlkZGVuJ10gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRbJ2hpZGRlbiddID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdhdGNoIGZpbHRlciBkcm9wZG93biBvcHRpb25zXG4gICAqL1xuICB3YXRjaEZpbHRlckRyb3Bkb3duT3B0aW9ucygpIHtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMkLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoNDAwKSxcbiAgICAgIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkKCdzZWFyY2hUZXh0JyksXG4gICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlckNvbnRyb2wgPSB2YWx1ZS5jb250cm9sO1xuICAgICAgICB0aGlzLmZpbHRlckNvbnRyb2wubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuaGVscGVyU2VydmljZS5zY3JvbGxEcm9wZG93blRvVG9wKCk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pLFxuICAgICAgc3dpdGNoTWFwKGZpbHRlciA9PiBmaWx0ZXIuY29udHJvbC5vblNlYXJjaChmaWx0ZXIuc2VhcmNoVGV4dCkpLFxuICAgICAgdGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUkKVxuICAgICkuc3Vic2NyaWJlKG9wdGlvbnMgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykgJiYgdGhpcy5maWx0ZXJDb250cm9sKSB7XG4gICAgICAgIGNvbnN0IHsga2V5LCBsYWJlbFZhbHVlIH0gPSB0aGlzLmZpbHRlckNvbnRyb2w7XG4gICAgICAgIGxldCBmb3JtRGF0YSA9IHsgLi4udGhpcy5mb3JtLnZhbHVlIH07XG4gICAgICAgIGZvcm1EYXRhID0gdGhpcy5mb3JtQ29udHJvbFNlcnZpY2UuZ2V0U2VsZWN0ZWRDaGVja2JveGVzRGF0YShmb3JtRGF0YSwgdGhpcy5jb250cm9scyk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zVmFsdWUgPSBmb3JtRGF0YVtrZXldO1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLmZpbHRlckNvbnRyb2wub3B0aW9ucy5maWx0ZXIoXG4gICAgICAgICAgb3B0ID0+IHNlbGVjdGVkT3B0aW9uc1ZhbHVlLmluZGV4T2Yob3B0W2xhYmVsVmFsdWVdKSA+IC0xXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGR1cGxpY2F0ZWQgaXRlbSBvbiBzZWxlY3RlZCBvcHRpb25zXG4gICAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBvcHRpb25zLmZpbHRlcihvcHQgPT4ge1xuICAgICAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gb3B0W2xhYmVsVmFsdWVdO1xuICAgICAgICAgIGlmIChzZWxlY3RlZE9wdGlvbnMuZmluZChzID0+XG4gICAgICAgICAgICAoPERyb3Bkb3duQ29udHJvbD5zKVtsYWJlbFZhbHVlXSA9PT0gb3B0aW9uVmFsdWUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbWFrZSBzZWxlY3RlZCBlbGVtZW50IG9uIHRvcCBvZiBkcm9wZG93blxuICAgICAgICB0aGlzLnNldERyb3Bkb3duT3B0aW9ucyhrZXksIFsuLi5zZWxlY3RlZE9wdGlvbnMsIC4uLm5ld09wdGlvbnNdKTtcbiAgICAgICAgdGhpcy5maWx0ZXJDb250cm9sLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXYXRjaCBsb2FkIG1vcmUgZHJvcGRvd24gb3B0aW9uXG4gICAqL1xuICB3YXRjaExvYWRNb3JlRHJvcGRvd25PcHRpb25zKCkge1xuICAgIHRoaXMubG9hZE1vcmVPcHRpb25zJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSg0MDApLFxuICAgICAgICBtYXAoY29udHJvbCA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICAgIHRoaXMubG9hZE1vcmVDb250cm9sLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBjb250cm9sO1xuICAgICAgICB9KSxcbiAgICAgICAgZXhoYXVzdE1hcChjb250cm9sID0+IGNvbnRyb2wubG9hZE1vcmUoY29udHJvbC5zZWFyY2hUZXh0KSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUob3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duQ29udHJvbCA9IDxEcm9wZG93bkNvbnRyb2w+dGhpcy5nZXRDb250cm9sKHRoaXMubG9hZE1vcmVDb250cm9sLmtleSk7XG4gICAgICAgIGNvbnN0IHsgbGFiZWxWYWx1ZSB9ID0gZHJvcGRvd25Db250cm9sO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSAmJiBvcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIC8vIGZpbHRlciBvcHRpb25zXG4gICAgICAgICAgY29uc3QgZmlsdGVyZWRPcHRpb25zID0gb3B0aW9ucy5maWx0ZXIob3B0ID0+IHtcbiAgICAgICAgICAgIGlmIChkcm9wZG93bkNvbnRyb2wub3B0aW9ucy5maW5kKG8gPT4gb1tsYWJlbFZhbHVlXSA9PT0gb3B0W2xhYmVsVmFsdWVdKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkcm9wZG93bkNvbnRyb2wub3B0aW9ucyA9IFsuLi5kcm9wZG93bkNvbnRyb2wub3B0aW9ucywgLi4uZmlsdGVyZWRPcHRpb25zXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRNb3JlQ29udHJvbC5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZHJvcGRvd24gb3B0aW9uc1xuICAgKiBAcGFyYW0gY29udHJvbEtleVxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgc2V0RHJvcGRvd25PcHRpb25zKGNvbnRyb2xLZXk6IHN0cmluZywgb3B0aW9uczogYW55W10pIHtcbiAgICBjb25zdCBjb250cm9sID0gPERyb3Bkb3duQ29udHJvbD50aGlzLmdldENvbnRyb2woY29udHJvbEtleSwgQ29udHJvbFR5cGVzLkRST1BET1dOKTtcbiAgICBpZiAoY29udHJvbCkge1xuICAgICAgY29udHJvbC5vcHRpb25zID0gb3B0aW9ucztcblxuICAgICAgLy8gcmVzZXQgc2VsZWN0ZWQgZGF0YSBmcm9tIGZvcm1cbiAgICAgIGNvbnN0IG5ld1NlbGVjdGVkT3B0aW9ucyA9IHRoaXMuZm9ybUNvbnRyb2xTZXJ2aWNlXG4gICAgICAgIC5yZXNldFNlbGVjdGVkT3B0aW9uc0Zyb21Gb3JtRGF0YShcbiAgICAgICAgICB0aGlzLmZvcm0udmFsdWUsXG4gICAgICAgICAgY29udHJvbCxcbiAgICAgICAgICB0aGlzLmNvbnRyb2xzXG4gICAgICAgICk7XG4gICAgICB0aGlzLnVwZGF0ZUZvcm1EYXRhKHtcbiAgICAgICAgW2NvbnRyb2xLZXldOiBuZXdTZWxlY3RlZE9wdGlvbnNcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXQgZm9ybSBkYXRhIHRvIHBhcmVudFxuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgb25TdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5mb3JtLmludmFsaWQpIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2xTZXJ2aWNlLm1hcmtGb3JtR3JvdXBUb3VjaGVkKHRoaXMuZm9ybSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IGZvcm1EYXRhID0geyAuLi50aGlzLmZvcm0udmFsdWUgfTtcbiAgICBmb3JtRGF0YSA9IHRoaXMuZm9ybUNvbnRyb2xTZXJ2aWNlLmdldFNlbGVjdGVkQ2hlY2tib3hlc0RhdGEoZm9ybURhdGEsIHRoaXMuY29udHJvbHMpO1xuICAgIHRoaXMuc3VibWl0LmVtaXQoZm9ybURhdGEpO1xuICB9XG59XG4iXX0=