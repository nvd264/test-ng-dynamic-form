import { AfterViewInit, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ControlTypes } from '../enums/control-types.enum';
import { DropdownControl } from './../models/DropdownControl';
import { FormGroup } from '@angular/forms';
import { FormControlBase } from './../models/FormControlBase';
import { FormControlService } from './../services/form-control.service';
import { HelperService } from '../services/helper.service';
import { IDynamicOptions } from '../interfaces/IDynamicOptions';
import { IFormAction } from '../interfaces/IFormAction';
import { Subject } from 'rxjs';
export declare class DynamicFormComponent implements OnInit, OnDestroy, AfterViewInit {
    private formControlService;
    private helperService;
    controls: FormControlBase<any>[];
    actions: IFormAction;
    submit: EventEmitter<any>;
    dynamicDropdown: any[];
    unsubscribe$: Subject<any>;
    form: FormGroup;
    controlTypes: typeof ControlTypes;
    originControls: FormControlBase<any>[];
    filterOptions$: Subject<IDynamicOptions>;
    filterControl: DropdownControl;
    loadMoreOptions$: Subject<DropdownControl>;
    loadMoreControl: DropdownControl;
    constructor(formControlService: FormControlService, helperService: HelperService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Get form controls
     */
    readonly formControls: {
        [key: string]: import("@angular/forms").AbstractControl;
    };
    /**
     * Get control by key
     * @param key
     * @param type ControlTypes
     */
    getControl(key: string, type?: any): FormControlBase<any>;
    /**
     * Load more when scrolled to bottom
     * @param event
     * @param control
     */
    loadMoreOptionsOnScroll(event: any, control: DropdownControl): void;
    /**
     * Update form data
     * @param data
     */
    updateFormData(data: Object): void;
    /**
     * Reset form
     * @param e
     */
    resetForm(e: any): void;
    /**
     * Filter options
     * @param searchText
     * @param control
     */
    onFilterOptions(searchText: string, control: DropdownControl): void;
    /**
     * Watch filter dropdown options
     */
    watchFilterDropdownOptions(): void;
    /**
     * Watch load more dropdown option
     */
    watchLoadMoreDropdownOptions(): void;
    /**
     * Set dropdown options
     * @param controlKey
     * @param options
     */
    setDropdownOptions(controlKey: string, options: any[]): void;
    /**
     * Emit form data to parent
     * @param e
     */
    onSubmit(e: any): boolean;
}
