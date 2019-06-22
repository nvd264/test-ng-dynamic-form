import { FormControlBase } from './FormControlBase';
import { ControlTypes } from '../enums/control-types.enum';
export declare class TextareaControl extends FormControlBase<string> {
    controlType: ControlTypes;
    constructor(options?: {});
}
