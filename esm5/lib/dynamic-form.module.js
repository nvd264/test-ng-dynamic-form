/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicFieldDirective } from '../directives/dynamic-field.directive';
import { CustomFieldComponent } from './custom-field/custom-field.component';
var DynamicFormModule = /** @class */ (function () {
    function DynamicFormModule() {
    }
    DynamicFormModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DynamicFormComponent,
                        ErrorMessagesComponent,
                        DynamicFieldDirective,
                        CustomFieldComponent
                    ],
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        // BrowserAnimationsModule,
                        MatInputModule,
                        MatSelectModule,
                        MatCheckboxModule,
                        MatRadioModule,
                        MatButtonModule,
                        MatProgressSpinnerModule
                    ],
                    exports: [DynamicFormComponent]
                },] }
    ];
    return DynamicFormModule;
}());
export { DynamicFormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BudmQyNjQvbmctZHluYW1pYy1mb3JtLyIsInNvdXJjZXMiOlsibGliL2R5bmFtaWMtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hILE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTdFO0lBQUE7SUFvQmlDLENBQUM7O2dCQXBCakMsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixvQkFBb0I7d0JBQ3BCLHNCQUFzQjt3QkFDdEIscUJBQXFCO3dCQUNyQixvQkFBb0I7cUJBQUM7b0JBQ3ZCLE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWiwyQkFBMkI7d0JBQzNCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZix3QkFBd0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUNoQzs7SUFDZ0Msd0JBQUM7Q0FBQSxBQXBCbEMsSUFvQmtDO1NBQXJCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vZHluYW1pYy1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG4vLyBpbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSwgTWF0Q2hlY2tib3hNb2R1bGUsIE1hdFJhZGlvTW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEVycm9yTWVzc2FnZXNDb21wb25lbnQgfSBmcm9tICcuL2Vycm9yLW1lc3NhZ2VzL2Vycm9yLW1lc3NhZ2VzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1zcGlubmVyJztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZSB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvZHluYW1pYy1maWVsZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ3VzdG9tRmllbGRDb21wb25lbnQgfSBmcm9tICcuL2N1c3RvbS1maWVsZC9jdXN0b20tZmllbGQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRHluYW1pY0Zvcm1Db21wb25lbnQsXG4gICAgRXJyb3JNZXNzYWdlc0NvbXBvbmVudCxcbiAgICBEeW5hbWljRmllbGREaXJlY3RpdmUsXG4gICAgQ3VzdG9tRmllbGRDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgLy8gQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW0R5bmFtaWNGb3JtQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybU1vZHVsZSB7IH1cbiJdfQ==