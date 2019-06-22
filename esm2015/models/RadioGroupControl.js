/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormControlBase } from './FormControlBase';
import { ControlTypes } from '../enums/control-types.enum';
export class RadioGroupControl extends FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.controlType = ControlTypes.RADIO;
        this.options = [];
        this.labelValue = options['labelValue'] || '';
        this.labelName = options['labelName'] || '';
        this.options = options['options'] || [];
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9Hcm91cENvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbnZkMjY0L25nLWR5bmFtaWMtZm9ybS8iLCJzb3VyY2VzIjpbIm1vZGVscy9SYWRpb0dyb3VwQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsZUFBZ0M7Ozs7SUFNckUsWUFBWSxPQUFPLEdBQUcsRUFBRTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFOakIsZ0JBQVcsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBR2pDLFlBQU8sR0FBdUMsRUFBRSxDQUFDO1FBSS9DLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFDLENBQUM7Q0FDRjs7O0lBWEMsd0NBQWlDOztJQUNqQyx1Q0FBbUI7O0lBQ25CLHNDQUFrQjs7SUFDbEIsb0NBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2xCYXNlIH0gZnJvbSAnLi9Gb3JtQ29udHJvbEJhc2UnO1xuaW1wb3J0IHsgQ29udHJvbFR5cGVzIH0gZnJvbSAnLi4vZW51bXMvY29udHJvbC10eXBlcy5lbnVtJztcblxuZXhwb3J0IGNsYXNzIFJhZGlvR3JvdXBDb250cm9sIGV4dGVuZHMgRm9ybUNvbnRyb2xCYXNlPHN0cmluZyB8IG51bWJlcj4ge1xuICBjb250cm9sVHlwZSA9IENvbnRyb2xUeXBlcy5SQURJTztcbiAgbGFiZWxWYWx1ZTogc3RyaW5nO1xuICBsYWJlbE5hbWU6IHN0cmluZztcbiAgb3B0aW9uczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMubGFiZWxWYWx1ZSA9IG9wdGlvbnNbJ2xhYmVsVmFsdWUnXSB8fCAnJztcbiAgICB0aGlzLmxhYmVsTmFtZSA9IG9wdGlvbnNbJ2xhYmVsTmFtZSddIHx8ICcnO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNbJ29wdGlvbnMnXSB8fCBbXTtcbiAgfVxufVxuIl19