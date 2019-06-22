import { FormErrorService } from './form-error.service';
import { FormControlBase } from './../models/FormControlBase';
import { FormGroup } from '@angular/forms';
import { DropdownControl } from '../models/DropdownControl';
import { CheckboxControl } from '../models/CheckboxControl';
export declare class FormControlService {
    private formErrorService;
    constructor(formErrorService: FormErrorService);
    /**
     * Convert controls into form group
     * @params controls
     * @returns form group instance
     */
    toFormGroup(controls: FormControlBase<any>[]): FormGroup;
    /**
     * Generate FormArray check boxes
     * @param control <FormControlBase>
     * @returns <FormArray>
     */
    private generateCheckboxes;
    /**
     * Marks all controls in a form group as touched
     * @param formGroup - The form group to touch
     */
    markFormGroupTouched(formGroup: FormGroup): void;
    /**
     * Get controls data for form
     * @param controls FormControlBase<any>[]
     */
    getControlsData(controls: FormControlBase<any>[]): {};
    /**
     * Get selected checkboxes data
     * @param formData
     */
    getSelectedCheckboxesData(formData: any, controls: FormControlBase<any>[]): any;
    /**
     * Convert checkboxes to form data
     * @param checkedValues
     * @param control
     */
    convertCheckboxesToFormData(checkedValues: Array<string | number>, control: CheckboxControl): boolean[];
    /**
     * Reset Selected Options From Form Data
     * @param control
     */
    resetSelectedOptionsFromFormData(formData: Object, control: DropdownControl, controls: FormControlBase<any>[]): any[];
}
