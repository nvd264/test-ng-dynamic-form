/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
import { ControlTypes } from '../enums/control-types.enum';
import { debounceTime, distinctUntilKeyChanged, exhaustMap, map, switchMap, takeUntil } from 'rxjs/operators';
import { DropdownControl } from './../models/DropdownControl';
import { FormControlService } from './../services/form-control.service';
import { HelperService } from '../services/helper.service';
import { Subject } from 'rxjs';
var DynamicFormComponent = /** @class */ (function () {
    function DynamicFormComponent(formControlService, helperService) {
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
    DynamicFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.originControls = JSON.parse(JSON.stringify(this.controls));
        this.form = this.formControlService.toFormGroup(this.controls);
        this.watchFilterDropdownOptions();
        this.watchLoadMoreDropdownOptions();
    };
    /**
     * @return {?}
     */
    DynamicFormComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // loop through and add scroll event listener for each dropdown
        this.dynamicDropdown.forEach((/**
         * @param {?} dropdown
         * @return {?}
         */
        function (dropdown) {
            dropdown.openedChange.pipe(takeUntil(_this.unsubscribe$)).subscribe((/**
             * @param {?} isOpen
             * @return {?}
             */
            function (isOpen) {
                if (isOpen) {
                    /** @type {?} */
                    var select = dropdown._elementRef.nativeElement;
                    /** @type {?} */
                    var panel = dropdown.panel.nativeElement;
                    /** @type {?} */
                    var controlKey = select.getAttribute('data-key');
                    /** @type {?} */
                    var control_1 = (/** @type {?} */ (_this.getControl(controlKey)));
                    if (control_1 && control_1.supportLoadMore) {
                        panel.addEventListener('scroll', (/**
                         * @param {?} event
                         * @return {?}
                         */
                        function (event) { return _this.loadMoreOptionsOnScroll(event, control_1); }));
                    }
                }
                else {
                    _this.filterControl = null;
                    _this.loadMoreControl = null;
                }
            }));
        }));
    };
    /**
     * @return {?}
     */
    DynamicFormComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    };
    Object.defineProperty(DynamicFormComponent.prototype, "formControls", {
        /**
         * Get form controls
         */
        get: /**
         * Get form controls
         * @return {?}
         */
        function () {
            return this.form.controls;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get control by key
     * @param key
     * @param type ControlTypes
     */
    /**
     * Get control by key
     * @param {?} key
     * @param {?=} type ControlTypes
     * @return {?}
     */
    DynamicFormComponent.prototype.getControl = /**
     * Get control by key
     * @param {?} key
     * @param {?=} type ControlTypes
     * @return {?}
     */
    function (key, type) {
        if (type === void 0) { type = null; }
        return this.controls.find((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (type) {
                return c.key === key && c.controlType === type;
            }
            return c.key === key;
        }));
    };
    /**
     * Load more when scrolled to bottom
     * @param event
     * @param control
     */
    /**
     * Load more when scrolled to bottom
     * @param {?} event
     * @param {?} control
     * @return {?}
     */
    DynamicFormComponent.prototype.loadMoreOptionsOnScroll = /**
     * Load more when scrolled to bottom
     * @param {?} event
     * @param {?} control
     * @return {?}
     */
    function (event, control) {
        var _a = event.target, scrollTop = _a.scrollTop, clientHeight = _a.clientHeight, scrollHeight = _a.scrollHeight;
        if ((scrollTop + clientHeight) >= scrollHeight && control.supportLoadMore) {
            this.loadMoreOptions$.next(control);
        }
    };
    /**
     * Update form data
     * @param data
     */
    /**
     * Update form data
     * @param {?} data
     * @return {?}
     */
    DynamicFormComponent.prototype.updateFormData = /**
     * Update form data
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        Object.keys(data).forEach((/**
         * @param {?} controlKey
         * @return {?}
         */
        function (controlKey) {
            /** @type {?} */
            var checkboxControl = _this.getControl(controlKey, ControlTypes.CHECKBOX);
            /** @type {?} */
            var value;
            if (checkboxControl) {
                value = _this.formControlService
                    .convertCheckboxesToFormData(data[controlKey], (/** @type {?} */ (checkboxControl)));
            }
            else {
                value = data[controlKey];
            }
            if (_this.form.get(controlKey)) {
                _this.form.get(controlKey).setValue(value);
            }
        }));
    };
    /**
     * Reset form
     * @param e
     */
    /**
     * Reset form
     * @param {?} e
     * @return {?}
     */
    DynamicFormComponent.prototype.resetForm = /**
     * Reset form
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        for (var i = 0; i < this.controls.length; i++) {
            if (this.controls[i] instanceof DropdownControl) {
                // override only options of dropdown
                // avoid error when function lost connect with parent
                ((/** @type {?} */ (this.controls[i]))).options = ((/** @type {?} */ (this.originControls[i]))).options;
            }
        }
        /** @type {?} */
        var formData = this.formControlService.getControlsData(this.originControls);
        this.updateFormData(formData);
    };
    /**
     * Filter options
     * @param searchText
     * @param control
     */
    /**
     * Filter options
     * @param {?} searchText
     * @param {?} control
     * @return {?}
     */
    DynamicFormComponent.prototype.onFilterOptions = /**
     * Filter options
     * @param {?} searchText
     * @param {?} control
     * @return {?}
     */
    function (searchText, control) {
        if (control.searchOnServer) {
            this.filterOptions$.next({
                control: control,
                searchText: searchText
            });
        }
        else {
            control.options.map((/**
             * @param {?} opt
             * @return {?}
             */
            function (opt) {
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
    };
    /**
     * Watch filter dropdown options
     */
    /**
     * Watch filter dropdown options
     * @return {?}
     */
    DynamicFormComponent.prototype.watchFilterDropdownOptions = /**
     * Watch filter dropdown options
     * @return {?}
     */
    function () {
        var _this = this;
        this.filterOptions$.pipe(debounceTime(400), distinctUntilKeyChanged('searchText'), map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.filterControl = value.control;
            _this.filterControl.loading = true;
            _this.helperService.scrollDropdownToTop();
            return value;
        })), switchMap((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) { return filter.control.onSearch(filter.searchText); })), takeUntil(this.unsubscribe$)).subscribe((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            if (Array.isArray(options) && _this.filterControl) {
                var _a = _this.filterControl, key = _a.key, labelValue_1 = _a.labelValue;
                /** @type {?} */
                var formData = tslib_1.__assign({}, _this.form.value);
                formData = _this.formControlService.getSelectedCheckboxesData(formData, _this.controls);
                /** @type {?} */
                var selectedOptionsValue_1 = formData[key];
                /** @type {?} */
                var selectedOptions_1 = _this.filterControl.options.filter((/**
                 * @param {?} opt
                 * @return {?}
                 */
                function (opt) { return selectedOptionsValue_1.indexOf(opt[labelValue_1]) > -1; }));
                // remove duplicated item on selected options
                /** @type {?} */
                var newOptions = options.filter((/**
                 * @param {?} opt
                 * @return {?}
                 */
                function (opt) {
                    /** @type {?} */
                    var optionValue = opt[labelValue_1];
                    if (selectedOptions_1.find((/**
                     * @param {?} s
                     * @return {?}
                     */
                    function (s) {
                        return ((/** @type {?} */ (s)))[labelValue_1] === optionValue;
                    }))) {
                        return false;
                    }
                    return true;
                }));
                // make selected element on top of dropdown
                _this.setDropdownOptions(key, tslib_1.__spread(selectedOptions_1, newOptions));
                _this.filterControl.loading = false;
            }
        }));
    };
    /**
     * Watch load more dropdown option
     */
    /**
     * Watch load more dropdown option
     * @return {?}
     */
    DynamicFormComponent.prototype.watchLoadMoreDropdownOptions = /**
     * Watch load more dropdown option
     * @return {?}
     */
    function () {
        var _this = this;
        this.loadMoreOptions$
            .pipe(debounceTime(400), map((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            _this.loadMoreControl = control;
            _this.loadMoreControl.loading = true;
            return control;
        })), exhaustMap((/**
         * @param {?} control
         * @return {?}
         */
        function (control) { return control.loadMore(control.searchText); })), takeUntil(this.unsubscribe$))
            .subscribe((/**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            /** @type {?} */
            var dropdownControl = (/** @type {?} */ (_this.getControl(_this.loadMoreControl.key)));
            var labelValue = dropdownControl.labelValue;
            if (Array.isArray(options) && options.length) {
                // filter options
                /** @type {?} */
                var filteredOptions = options.filter((/**
                 * @param {?} opt
                 * @return {?}
                 */
                function (opt) {
                    if (dropdownControl.options.find((/**
                     * @param {?} o
                     * @return {?}
                     */
                    function (o) { return o[labelValue] === opt[labelValue]; }))) {
                        return false;
                    }
                    return true;
                }));
                dropdownControl.options = tslib_1.__spread(dropdownControl.options, filteredOptions);
            }
            _this.loadMoreControl.loading = false;
        }));
    };
    /**
     * Set dropdown options
     * @param controlKey
     * @param options
     */
    /**
     * Set dropdown options
     * @param {?} controlKey
     * @param {?} options
     * @return {?}
     */
    DynamicFormComponent.prototype.setDropdownOptions = /**
     * Set dropdown options
     * @param {?} controlKey
     * @param {?} options
     * @return {?}
     */
    function (controlKey, options) {
        var _a;
        /** @type {?} */
        var control = (/** @type {?} */ (this.getControl(controlKey, ControlTypes.DROPDOWN)));
        if (control) {
            control.options = options;
            // reset selected data from form
            /** @type {?} */
            var newSelectedOptions = this.formControlService
                .resetSelectedOptionsFromFormData(this.form.value, control, this.controls);
            this.updateFormData((_a = {},
                _a[controlKey] = newSelectedOptions,
                _a));
        }
    };
    /**
     * Emit form data to parent
     * @param e
     */
    /**
     * Emit form data to parent
     * @param {?} e
     * @return {?}
     */
    DynamicFormComponent.prototype.onSubmit = /**
     * Emit form data to parent
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        if (this.form.invalid) {
            this.formControlService.markFormGroupTouched(this.form);
            return false;
        }
        /** @type {?} */
        var formData = tslib_1.__assign({}, this.form.value);
        formData = this.formControlService.getSelectedCheckboxesData(formData, this.controls);
        this.submit.emit(formData);
    };
    DynamicFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-dynamic-form',
                    template: "<form [formGroup]=\"form\" class=\"container\">\n  <!-- Form controls -->\n  <div *ngFor=\"let control of controls\" class=\"form-row\">\n    <div [ngSwitch]=\"control.controlType\">\n      <!-- Text box -->\n      <mat-form-field *ngSwitchCase=\"controlTypes.TEXTBOX\">\n        <input\n          matInput\n          [formControlName]=\"control.key\"\n          [type]=\"control['type']\"\n          [placeholder]=\"control.label\"\n          [required]=\"control.isRequired\"\n          [autocomplete]=\"control['type'] === 'password'\"\n        />\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </mat-form-field>\n      <!-- End text box -->\n\n      <!-- Textarea -->\n      <mat-form-field *ngSwitchCase=\"controlTypes.TEXTAREA\">\n        <textarea\n          matInput\n          [formControlName]=\"control.key\"\n          [placeholder]=\"control.label\"\n          [required]=\"control.isRequired\"\n        ></textarea>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </mat-form-field>\n      <!-- End textarea -->\n\n      <!-- Dropdown -->\n      <mat-form-field *ngSwitchCase=\"controlTypes.DROPDOWN\">\n        <mat-select\n          [placeholder]=\"control.label\"\n          [formControlName]=\"control.key\"\n          [required]=\"control.isRequired\"\n          [multiple]=\"control['multiple']\"\n          [attr.data-key]=\"control.key\"\n          disableOptionCentering\n          #dynamicDropdown\n          [panelClass]=\"!control['hideSearchBox'] ? 'panel-searchbox' : ''\"\n        >\n          <mat-option [class.multiple-select]=\"control['multiple']\" class=\"search-box\" *ngIf=\"!control['hideSearchBox']\" [disabled]=\"true\">\n            <input\n              matInput\n              (ngModelChange)=\"onFilterOptions($event, control)\"\n              [(ngModel)]=\"control['searchText']\"\n              [ngModelOptions]=\"{standalone: true}\"\n              placeholder=\"Enter your search text...\"\n              autocomplete=\"false\"\n              (keydown)=\"$event.stopPropagation()\"\n            >\n            <mat-progress-spinner\n              *ngIf=\"control['loading']\"\n              class=\"search-box-spinner\"\n              color=\"primary\"\n              mode=\"indeterminate\"\n              diameter=\"20\"\n            >\n            </mat-progress-spinner>\n          </mat-option>\n          <ng-container *ngFor=\"let opt of control['options']\">\n            <mat-option\n              *ngIf=\"!opt['hidden']\"\n              [value]=\"\n                control['labelValue'] ? opt[control['labelValue']] : opt.value\n              \"\n            >\n              {{ control['labelName'] ? opt[control['labelName']] : opt.label }}\n            </mat-option>\n          </ng-container>\n        </mat-select>\n      </mat-form-field>\n      <!-- End dropdown -->\n\n      <!-- Checkbox -->\n      <div *ngSwitchCase=\"controlTypes.CHECKBOX\" class=\"custom-section\">\n        <label\n          class=\"custom-mat-form-field-label\"\n          [class.required]=\"control.isRequired\"\n          >{{ control.label }}</label\n        >\n        <section [formArrayName]=\"control.key\" class=\"checkbox-section\">\n          <mat-checkbox\n            *ngFor=\"let chk of form.get(control.key)['controls']; let i = index\"\n            [formControlName]=\"i\"\n            class=\"dyn-checkbox\"\n          >\n            {{\n              control['labelName']\n                ? control['options'][i][control['labelName']]\n                : control['options'][i].label\n            }}\n          </mat-checkbox>\n        </section>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </div>\n      <!-- End checkbox -->\n\n      <!-- Radio -->\n      <div *ngSwitchCase=\"controlTypes.RADIO\" class=\"custom-section\">\n        <label\n          class=\"custom-mat-form-field-label\"\n          [class.required]=\"control.isRequired\"\n          >{{ control.label }}</label\n        >\n        <section>\n          <mat-radio-group\n            class=\"example-radio-group\"\n            [formControlName]=\"control.key\"\n          >\n            <mat-radio-button\n              class=\"dyn-radio\"\n              *ngFor=\"let opt of control['options']\"\n              [value]=\"\n                control['labelValue'] ? opt[control['labelValue']] : opt.value\n              \"\n            >\n              {{ control['labelName'] ? opt[control['labelName']] : opt.label }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </section>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </div>\n      <!-- End radio -->\n\n      <!-- Custom form field -->\n      <div *ngSwitchCase=\"controlTypes.CUSTOM\" class=\"custom-section\">\n        <custom-field [form]=\"form\" [control]=\"control\"></custom-field>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </div>\n      <!-- End Custom form field -->\n    </div>\n  </div>\n  <!-- End form controls -->\n\n  <!-- Actions -->\n  <div class=\"button-row\">\n    <button\n      mat-raised-button\n      [color]=\"actions?.submit?.color || 'primary'\"\n      (click)=\"onSubmit($event)\"\n    >\n      {{ actions?.submit?.label || 'Submit' }}\n    </button>\n\n    <button\n      mat-raised-button\n      [color]=\"actions?.reset?.color || ''\"\n      type=\"button\"\n      (click)=\"resetForm($event)\"\n    >\n      {{ actions?.reset?.label || 'Reset' }}\n    </button>\n  </div>\n  <!-- End actions -->\n</form>\n",
                    styles: [".container{display:flex;flex-direction:column;font-family:Roboto,\"Helvetica Neue\",sans-serif;max-width:100%!important}.container :not(button){width:100%}.button-row a,.button-row button{margin-right:8px}.form-row{margin-bottom:10px}.dyn-checkbox{margin-right:8px}.dyn-radio{margin-bottom:8px}.custom-mat-form-field-label{font-size:12px}.custom-mat-form-field-label.required::after{content:\" *\";display:inline;color:#f44336}::ng-deep .mat-option.search-box .mat-pseudo-checkbox{display:none}::ng-deep .mat-option.search-box{position:absolute;top:0;left:0;background:#fff;z-index:999;border-bottom:1px solid #e7e7e7;min-width:calc(100% + 32px)}::ng-deep .mat-option.search-box.multiple-select{min-width:calc(100% + 64px)}.panel-searchbox{-webkit-transform:none!important;transform:none!important;padding-top:48px}::ng-deep .panel-searchbox{-webkit-transform:none!important;transform:none!important;padding-top:48px!important}.search-box-spinner{position:absolute;right:14px;top:14px}.checkbox-section{display:flex;flex-direction:column}"]
                }] }
    ];
    /** @nocollapse */
    DynamicFormComponent.ctorParameters = function () { return [
        { type: FormControlService },
        { type: HelperService }
    ]; };
    DynamicFormComponent.propDecorators = {
        controls: [{ type: Input }],
        actions: [{ type: Input }],
        submit: [{ type: Output }],
        dynamicDropdown: [{ type: ViewChildren, args: ['dynamicDropdown',] }]
    };
    return DynamicFormComponent;
}());
export { DynamicFormComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BudmQyNjQvbmctZHluYW1pYy1mb3JtLyIsInNvdXJjZXMiOlsibGliL2R5bmFtaWMtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUNMLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsVUFBVSxFQUNWLEdBQUcsRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUVWLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUkzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CO0lBb0JFLDhCQUNVLGtCQUFzQyxFQUN0QyxhQUE0QjtRQUQ1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBaEI3QixhQUFRLEdBQTJCLEVBQUUsQ0FBQztRQUVyQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUczQyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFFbEMsaUJBQVksR0FBRyxZQUFZLENBQUM7UUFFNUIsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztRQUVoRCxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztJQU1sRCxDQUFDOzs7O0lBRUQsdUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxD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QztZQUN4RCxPQUFPLEtBQUssQ0FBQztTQUNkOztZQUVHLFFBQVEsd0JBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUU7UUFDckMsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7O2dCQWhSRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsc2xOQUE0Qzs7aUJBRTdDOzs7O2dCQVhRLGtCQUFrQjtnQkFDbEIsYUFBYTs7OzJCQVluQixLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsTUFBTTtrQ0FDTixZQUFZLFNBQUMsaUJBQWlCOztJQXdRakMsMkJBQUM7Q0FBQSxBQWpSRCxJQWlSQztTQTVRWSxvQkFBb0I7OztJQUMvQix3Q0FBK0M7O0lBQy9DLHVDQUE4Qjs7SUFDOUIsc0NBQTJDOztJQUMzQywrQ0FBMEQ7O0lBRTFELDRDQUFrQzs7SUFDbEMsb0NBQWdCOztJQUNoQiw0Q0FBNEI7O0lBQzVCLDhDQUF1Qzs7SUFDdkMsOENBQWdEOztJQUNoRCw2Q0FBK0I7O0lBQy9CLGdEQUFrRDs7SUFDbEQsK0NBQWlDOzs7OztJQUcvQixrREFBOEM7Ozs7O0lBQzlDLDZDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkcmVuXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hlY2tib3hDb250cm9sIH0gZnJvbSAnLi4vbW9kZWxzL0NoZWNrYm94Q29udHJvbCc7XG5pbXBvcnQgeyBDb250cm9sVHlwZXMgfSBmcm9tICcuLi9lbnVtcy9jb250cm9sLXR5cGVzLmVudW0nO1xuaW1wb3J0IHtcbiAgZGVib3VuY2VUaW1lLFxuICBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZCxcbiAgZXhoYXVzdE1hcCxcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG4gIHRha2VVbnRpbCxcbiAgZmluYWxpemVcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRHJvcGRvd25Db250cm9sIH0gZnJvbSAnLi8uLi9tb2RlbHMvRHJvcGRvd25Db250cm9sJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1Db250cm9sQmFzZSB9IGZyb20gJy4vLi4vbW9kZWxzL0Zvcm1Db250cm9sQmFzZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2Zvcm0tY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJRHluYW1pY09wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL0lEeW5hbWljT3B0aW9ucyc7XG5pbXBvcnQgeyBJRm9ybUFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvSUZvcm1BY3Rpb24nO1xuaW1wb3J0IHsgTWF0U2VsZWN0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZHluYW1pYy1mb3JtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtZm9ybS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2R5bmFtaWMtZm9ybS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBjb250cm9sczogRm9ybUNvbnRyb2xCYXNlPGFueT5bXSA9IFtdO1xuICBASW5wdXQoKSBhY3Rpb25zOiBJRm9ybUFjdGlvbjtcbiAgQE91dHB1dCgpIHN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAVmlld0NoaWxkcmVuKCdkeW5hbWljRHJvcGRvd24nKSBkeW5hbWljRHJvcGRvd24gITogYW55W107XG5cbiAgdW5zdWJzY3JpYmUkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBmb3JtOiBGb3JtR3JvdXA7XG4gIGNvbnRyb2xUeXBlcyA9IENvbnRyb2xUeXBlcztcbiAgb3JpZ2luQ29udHJvbHM6IEZvcm1Db250cm9sQmFzZTxhbnk+W107XG4gIGZpbHRlck9wdGlvbnMkID0gbmV3IFN1YmplY3Q8SUR5bmFtaWNPcHRpb25zPigpO1xuICBmaWx0ZXJDb250cm9sOiBEcm9wZG93bkNvbnRyb2w7XG4gIGxvYWRNb3JlT3B0aW9ucyQgPSBuZXcgU3ViamVjdDxEcm9wZG93bkNvbnRyb2w+KCk7XG4gIGxvYWRNb3JlQ29udHJvbDogRHJvcGRvd25Db250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybUNvbnRyb2xTZXJ2aWNlOiBGb3JtQ29udHJvbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBoZWxwZXJTZXJ2aWNlOiBIZWxwZXJTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9yaWdpbkNvbnRyb2xzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmNvbnRyb2xzKSk7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQ29udHJvbFNlcnZpY2UudG9Gb3JtR3JvdXAodGhpcy5jb250cm9scyk7XG5cbiAgICB0aGlzLndhdGNoRmlsdGVyRHJvcGRvd25PcHRpb25zKCk7XG4gICAgdGhpcy53YXRjaExvYWRNb3JlRHJvcGRvd25PcHRpb25zKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gbG9vcCB0aHJvdWdoIGFuZCBhZGQgc2Nyb2xsIGV2ZW50IGxpc3RlbmVyIGZvciBlYWNoIGRyb3Bkb3duXG4gICAgdGhpcy5keW5hbWljRHJvcGRvd24uZm9yRWFjaChkcm9wZG93biA9PiB7XG4gICAgICBkcm9wZG93bi5vcGVuZWRDaGFuZ2UucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUkKVxuICAgICAgKS5zdWJzY3JpYmUoKGlzT3BlbikgPT4ge1xuICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0OiBIVE1MRWxlbWVudCA9IGRyb3Bkb3duLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgcGFuZWw6IEhUTUxFbGVtZW50ID0gZHJvcGRvd24ucGFuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBjb250cm9sS2V5ID0gc2VsZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcbiAgICAgICAgICBjb25zdCBjb250cm9sID0gPERyb3Bkb3duQ29udHJvbD50aGlzLmdldENvbnRyb2woY29udHJvbEtleSk7XG4gICAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5zdXBwb3J0TG9hZE1vcmUpIHtcbiAgICAgICAgICAgIHBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICdzY3JvbGwnLFxuICAgICAgICAgICAgICBldmVudCA9PiB0aGlzLmxvYWRNb3JlT3B0aW9uc09uU2Nyb2xsKFxuICAgICAgICAgICAgICAgIGV2ZW50LCBjb250cm9sXG4gICAgICAgICAgICAgICkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmZpbHRlckNvbnRyb2wgPSBudWxsO1xuICAgICAgICAgIHRoaXMubG9hZE1vcmVDb250cm9sID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmUkLm5leHQoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmb3JtIGNvbnRyb2xzXG4gICAqL1xuICBnZXQgZm9ybUNvbnRyb2xzKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm0uY29udHJvbHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbnRyb2wgYnkga2V5XG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHR5cGUgQ29udHJvbFR5cGVzXG4gICAqL1xuICBnZXRDb250cm9sKGtleTogc3RyaW5nLCB0eXBlID0gbnVsbCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xzLmZpbmQoYyA9PiB7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICByZXR1cm4gYy5rZXkgPT09IGtleSAmJiBjLmNvbnRyb2xUeXBlID09PSB0eXBlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGMua2V5ID09PSBrZXk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBtb3JlIHdoZW4gc2Nyb2xsZWQgdG8gYm90dG9tXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgbG9hZE1vcmVPcHRpb25zT25TY3JvbGwoZXZlbnQsIGNvbnRyb2w6IERyb3Bkb3duQ29udHJvbCkge1xuICAgIGNvbnN0IHsgc2Nyb2xsVG9wLCBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodCB9ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmICgoc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0KSA+PSBzY3JvbGxIZWlnaHQgJiYgY29udHJvbC5zdXBwb3J0TG9hZE1vcmUpIHtcbiAgICAgIHRoaXMubG9hZE1vcmVPcHRpb25zJC5uZXh0KGNvbnRyb2wpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZm9ybSBkYXRhXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICB1cGRhdGVGb3JtRGF0YShkYXRhOiBPYmplY3QpIHtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGNvbnRyb2xLZXkgPT4ge1xuICAgICAgY29uc3QgY2hlY2tib3hDb250cm9sID0gdGhpcy5nZXRDb250cm9sKGNvbnRyb2xLZXksIENvbnRyb2xUeXBlcy5DSEVDS0JPWCk7XG4gICAgICBsZXQgdmFsdWU7XG4gICAgICBpZiAoY2hlY2tib3hDb250cm9sKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5mb3JtQ29udHJvbFNlcnZpY2VcbiAgICAgICAgICAuY29udmVydENoZWNrYm94ZXNUb0Zvcm1EYXRhKFxuICAgICAgICAgICAgZGF0YVtjb250cm9sS2V5XSwgPENoZWNrYm94Q29udHJvbD5jaGVja2JveENvbnRyb2xcbiAgICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBkYXRhW2NvbnRyb2xLZXldO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZm9ybS5nZXQoY29udHJvbEtleSkpIHtcbiAgICAgICAgdGhpcy5mb3JtLmdldChjb250cm9sS2V5KS5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgZm9ybVxuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgcmVzZXRGb3JtKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRyb2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5jb250cm9sc1tpXSBpbnN0YW5jZW9mIERyb3Bkb3duQ29udHJvbCkge1xuICAgICAgICAvLyBvdmVycmlkZSBvbmx5IG9wdGlvbnMgb2YgZHJvcGRvd25cbiAgICAgICAgLy8gYXZvaWQgZXJyb3Igd2hlbiBmdW5jdGlvbiBsb3N0IGNvbm5lY3Qgd2l0aCBwYXJlbnRcbiAgICAgICAgKDxEcm9wZG93bkNvbnRyb2w+dGhpcy5jb250cm9sc1tpXSkub3B0aW9ucyA9ICg8RHJvcGRvd25Db250cm9sPnRoaXMub3JpZ2luQ29udHJvbHNbaV0pLm9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtQ29udHJvbFNlcnZpY2UuZ2V0Q29udHJvbHNEYXRhKHRoaXMub3JpZ2luQ29udHJvbHMpO1xuICAgIHRoaXMudXBkYXRlRm9ybURhdGEoZm9ybURhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBvcHRpb25zXG4gICAqIEBwYXJhbSBzZWFyY2hUZXh0XG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBvbkZpbHRlck9wdGlvbnMoc2VhcmNoVGV4dDogc3RyaW5nLCBjb250cm9sOiBEcm9wZG93bkNvbnRyb2wpIHtcbiAgICBpZiAoY29udHJvbC5zZWFyY2hPblNlcnZlcikge1xuICAgICAgdGhpcy5maWx0ZXJPcHRpb25zJC5uZXh0KHtcbiAgICAgICAgY29udHJvbCxcbiAgICAgICAgc2VhcmNoVGV4dFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRyb2wub3B0aW9ucy5tYXAob3B0ID0+IHtcbiAgICAgICAgLy8ganVzdCBzZXQgYXR0cmlidXRlIGhpZGRlbiBmb3Igc2VsZWN0b3BcbiAgICAgICAgLy8gcHJldmVudCBsb3N0IGRhdGFcbiAgICAgICAgaWYgKG9wdFtjb250cm9sLmxhYmVsTmFtZV0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xuICAgICAgICAgIG9wdFsnaGlkZGVuJ10gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRbJ2hpZGRlbiddID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdhdGNoIGZpbHRlciBkcm9wZG93biBvcHRpb25zXG4gICAqL1xuICB3YXRjaEZpbHRlckRyb3Bkb3duT3B0aW9ucygpIHtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMkLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoNDAwKSxcbiAgICAgIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkKCdzZWFyY2hUZXh0JyksXG4gICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlckNvbnRyb2wgPSB2YWx1ZS5jb250cm9sO1xuICAgICAgICB0aGlzLmZpbHRlckNvbnRyb2wubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuaGVscGVyU2VydmljZS5zY3JvbGxEcm9wZG93blRvVG9wKCk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pLFxuICAgICAgc3dpdGNoTWFwKGZpbHRlciA9PiBmaWx0ZXIuY29udHJvbC5vblNlYXJjaChmaWx0ZXIuc2VhcmNoVGV4dCkpLFxuICAgICAgdGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUkKVxuICAgICkuc3Vic2NyaWJlKG9wdGlvbnMgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykgJiYgdGhpcy5maWx0ZXJDb250cm9sKSB7XG4gICAgICAgIGNvbnN0IHsga2V5LCBsYWJlbFZhbHVlIH0gPSB0aGlzLmZpbHRlckNvbnRyb2w7XG4gICAgICAgIGxldCBmb3JtRGF0YSA9IHsgLi4udGhpcy5mb3JtLnZhbHVlIH07XG4gICAgICAgIGZvcm1EYXRhID0gdGhpcy5mb3JtQ29udHJvbFNlcnZpY2UuZ2V0U2VsZWN0ZWRDaGVja2JveGVzRGF0YShmb3JtRGF0YSwgdGhpcy5jb250cm9scyk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25zVmFsdWUgPSBmb3JtRGF0YVtrZXldO1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLmZpbHRlckNvbnRyb2wub3B0aW9ucy5maWx0ZXIoXG4gICAgICAgICAgb3B0ID0+IHNlbGVjdGVkT3B0aW9uc1ZhbHVlLmluZGV4T2Yob3B0W2xhYmVsVmFsdWVdKSA+IC0xXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGR1cGxpY2F0ZWQgaXRlbSBvbiBzZWxlY3RlZCBvcHRpb25zXG4gICAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBvcHRpb25zLmZpbHRlcihvcHQgPT4ge1xuICAgICAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gb3B0W2xhYmVsVmFsdWVdO1xuICAgICAgICAgIGlmIChzZWxlY3RlZE9wdGlvbnMuZmluZChzID0+XG4gICAgICAgICAgICAoPERyb3Bkb3duQ29udHJvbD5zKVtsYWJlbFZhbHVlXSA9PT0gb3B0aW9uVmFsdWUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbWFrZSBzZWxlY3RlZCBlbGVtZW50IG9uIHRvcCBvZiBkcm9wZG93blxuICAgICAgICB0aGlzLnNldERyb3Bkb3duT3B0aW9ucyhrZXksIFsuLi5zZWxlY3RlZE9wdGlvbnMsIC4uLm5ld09wdGlvbnNdKTtcbiAgICAgICAgdGhpcy5maWx0ZXJDb250cm9sLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXYXRjaCBsb2FkIG1vcmUgZHJvcGRvd24gb3B0aW9uXG4gICAqL1xuICB3YXRjaExvYWRNb3JlRHJvcGRvd25PcHRpb25zKCkge1xuICAgIHRoaXMubG9hZE1vcmVPcHRpb25zJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSg0MDApLFxuICAgICAgICBtYXAoY29udHJvbCA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICAgIHRoaXMubG9hZE1vcmVDb250cm9sLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBjb250cm9sO1xuICAgICAgICB9KSxcbiAgICAgICAgZXhoYXVzdE1hcChjb250cm9sID0+IGNvbnRyb2wubG9hZE1vcmUoY29udHJvbC5zZWFyY2hUZXh0KSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUob3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duQ29udHJvbCA9IDxEcm9wZG93bkNvbnRyb2w+dGhpcy5nZXRDb250cm9sKHRoaXMubG9hZE1vcmVDb250cm9sLmtleSk7XG4gICAgICAgIGNvbnN0IHsgbGFiZWxWYWx1ZSB9ID0gZHJvcGRvd25Db250cm9sO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSAmJiBvcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIC8vIGZpbHRlciBvcHRpb25zXG4gICAgICAgICAgY29uc3QgZmlsdGVyZWRPcHRpb25zID0gb3B0aW9ucy5maWx0ZXIob3B0ID0+IHtcbiAgICAgICAgICAgIGlmIChkcm9wZG93bkNvbnRyb2wub3B0aW9ucy5maW5kKG8gPT4gb1tsYWJlbFZhbHVlXSA9PT0gb3B0W2xhYmVsVmFsdWVdKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkcm9wZG93bkNvbnRyb2wub3B0aW9ucyA9IFsuLi5kcm9wZG93bkNvbnRyb2wub3B0aW9ucywgLi4uZmlsdGVyZWRPcHRpb25zXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRNb3JlQ29udHJvbC5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZHJvcGRvd24gb3B0aW9uc1xuICAgKiBAcGFyYW0gY29udHJvbEtleVxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgc2V0RHJvcGRvd25PcHRpb25zKGNvbnRyb2xLZXk6IHN0cmluZywgb3B0aW9uczogYW55W10pIHtcbiAgICBjb25zdCBjb250cm9sID0gPERyb3Bkb3duQ29udHJvbD50aGlzLmdldENvbnRyb2woY29udHJvbEtleSwgQ29udHJvbFR5cGVzLkRST1BET1dOKTtcbiAgICBpZiAoY29udHJvbCkge1xuICAgICAgY29udHJvbC5vcHRpb25zID0gb3B0aW9ucztcblxuICAgICAgLy8gcmVzZXQgc2VsZWN0ZWQgZGF0YSBmcm9tIGZvcm1cbiAgICAgIGNvbnN0IG5ld1NlbGVjdGVkT3B0aW9ucyA9IHRoaXMuZm9ybUNvbnRyb2xTZXJ2aWNlXG4gICAgICAgIC5yZXNldFNlbGVjdGVkT3B0aW9uc0Zyb21Gb3JtRGF0YShcbiAgICAgICAgICB0aGlzLmZvcm0udmFsdWUsXG4gICAgICAgICAgY29udHJvbCxcbiAgICAgICAgICB0aGlzLmNvbnRyb2xzXG4gICAgICAgICk7XG4gICAgICB0aGlzLnVwZGF0ZUZvcm1EYXRhKHtcbiAgICAgICAgW2NvbnRyb2xLZXldOiBuZXdTZWxlY3RlZE9wdGlvbnNcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXQgZm9ybSBkYXRhIHRvIHBhcmVudFxuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgb25TdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5mb3JtLmludmFsaWQpIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2xTZXJ2aWNlLm1hcmtGb3JtR3JvdXBUb3VjaGVkKHRoaXMuZm9ybSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IGZvcm1EYXRhID0geyAuLi50aGlzLmZvcm0udmFsdWUgfTtcbiAgICBmb3JtRGF0YSA9IHRoaXMuZm9ybUNvbnRyb2xTZXJ2aWNlLmdldFNlbGVjdGVkQ2hlY2tib3hlc0RhdGEoZm9ybURhdGEsIHRoaXMuY29udHJvbHMpO1xuICAgIHRoaXMuc3VibWl0LmVtaXQoZm9ybURhdGEpO1xuICB9XG59XG4iXX0=