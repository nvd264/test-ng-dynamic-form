/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ErrorTypes } from './../enums/error-types.enum';
import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FormErrorService {
    constructor() { }
    /**
     * Map validates into instance of angular
     * @param {?} validators
     * @return {?}
     */
    getValidatesInstance(validators) {
        /** @type {?} */
        const validatorsList = [];
        for (let i = 0; i < validators.length; i++) {
            /** @type {?} */
            const validator = validators[i];
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
    }
    /**
     * Get error message base error type
     * @param {?} validators
     * @param {?} errorType
     * @return {?}
     */
    getErrorMessage(validators, errorType) {
        /** @type {?} */
        const validator = validators.find((/**
         * @param {?} v
         * @return {?}
         */
        v => v.validate === errorType));
        return validator ? validator.message : '';
    }
    /**
     * Get validate by error type
     * @param {?} validators
     * @param {?} errorType
     * @return {?}
     */
    getValidateByErrorType(validators, errorType) {
        return validators.find((/**
         * @param {?} v
         * @return {?}
         */
        v => v.validate === errorType));
    }
}
FormErrorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FormErrorService.ctorParameters = () => [];
/** @nocollapse */ FormErrorService.ngInjectableDef = i0.defineInjectable({ factory: function FormErrorService_Factory() { return new FormErrorService(); }, token: FormErrorService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG52ZDI2NC9uZy1keW5hbWljLWZvcm0vIiwic291cmNlcyI6WyJzZXJ2aWNlcy9mb3JtLWVycm9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLEVBQWUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFNM0MsTUFBTSxPQUFPLGdCQUFnQjtJQUUzQixnQkFBZ0IsQ0FBQzs7Ozs7O0lBTWpCLG9CQUFvQixDQUFDLFVBQXdCOztjQUNyQyxjQUFjLEdBQUcsRUFBRTtRQUN6QixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQ25DLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUcsU0FBUyxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsUUFBUSxFQUFFO2dCQUM3QyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMxQztZQUVELElBQUcsU0FBUyxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUN4QyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDckQ7WUFFRCxJQUFHLFNBQVMsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDeEMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO1lBRUQsSUFBRyxTQUFTLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQy9DLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUMzRDtZQUVELElBQUcsU0FBUyxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsVUFBVSxFQUFFO2dCQUMvQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDM0Q7WUFFRCxJQUFHLFNBQVMsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLEtBQUssRUFBRTtnQkFDMUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkM7U0FDRjtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7Ozs7Ozs7SUFPRCxlQUFlLENBQUMsVUFBd0IsRUFBRSxTQUFpQjs7Y0FDbkQsU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBQztRQUNoRSxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzVDLENBQUM7Ozs7Ozs7SUFPRCxzQkFBc0IsQ0FBQyxVQUF3QixFQUFFLFNBQWlCO1FBQ2hFLE9BQU8sVUFBVSxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFDLENBQUM7SUFDeEQsQ0FBQzs7O1lBNURGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9yVHlwZXMgfSBmcm9tICcuLy4uL2VudW1zL2Vycm9yLXR5cGVzLmVudW0nO1xuaW1wb3J0IHsgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJVmFsaWRhdG9yIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JVmFsaWRhdG9yJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUVycm9yU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKipcbiAgICogTWFwIHZhbGlkYXRlcyBpbnRvIGluc3RhbmNlIG9mIGFuZ3VsYXJcbiAgICogQHBhcmFtIHZhbGlkYXRlc1xuICAgKi9cbiAgZ2V0VmFsaWRhdGVzSW5zdGFuY2UodmFsaWRhdG9yczogSVZhbGlkYXRvcltdKTogVmFsaWRhdG9yRm5bXSB7XG4gICAgY29uc3QgdmFsaWRhdG9yc0xpc3QgPSBbXTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdmFsaWRhdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdmFsaWRhdG9yID0gdmFsaWRhdG9yc1tpXTtcbiAgICAgIGlmKHZhbGlkYXRvci52YWxpZGF0ZSA9PT0gRXJyb3JUeXBlcy5SRVFVSVJFRCkge1xuICAgICAgICB2YWxpZGF0b3JzTGlzdC5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgfVxuXG4gICAgICBpZih2YWxpZGF0b3IudmFsaWRhdGUgPT09IEVycm9yVHlwZXMuTUlOKSB7XG4gICAgICAgIHZhbGlkYXRvcnNMaXN0LnB1c2goVmFsaWRhdG9ycy5taW4odmFsaWRhdG9yLmRhdGEpKTtcbiAgICAgIH1cblxuICAgICAgaWYodmFsaWRhdG9yLnZhbGlkYXRlID09PSBFcnJvclR5cGVzLk1BWCkge1xuICAgICAgICB2YWxpZGF0b3JzTGlzdC5wdXNoKFZhbGlkYXRvcnMubWF4KHZhbGlkYXRvci5kYXRhKSk7XG4gICAgICB9XG5cbiAgICAgIGlmKHZhbGlkYXRvci52YWxpZGF0ZSA9PT0gRXJyb3JUeXBlcy5NSU5fTEVOR1RIKSB7XG4gICAgICAgIHZhbGlkYXRvcnNMaXN0LnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgodmFsaWRhdG9yLmRhdGEpKTtcbiAgICAgIH1cblxuICAgICAgaWYodmFsaWRhdG9yLnZhbGlkYXRlID09PSBFcnJvclR5cGVzLk1BWF9MRU5HVEgpIHtcbiAgICAgICAgdmFsaWRhdG9yc0xpc3QucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aCh2YWxpZGF0b3IuZGF0YSkpO1xuICAgICAgfVxuXG4gICAgICBpZih2YWxpZGF0b3IudmFsaWRhdGUgPT09IEVycm9yVHlwZXMuRU1BSUwpIHtcbiAgICAgICAgdmFsaWRhdG9yc0xpc3QucHVzaChWYWxpZGF0b3JzLmVtYWlsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yc0xpc3Q7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGVycm9yIG1lc3NhZ2UgYmFzZSBlcnJvciB0eXBlXG4gICAqIEBwYXJhbSB2YWxpZGF0b3JzXG4gICAqIEBwYXJhbSBlcnJvclR5cGVcbiAgICovXG4gIGdldEVycm9yTWVzc2FnZSh2YWxpZGF0b3JzOiBJVmFsaWRhdG9yW10sIGVycm9yVHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSB2YWxpZGF0b3JzLmZpbmQodiA9PiB2LnZhbGlkYXRlID09PSBlcnJvclR5cGUpO1xuICAgIHJldHVybiB2YWxpZGF0b3IgPyB2YWxpZGF0b3IubWVzc2FnZSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWxpZGF0ZSBieSBlcnJvciB0eXBlXG4gICAqIEBwYXJhbSB2YWxpZGF0b3JzXG4gICAqIEBwYXJhbSBlcnJvclR5cGVcbiAgICovXG4gIGdldFZhbGlkYXRlQnlFcnJvclR5cGUodmFsaWRhdG9yczogSVZhbGlkYXRvcltdLCBlcnJvclR5cGU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWxpZGF0b3JzLmZpbmQodiA9PiB2LnZhbGlkYXRlID09PSBlcnJvclR5cGUpO1xuICB9XG5cbn1cbiJdfQ==