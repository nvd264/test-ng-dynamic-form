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
export class FormControlService {
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
/** @nocollapse */ FormControlService.ngInjectableDef = i0.defineInjectable({ factory: function FormControlService_Factory() { return new FormControlService(i0.inject(i1.FormErrorService)); }, token: FormControlService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    FormControlService.prototype.formErrorService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbnZkMjY0L25nLWR5bmFtaWMtZm9ybS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2Zvcm0tY29udHJvbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUd2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7OztBQUszRCxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBQzdCLFlBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUksQ0FBQzs7Ozs7OztJQU8zRCxXQUFXLENBQUMsUUFBZ0M7O2NBQ3BDLEtBQUssR0FBUSxFQUFFO1FBRXJCLFFBQVEsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLENBQUMsV0FBVyxLQUFLLFlBQVksQ0FBQyxRQUFRLEVBQUU7Z0JBQzNDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNDO2lCQUFNOztzQkFDQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7Z0JBQzNFLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FB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Q0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUN6RCwyQkFBMkI7Z0JBQzNCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDbEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sa0JBQWtCLENBQUM7SUFDNUIsQ0FBQzs7O1lBMUlGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVpRLGdCQUFnQjs7Ozs7Ozs7SUFjWCw4Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9mb3JtLWVycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2xCYXNlIH0gZnJvbSAnLi8uLi9tb2RlbHMvRm9ybUNvbnRyb2xCYXNlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IG1pblNlbGVjdGVkQ2hlY2tib3hlcyB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWluLWNoZWNrYm94LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFcnJvclR5cGVzIH0gZnJvbSAnLi4vZW51bXMvZXJyb3ItdHlwZXMuZW51bSc7XG5pbXBvcnQgeyBEcm9wZG93bkNvbnRyb2wgfSBmcm9tICcuLi9tb2RlbHMvRHJvcGRvd25Db250cm9sJztcbmltcG9ydCB7IENoZWNrYm94Q29udHJvbCB9IGZyb20gJy4uL21vZGVscy9DaGVja2JveENvbnRyb2wnO1xuaW1wb3J0IHsgQ29udHJvbFR5cGVzIH0gZnJvbSAnLi4vZW51bXMvY29udHJvbC10eXBlcy5lbnVtJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtRXJyb3JTZXJ2aWNlOiBGb3JtRXJyb3JTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogQ29udmVydCBjb250cm9scyBpbnRvIGZvcm0gZ3JvdXBcbiAgICogQHBhcmFtcyBjb250cm9sc1xuICAgKiBAcmV0dXJucyBmb3JtIGdyb3VwIGluc3RhbmNlXG4gICAqL1xuICB0b0Zvcm1Hcm91cChjb250cm9sczogRm9ybUNvbnRyb2xCYXNlPGFueT5bXSkge1xuICAgIGNvbnN0IGdyb3VwOiBhbnkgPSB7fTtcblxuICAgIGNvbnRyb2xzLmZvckVhY2goYyA9PiB7XG4gICAgICBpZiAoYy5jb250cm9sVHlwZSA9PT0gQ29udHJvbFR5cGVzLkNIRUNLQk9YKSB7XG4gICAgICAgIGdyb3VwW2Mua2V5XSA9IHRoaXMuZ2VuZXJhdGVDaGVja2JveGVzKGMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMuZm9ybUVycm9yU2VydmljZS5nZXRWYWxpZGF0ZXNJbnN0YW5jZShjLnZhbGlkYXRvcnMpO1xuICAgICAgICBncm91cFtjLmtleV0gPSBuZXcgRm9ybUNvbnRyb2woYy52YWx1ZSB8fCAnJywgdmFsaWRhdG9ycyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBGb3JtR3JvdXAoZ3JvdXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIEZvcm1BcnJheSBjaGVjayBib3hlc1xuICAgKiBAcGFyYW0gY29udHJvbCA8Rm9ybUNvbnRyb2xCYXNlPlxuICAgKiBAcmV0dXJucyA8Rm9ybUFycmF5PlxuICAgKi9cbiAgcHJpdmF0ZSBnZW5lcmF0ZUNoZWNrYm94ZXMoY29udHJvbDogRm9ybUNvbnRyb2xCYXNlPGFueT4pIHtcbiAgICBjb25zdCBjaGtDb250cm9scyA9IGNvbnRyb2xbJ29wdGlvbnMnXS5tYXAob3B0ID0+IHtcbiAgICAgIC8vIHNldCBjaGVja2VkIGZvciBjaGVja2JveCBpZiB2YWx1ZSBlcXVhbCBvcHRpb25cbiAgICAgIGNvbnN0IHZhbHVlID0gY29udHJvbFsnbGFiZWxWYWx1ZSddIHx8ICd2YWx1ZSc7XG4gICAgICBsZXQgY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgY2hlY2tlZCA9IGNvbnRyb2wudmFsdWUuaW5kZXhPZihvcHRbdmFsdWVdKSAhPT0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGVja2VkID0gb3B0W3ZhbHVlXSA9PT0gY29udHJvbC52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRm9ybUNvbnRyb2woY2hlY2tlZCk7XG4gICAgfSk7XG4gICAgLy8gc2V0IHJlcXVpcmVkIHZhbGlkYXRlIGZvciBjaGVja2JveFxuICAgIGNvbnN0IHZhbGlkYXRlUmVxdWlyZWQgPSB0aGlzLmZvcm1FcnJvclNlcnZpY2UuZ2V0VmFsaWRhdGVCeUVycm9yVHlwZShjb250cm9sLnZhbGlkYXRvcnMsIEVycm9yVHlwZXMuUkVRVUlSRUQpO1xuICAgIGlmICh2YWxpZGF0ZVJlcXVpcmVkKSB7XG4gICAgICAvLyBzZXQgbnVtYmVycyBvZiBjaGVja2VkIGJveCBpcyByZXF1aXJlZFxuICAgICAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoY2hrQ29udHJvbHMsIG1pblNlbGVjdGVkQ2hlY2tib3hlcygrdmFsaWRhdGVSZXF1aXJlZC5kYXRhIHx8IDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoY2hrQ29udHJvbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtzIGFsbCBjb250cm9scyBpbiBhIGZvcm0gZ3JvdXAgYXMgdG91Y2hlZFxuICAgKiBAcGFyYW0gZm9ybUdyb3VwIC0gVGhlIGZvcm0gZ3JvdXAgdG8gdG91Y2hcbiAgICovXG4gIG1hcmtGb3JtR3JvdXBUb3VjaGVkKGZvcm1Hcm91cDogRm9ybUdyb3VwKSB7XG4gICAgKDxhbnk+T2JqZWN0KS52YWx1ZXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG5cbiAgICAgIGlmIChjb250cm9sLmNvbnRyb2xzKSB7XG4gICAgICAgIHRoaXMubWFya0Zvcm1Hcm91cFRvdWNoZWQoY29udHJvbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbnRyb2xzIGRhdGEgZm9yIGZvcm1cbiAgICogQHBhcmFtIGNvbnRyb2xzIEZvcm1Db250cm9sQmFzZTxhbnk+W11cbiAgICovXG4gIGdldENvbnRyb2xzRGF0YShjb250cm9sczogRm9ybUNvbnRyb2xCYXNlPGFueT5bXSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGNvbnRyb2xzLmZvckVhY2goYyA9PiB7XG4gICAgICByZXN1bHRbYy5rZXldID0gYy52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHNlbGVjdGVkIGNoZWNrYm94ZXMgZGF0YVxuICAgKiBAcGFyYW0gZm9ybURhdGFcbiAgICovXG4gIGdldFNlbGVjdGVkQ2hlY2tib3hlc0RhdGEoZm9ybURhdGE6IGFueSwgY29udHJvbHM6IEZvcm1Db250cm9sQmFzZTxhbnk+W10pIHtcbiAgICBsZXQgY2hlY2tib3hDb250cm9scyA9IGNvbnRyb2xzLmZpbHRlcihjID0+IGMuY29udHJvbFR5cGUgPT09IENvbnRyb2xUeXBlcy5DSEVDS0JPWCk7XG4gICAgaWYgKGNoZWNrYm94Q29udHJvbHMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gZm9ybURhdGEpIHtcbiAgICAgICAgY29uc3QgY29udHJvbCA9IDxEcm9wZG93bkNvbnRyb2w+Y2hlY2tib3hDb250cm9scy5maW5kKGMgPT4gYy5rZXkgPT09IGtleSk7XG4gICAgICAgIGlmICghY29udHJvbCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnRyb2wub3B0aW9ucyB8fCBbXTtcblxuICAgICAgICBpZiAoZm9ybURhdGFba2V5XS5sZW5ndGggIT09IG9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoYE51bWJlciBvZiBjaGVja2JveGVzIGFuZCBvcHRpb25zIGRvZXNuJ3QgZXF1YWwuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hlY2tib3hlc0RhdGEgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtRGF0YVtrZXldLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGZvcm1EYXRhW2tleV1baV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNoZWNrYm94ZXNEYXRhLnB1c2gob3B0aW9uc1tpXVtjb250cm9sLmxhYmVsVmFsdWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtRGF0YVtrZXldID0gY2hlY2tib3hlc0RhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGNoZWNrYm94ZXMgdG8gZm9ybSBkYXRhXG4gICAqIEBwYXJhbSBjaGVja2VkVmFsdWVzXG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBjb252ZXJ0Q2hlY2tib3hlc1RvRm9ybURhdGEoY2hlY2tlZFZhbHVlczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiwgY29udHJvbDogQ2hlY2tib3hDb250cm9sKSB7XG4gICAgcmV0dXJuIGNvbnRyb2wub3B0aW9ucy5tYXAoXG4gICAgICBjaGVja2JveCA9PiB7XG4gICAgICAgIHJldHVybiAhIShjaGVja2VkVmFsdWVzLmluZGV4T2YoY2hlY2tib3hbY29udHJvbFsnbGFiZWxWYWx1ZSddXSkgPiAtMSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBTZWxlY3RlZCBPcHRpb25zIEZyb20gRm9ybSBEYXRhXG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICByZXNldFNlbGVjdGVkT3B0aW9uc0Zyb21Gb3JtRGF0YShmb3JtRGF0YTogT2JqZWN0LCBjb250cm9sOiBEcm9wZG93bkNvbnRyb2wsIGNvbnRyb2xzOiBGb3JtQ29udHJvbEJhc2U8YW55PltdKSB7XG4gICAgZm9ybURhdGEgPSB0aGlzLmdldFNlbGVjdGVkQ2hlY2tib3hlc0RhdGEoZm9ybURhdGEsIGNvbnRyb2xzKTtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSBmb3JtRGF0YVtjb250cm9sLmtleV07XG5cbiAgICBjb25zdCBuZXdTZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICBjb250cm9sLm9wdGlvbnMubWFwKG9wdCA9PiB7XG4gICAgICBpZiAoc2VsZWN0ZWRPcHRpb25zLmluZGV4T2Yob3B0W2NvbnRyb2wubGFiZWxWYWx1ZV0pID4gLTEpIHtcbiAgICAgICAgLy8gb3B0aW9uIGV4aXN0IG9uIG5ldyBsaXN0XG4gICAgICAgIG5ld1NlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdFtjb250cm9sLmxhYmVsVmFsdWVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmV3U2VsZWN0ZWRPcHRpb25zO1xuICB9XG59XG4iXX0=