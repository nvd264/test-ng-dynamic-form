/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormGroup } from '@angular/forms';
import { Component, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DynamicFieldDirective } from '../../directives/dynamic-field.directive';
import { CustomFieldControl } from '../../models/CustomFieldControl';
export class CustomFieldComponent {
    /**
     * @param {?} componentFactoryResolver
     */
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadComponent();
    }
    /**
     * @return {?}
     */
    loadComponent() {
        /** @type {?} */
        let componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(this.control.component);
        /** @type {?} */
        let viewContainerRef = this.customFieldHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        let componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance['form'] = this.form;
        componentRef.instance['controlKey'] = this.control.key;
    }
}
CustomFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'custom-field',
                template: "<div [formGroup]=\"form\">\n    <ng-template appDynamicField></ng-template>\n</div>\n\n",
                styles: [""]
            }] }
];
/** @nocollapse */
CustomFieldComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
CustomFieldComponent.propDecorators = {
    form: [{ type: Input }],
    control: [{ type: Input }],
    customFieldHost: [{ type: ViewChild, args: [DynamicFieldDirective,] }]
};
if (false) {
    /** @type {?} */
    CustomFieldComponent.prototype.form;
    /** @type {?} */
    CustomFieldComponent.prototype.control;
    /** @type {?} */
    CustomFieldComponent.prototype.customFieldHost;
    /**
     * @type {?}
     * @private
     */
    CustomFieldComponent.prototype.componentFactoryResolver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BudmQyNjQvbmctZHluYW1pYy1mb3JtLyIsInNvdXJjZXMiOlsibGliL2N1c3RvbS1maWVsZC9jdXN0b20tZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBT3JFLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFLL0IsWUFBb0Isd0JBQWtEO1FBQWxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7SUFBSSxDQUFDOzs7O0lBRTNFLFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELGFBQWE7O1lBQ1AsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QjthQUN2Qix1QkFBdUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzs7WUFDeEUsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0I7UUFDNUQsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7O1lBRXJCLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDckUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFDLFlBQVksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDekQsQ0FBQzs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsbUdBQTRDOzthQUU3Qzs7OztZQVI2Qyx3QkFBd0I7OzttQkFVbkUsS0FBSztzQkFDTCxLQUFLOzhCQUNMLFNBQVMsU0FBQyxxQkFBcUI7Ozs7SUFGaEMsb0NBQXlCOztJQUN6Qix1Q0FBcUM7O0lBQ3JDLCtDQUF5RTs7Ozs7SUFFN0Qsd0RBQTBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDdXN0b21GaWVsZENvbnRyb2wgfSBmcm9tICcuLi8uLi9tb2RlbHMvQ3VzdG9tRmllbGRDb250cm9sJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3VzdG9tLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbS1maWVsZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2N1c3RvbS1maWVsZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBjb250cm9sOiBDdXN0b21GaWVsZENvbnRyb2w7XG4gIEBWaWV3Q2hpbGQoRHluYW1pY0ZpZWxkRGlyZWN0aXZlKSBjdXN0b21GaWVsZEhvc3Q6IER5bmFtaWNGaWVsZERpcmVjdGl2ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxvYWRDb21wb25lbnQoKTtcbiAgfVxuXG4gIGxvYWRDb21wb25lbnQoKSB7XG4gICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jb250cm9sLmNvbXBvbmVudCk7XG4gICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmN1c3RvbUZpZWxkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuICAgIGxldCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ2Zvcm0nXSA9IHRoaXMuZm9ybTtcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ2NvbnRyb2xLZXknXSA9IHRoaXMuY29udHJvbC5rZXk7XG4gIH1cbn1cbiJdfQ==