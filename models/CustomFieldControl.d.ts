import { FormControlBase } from './FormControlBase';
import { ControlTypes } from '../enums/control-types.enum';
export declare class CustomFieldControl extends FormControlBase<any> {
    controlType: ControlTypes;
    component: any;
    constructor(options?: {});
}
