import { ControlTypes } from './../enums/control-types.enum';
import { FormControlBase } from './FormControlBase';
export declare class TextboxControl extends FormControlBase<string> {
    controlType: ControlTypes;
    type: string;
    constructor(options?: {});
}
