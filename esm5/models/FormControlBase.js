/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ErrorTypes } from '../enums/error-types.enum';
/**
 * @template T
 */
var /**
 * @template T
 */
FormControlBase = /** @class */ (function () {
    function FormControlBase(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || [];
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
    Object.defineProperty(FormControlBase.prototype, "isRequired", {
        get: /**
         * @return {?}
         */
        function () {
            return this.validators.findIndex((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v.validate === ErrorTypes.REQUIRED; })) > -1;
        },
        enumerable: true,
        configurable: true
    });
    return FormControlBase;
}());
/**
 * @template T
 */
export { FormControlBase };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybUNvbnRyb2xCYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG52ZDI2NC9uZy1keW5hbWljLWZvcm0vIiwic291cmNlcyI6WyJtb2RlbHMvRm9ybUNvbnRyb2xCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFFdkQ7Ozs7SUFRRSx5QkFDRSxPQU9NO1FBUE4sd0JBQUEsRUFBQSxZQU9NO1FBRU4sSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxzQkFBSSx1Q0FBVTs7OztRQUFkO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLFFBQVEsRUFBbEMsQ0FBa0MsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLENBQUM7OztPQUFBO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDOzs7Ozs7O0lBNUJDLGdDQUFTOztJQUNULDhCQUFZOztJQUNaLGdDQUFjOztJQUNkLHFDQUF5Qjs7SUFDekIsZ0NBQWM7O0lBQ2Qsc0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVZhbGlkYXRvciB9IGZyb20gJy4uL2ludGVyZmFjZXMvSVZhbGlkYXRvcic7XG5pbXBvcnQgeyBFcnJvclR5cGVzIH0gZnJvbSAnLi4vZW51bXMvZXJyb3ItdHlwZXMuZW51bSc7XG5cbmV4cG9ydCBjbGFzcyBGb3JtQ29udHJvbEJhc2U8VD4ge1xuICB2YWx1ZTogVDtcbiAga2V5OiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbGlkYXRvcnM6IElWYWxpZGF0b3JbXTtcbiAgb3JkZXI6IG51bWJlcjtcbiAgY29udHJvbFR5cGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBvcHRpb25zOiB7XG4gICAgICB2YWx1ZT86IFQ7XG4gICAgICBrZXk/OiBzdHJpbmc7XG4gICAgICBsYWJlbD86IHN0cmluZztcbiAgICAgIHZhbGlkYXRvcnM/OiBJVmFsaWRhdG9yW107XG4gICAgICBvcmRlcj86IG51bWJlcjtcbiAgICAgIGNvbnRyb2xUeXBlPzogc3RyaW5nO1xuICAgIH0gPSB7fVxuICApIHtcbiAgICB0aGlzLnZhbHVlID0gb3B0aW9ucy52YWx1ZTtcbiAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5IHx8ICcnO1xuICAgIHRoaXMubGFiZWwgPSBvcHRpb25zLmxhYmVsIHx8ICcnO1xuICAgIHRoaXMudmFsaWRhdG9ycyA9IG9wdGlvbnMudmFsaWRhdG9ycyB8fCBbXTtcbiAgICB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlciA9PT0gdW5kZWZpbmVkID8gMSA6IG9wdGlvbnMub3JkZXI7XG4gICAgdGhpcy5jb250cm9sVHlwZSA9IG9wdGlvbnMuY29udHJvbFR5cGUgfHwgJyc7XG4gIH1cblxuICBnZXQgaXNSZXF1aXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0b3JzLmZpbmRJbmRleCh2ID0+IHYudmFsaWRhdGUgPT09IEVycm9yVHlwZXMuUkVRVUlSRUQpID4gLTE7XG4gIH1cbn1cbiJdfQ==