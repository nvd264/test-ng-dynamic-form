/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormGroup } from '@angular/forms';
import { Component, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DynamicFieldDirective } from '../../directives/dynamic-field.directive';
import { CustomFieldControl } from '../../models/CustomFieldControl';
var CustomFieldComponent = /** @class */ (function () {
    function CustomFieldComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    CustomFieldComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.loadComponent();
    };
    /**
     * @return {?}
     */
    CustomFieldComponent.prototype.loadComponent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(this.control.component);
        /** @type {?} */
        var viewContainerRef = this.customFieldHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance['form'] = this.form;
        componentRef.instance['controlKey'] = this.control.key;
    };
    CustomFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'custom-field',
                    template: "<div [formGroup]=\"form\">\n    <ng-template appDynamicField></ng-template>\n</div>\n\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    CustomFieldComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver }
    ]; };
    CustomFieldComponent.propDecorators = {
        form: [{ type: Input }],
        control: [{ type: Input }],
        customFieldHost: [{ type: ViewChild, args: [DynamicFieldDirective,] }]
    };
    return CustomFieldComponent;
}());
export { CustomFieldComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BudmQyNjQvbmctZHluYW1pYy1mb3JtLyIsInNvdXJjZXMiOlsibGliL2N1c3RvbS1maWVsZC9jdXN0b20tZmllbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXJFO0lBVUUsOEJBQW9CLHdCQUFrRDtRQUFsRCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQUksQ0FBQzs7OztJQUUzRSx1Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELDRDQUFhOzs7SUFBYjs7WUFDTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCO2FBQ3ZCLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOztZQUN4RSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQjtRQUM1RCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7WUFFckIsWUFBWSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNyRSxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUN6RCxDQUFDOztnQkF6QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixtR0FBNEM7O2lCQUU3Qzs7OztnQkFSNkMsd0JBQXdCOzs7dUJBVW5FLEtBQUs7MEJBQ0wsS0FBSztrQ0FDTCxTQUFTLFNBQUMscUJBQXFCOztJQWtCbEMsMkJBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXJCWSxvQkFBb0I7OztJQUMvQixvQ0FBeUI7O0lBQ3pCLHVDQUFxQzs7SUFDckMsK0NBQXlFOzs7OztJQUU3RCx3REFBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2R5bmFtaWMtZmllbGQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEN1c3RvbUZpZWxkQ29udHJvbCB9IGZyb20gJy4uLy4uL21vZGVscy9DdXN0b21GaWVsZENvbnRyb2wnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjdXN0b20tZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tLWZpZWxkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3VzdG9tLWZpZWxkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tRmllbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBmb3JtOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIGNvbnRyb2w6IEN1c3RvbUZpZWxkQ29udHJvbDtcbiAgQFZpZXdDaGlsZChEeW5hbWljRmllbGREaXJlY3RpdmUpIGN1c3RvbUZpZWxkSG9zdDogRHluYW1pY0ZpZWxkRGlyZWN0aXZlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZENvbXBvbmVudCgpO1xuICB9XG5cbiAgbG9hZENvbXBvbmVudCgpIHtcbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmNvbnRyb2wuY29tcG9uZW50KTtcbiAgICBsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuY3VzdG9tRmllbGRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuXG4gICAgbGV0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnZm9ybSddID0gdGhpcy5mb3JtO1xuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnY29udHJvbEtleSddID0gdGhpcy5jb250cm9sLmtleTtcbiAgfVxufVxuIl19