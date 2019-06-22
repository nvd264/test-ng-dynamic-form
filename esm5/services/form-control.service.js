/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormErrorService } from './form-error.service';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { minSelectedCheckboxes } from '../validators/min-checkbox.directive';
import { ErrorTypes } from '../enums/error-types.enum';
import { ControlTypes } from '../enums/control-types.enum';
import * as i0 from "@angular/core";
import * as i1 from "./form-error.service";
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
        controls.forEach((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (c.controlType === ControlTypes.CHECKBOX) {
                group[c.key] = _this.generateCheckboxes(c);
            }
            else {
                /** @type {?} */
                var validators = _this.formErrorService.getValidatesInstance(c.validators);
                group[c.key] = new FormControl(c.value || '', validators);
            }
        }));
        return new FormGroup(group);
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
        var chkControls = control['options'].map((/**
         * @param {?} opt
         * @return {?}
         */
        function (opt) {
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
            return new FormControl(checked);
        }));
        // set required validate for checkbox
        /** @type {?} */
        var validateRequired = this.formErrorService.getValidateByErrorType(control.validators, ErrorTypes.REQUIRED);
        if (validateRequired) {
            // set numbers of checked box is required
            return new FormArray(chkControls, minSelectedCheckboxes(+validateRequired.data || 1));
        }
        return new FormArray(chkControls);
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
        ((/** @type {?} */ (Object))).values(formGroup.controls).forEach((/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
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
        controls.forEach((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
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
        var checkboxControls = controls.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.controlType === ControlTypes.CHECKBOX; }));
        if (checkboxControls.length) {
            var _loop_1 = function (key) {
                /** @type {?} */
                var control = (/** @type {?} */ (checkboxControls.find((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.key === key; }))));
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
        return control.options.map((/**
         * @param {?} checkbox
         * @return {?}
         */
        function (checkbox) {
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
        control.options.map((/**
         * @param {?} opt
         * @return {?}
         */
        function (opt) {
            if (selectedOptions.indexOf(opt[control.labelValue]) > -1) {
                // option exist on new list
                newSelectedOptions.push(opt[control.labelValue]);
            }
        }));
        return newSelectedOptions;
    };
    FormControlService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FormControlService.ctorParameters = function () { return [
        { type: FormErrorService }
    ]; };
    /** @nocollapse */ FormControlService.ngInjectableDef = i0.defineInjectable({ factory: function FormControlService_Factory() { return new FormControlService(i0.inject(i1.FormErrorService)); }, token: FormControlService, providedIn: "root" });
    return FormControlService;
}());
export { FormControlService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FormControlService.prototype.formErrorService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbnZkMjY0L25nLWR5bmFtaWMtZm9ybS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2Zvcm0tY29udHJvbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUd2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7OztBQUUzRDtJQUlFLDRCQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFJLENBQUM7SUFFM0Q7Ozs7T0FJRzs7Ozs7OztJQUNILHdDQUFXOzs7Ozs7SUFBWCxVQUFZLFFBQWdDO1FBQTVDLGlCQVlDOztZQVhPLEtBQUssR0FBUSxFQUFFO1FBRXJCLFFBQVEsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLFdBQVcsS0FBSyxZQUFZLENBQUMsUUFBUSxFQUFFO2dCQUMzQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzQztpQkFBTTs7b0JBQ0MsVUFBVSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO2dCQUMzRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksV0FB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QkFBeUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7O1lBQ3hELGVBQWUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7WUFFdkMsa0JBQWtCLEdBQUcsRUFBRTtRQUM3QixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDckIsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDekQsMkJBQTJCO2dCQUMzQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLGtCQUFrQixDQUFDO0lBQzVCLENBQUM7O2dCQTFJRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVpRLGdCQUFnQjs7OzZCQUF6QjtDQXFKQyxBQTNJRCxJQTJJQztTQXhJWSxrQkFBa0I7Ozs7OztJQUNqQiw4Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9mb3JtLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2xCYXNlIH0gZnJvbSAnLi8uLi9tb2RlbHMvRm9ybUNvbnRyb2xCYXNlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IG1pblNlbGVjdGVkQ2hlY2tib3hlcyB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWluLWNoZWNrYm94LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFcnJvclR5cGVzIH0gZnJvbSAnLi4vZW51bXMvZXJyb3ItdHlwZXMuZW51bSc7XG5pbXBvcnQgeyBEcm9wZG93bkNvbnRyb2wgfSBmcm9tICcuLi9tb2RlbHMvRHJvcGRvd25Db250cm9sJztcbmltcG9ydCB7IENoZWNrYm94Q29udHJvbCB9IGZyb20gJy4uL21vZGVscy9DaGVja2JveENvbnRyb2wnO1xuaW1wb3J0IHsgQ29udHJvbFR5cGVzIH0gZnJvbSAnLi4vZW51bXMvY29udHJvbC10eXBlcy5lbnVtJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtRXJyb3JTZXJ2aWNlOiBGb3JtRXJyb3JTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogQ29udmVydCBjb250cm9scyBpbnRvIGZvcm0gZ3JvdXBcbiAgICogQHBhcmFtcyBjb250cm9sc1xuICAgKiBAcmV0dXJucyBmb3JtIGdyb3VwIGluc3RhbmNlXG4gICAqL1xuICB0b0Zvcm1Hcm91cChjb250cm9sczogRm9ybUNvbnRyb2xCYXNlPGFueT5bXSkge1xuICAgIGNvbnN0IGdyb3VwOiBhbnkgPSB7fTtcblxuICAgIGNvbnRyb2xzLmZvckVhY2goYyA9PiB7XG4gICAgICBpZiAoYy5jb250cm9sVHlwZSA9PT0gQ29udHJvbFR5cGVzLkNIRUNLQk9YKSB7XG4gICAgICAgIGdyb3VwW2Mua2V5XSA9IHRoaXMuZ2VuZXJhdGVDaGVja2JveGVzKGMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMuZm9ybUVycm9yU2VydmljZS5nZXRWYWxpZGF0ZXNJbnN0YW5jZShjLnZhbGlkYXRvcnMpO1xuICAgICAgICBncm91cFtjLmtleV0gPSBuZXcgRm9ybUNvbnRyb2woYy52YWx1ZSB8fCAnJywgdmFsaWRhdG9ycyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBGb3JtR3JvdXAoZ3JvdXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIEZvcm1BcnJheSBjaGVjayBib3hlc1xuICAgKiBAcGFyYW0gY29udHJvbCA8Rm9ybUNvbnRyb2xCYXNlPlxuICAgKiBAcmV0dXJucyA8Rm9ybUFycmF5PlxuICAgKi9cbiAgcHJpdmF0ZSBnZW5lcmF0ZUNoZWNrYm94ZXMoY29udHJvbDogRm9ybUNvbnRyb2xCYXNlPGFueT4pIHtcbiAgICBjb25zdCBjaGtDb250cm9scyA9IGNvbnRyb2xbJ29wdGlvbnMnXS5tYXAob3B0ID0+IHtcbiAgICAgIC8vIHNldCBjaGVja2VkIGZvciBjaGVja2JveCBpZiB2YWx1ZSBlcXVhbCBvcHRpb25cbiAgICAgIGNvbnN0IHZhbHVlID0gY29udHJvbFsnbGFiZWxWYWx1ZSddIHx8ICd2YWx1ZSc7XG4gICAgICBsZXQgY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgY2hlY2tlZCA9IGNvbnRyb2wudmFsdWUuaW5kZXhPZihvcHRbdmFsdWVdKSAhPT0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGVja2VkID0gb3B0W3ZhbHVlXSA9PT0gY29udHJvbC52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRm9ybUNvbnRyb2woY2hlY2tlZCk7XG4gICAgfSk7XG4gICAgLy8gc2V0IHJlcXVpcmVkIHZhbGlkYXRlIGZvciBjaGVja2JveFxuICAgIGNvbnN0IHZhbGlkYXRlUmVxdWlyZWQgPSB0aGlzLmZvcm1FcnJvclNlcnZpY2UuZ2V0VmFsaWRhdGVCeUVycm9yVHlwZShjb250cm9sLnZhbGlkYXRvcnMsIEVycm9yVHlwZXMuUkVRVUlSRUQpO1xuICAgIGlmICh2YWxpZGF0ZVJlcXVpcmVkKSB7XG4gICAgICAvLyBzZXQgbnVtYmVycyBvZiBjaGVja2VkIGJveCBpcyByZXF1aXJlZFxuICAgICAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoY2hrQ29udHJvbHMsIG1pblNlbGVjdGVkQ2hlY2tib3hlcygrdmFsaWRhdGVSZXF1aXJlZC5kYXRhIHx8IDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoY2hrQ29udHJvbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtzIGFsbCBjb250cm9scyBpbiBhIGZvcm0gZ3JvdXAgYXMgdG91Y2hlZFxuICAgKiBAcGFyYW0gZm9ybUdyb3VwIC0gVGhlIGZvcm0gZ3JvdXAgdG8gdG91Y2hcbiAgICovXG4gIG1hcmtGb3JtR3JvdXBUb3VjaGVkKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgKDxhbnk+T2JqZWN0KS52YWx1ZXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG5cbiAgICAgIGlmIChjb250cm9sLmNvbnRyb2xzKSB7XG4gICAgICAgIHRoaXMubWFya0Zvcm1Hcm91cFRvdWNoZWQoY29udHJvbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbnRyb2xzIGRhdGEgZm9yIGZvcm1cbiAgICogQHBhcmFtIGNvbnRyb2xzIEZvcm1Db250cm9sQmFzZTxhbnk+W11cbiAgICovXG4gIGdldENvbnRyb2xzRGF0YShjb250cm9sczogRm9ybUNvbnRyb2xCYXNlPGFueT5bXSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGNvbnRyb2xzLmZvckVhY2goYyA9PiB7XG4gICAgICByZXN1bHRbYy5rZXldID0gYy52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHNlbGVjdGVkIGNoZWNrYm94ZXMgZGF0YVxuICAgKiBAcGFyYW0gZm9ybURhdGFcbiAgICovXG4gIGdldFNlbGVjdGVkQ2hlY2tib3hlc0RhdGEoZm9ybURhdGE6IGFueSwgY29udHJvbHM6IEZvcm1Db250cm9sQmFzZTxhbnk+W10pIHtcbiAgICBsZXQgY2hlY2tib3hDb250cm9scyA9IGNvbnRyb2xzLmZpbHRlcihjID0+IGMuY29udHJvbFR5cGUgPT09IENvbnRyb2xUeXBlcy5DSEVDS0JPWCk7XG4gICAgaWYgKGNoZWNrYm94Q29udHJvbHMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gZm9ybURhdGEpIHtcbiAgICAgICAgY29uc3QgY29udHJvbCA9IDxEcm9wZG93bkNvbnRyb2w+Y2hlY2tib3hDb250cm9scy5maW5kKGMgPT4gYy5rZXkgPT09IGtleSk7XG4gICAgICAgIGlmICghY29udHJvbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRyb2wub3B0aW9ucyB8fCBbXTtcblxuICAgICAgICBpZiAoZm9ybURhdGFba2V5XS5sZW5ndGggIT09IG9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoYE51bWJlciBvZiBjaGVja2JveGVzIGFuZCBvcHRpb25zIGRvZXNuJ3QgZXF1YWwuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hlY2tib3hlc0RhdGEgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtRGF0YVtrZXldLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGZvcm1EYXRhW2tleV1baV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNoZWNrYm94ZXNEYXRhLnB1c2gob3B0aW9uc1tpXVtjb250cm9sLmxhYmVsVmFsdWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtRGF0YVtrZXldID0gY2hlY2tib3hlc0RhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGNoZWNrYm94ZXMgdG8gZm9ybSBkYXRhXG4gICAqIEBwYXJhbSBjaGVja2VkVmFsdWVzXG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBjb252ZXJ0Q2hlY2tib3hlc1RvRm9ybURhdGEoY2hlY2tlZFZhbHVlczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiwgY29udHJvbDogQ2hlY2tib3hDb250cm9sKSB7XG4gICAgcmV0dXJuIGNvbnRyb2wub3B0aW9ucy5tYXAoXG4gICAgICBjaGVja2JveCA9PiB7XG4gICAgICAgIHJldHVybiAhIShjaGVja2VkVmFsdWVzLmluZGV4T2YoY2hlY2tib3hbY29udHJvbFsnbGFiZWxWYWx1ZSddXSkgPiAtMSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBTZWxlY3RlZCBPcHRpb25zIEZyb20gRm9ybSBEYXRhXG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICByZXNldFNlbGVjdGVkT3B0aW9uc0Zyb21Gb3JtRGF0YShmb3JtRGF0YTogT2JqZWN0LCBjb250cm9sOiBEcm9wZG93bkNvbnRyb2wsIGNvbnRyb2xzOiBGb3JtQ29udHJvbEJhc2U8YW55PltdKSB7XG4gICAgZm9ybURhdGEgPSB0aGlzLmdldFNlbGVjdGVkQ2hlY2tib3hlc0RhdGEoZm9ybURhdGEsIGNvbnRyb2xzKTtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSBmb3JtRGF0YVtjb250cm9sLmtleV07XG5cbiAgICBjb25zdCBuZXdTZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICBjb250cm9sLm9wdGlvbnMubWFwKG9wdCA9PiB7XG4gICAgICBpZiAoc2VsZWN0ZWRPcHRpb25zLmluZGV4T2Yob3B0W2NvbnRyb2wubGFiZWxWYWx1ZV0pID4gLTEpIHtcbiAgICAgICAgLy8gb3B0aW9uIGV4aXN0IG9uIG5ldyBsaXN0XG4gICAgICAgIG5ld1NlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdFtjb250cm9sLmxhYmVsVmFsdWVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmV3U2VsZWN0ZWRPcHRpb25zO1xuICB9XG59XG4iXX0=