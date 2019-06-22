/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ErrorTypes } from './../enums/error-types.enum';
import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var FormErrorService = /** @class */ (function () {
    function FormErrorService() {
    }
    /**
     * Map validates into instance of angular
     * @param validates
     */
    /**
     * Map validates into instance of angular
     * @param {?} validators
     * @return {?}
     */
    FormErrorService.prototype.getValidatesInstance = /**
     * Map validates into instance of angular
     * @param {?} validators
     * @return {?}
     */
    function (validators) {
        /** @type {?} */
        var validatorsList = [];
        for (var i = 0; i < validators.length; i++) {
            /** @type {?} */
            var validator = validators[i];
            if (validator.validate === ErrorTypes.REQUIRED) {
                validatorsList.push(Validators.required);
            }
            if (validator.validate === ErrorTypes.MIN) {
                validatorsList.push(Validators.min(validator.data));
            }
            if (validator.validate === ErrorTypes.MAX) {
                validatorsList.push(Validators.max(validator.data));
            }
            if (validator.validate === ErrorTypes.MIN_LENGTH) {
                validatorsList.push(Validators.minLength(validator.data));
            }
            if (validator.validate === ErrorTypes.MAX_LENGTH) {
                validatorsList.push(Validators.maxLength(validator.data));
            }
            if (validator.validate === ErrorTypes.EMAIL) {
                validatorsList.push(Validators.email);
            }
        }
        return validatorsList;
    };
    /**
     * Get error message base error type
     * @param validators
     * @param errorType
     */
    /**
     * Get error message base error type
     * @param {?} validators
     * @param {?} errorType
     * @return {?}
     */
    FormErrorService.prototype.getErrorMessage = /**
     * Get error message base error type
     * @param {?} validators
     * @param {?} errorType
     * @return {?}
     */
    function (validators, errorType) {
        /** @type {?} */
        var validator = validators.find((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v.validate === errorType; }));
        return validator ? validator.message : '';
    };
    /**
     * Get validate by error type
     * @param validators
     * @param errorType
     */
    /**
     * Get validate by error type
     * @param {?} validators
     * @param {?} errorType
     * @return {?}
     */
    FormErrorService.prototype.getValidateByErrorType = /**
     * Get validate by error type
     * @param {?} validators
     * @param {?} errorType
     * @return {?}
     */
    function (validators, errorType) {
        return validators.find((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v.validate === errorType; }));
    };
    FormErrorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FormErrorService.ctorParameters = function () { return []; };
    /** @nocollapse */ FormErrorService.ngInjectableDef = i0.defineInjectable({ factory: function FormErrorService_Factory() { return new FormErrorService(); }, token: FormErrorService, providedIn: "root" });
    return FormErrorService;
}());
export { FormErrorService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG52ZDI2NC9uZy1keW5hbWljLWZvcm0vIiwic291cmNlcyI6WyJzZXJ2aWNlcy9mb3JtLWVycm9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLEVBQWUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHM0M7SUFLRTtJQUFnQixDQUFDO0lBRWpCOzs7T0FHRzs7Ozs7O0lBQ0gsK0NBQW9COzs7OztJQUFwQixVQUFxQixVQUF3Qjs7WUFDckMsY0FBYyxHQUFHLEVBQUU7UUFDekIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUNuQyxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFHLFNBQVMsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLFFBQVEsRUFBRTtnQkFDN0MsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDMUM7WUFFRCxJQUFHLFNBQVMsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDeEMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO1lBRUQsSUFBRyxTQUFTLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3hDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNyRDtZQUVELElBQUcsU0FBUyxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsVUFBVSxFQUFFO2dCQUMvQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDM0Q7WUFFRCxJQUFHLFNBQVMsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLFVBQVUsRUFBRTtnQkFDL0MsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzNEO1lBRUQsSUFBRyxTQUFTLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxLQUFLLEVBQUU7Z0JBQzFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0Y7UUFFRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILDBDQUFlOzs7Ozs7SUFBZixVQUFnQixVQUF3QixFQUFFLFNBQWlCOztZQUNuRCxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUF4QixDQUF3QixFQUFDO1FBQ2hFLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxpREFBc0I7Ozs7OztJQUF0QixVQUF1QixVQUF3QixFQUFFLFNBQWlCO1FBQ2hFLE9BQU8sVUFBVSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUF4QixDQUF3QixFQUFDLENBQUM7SUFDeEQsQ0FBQzs7Z0JBNURGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzJCQVBEO0NBbUVDLEFBOURELElBOERDO1NBM0RZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9yVHlwZXMgfSBmcm9tICcuLy4uL2VudW1zL2Vycm9yLXR5cGVzLmVudW0nO1xuaW1wb3J0IHsgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJVmFsaWRhdG9yIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JVmFsaWRhdG9yJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUVycm9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKipcbiAgICogTWFwIHZhbGlkYXRlcyBpbnRvIGluc3RhbmNlIG9mIGFuZ3VsYXJcbiAgICogQHBhcmFtIHZhbGlkYXRlc1xuICAgKi9cbiAgZ2V0VmFsaWRhdGVzSW5zdGFuY2UodmFsaWRhdG9yczogSVZhbGlkYXRvcltdKTogVmFsaWRhdG9yRm5bXSB7XG4gICAgY29uc3QgdmFsaWRhdG9yc0xpc3QgPSBbXTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdmFsaWRhdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdmFsaWRhdG9yID0gdmFsaWRhdG9yc1tpXTtcbiAgICAgIGlmKHZhbGlkYXRvci52YWxpZGF0ZSA9PT0gRXJyb3JUeXBlcy5SRVFVSVJFRCkge1xuICAgICAgICB2YWxpZGF0b3JzTGlzdC5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgfVxuXG4gICAgICBpZih2YWxpZGF0b3IudmFsaWRhdGUgPT09IEVycm9yVHlwZXMuTUlOKSB7XG4gICAgICAgIHZhbGlkYXRvcnNMaXN0LnB1c2goVmFsaWRhdG9ycy5taW4odmFsaWRhdG9yLmRhdGEpKTtcbiAgICAgIH1cblxuICAgICAgaWYodmFsaWRhdG9yLnZhbGlkYXRlID09PSBFcnJvclR5cGVzLk1BWCkge1xuICAgICAgICB2YWxpZGF0b3JzTGlzdC5wdXNoKFZhbGlkYXRvcnMubWF4KHZhbGlkYXRvci5kYXRhKSk7XG4gICAgICB9XG5cbiAgICAgIGlmKHZhbGlkYXRvci52YWxpZGF0ZSA9PT0gRXJyb3JUeXBlcy5NSU5fTEVOR1RIKSB7XG4gICAgICAgIHZhbGlkYXRvcnNMaXN0LnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgodmFsaWRhdG9yLmRhdGEpKTtcbiAgICAgIH1cblxuICAgICAgaWYodmFsaWRhdG9yLnZhbGlkYXRlID09PSBFcnJvclR5cGVzLk1BWF9MRU5HVEgpIHtcbiAgICAgICAgdmFsaWRhdG9yc0xpc3QucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aCh2YWxpZGF0b3IuZGF0YSkpO1xuICAgICAgfVxuXG4gICAgICBpZih2YWxpZGF0b3IudmFsaWRhdGUgPT09IEVycm9yVHlwZXMuRU1BSUwpIHtcbiAgICAgICAgdmFsaWRhdG9yc0xpc3QucHVzaChWYWxpZGF0b3JzLmVtYWlsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yc0xpc3Q7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGVycm9yIG1lc3NhZ2UgYmFzZSBlcnJvciB0eXBlXG4gICAqIEBwYXJhbSB2YWxpZGF0b3JzXG4gICAqIEBwYXJhbSBlcnJvclR5cGVcbiAgICovXG4gIGdldEVycm9yTWVzc2FnZSh2YWxpZGF0b3JzOiBJVmFsaWRhdG9yW10sIGVycm9yVHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSB2YWxpZGF0b3JzLmZpbmQodiA9PiB2LnZhbGlkYXRlID09PSBlcnJvclR5cGUpO1xuICAgIHJldHVybiB2YWxpZGF0b3IgPyB2YWxpZGF0b3IubWVzc2FnZSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWxpZGF0ZSBieSBlcnJvciB0eXBlXG4gICAqIEBwYXJhbSB2YWxpZGF0b3JzXG4gICAqIEBwYXJhbSBlcnJvclR5cGVcbiAgICovXG4gIGdldFZhbGlkYXRlQnlFcnJvclR5cGUodmFsaWRhdG9yczogSVZhbGlkYXRvcltdLCBlcnJvclR5cGU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWxpZGF0b3JzLmZpbmQodiA9PiB2LnZhbGlkYXRlID09PSBlcnJvclR5cGUpO1xuICB9XG5cbn1cbiJdfQ==