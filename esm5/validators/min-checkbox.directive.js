/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} min
 * @return {?}
 */
export function minSelectedCheckboxes(min) {
    if (min === void 0) { min = 1; }
    /** @type {?} */
    var validator = (/**
     * @param {?} formArray
     * @return {?}
     */
    function (formArray) {
        /** @type {?} */
        var totalSelected = formArray.controls
            // get a list of checkbox values (boolean)
            .map((/**
         * @param {?} control
         * @return {?}
         */
        function (control) { return control.value; }))
            // total up the number of checked checkboxes
            .reduce((/**
         * @param {?} prev
         * @param {?} next
         * @return {?}
         */
        function (prev, next) { return (next ? prev + next : prev); }), 0);
        // if the total is not greater than the minimum, return the error message
        return totalSelected >= min ? null : { required: true };
    });
    return validator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLWNoZWNrYm94LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BudmQyNjQvbmctZHluYW1pYy1mb3JtLyIsInNvdXJjZXMiOlsidmFsaWRhdG9ycy9taW4tY2hlY2tib3guZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsTUFBTSxVQUFVLHFCQUFxQixDQUFDLEdBQU87SUFBUCxvQkFBQSxFQUFBLE9BQU87O1FBQ3JDLFNBQVM7Ozs7SUFBZ0IsVUFBQyxTQUFvQjs7WUFDNUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxRQUFRO1lBQ3RDLDBDQUEwQzthQUN6QyxHQUFHOzs7O1FBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxFQUFiLENBQWEsRUFBQztZQUM5Qiw0Q0FBNEM7YUFDM0MsTUFBTTs7Ozs7UUFBQyxVQUFDLElBQUksRUFBRSxJQUFJLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQTNCLENBQTJCLEdBQUUsQ0FBQyxDQUFDO1FBRXpELHlFQUF5RTtRQUN6RSxPQUFPLGFBQWEsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDMUQsQ0FBQyxDQUFBO0lBRUQsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1BcnJheSwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5TZWxlY3RlZENoZWNrYm94ZXMobWluID0gMSkge1xuICBjb25zdCB2YWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGZvcm1BcnJheTogRm9ybUFycmF5KSA9PiB7XG4gICAgY29uc3QgdG90YWxTZWxlY3RlZCA9IGZvcm1BcnJheS5jb250cm9sc1xuICAgICAgLy8gZ2V0IGEgbGlzdCBvZiBjaGVja2JveCB2YWx1ZXMgKGJvb2xlYW4pXG4gICAgICAubWFwKGNvbnRyb2wgPT4gY29udHJvbC52YWx1ZSlcbiAgICAgIC8vIHRvdGFsIHVwIHRoZSBudW1iZXIgb2YgY2hlY2tlZCBjaGVja2JveGVzXG4gICAgICAucmVkdWNlKChwcmV2LCBuZXh0KSA9PiAobmV4dCA/IHByZXYgKyBuZXh0IDogcHJldiksIDApO1xuXG4gICAgLy8gaWYgdGhlIHRvdGFsIGlzIG5vdCBncmVhdGVyIHRoYW4gdGhlIG1pbmltdW0sIHJldHVybiB0aGUgZXJyb3IgbWVzc2FnZVxuICAgIHJldHVybiB0b3RhbFNlbGVjdGVkID49IG1pbiA/IG51bGwgOiB7IHJlcXVpcmVkOiB0cnVlIH07XG4gIH07XG5cbiAgcmV0dXJuIHZhbGlkYXRvcjtcbn1cbiJdfQ==