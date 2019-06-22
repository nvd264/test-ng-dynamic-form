/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ControlTypes } from './../enums/control-types.enum';
import { FormControlBase } from './FormControlBase';
var TextboxControl = /** @class */ (function (_super) {
    tslib_1.__extends(TextboxControl, _super);
    function TextboxControl(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = ControlTypes.TEXTBOX;
        // set type for text box
        // exam: text, number...
        _this.type = options['type'] || '';
        return _this;
    }
    return TextboxControl;
}(FormControlBase));
export { TextboxControl };
if (false) {
    /** @type {?} */
    TextboxControl.prototype.controlType;
    /** @type {?} */
    TextboxControl.prototype.type;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dGJveENvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbnZkMjY0L25nLWR5bmFtaWMtZm9ybS8iLCJzb3VyY2VzIjpbIm1vZGVscy9UZXh0Ym94Q29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQ7SUFBb0MsMENBQXVCO0lBSXZELHdCQUFZLE9BQVk7UUFBWix3QkFBQSxFQUFBLFlBQVk7UUFBeEIsWUFDSSxrQkFBTSxPQUFPLENBQUMsU0FJakI7UUFSRCxpQkFBVyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFLL0Isd0JBQXdCO1FBQ3hCLHdCQUF3QjtRQUN4QixLQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7O0lBQ3RDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFWRCxDQUFvQyxlQUFlLEdBVWxEOzs7O0lBVEcscUNBQW1DOztJQUNuQyw4QkFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xUeXBlcyB9IGZyb20gJy4vLi4vZW51bXMvY29udHJvbC10eXBlcy5lbnVtJztcbmltcG9ydCB7IEZvcm1Db250cm9sQmFzZSB9IGZyb20gJy4vRm9ybUNvbnRyb2xCYXNlJztcblxuZXhwb3J0IGNsYXNzIFRleHRib3hDb250cm9sIGV4dGVuZHMgRm9ybUNvbnRyb2xCYXNlPHN0cmluZz4ge1xuICAgIGNvbnRyb2xUeXBlID0gQ29udHJvbFR5cGVzLlRFWFRCT1g7XG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICAvLyBzZXQgdHlwZSBmb3IgdGV4dCBib3hcbiAgICAgICAgLy8gZXhhbTogdGV4dCwgbnVtYmVyLi4uXG4gICAgICAgIHRoaXMudHlwZSA9IG9wdGlvbnNbJ3R5cGUnXSB8fCAnJztcbiAgICB9XG59XG4iXX0=