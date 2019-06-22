/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ControlTypes } from './../enums/control-types.enum';
import { FormControlBase } from './FormControlBase';
export class TextboxControl extends FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.controlType = ControlTypes.TEXTBOX;
        // set type for text box
        // exam: text, number...
        this.type = options['type'] || '';
    }
}
if (false) {
    /** @type {?} */
    TextboxControl.prototype.controlType;
    /** @type {?} */
    TextboxControl.prototype.type;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dGJveENvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbnZkMjY0L25nLWR5bmFtaWMtZm9ybS8iLCJzb3VyY2VzIjpbIm1vZGVscy9UZXh0Ym94Q29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRCxNQUFNLE9BQU8sY0FBZSxTQUFRLGVBQXVCOzs7O0lBSXZELFlBQVksT0FBTyxHQUFHLEVBQUU7UUFDcEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSm5CLGdCQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUsvQix3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0NBQ0o7OztJQVRHLHFDQUFtQzs7SUFDbkMsOEJBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sVHlwZXMgfSBmcm9tICcuLy4uL2VudW1zL2NvbnRyb2wtdHlwZXMuZW51bSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbEJhc2UgfSBmcm9tICcuL0Zvcm1Db250cm9sQmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBUZXh0Ym94Q29udHJvbCBleHRlbmRzIEZvcm1Db250cm9sQmFzZTxzdHJpbmc+IHtcbiAgICBjb250cm9sVHlwZSA9IENvbnRyb2xUeXBlcy5URVhUQk9YO1xuICAgIHR5cGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgLy8gc2V0IHR5cGUgZm9yIHRleHQgYm94XG4gICAgICAgIC8vIGV4YW06IHRleHQsIG51bWJlci4uLlxuICAgICAgICB0aGlzLnR5cGUgPSBvcHRpb25zWyd0eXBlJ10gfHwgJyc7XG4gICAgfVxufVxuIl19