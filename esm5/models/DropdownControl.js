/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormControlBase } from './FormControlBase';
import { ControlTypes } from '../enums/control-types.enum';
import { tap } from 'rxjs/operators';
import { isObservable } from 'rxjs';
var DropdownControl = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownControl, _super);
    function DropdownControl(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = ControlTypes.DROPDOWN;
        _this.options = [];
        _this.multiple = false;
        _this.hideSearchBox = false;
        _this.searchText = '';
        _this.loading = false;
        _this.searchOnServer = false;
        _this.supportLoadMore = false;
        _this.labelValue = options['labelValue'] || '';
        _this.labelName = options['labelName'] || '';
        _this.multiple = !!options['multiple'];
        _this.searchText = options['searchText'] || '';
        _this.hideSearchBox = !!options['hideSearchBox'];
        if (_this.multiple && !Array.isArray(_this.value)) {
            // convert value to array for multi select
            _this.value = [_this.value];
        }
        if (typeof options['onSearch'] === 'function') {
            _this.onSearch = options['onSearch'];
            _this.searchOnServer = true;
        }
        if (typeof options['loadMore'] === 'function') {
            _this.loadMore = options['loadMore'];
            _this.supportLoadMore = true;
        }
        // set options base type
        if (isObservable(options['options'])) {
            options['options'].pipe(tap((/**
             * @return {?}
             */
            function () { return _this.loading = true; }))).subscribe((/**
             * @param {?} options
             * @return {?}
             */
            function (options) {
                _this.options = options;
                _this.loading = false;
            }));
        }
        else {
            _this.options = options['options'] || [];
        }
        return _this;
    }
    return DropdownControl;
}(FormControlBase));
export { DropdownControl };
if (false) {
    /** @type {?} */
    DropdownControl.prototype.controlType;
    /** @type {?} */
    DropdownControl.prototype.labelValue;
    /** @type {?} */
    DropdownControl.prototype.labelName;
    /** @type {?} */
    DropdownControl.prototype.options;
    /** @type {?} */
    DropdownControl.prototype.multiple;
    /** @type {?} */
    DropdownControl.prototype.onSearch;
    /** @type {?} */
    DropdownControl.prototype.loadMore;
    /** @type {?} */
    DropdownControl.prototype.hideSearchBox;
    /** @type {?} */
    DropdownControl.prototype.searchText;
    /** @type {?} */
    DropdownControl.prototype.loading;
    /** @type {?} */
    DropdownControl.prototype.searchOnServer;
    /** @type {?} */
    DropdownControl.prototype.supportLoadMore;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd25Db250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG52ZDI2NC9uZy1keW5hbWljLWZvcm0vIiwic291cmNlcyI6WyJtb2RlbHMvRHJvcGRvd25Db250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQztJQUFxQywyQ0FBb0I7SUFjdkQseUJBQVksT0FBWTtRQUFaLHdCQUFBLEVBQUEsWUFBWTtRQUF4QixZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQWtDZjtRQWhERCxpQkFBVyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFHcEMsYUFBTyxHQUF1QyxFQUFFLENBQUM7UUFDakQsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixtQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixnQkFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixhQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLG9CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHFCQUFlLEdBQUcsS0FBSyxDQUFDO1FBS3RCLEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxLQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFaEQsSUFBRyxLQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUMsMENBQTBDO1lBQzFDLEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7UUFFRCxJQUFHLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUM1QyxLQUFJLENBQUMsUUFBUSxHQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM1QjtRQUVELElBQUcsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQzVDLEtBQUksQ0FBQyxRQUFRLEdBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQzdCO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQ3JCLEdBQUc7OztZQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksRUFBbkIsQ0FBbUIsRUFBQyxDQUMvQixDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLE9BQU87Z0JBQ2pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekM7O0lBQ0gsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQWxERCxDQUFxQyxlQUFlLEdBa0RuRDs7OztJQWpEQyxzQ0FBb0M7O0lBQ3BDLHFDQUFtQjs7SUFDbkIsb0NBQWtCOztJQUNsQixrQ0FBaUQ7O0lBQ2pELG1DQUFpQjs7SUFDakIsbUNBQWM7O0lBQ2QsbUNBQWM7O0lBQ2Qsd0NBQXNCOztJQUN0QixxQ0FBZ0I7O0lBQ2hCLGtDQUFnQjs7SUFDaEIseUNBQXVCOztJQUN2QiwwQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbEJhc2UgfSBmcm9tICcuL0Zvcm1Db250cm9sQmFzZSc7XG5pbXBvcnQgeyBDb250cm9sVHlwZXMgfSBmcm9tICcuLi9lbnVtcy9jb250cm9sLXR5cGVzLmVudW0nO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjbGFzcyBEcm9wZG93bkNvbnRyb2wgZXh0ZW5kcyBGb3JtQ29udHJvbEJhc2U8YW55PiB7XG4gIGNvbnRyb2xUeXBlID0gQ29udHJvbFR5cGVzLkRST1BET1dOO1xuICBsYWJlbFZhbHVlOiBzdHJpbmc7XG4gIGxhYmVsTmFtZTogc3RyaW5nO1xuICBvcHRpb25zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdID0gW107XG4gIG11bHRpcGxlID0gZmFsc2U7XG4gIG9uU2VhcmNoOiBhbnk7XG4gIGxvYWRNb3JlOiBhbnk7XG4gIGhpZGVTZWFyY2hCb3ggPSBmYWxzZTtcbiAgc2VhcmNoVGV4dCA9ICcnO1xuICBsb2FkaW5nID0gZmFsc2U7XG4gIHNlYXJjaE9uU2VydmVyID0gZmFsc2U7XG4gIHN1cHBvcnRMb2FkTW9yZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5sYWJlbFZhbHVlID0gb3B0aW9uc1snbGFiZWxWYWx1ZSddIHx8ICcnO1xuICAgIHRoaXMubGFiZWxOYW1lID0gb3B0aW9uc1snbGFiZWxOYW1lJ10gfHwgJyc7XG4gICAgdGhpcy5tdWx0aXBsZSA9ICEhb3B0aW9uc1snbXVsdGlwbGUnXTtcbiAgICB0aGlzLnNlYXJjaFRleHQgPSBvcHRpb25zWydzZWFyY2hUZXh0J10gfHwgJyc7XG4gICAgdGhpcy5oaWRlU2VhcmNoQm94ID0gISFvcHRpb25zWydoaWRlU2VhcmNoQm94J107XG5cbiAgICBpZih0aGlzLm11bHRpcGxlICYmICFBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpKSB7XG4gICAgICAvLyBjb252ZXJ0IHZhbHVlIHRvIGFycmF5IGZvciBtdWx0aSBzZWxlY3RcbiAgICAgIHRoaXMudmFsdWUgPSBbdGhpcy52YWx1ZV07XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIG9wdGlvbnNbJ29uU2VhcmNoJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub25TZWFyY2ggPSAgb3B0aW9uc1snb25TZWFyY2gnXTtcbiAgICAgIHRoaXMuc2VhcmNoT25TZXJ2ZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiBvcHRpb25zWydsb2FkTW9yZSddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmxvYWRNb3JlID0gIG9wdGlvbnNbJ2xvYWRNb3JlJ107XG4gICAgICB0aGlzLnN1cHBvcnRMb2FkTW9yZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gc2V0IG9wdGlvbnMgYmFzZSB0eXBlXG4gICAgaWYoaXNPYnNlcnZhYmxlKG9wdGlvbnNbJ29wdGlvbnMnXSkpIHtcbiAgICAgIG9wdGlvbnNbJ29wdGlvbnMnXS5waXBlKFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5sb2FkaW5nID0gdHJ1ZSlcbiAgICAgICkuc3Vic2NyaWJlKG9wdGlvbnMgPT4ge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zWydvcHRpb25zJ10gfHwgW107XG4gICAgfVxuICB9XG59XG4iXX0=