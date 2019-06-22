/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormControlBase } from './FormControlBase';
import { ControlTypes } from '../enums/control-types.enum';
var RadioGroupControl = /** @class */ (function (_super) {
    tslib_1.__extends(RadioGroupControl, _super);
    function RadioGroupControl(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = ControlTypes.RADIO;
        _this.options = [];
        _this.labelValue = options['labelValue'] || '';
        _this.labelName = options['labelName'] || '';
        _this.options = options['options'] || [];
        return _this;
    }
    return RadioGroupControl;
}(FormControlBase));
export { RadioGroupControl };
if (false) {
    /** @type {?} */
    RadioGroupControl.prototype.controlType;
    /** @type {?} */
    RadioGroupControl.prototype.labelValue;
    /** @type {?} */
    RadioGroupControl.prototype.labelName;
    /** @type {?} */
    RadioGroupControl.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9Hcm91cENvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbnZkMjY0L25nLWR5bmFtaWMtZm9ybS8iLCJzb3VyY2VzIjpbIm1vZGVscy9SYWRpb0dyb3VwQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFM0Q7SUFBdUMsNkNBQWdDO0lBTXJFLDJCQUFZLE9BQVk7UUFBWix3QkFBQSxFQUFBLFlBQVk7UUFBeEIsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FJZjtRQVZELGlCQUFXLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUdqQyxhQUFPLEdBQXVDLEVBQUUsQ0FBQztRQUkvQyxLQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7SUFDMUMsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVpELENBQXVDLGVBQWUsR0FZckQ7Ozs7SUFYQyx3Q0FBaUM7O0lBQ2pDLHVDQUFtQjs7SUFDbkIsc0NBQWtCOztJQUNsQixvQ0FBaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbEJhc2UgfSBmcm9tICcuL0Zvcm1Db250cm9sQmFzZSc7XG5pbXBvcnQgeyBDb250cm9sVHlwZXMgfSBmcm9tICcuLi9lbnVtcy9jb250cm9sLXR5cGVzLmVudW0nO1xuXG5leHBvcnQgY2xhc3MgUmFkaW9Hcm91cENvbnRyb2wgZXh0ZW5kcyBGb3JtQ29udHJvbEJhc2U8c3RyaW5nIHwgbnVtYmVyPiB7XG4gIGNvbnRyb2xUeXBlID0gQ29udHJvbFR5cGVzLlJBRElPO1xuICBsYWJlbFZhbHVlOiBzdHJpbmc7XG4gIGxhYmVsTmFtZTogc3RyaW5nO1xuICBvcHRpb25zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdID0gW107XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5sYWJlbFZhbHVlID0gb3B0aW9uc1snbGFiZWxWYWx1ZSddIHx8ICcnO1xuICAgIHRoaXMubGFiZWxOYW1lID0gb3B0aW9uc1snbGFiZWxOYW1lJ10gfHwgJyc7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1snb3B0aW9ucyddIHx8IFtdO1xuICB9XG59XG4iXX0=