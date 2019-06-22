/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ErrorTypes } from '../enums/error-types.enum';
/**
 * @template T
 */
export class FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || [];
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
    /**
     * @return {?}
     */
    get isRequired() {
        return this.validators.findIndex((/**
         * @param {?} v
         * @return {?}
         */
        v => v.validate === ErrorTypes.REQUIRED)) > -1;
    }
}
if (false) {
    /** @type {?} */
    FormControlBase.prototype.value;
    /** @type {?} */
    FormControlBase.prototype.key;
    /** @type {?} */
    FormControlBase.prototype.label;
    /** @type {?} */
    FormControlBase.prototype.validators;
    /** @type {?} */
    FormControlBase.prototype.order;
    /** @type {?} */
    FormControlBase.prototype.controlType;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybUNvbnRyb2xCYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG52ZDI2NC9uZy1keW5hbWljLWZvcm0vIiwic291cmNlcyI6WyJtb2RlbHMvRm9ybUNvbnRyb2xCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFFdkQsTUFBTSxPQUFPLGVBQWU7Ozs7SUFRMUIsWUFDRSxVQU9JLEVBQUU7UUFFTixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzdELElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxRQUFRLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0NBQ0Y7OztJQTVCQyxnQ0FBUzs7SUFDVCw4QkFBWTs7SUFDWixnQ0FBYzs7SUFDZCxxQ0FBeUI7O0lBQ3pCLGdDQUFjOztJQUNkLHNDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElWYWxpZGF0b3IgfSBmcm9tICcuLi9pbnRlcmZhY2VzL0lWYWxpZGF0b3InO1xuaW1wb3J0IHsgRXJyb3JUeXBlcyB9IGZyb20gJy4uL2VudW1zL2Vycm9yLXR5cGVzLmVudW0nO1xuXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xCYXNlPFQ+IHtcbiAgdmFsdWU6IFQ7XG4gIGtleTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWxpZGF0b3JzOiBJVmFsaWRhdG9yW107XG4gIG9yZGVyOiBudW1iZXI7XG4gIGNvbnRyb2xUeXBlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgb3B0aW9uczoge1xuICAgICAgdmFsdWU/OiBUO1xuICAgICAga2V5Pzogc3RyaW5nO1xuICAgICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgICB2YWxpZGF0b3JzPzogSVZhbGlkYXRvcltdO1xuICAgICAgb3JkZXI/OiBudW1iZXI7XG4gICAgICBjb250cm9sVHlwZT86IHN0cmluZztcbiAgICB9ID0ge31cbiAgKSB7XG4gICAgdGhpcy52YWx1ZSA9IG9wdGlvbnMudmFsdWU7XG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleSB8fCAnJztcbiAgICB0aGlzLmxhYmVsID0gb3B0aW9ucy5sYWJlbCB8fCAnJztcbiAgICB0aGlzLnZhbGlkYXRvcnMgPSBvcHRpb25zLnZhbGlkYXRvcnMgfHwgW107XG4gICAgdGhpcy5vcmRlciA9IG9wdGlvbnMub3JkZXIgPT09IHVuZGVmaW5lZCA/IDEgOiBvcHRpb25zLm9yZGVyO1xuICAgIHRoaXMuY29udHJvbFR5cGUgPSBvcHRpb25zLmNvbnRyb2xUeXBlIHx8ICcnO1xuICB9XG5cbiAgZ2V0IGlzUmVxdWlyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdG9ycy5maW5kSW5kZXgodiA9PiB2LnZhbGlkYXRlID09PSBFcnJvclR5cGVzLlJFUVVJUkVEKSA+IC0xO1xuICB9XG59XG4iXX0=