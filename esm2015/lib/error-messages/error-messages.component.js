/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ErrorTypes } from './../../enums/error-types.enum';
import { FormErrorService } from './../../services/form-error.service';
import { Component, Input } from '@angular/core';
export class ErrorMessagesComponent {
    /**
     * @param {?} formErrorService
     */
    constructor(formErrorService) {
        this.formErrorService = formErrorService;
        this.validators = [];
        this.errorTypes = ErrorTypes;
    }
    /**
     * @param {?} errorType
     * @return {?}
     */
    getErrorMessage(errorType) {
        return this.formErrorService.getErrorMessage(this.validators, errorType);
    }
}
ErrorMessagesComponent.decorators = [
    { type: Component, args: [{
                selector: 'error-messages',
                template: "<div class=\"errors\">\n  <div *ngIf=\"errors.required\">\n    {{ getErrorMessage(errorTypes.REQUIRED) }}\n  </div>\n  <div *ngIf=\"errors.min\">\n    {{ getErrorMessage(errorTypes.MIN) }}\n  </div>\n  <div *ngIf=\"errors.max\">\n    {{ getErrorMessage(errorTypes.MAX) }}\n  </div>\n  <div *ngIf=\"errors.minlength\">\n    {{ getErrorMessage(errorTypes.MIN_LENGTH) }}\n  </div>\n  <div *ngIf=\"errors.maxlength\">\n    {{ getErrorMessage(errorTypes.MAX_LENGTH) }}\n  </div>\n  <div *ngIf=\"errors.email\">\n    {{ getErrorMessage(errorTypes.EMAIL) }}\n  </div>\n  <div *ngIf=\"errors.pattern\">\n    {{ getErrorMessage(errorTypes.PATTERN) }}\n  </div>\n</div>\n",
                styles: [".errors{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}"]
            }] }
];
/** @nocollapse */
ErrorMessagesComponent.ctorParameters = () => [
    { type: FormErrorService }
];
ErrorMessagesComponent.propDecorators = {
    errors: [{ type: Input }],
    validators: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ErrorMessagesComponent.prototype.errors;
    /** @type {?} */
    ErrorMessagesComponent.prototype.validators;
    /** @type {?} */
    ErrorMessagesComponent.prototype.errorTypes;
    /**
     * @type {?}
     * @private
     */
    ErrorMessagesComponent.prototype.formErrorService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG52ZDI2NC9uZy1keW5hbWljLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZXJyb3ItbWVzc2FnZXMvZXJyb3ItbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRakQsTUFBTSxPQUFPLHNCQUFzQjs7OztJQU1qQyxZQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUo3QyxlQUFVLEdBQWlCLEVBQUUsQ0FBQztRQUV2QyxlQUFVLEdBQUcsVUFBVSxDQUFDO0lBRWlDLENBQUM7Ozs7O0lBRTFELGVBQWUsQ0FBQyxTQUFpQjtRQUMvQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7WUFmRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsaXFCQUE4Qzs7YUFFL0M7Ozs7WUFSUSxnQkFBZ0I7OztxQkFVdEIsS0FBSzt5QkFDTCxLQUFLOzs7O0lBRE4sd0NBQXFCOztJQUNyQiw0Q0FBdUM7O0lBRXZDLDRDQUF3Qjs7Ozs7SUFFWixrREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvclR5cGVzIH0gZnJvbSAnLi8uLi8uLi9lbnVtcy9lcnJvci10eXBlcy5lbnVtJztcbmltcG9ydCB7IEZvcm1FcnJvclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2Zvcm0tZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJVmFsaWRhdG9yIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JVmFsaWRhdG9yJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZXJyb3ItbWVzc2FnZXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vZXJyb3ItbWVzc2FnZXMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9lcnJvci1tZXNzYWdlcy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZXNDb21wb25lbnQge1xuICBASW5wdXQoKSBlcnJvcnM6IGFueTtcbiAgQElucHV0KCkgdmFsaWRhdG9yczogSVZhbGlkYXRvcltdID0gW107XG5cbiAgZXJyb3JUeXBlcyA9IEVycm9yVHlwZXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtRXJyb3JTZXJ2aWNlOiBGb3JtRXJyb3JTZXJ2aWNlKSB7fVxuXG4gIGdldEVycm9yTWVzc2FnZShlcnJvclR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUVycm9yU2VydmljZS5nZXRFcnJvck1lc3NhZ2UodGhpcy52YWxpZGF0b3JzLCBlcnJvclR5cGUpO1xuICB9XG5cbn1cbiJdfQ==