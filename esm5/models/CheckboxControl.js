/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormControlBase } from './FormControlBase';
import { ControlTypes } from '../enums/control-types.enum';
var CheckboxControl = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxControl, _super);
    function CheckboxControl(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = ControlTypes.CHECKBOX;
        _this.options = [];
        _this.labelValue = options['labelValue'] || '';
        _this.labelName = options['labelName'] || '';
        _this.options = options['options'] || [];
        return _this;
    }
    return CheckboxControl;
}(FormControlBase));
export { CheckboxControl };
if (false) {
    /** @type {?} */
    CheckboxControl.prototype.controlType;
    /** @type {?} */
    CheckboxControl.prototype.labelValue;
    /** @type {?} */
    CheckboxControl.prototype.labelName;
    /** @type {?} */
    CheckboxControl.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3hDb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG52ZDI2NC9uZy1keW5hbWljLWZvcm0vIiwic291cmNlcyI6WyJtb2RlbHMvQ2hlY2tib3hDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRDtJQUFxQywyQ0FBMEI7SUFNN0QseUJBQVksT0FBWTtRQUFaLHdCQUFBLEVBQUEsWUFBWTtRQUF4QixZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUlmO1FBVkQsaUJBQVcsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBR3BDLGFBQU8sR0FBdUMsRUFBRSxDQUFDO1FBSS9DLEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxLQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDOztJQUMxQyxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBWkQsQ0FBcUMsZUFBZSxHQVluRDs7OztJQVhDLHNDQUFvQzs7SUFDcEMscUNBQW1COztJQUNuQixvQ0FBa0I7O0lBQ2xCLGtDQUFpRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sQmFzZSB9IGZyb20gJy4vRm9ybUNvbnRyb2xCYXNlJztcbmltcG9ydCB7IENvbnRyb2xUeXBlcyB9IGZyb20gJy4uL2VudW1zL2NvbnRyb2wtdHlwZXMuZW51bSc7XG5cbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbnRyb2wgZXh0ZW5kcyBGb3JtQ29udHJvbEJhc2U8Ym9vbGVhbltdPiB7XG4gIGNvbnRyb2xUeXBlID0gQ29udHJvbFR5cGVzLkNIRUNLQk9YO1xuICBsYWJlbFZhbHVlOiBzdHJpbmc7XG4gIGxhYmVsTmFtZTogc3RyaW5nO1xuICBvcHRpb25zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdID0gW107XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5sYWJlbFZhbHVlID0gb3B0aW9uc1snbGFiZWxWYWx1ZSddIHx8ICcnO1xuICAgIHRoaXMubGFiZWxOYW1lID0gb3B0aW9uc1snbGFiZWxOYW1lJ10gfHwgJyc7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1snb3B0aW9ucyddIHx8IFtdO1xuICB9XG59XG4iXX0=