import { IValidator } from '../interfaces/IValidator';
export declare class FormControlBase<T> {
    value: T;
    key: string;
    label: string;
    validators: IValidator[];
    order: number;
    controlType: string;
    constructor(options?: {
        value?: T;
        key?: string;
        label?: string;
        validators?: IValidator[];
        order?: number;
        controlType?: string;
    });
    readonly isRequired: boolean;
}
