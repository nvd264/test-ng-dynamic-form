(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('rxjs'), require('@angular/forms'), require('@angular/common'), require('@angular/material'), require('@angular/material/progress-spinner'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@nvd264/ng-dynamic-form', ['exports', 'rxjs/operators', 'rxjs', '@angular/forms', '@angular/common', '@angular/material', '@angular/material/progress-spinner', '@angular/core'], factory) :
    (factory((global.nvd264 = global.nvd264 || {}, global.nvd264['ng-dynamic-form'] = {}),global.rxjs.operators,global.rxjs,global.ng.forms,global.ng.common,global.ng.material,global.ng.material['progress-spinner'],global.ng.core));
}(this, (function (exports,operators,rxjs,forms,common,material,progressSpinner,i0) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var ControlTypes = {
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
    var ErrorTypes = {
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
    var /**
     * @template T
     */ FormControlBase = /** @class */ (function () {
        function FormControlBase(options) {
            if (options === void 0) {
                options = {};
            }
            this.value = options.value;
            this.key = options.key || '';
            this.label = options.label || '';
            this.validators = options.validators || [];
            this.order = options.order === undefined ? 1 : options.order;
            this.controlType = options.controlType || '';
        }
        Object.defineProperty(FormControlBase.prototype, "isRequired", {
            get: /**
             * @return {?}
             */ function () {
                return this.validators.findIndex(( /**
                 * @param {?} v
                 * @return {?}
                 */function (v) { return v.validate === ErrorTypes.REQUIRED; })) > -1;
            },
            enumerable: true,
            configurable: true
        });
        return FormControlBase;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DropdownControl = /** @class */ (function (_super) {
        __extends(DropdownControl, _super);
        function DropdownControl(options) {
            if (options === void 0) {
                options = {};
            }
            var _this = _super.call(this, options) || this;
            _this.controlType = ControlTypes.DROPDOWN;
            _this.options = [];
            _this.multiple = false;
            _this.hideSearchBox = false;
            _this.searchText = '';
            _this.loading = false;
            _this.searchOnServer = false;
            _this.supportLoadMore = false;
            _this.labelValue = options['labelValue'] || '';
            _this.labelName = options['labelName'] || '';
            _this.multiple = !!options['multiple'];
            _this.searchText = options['searchText'] || '';
            _this.hideSearchBox = !!options['hideSearchBox'];
            if (_this.multiple && !Array.isArray(_this.value)) {
                // convert value to array for multi select
                _this.value = [_this.value];
            }
            if (typeof options['onSearch'] === 'function') {
                _this.onSearch = options['onSearch'];
                _this.searchOnServer = true;
            }
            if (typeof options['loadMore'] === 'function') {
                _this.loadMore = options['loadMore'];
                _this.supportLoadMore = true;
            }
            // set options base type
            if (rxjs.isObservable(options['options'])) {
                options['options'].pipe(operators.tap(( /**
                 * @return {?}
                 */function () { return _this.loading = true; }))).subscribe(( /**
                 * @param {?} options
                 * @return {?}
                 */function (options) {
                    _this.options = options;
                    _this.loading = false;
                }));
            }
            else {
                _this.options = options['options'] || [];
            }
            return _this;
        }
        return DropdownControl;
    }(FormControlBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormErrorService = /** @class */ (function () {
        function FormErrorService() {
        }
        /**
         * Map validates into instance of angular
         * @param validates
         */
        /**
         * Map validates into instance of angular
         * @param {?} validators
         * @return {?}
         */
        FormErrorService.prototype.getValidatesInstance = /**
         * Map validates into instance of angular
         * @param {?} validators
         * @return {?}
         */
            function (validators) {
                /** @type {?} */
                var validatorsList = [];
                for (var i = 0; i < validators.length; i++) {
                    /** @type {?} */
                    var validator = validators[i];
                    if (validator.validate === ErrorTypes.REQUIRED) {
                        validatorsList.push(forms.Validators.required);
                    }
                    if (validator.validate === ErrorTypes.MIN) {
                        validatorsList.push(forms.Validators.min(validator.data));
                    }
                    if (validator.validate === ErrorTypes.MAX) {
                        validatorsList.push(forms.Validators.max(validator.data));
                    }
                    if (validator.validate === ErrorTypes.MIN_LENGTH) {
                        validatorsList.push(forms.Validators.minLength(validator.data));
                    }
                    if (validator.validate === ErrorTypes.MAX_LENGTH) {
                        validatorsList.push(forms.Validators.maxLength(validator.data));
                    }
                    if (validator.validate === ErrorTypes.EMAIL) {
                        validatorsList.push(forms.Validators.email);
                    }
                }
                return validatorsList;
            };
        /**
         * Get error message base error type
         * @param validators
         * @param errorType
         */
        /**
         * Get error message base error type
         * @param {?} validators
         * @param {?} errorType
         * @return {?}
         */
        FormErrorService.prototype.getErrorMessage = /**
         * Get error message base error type
         * @param {?} validators
         * @param {?} errorType
         * @return {?}
         */
            function (validators, errorType) {
                /** @type {?} */
                var validator = validators.find(( /**
                 * @param {?} v
                 * @return {?}
                 */function (v) { return v.validate === errorType; }));
                return validator ? validator.message : '';
            };
        /**
         * Get validate by error type
         * @param validators
         * @param errorType
         */
        /**
         * Get validate by error type
         * @param {?} validators
         * @param {?} errorType
         * @return {?}
         */
        FormErrorService.prototype.getValidateByErrorType = /**
         * Get validate by error type
         * @param {?} validators
         * @param {?} errorType
         * @return {?}
         */
            function (validators, errorType) {
                return validators.find(( /**
                 * @param {?} v
                 * @return {?}
                 */function (v) { return v.validate === errorType; }));
            };
        FormErrorService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        FormErrorService.ctorParameters = function () { return []; };
        /** @nocollapse */ FormErrorService.ngInjectableDef = i0.defineInjectable({ factory: function FormErrorService_Factory() { return new FormErrorService(); }, token: FormErrorService, providedIn: "root" });
        return FormErrorService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?=} min
     * @return {?}
     */
    function minSelectedCheckboxes(min) {
        if (min === void 0) {
            min = 1;
        }
        /** @type {?} */
        var validator = ( /**
         * @param {?} formArray
         * @return {?}
         */function (formArray) {
            /** @type {?} */
            var totalSelected = formArray.controls
                // get a list of checkbox values (boolean)
                .map(( /**
         * @param {?} control
         * @return {?}
         */function (control) { return control.value; }))
                // total up the number of checked checkboxes
                .reduce(( /**
         * @param {?} prev
         * @param {?} next
         * @return {?}
         */function (prev, next) { return (next ? prev + next : prev); }), 0);
            // if the total is not greater than the minimum, return the error message
            return totalSelected >= min ? null : { required: true };
        });
        return validator;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormControlService = /** @class */ (function () {
        function FormControlService(formErrorService) {
            this.formErrorService = formErrorService;
        }
        /**
         * Convert controls into form group
         * @params controls
         * @returns form group instance
         */
        /**
         * Convert controls into form group
         * \@params controls
         * @param {?} controls
         * @return {?} form group instance
         */
        FormControlService.prototype.toFormGroup = /**
         * Convert controls into form group
         * \@params controls
         * @param {?} controls
         * @return {?} form group instance
         */
            function (controls) {
                var _this = this;
                /** @type {?} */
                var group = {};
                controls.forEach(( /**
                 * @param {?} c
                 * @return {?}
                 */function (c) {
                    if (c.controlType === ControlTypes.CHECKBOX) {
                        group[c.key] = _this.generateCheckboxes(c);
                    }
                    else {
                        /** @type {?} */
                        var validators = _this.formErrorService.getValidatesInstance(c.validators);
                        group[c.key] = new forms.FormControl(c.value || '', validators);
                    }
                }));
                return new forms.FormGroup(group);
            };
        /**
         * Generate FormArray check boxes
         * @param control <FormControlBase>
         * @returns <FormArray>
         */
        /**
         * Generate FormArray check boxes
         * @private
         * @param {?} control <FormControlBase>
         * @return {?} <FormArray>
         */
        FormControlService.prototype.generateCheckboxes = /**
         * Generate FormArray check boxes
         * @private
         * @param {?} control <FormControlBase>
         * @return {?} <FormArray>
         */
            function (control) {
                /** @type {?} */
                var chkControls = control['options'].map(( /**
                 * @param {?} opt
                 * @return {?}
                 */function (opt) {
                    // set checked for checkbox if value equal option
                    /** @type {?} */
                    var value = control['labelValue'] || 'value';
                    /** @type {?} */
                    var checked = false;
                    if (Array.isArray(control.value)) {
                        checked = control.value.indexOf(opt[value]) !== -1;
                    }
                    else {
                        checked = opt[value] === control.value;
                    }
                    return new forms.FormControl(checked);
                }));
                // set required validate for checkbox
                /** @type {?} */
                var validateRequired = this.formErrorService.getValidateByErrorType(control.validators, ErrorTypes.REQUIRED);
                if (validateRequired) {
                    // set numbers of checked box is required
                    return new forms.FormArray(chkControls, minSelectedCheckboxes(+validateRequired.data || 1));
                }
                return new forms.FormArray(chkControls);
            };
        /**
         * Marks all controls in a form group as touched
         * @param formGroup - The form group to touch
         */
        /**
         * Marks all controls in a form group as touched
         * @param {?} formGroup - The form group to touch
         * @return {?}
         */
        FormControlService.prototype.markFormGroupTouched = /**
         * Marks all controls in a form group as touched
         * @param {?} formGroup - The form group to touch
         * @return {?}
         */
            function (formGroup) {
                var _this = this;
                (( /** @type {?} */(Object))).values(formGroup.controls).forEach(( /**
                 * @param {?} control
                 * @return {?}
                 */function (control) {
                    control.markAsTouched();
                    if (control.controls) {
                        _this.markFormGroupTouched(control);
                    }
                }));
            };
        /**
         * Get controls data for form
         * @param controls FormControlBase<any>[]
         */
        /**
         * Get controls data for form
         * @param {?} controls FormControlBase<any>[]
         * @return {?}
         */
        FormControlService.prototype.getControlsData = /**
         * Get controls data for form
         * @param {?} controls FormControlBase<any>[]
         * @return {?}
         */
            function (controls) {
                /** @type {?} */
                var result = {};
                controls.forEach(( /**
                 * @param {?} c
                 * @return {?}
                 */function (c) {
                    result[c.key] = c.value;
                }));
                return result;
            };
        /**
         * Get selected checkboxes data
         * @param formData
         */
        /**
         * Get selected checkboxes data
         * @param {?} formData
         * @param {?} controls
         * @return {?}
         */
        FormControlService.prototype.getSelectedCheckboxesData = /**
         * Get selected checkboxes data
         * @param {?} formData
         * @param {?} controls
         * @return {?}
         */
            function (formData, controls) {
                /** @type {?} */
                var checkboxControls = controls.filter(( /**
                 * @param {?} c
                 * @return {?}
                 */function (c) { return c.controlType === ControlTypes.CHECKBOX; }));
                if (checkboxControls.length) {
                    var _loop_1 = function (key) {
                        /** @type {?} */
                        var control = ( /** @type {?} */(checkboxControls.find(( /**
                         * @param {?} c
                         * @return {?}
                         */function (c) { return c.key === key; }))));
                        if (!control) {
                            return "continue";
                        }
                        /** @type {?} */
                        var options = control.options || [];
                        if (formData[key].length !== options.length) {
                            throw Error("Number of checkboxes and options doesn't equal.");
                        }
                        /** @type {?} */
                        var checkboxesData = [];
                        for (var i = 0; i < formData[key].length; i++) {
                            if (formData[key][i] === true) {
                                checkboxesData.push(options[i][control.labelValue]);
                            }
                        }
                        formData[key] = checkboxesData;
                    };
                    for (var key in formData) {
                        _loop_1(key);
                    }
                }
                return formData;
            };
        /**
         * Convert checkboxes to form data
         * @param checkedValues
         * @param control
         */
        /**
         * Convert checkboxes to form data
         * @param {?} checkedValues
         * @param {?} control
         * @return {?}
         */
        FormControlService.prototype.convertCheckboxesToFormData = /**
         * Convert checkboxes to form data
         * @param {?} checkedValues
         * @param {?} control
         * @return {?}
         */
            function (checkedValues, control) {
                return control.options.map(( /**
                 * @param {?} checkbox
                 * @return {?}
                 */function (checkbox) {
                    return !!(checkedValues.indexOf(checkbox[control['labelValue']]) > -1);
                }));
            };
        /**
         * Reset Selected Options From Form Data
         * @param control
         */
        /**
         * Reset Selected Options From Form Data
         * @param {?} formData
         * @param {?} control
         * @param {?} controls
         * @return {?}
         */
        FormControlService.prototype.resetSelectedOptionsFromFormData = /**
         * Reset Selected Options From Form Data
         * @param {?} formData
         * @param {?} control
         * @param {?} controls
         * @return {?}
         */
            function (formData, control, controls) {
                formData = this.getSelectedCheckboxesData(formData, controls);
                /** @type {?} */
                var selectedOptions = formData[control.key];
                /** @type {?} */
                var newSelectedOptions = [];
                control.options.map(( /**
                 * @param {?} opt
                 * @return {?}
                 */function (opt) {
                    if (selectedOptions.indexOf(opt[control.labelValue]) > -1) {
                        // option exist on new list
                        newSelectedOptions.push(opt[control.labelValue]);
                    }
                }));
                return newSelectedOptions;
            };
        FormControlService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        FormControlService.ctorParameters = function () {
            return [
                { type: FormErrorService }
            ];
        };
        /** @nocollapse */ FormControlService.ngInjectableDef = i0.defineInjectable({ factory: function FormControlService_Factory() { return new FormControlService(i0.inject(FormErrorService)); }, token: FormControlService, providedIn: "root" });
        return FormControlService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HelperService = /** @class */ (function () {
        function HelperService() {
        }
        /**
         * Set scroll position into top
         */
        /**
         * Set scroll position into top
         * @return {?}
         */
        HelperService.prototype.scrollDropdownToTop = /**
         * Set scroll position into top
         * @return {?}
         */
            function () {
                document.querySelector('.panel-searchbox').scrollTop = 0;
            };
        HelperService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        HelperService.ctorParameters = function () { return []; };
        /** @nocollapse */ HelperService.ngInjectableDef = i0.defineInjectable({ factory: function HelperService_Factory() { return new HelperService(); }, token: HelperService, providedIn: "root" });
        return HelperService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DynamicFormComponent = /** @class */ (function () {
        function DynamicFormComponent(formControlService, helperService) {
            this.formControlService = formControlService;
            this.helperService = helperService;
            this.controls = [];
            this.submit = new i0.EventEmitter();
            this.unsubscribe$ = new rxjs.Subject();
            this.controlTypes = ControlTypes;
            this.filterOptions$ = new rxjs.Subject();
            this.loadMoreOptions$ = new rxjs.Subject();
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
                this.dynamicDropdown.forEach(( /**
                 * @param {?} dropdown
                 * @return {?}
                 */function (dropdown) {
                    dropdown.openedChange.pipe(operators.takeUntil(_this.unsubscribe$)).subscribe(( /**
                     * @param {?} isOpen
                     * @return {?}
                     */function (isOpen) {
                        if (isOpen) {
                            /** @type {?} */
                            var select = dropdown._elementRef.nativeElement;
                            /** @type {?} */
                            var panel = dropdown.panel.nativeElement;
                            /** @type {?} */
                            var controlKey = select.getAttribute('data-key');
                            /** @type {?} */
                            var control_1 = ( /** @type {?} */(_this.getControl(controlKey)));
                            if (control_1 && control_1.supportLoadMore) {
                                panel.addEventListener('scroll', ( /**
                                 * @param {?} event
                                 * @return {?}
                                 */function (event) { return _this.loadMoreOptionsOnScroll(event, control_1); }));
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
             */ function () {
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
                if (type === void 0) {
                    type = null;
                }
                return this.controls.find(( /**
                 * @param {?} c
                 * @return {?}
                 */function (c) {
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
                Object.keys(data).forEach(( /**
                 * @param {?} controlKey
                 * @return {?}
                 */function (controlKey) {
                    /** @type {?} */
                    var checkboxControl = _this.getControl(controlKey, ControlTypes.CHECKBOX);
                    /** @type {?} */
                    var value;
                    if (checkboxControl) {
                        value = _this.formControlService
                            .convertCheckboxesToFormData(data[controlKey], ( /** @type {?} */(checkboxControl)));
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
                        (( /** @type {?} */(this.controls[i]))).options = (( /** @type {?} */(this.originControls[i]))).options;
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
                    control.options.map(( /**
                     * @param {?} opt
                     * @return {?}
                     */function (opt) {
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
                this.filterOptions$.pipe(operators.debounceTime(400), operators.distinctUntilKeyChanged('searchText'), operators.map(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                    _this.filterControl = value.control;
                    _this.filterControl.loading = true;
                    _this.helperService.scrollDropdownToTop();
                    return value;
                })), operators.switchMap(( /**
                 * @param {?} filter
                 * @return {?}
                 */function (filter) { return filter.control.onSearch(filter.searchText); })), operators.takeUntil(this.unsubscribe$)).subscribe(( /**
                 * @param {?} options
                 * @return {?}
                 */function (options) {
                    if (Array.isArray(options) && _this.filterControl) {
                        var _a = _this.filterControl, key = _a.key, labelValue_1 = _a.labelValue;
                        /** @type {?} */
                        var formData = __assign({}, _this.form.value);
                        formData = _this.formControlService.getSelectedCheckboxesData(formData, _this.controls);
                        /** @type {?} */
                        var selectedOptionsValue_1 = formData[key];
                        /** @type {?} */
                        var selectedOptions_1 = _this.filterControl.options.filter(( /**
                         * @param {?} opt
                         * @return {?}
                         */function (opt) { return selectedOptionsValue_1.indexOf(opt[labelValue_1]) > -1; }));
                        // remove duplicated item on selected options
                        /** @type {?} */
                        var newOptions = options.filter(( /**
                         * @param {?} opt
                         * @return {?}
                         */function (opt) {
                            /** @type {?} */
                            var optionValue = opt[labelValue_1];
                            if (selectedOptions_1.find(( /**
                             * @param {?} s
                             * @return {?}
                             */function (s) {
                                return (( /** @type {?} */(s)))[labelValue_1] === optionValue;
                            }))) {
                                return false;
                            }
                            return true;
                        }));
                        // make selected element on top of dropdown
                        _this.setDropdownOptions(key, __spread(selectedOptions_1, newOptions));
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
                    .pipe(operators.debounceTime(400), operators.map(( /**
             * @param {?} control
             * @return {?}
             */function (control) {
                    _this.loadMoreControl = control;
                    _this.loadMoreControl.loading = true;
                    return control;
                })), operators.exhaustMap(( /**
                 * @param {?} control
                 * @return {?}
                 */function (control) { return control.loadMore(control.searchText); })), operators.takeUntil(this.unsubscribe$))
                    .subscribe(( /**
             * @param {?} options
             * @return {?}
             */function (options) {
                    /** @type {?} */
                    var dropdownControl = ( /** @type {?} */(_this.getControl(_this.loadMoreControl.key)));
                    var labelValue = dropdownControl.labelValue;
                    if (Array.isArray(options) && options.length) {
                        // filter options
                        /** @type {?} */
                        var filteredOptions = options.filter(( /**
                         * @param {?} opt
                         * @return {?}
                         */function (opt) {
                            if (dropdownControl.options.find(( /**
                             * @param {?} o
                             * @return {?}
                             */function (o) { return o[labelValue] === opt[labelValue]; }))) {
                                return false;
                            }
                            return true;
                        }));
                        dropdownControl.options = __spread(dropdownControl.options, filteredOptions);
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
                var control = ( /** @type {?} */(this.getControl(controlKey, ControlTypes.DROPDOWN)));
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
                var formData = __assign({}, this.form.value);
                formData = this.formControlService.getSelectedCheckboxesData(formData, this.controls);
                this.submit.emit(formData);
            };
        DynamicFormComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'lib-dynamic-form',
                        template: "<form [formGroup]=\"form\" class=\"container\">\n  <!-- Form controls -->\n  <div *ngFor=\"let control of controls\" class=\"form-row\">\n    <div [ngSwitch]=\"control.controlType\">\n      <!-- Text box -->\n      <mat-form-field *ngSwitchCase=\"controlTypes.TEXTBOX\">\n        <input\n          matInput\n          [formControlName]=\"control.key\"\n          [type]=\"control['type']\"\n          [placeholder]=\"control.label\"\n          [required]=\"control.isRequired\"\n          [autocomplete]=\"control['type'] === 'password'\"\n        />\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </mat-form-field>\n      <!-- End text box -->\n\n      <!-- Textarea -->\n      <mat-form-field *ngSwitchCase=\"controlTypes.TEXTAREA\">\n        <textarea\n          matInput\n          [formControlName]=\"control.key\"\n          [placeholder]=\"control.label\"\n          [required]=\"control.isRequired\"\n        ></textarea>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </mat-form-field>\n      <!-- End textarea -->\n\n      <!-- Dropdown -->\n      <mat-form-field *ngSwitchCase=\"controlTypes.DROPDOWN\">\n        <mat-select\n          [placeholder]=\"control.label\"\n          [formControlName]=\"control.key\"\n          [required]=\"control.isRequired\"\n          [multiple]=\"control['multiple']\"\n          [attr.data-key]=\"control.key\"\n          disableOptionCentering\n          #dynamicDropdown\n          [panelClass]=\"!control['hideSearchBox'] ? 'panel-searchbox' : ''\"\n        >\n          <mat-option [class.multiple-select]=\"control['multiple']\" class=\"search-box\" *ngIf=\"!control['hideSearchBox']\" [disabled]=\"true\">\n            <input\n              matInput\n              (ngModelChange)=\"onFilterOptions($event, control)\"\n              [(ngModel)]=\"control['searchText']\"\n              [ngModelOptions]=\"{standalone: true}\"\n              placeholder=\"Enter your search text...\"\n              autocomplete=\"false\"\n              (keydown)=\"$event.stopPropagation()\"\n            >\n            <mat-progress-spinner\n              *ngIf=\"control['loading']\"\n              class=\"search-box-spinner\"\n              color=\"primary\"\n              mode=\"indeterminate\"\n              diameter=\"20\"\n            >\n            </mat-progress-spinner>\n          </mat-option>\n          <ng-container *ngFor=\"let opt of control['options']\">\n            <mat-option\n              *ngIf=\"!opt['hidden']\"\n              [value]=\"\n                control['labelValue'] ? opt[control['labelValue']] : opt.value\n              \"\n            >\n              {{ control['labelName'] ? opt[control['labelName']] : opt.label }}\n            </mat-option>\n          </ng-container>\n        </mat-select>\n      </mat-form-field>\n      <!-- End dropdown -->\n\n      <!-- Checkbox -->\n      <div *ngSwitchCase=\"controlTypes.CHECKBOX\" class=\"custom-section\">\n        <label\n          class=\"custom-mat-form-field-label\"\n          [class.required]=\"control.isRequired\"\n          >{{ control.label }}</label\n        >\n        <section [formArrayName]=\"control.key\" class=\"checkbox-section\">\n          <mat-checkbox\n            *ngFor=\"let chk of form.get(control.key)['controls']; let i = index\"\n            [formControlName]=\"i\"\n            class=\"dyn-checkbox\"\n          >\n            {{\n              control['labelName']\n                ? control['options'][i][control['labelName']]\n                : control['options'][i].label\n            }}\n          </mat-checkbox>\n        </section>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </div>\n      <!-- End checkbox -->\n\n      <!-- Radio -->\n      <div *ngSwitchCase=\"controlTypes.RADIO\" class=\"custom-section\">\n        <label\n          class=\"custom-mat-form-field-label\"\n          [class.required]=\"control.isRequired\"\n          >{{ control.label }}</label\n        >\n        <section>\n          <mat-radio-group\n            class=\"example-radio-group\"\n            [formControlName]=\"control.key\"\n          >\n            <mat-radio-button\n              class=\"dyn-radio\"\n              *ngFor=\"let opt of control['options']\"\n              [value]=\"\n                control['labelValue'] ? opt[control['labelValue']] : opt.value\n              \"\n            >\n              {{ control['labelName'] ? opt[control['labelName']] : opt.label }}\n            </mat-radio-button>\n          </mat-radio-group>\n        </section>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </div>\n      <!-- End radio -->\n\n      <!-- Custom form field -->\n      <div *ngSwitchCase=\"controlTypes.CUSTOM\" class=\"custom-section\">\n        <custom-field [form]=\"form\" [control]=\"control\"></custom-field>\n        <mat-error\n          *ngIf=\"form.get(control.key).errors && form.get(control.key).touched\"\n        >\n          <error-messages\n            [errors]=\"form.get(control.key).errors\"\n            [validators]=\"control.validators\"\n          ></error-messages>\n        </mat-error>\n      </div>\n      <!-- End Custom form field -->\n    </div>\n  </div>\n  <!-- End form controls -->\n\n  <!-- Actions -->\n  <div class=\"button-row\">\n    <button\n      mat-raised-button\n      [color]=\"actions?.submit?.color || 'primary'\"\n      (click)=\"onSubmit($event)\"\n    >\n      {{ actions?.submit?.label || 'Submit' }}\n    </button>\n\n    <button\n      mat-raised-button\n      [color]=\"actions?.reset?.color || ''\"\n      type=\"button\"\n      (click)=\"resetForm($event)\"\n    >\n      {{ actions?.reset?.label || 'Reset' }}\n    </button>\n  </div>\n  <!-- End actions -->\n</form>\n",
                        styles: [".container{display:flex;flex-direction:column;font-family:Roboto,\"Helvetica Neue\",sans-serif;max-width:100%!important}.container :not(button){width:100%}.button-row a,.button-row button{margin-right:8px}.form-row{margin-bottom:10px}.dyn-checkbox{margin-right:8px}.dyn-radio{margin-bottom:8px}.custom-mat-form-field-label{font-size:12px}.custom-mat-form-field-label.required::after{content:\" *\";display:inline;color:#f44336}::ng-deep .mat-option.search-box .mat-pseudo-checkbox{display:none}::ng-deep .mat-option.search-box{position:absolute;top:0;left:0;background:#fff;z-index:999;border-bottom:1px solid #e7e7e7;min-width:calc(100% + 32px)}::ng-deep .mat-option.search-box.multiple-select{min-width:calc(100% + 64px)}.panel-searchbox{-webkit-transform:none!important;transform:none!important;padding-top:48px}::ng-deep .panel-searchbox{-webkit-transform:none!important;transform:none!important;padding-top:48px!important}.search-box-spinner{position:absolute;right:14px;top:14px}.checkbox-section{display:flex;flex-direction:column}"]
                    }] }
        ];
        /** @nocollapse */
        DynamicFormComponent.ctorParameters = function () {
            return [
                { type: FormControlService },
                { type: HelperService }
            ];
        };
        DynamicFormComponent.propDecorators = {
            controls: [{ type: i0.Input }],
            actions: [{ type: i0.Input }],
            submit: [{ type: i0.Output }],
            dynamicDropdown: [{ type: i0.ViewChildren, args: ['dynamicDropdown',] }]
        };
        return DynamicFormComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ErrorMessagesComponent = /** @class */ (function () {
        function ErrorMessagesComponent(formErrorService) {
            this.formErrorService = formErrorService;
            this.validators = [];
            this.errorTypes = ErrorTypes;
        }
        /**
         * @param {?} errorType
         * @return {?}
         */
        ErrorMessagesComponent.prototype.getErrorMessage = /**
         * @param {?} errorType
         * @return {?}
         */
            function (errorType) {
                return this.formErrorService.getErrorMessage(this.validators, errorType);
            };
        ErrorMessagesComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'error-messages',
                        template: "<div class=\"errors\">\n  <div *ngIf=\"errors.required\">\n    {{ getErrorMessage(errorTypes.REQUIRED) }}\n  </div>\n  <div *ngIf=\"errors.min\">\n    {{ getErrorMessage(errorTypes.MIN) }}\n  </div>\n  <div *ngIf=\"errors.max\">\n    {{ getErrorMessage(errorTypes.MAX) }}\n  </div>\n  <div *ngIf=\"errors.minlength\">\n    {{ getErrorMessage(errorTypes.MIN_LENGTH) }}\n  </div>\n  <div *ngIf=\"errors.maxlength\">\n    {{ getErrorMessage(errorTypes.MAX_LENGTH) }}\n  </div>\n  <div *ngIf=\"errors.email\">\n    {{ getErrorMessage(errorTypes.EMAIL) }}\n  </div>\n  <div *ngIf=\"errors.pattern\">\n    {{ getErrorMessage(errorTypes.PATTERN) }}\n  </div>\n</div>\n",
                        styles: [".errors{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}"]
                    }] }
        ];
        /** @nocollapse */
        ErrorMessagesComponent.ctorParameters = function () {
            return [
                { type: FormErrorService }
            ];
        };
        ErrorMessagesComponent.propDecorators = {
            errors: [{ type: i0.Input }],
            validators: [{ type: i0.Input }]
        };
        return ErrorMessagesComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DynamicFieldDirective = /** @class */ (function () {
        function DynamicFieldDirective(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        DynamicFieldDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[appDynamicField]'
                    },] }
        ];
        /** @nocollapse */
        DynamicFieldDirective.ctorParameters = function () {
            return [
                { type: i0.ViewContainerRef }
            ];
        };
        return DynamicFieldDirective;
    }());

    var CustomFieldComponent = /** @class */ (function () {
        function CustomFieldComponent(componentFactoryResolver) {
            this.componentFactoryResolver = componentFactoryResolver;
        }
        /**
         * @return {?}
         */
        CustomFieldComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.loadComponent();
            };
        /**
         * @return {?}
         */
        CustomFieldComponent.prototype.loadComponent = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var componentFactory = this.componentFactoryResolver
                    .resolveComponentFactory(this.control.component);
                /** @type {?} */
                var viewContainerRef = this.customFieldHost.viewContainerRef;
                viewContainerRef.clear();
                /** @type {?} */
                var componentRef = viewContainerRef.createComponent(componentFactory);
                componentRef.instance['form'] = this.form;
                componentRef.instance['controlKey'] = this.control.key;
            };
        CustomFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'custom-field',
                        template: "<div [formGroup]=\"form\">\n    <ng-template appDynamicField></ng-template>\n</div>\n\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        CustomFieldComponent.ctorParameters = function () {
            return [
                { type: i0.ComponentFactoryResolver }
            ];
        };
        CustomFieldComponent.propDecorators = {
            form: [{ type: i0.Input }],
            control: [{ type: i0.Input }],
            customFieldHost: [{ type: i0.ViewChild, args: [DynamicFieldDirective,] }]
        };
        return CustomFieldComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DynamicFormModule = /** @class */ (function () {
        function DynamicFormModule() {
        }
        DynamicFormModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [
                            DynamicFormComponent,
                            ErrorMessagesComponent,
                            DynamicFieldDirective,
                            CustomFieldComponent
                        ],
                        imports: [
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            common.CommonModule,
                            // BrowserAnimationsModule,
                            material.MatInputModule,
                            material.MatSelectModule,
                            material.MatCheckboxModule,
                            material.MatRadioModule,
                            material.MatButtonModule,
                            progressSpinner.MatProgressSpinnerModule
                        ],
                        exports: [DynamicFormComponent]
                    },] }
        ];
        return DynamicFormModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CheckboxControl = /** @class */ (function (_super) {
        __extends(CheckboxControl, _super);
        function CheckboxControl(options) {
            if (options === void 0) {
                options = {};
            }
            var _this = _super.call(this, options) || this;
            _this.controlType = ControlTypes.CHECKBOX;
            _this.options = [];
            _this.labelValue = options['labelValue'] || '';
            _this.labelName = options['labelName'] || '';
            _this.options = options['options'] || [];
            return _this;
        }
        return CheckboxControl;
    }(FormControlBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RadioGroupControl = /** @class */ (function (_super) {
        __extends(RadioGroupControl, _super);
        function RadioGroupControl(options) {
            if (options === void 0) {
                options = {};
            }
            var _this = _super.call(this, options) || this;
            _this.controlType = ControlTypes.RADIO;
            _this.options = [];
            _this.labelValue = options['labelValue'] || '';
            _this.labelName = options['labelName'] || '';
            _this.options = options['options'] || [];
            return _this;
        }
        return RadioGroupControl;
    }(FormControlBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TextareaControl = /** @class */ (function (_super) {
        __extends(TextareaControl, _super);
        function TextareaControl(options) {
            if (options === void 0) {
                options = {};
            }
            var _this = _super.call(this, options) || this;
            _this.controlType = ControlTypes.TEXTAREA;
            return _this;
        }
        return TextareaControl;
    }(FormControlBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TextboxControl = /** @class */ (function (_super) {
        __extends(TextboxControl, _super);
        function TextboxControl(options) {
            if (options === void 0) {
                options = {};
            }
            var _this = _super.call(this, options) || this;
            _this.controlType = ControlTypes.TEXTBOX;
            // set type for text box
            // exam: text, number...
            _this.type = options['type'] || '';
            return _this;
        }
        return TextboxControl;
    }(FormControlBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CustomFieldControl = /** @class */ (function (_super) {
        __extends(CustomFieldControl, _super);
        function CustomFieldControl(options) {
            if (options === void 0) {
                options = {};
            }
            var _this = _super.call(this, options) || this;
            _this.controlType = ControlTypes.CUSTOM;
            if (options['component']) {
                _this.component = options['component'];
            }
            return _this;
        }
        return CustomFieldControl;
    }(FormControlBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.DynamicFormComponent = DynamicFormComponent;
    exports.DynamicFormModule = DynamicFormModule;
    exports.CheckboxControl = CheckboxControl;
    exports.DropdownControl = DropdownControl;
    exports.FormControlBase = FormControlBase;
    exports.RadioGroupControl = RadioGroupControl;
    exports.TextareaControl = TextareaControl;
    exports.TextboxControl = TextboxControl;
    exports.CustomFieldControl = CustomFieldControl;
    exports.ErrorTypes = ErrorTypes;
    exports.ɵe = DynamicFieldDirective;
    exports.ɵf = CustomFieldComponent;
    exports.ɵd = ErrorMessagesComponent;
    exports.ɵa = FormControlService;
    exports.ɵb = FormErrorService;
    exports.ɵc = HelperService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=nvd264-ng-dynamic-form.umd.js.map