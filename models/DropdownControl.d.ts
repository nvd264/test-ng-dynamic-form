import { FormControlBase } from './FormControlBase';
import { ControlTypes } from '../enums/control-types.enum';
export declare class DropdownControl extends FormControlBase<any> {
    controlType: ControlTypes;
    labelValue: string;
    labelName: string;
    options: {
        value: string;
        label: string;
    }[];
    multiple: boolean;
    onSearch: any;
    loadMore: any;
    hideSearchBox: boolean;
    searchText: string;
    loading: boolean;
    searchOnServer: boolean;
    supportLoadMore: boolean;
    constructor(options?: {});
}
