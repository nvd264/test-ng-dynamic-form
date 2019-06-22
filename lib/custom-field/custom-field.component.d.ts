import { FormGroup } from '@angular/forms';
import { OnInit, ComponentFactoryResolver } from '@angular/core';
import { DynamicFieldDirective } from '../../directives/dynamic-field.directive';
import { CustomFieldControl } from '../../models/CustomFieldControl';
export declare class CustomFieldComponent implements OnInit {
    private componentFactoryResolver;
    form: FormGroup;
    control: CustomFieldControl;
    customFieldHost: DynamicFieldDirective;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    loadComponent(): void;
}
