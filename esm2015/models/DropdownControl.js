/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormControlBase } from './FormControlBase';
import { ControlTypes } from '../enums/control-types.enum';
import { tap } from 'rxjs/operators';
import { isObservable } from 'rxjs';
export class DropdownControl extends FormControlBase {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        super(options);
        this.controlType = ControlTypes.DROPDOWN;
        this.options = [];
        this.multiple = false;
        this.hideSearchBox = false;
        this.searchText = '';
        this.loading = false;
        this.searchOnServer = false;
        this.supportLoadMore = false;
        this.labelValue = options['labelValue'] || '';
        this.labelName = options['labelName'] || '';
        this.multiple = !!options['multiple'];
        this.searchText = options['searchText'] || '';
        this.hideSearchBox = !!options['hideSearchBox'];
        if (this.multiple && !Array.isArray(this.value)) {
            // convert value to array for multi select
            this.value = [this.value];
        }
        if (typeof options['onSearch'] === 'function') {
            this.onSearch = options['onSearch'];
            this.searchOnServer = true;
        }
        if (typeof options['loadMore'] === 'function') {
            this.loadMore = options['loadMore'];
            this.supportLoadMore = true;
        }
        // set options base type
        if (isObservable(options['options'])) {
            options['options'].pipe(tap((/**
             * @return {?}
             */
            () => this.loading = true))).subscribe((/**
             * @param {?} options
             * @return {?}
             */
            options => {
                this.options = options;
                this.loading = false;
            }));
        }
        else {
            this.options = options['options'] || [];
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd25Db250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG52ZDI2NC9uZy1keW5hbWljLWZvcm0vIiwic291cmNlcyI6WyJtb2RlbHMvRHJvcGRvd25Db250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE1BQU0sT0FBTyxlQUFnQixTQUFRLGVBQW9COzs7O0lBY3ZELFlBQVksT0FBTyxHQUFHLEVBQUU7UUFDdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBZGpCLGdCQUFXLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUdwQyxZQUFPLEdBQXVDLEVBQUUsQ0FBQztRQUNqRCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUt0QixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWhELElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlDLDBDQUEwQztZQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFBRyxPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDNUI7UUFFRCxJQUFHLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUM3QjtRQUVELHdCQUF3QjtRQUN4QixJQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRTtZQUNuQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUNyQixHQUFHOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksRUFBQyxDQUMvQixDQUFDLFNBQVM7Ozs7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QztJQUNILENBQUM7Q0FDRjs7O0lBakRDLHNDQUFvQzs7SUFDcEMscUNBQW1COztJQUNuQixvQ0FBa0I7O0lBQ2xCLGtDQUFpRDs7SUFDakQsbUNBQWlCOztJQUNqQixtQ0FBYzs7SUFDZCxtQ0FBYzs7SUFDZCx3Q0FBc0I7O0lBQ3RCLHFDQUFnQjs7SUFDaEIsa0NBQWdCOztJQUNoQix5Q0FBdUI7O0lBQ3ZCLDBDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sQmFzZSB9IGZyb20gJy4vRm9ybUNvbnRyb2xCYXNlJztcbmltcG9ydCB7IENvbnRyb2xUeXBlcyB9IGZyb20gJy4uL2VudW1zL2NvbnRyb2wtdHlwZXMuZW51bSc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIERyb3Bkb3duQ29udHJvbCBleHRlbmRzIEZvcm1Db250cm9sQmFzZTxhbnk+IHtcbiAgY29udHJvbFR5cGUgPSBDb250cm9sVHlwZXMuRFJPUERPV047XG4gIGxhYmVsVmFsdWU6IHN0cmluZztcbiAgbGFiZWxOYW1lOiBzdHJpbmc7XG4gIG9wdGlvbnM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10gPSBbXTtcbiAgbXVsdGlwbGUgPSBmYWxzZTtcbiAgb25TZWFyY2g6IGFueTtcbiAgbG9hZE1vcmU6IGFueTtcbiAgaGlkZVNlYXJjaEJveCA9IGZhbHNlO1xuICBzZWFyY2hUZXh0ID0gJyc7XG4gIGxvYWRpbmcgPSBmYWxzZTtcbiAgc2VhcmNoT25TZXJ2ZXIgPSBmYWxzZTtcbiAgc3VwcG9ydExvYWRNb3JlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICB0aGlzLmxhYmVsVmFsdWUgPSBvcHRpb25zWydsYWJlbFZhbHVlJ10gfHwgJyc7XG4gICAgdGhpcy5sYWJlbE5hbWUgPSBvcHRpb25zWydsYWJlbE5hbWUnXSB8fCAnJztcbiAgICB0aGlzLm11bHRpcGxlID0gISFvcHRpb25zWydtdWx0aXBsZSddO1xuICAgIHRoaXMuc2VhcmNoVGV4dCA9IG9wdGlvbnNbJ3NlYXJjaFRleHQnXSB8fCAnJztcbiAgICB0aGlzLmhpZGVTZWFyY2hCb3ggPSAhIW9wdGlvbnNbJ2hpZGVTZWFyY2hCb3gnXTtcblxuICAgIGlmKHRoaXMubXVsdGlwbGUgJiYgIUFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkpIHtcbiAgICAgIC8vIGNvbnZlcnQgdmFsdWUgdG8gYXJyYXkgZm9yIG11bHRpIHNlbGVjdFxuICAgICAgdGhpcy52YWx1ZSA9IFt0aGlzLnZhbHVlXTtcbiAgICB9XG5cbiAgICBpZih0eXBlb2Ygb3B0aW9uc1snb25TZWFyY2gnXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5vblNlYXJjaCA9ICBvcHRpb25zWydvblNlYXJjaCddO1xuICAgICAgdGhpcy5zZWFyY2hPblNlcnZlciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIG9wdGlvbnNbJ2xvYWRNb3JlJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMubG9hZE1vcmUgPSAgb3B0aW9uc1snbG9hZE1vcmUnXTtcbiAgICAgIHRoaXMuc3VwcG9ydExvYWRNb3JlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBzZXQgb3B0aW9ucyBiYXNlIHR5cGVcbiAgICBpZihpc09ic2VydmFibGUob3B0aW9uc1snb3B0aW9ucyddKSkge1xuICAgICAgb3B0aW9uc1snb3B0aW9ucyddLnBpcGUoXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLmxvYWRpbmcgPSB0cnVlKVxuICAgICAgKS5zdWJzY3JpYmUob3B0aW9ucyA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNbJ29wdGlvbnMnXSB8fCBbXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==