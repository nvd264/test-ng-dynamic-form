import { FormControlBase } from './FormControlBase';
import { ControlTypes } from '../enums/control-types.enum';
export declare class CheckboxControl extends FormControlBase<boolean[]> {
    controlType: ControlTypes;
    labelValue: string;
    labelName: string;
    options: {
        value: string;
        label: string;
    }[];
    constructor(options?: {});
}
