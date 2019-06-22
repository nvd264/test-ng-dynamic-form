/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicFieldDirective } from '../directives/dynamic-field.directive';
import { CustomFieldComponent } from './custom-field/custom-field.component';
export class DynamicFormModule {
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
                    BrowserAnimationsModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BudmQyNjQvbmctZHluYW1pYy1mb3JtLyIsInNvdXJjZXMiOlsibGliL2R5bmFtaWMtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEgsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFzQjdFLE1BQU0sT0FBTyxpQkFBaUI7OztZQXBCN0IsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixvQkFBb0I7b0JBQ3BCLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixvQkFBb0I7aUJBQUM7Z0JBQ3ZCLE9BQU8sRUFBRTtvQkFDUCxXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIsWUFBWTtvQkFDWix1QkFBdUI7b0JBQ3ZCLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixpQkFBaUI7b0JBQ2pCLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZix3QkFBd0I7aUJBQ3pCO2dCQUNELE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2FBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlLCBNYXRDaGVja2JveE1vZHVsZSwgTWF0UmFkaW9Nb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlc0NvbXBvbmVudCB9IGZyb20gJy4vZXJyb3ItbWVzc2FnZXMvZXJyb3ItbWVzc2FnZXMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLXNwaW5uZXInO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDdXN0b21GaWVsZENvbXBvbmVudCB9IGZyb20gJy4vY3VzdG9tLWZpZWxkL2N1c3RvbS1maWVsZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEeW5hbWljRm9ybUNvbXBvbmVudCxcbiAgICBFcnJvck1lc3NhZ2VzQ29tcG9uZW50LFxuICAgIER5bmFtaWNGaWVsZERpcmVjdGl2ZSxcbiAgICBDdXN0b21GaWVsZENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbRHluYW1pY0Zvcm1Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtTW9kdWxlIHsgfVxuIl19