import { ValidatorFn } from '@angular/forms';
import { IValidator } from '../interfaces/IValidator';
export declare class FormErrorService {
    constructor();
    /**
     * Map validates into instance of angular
     * @param validates
     */
    getValidatesInstance(validators: IValidator[]): ValidatorFn[];
    /**
     * Get error message base error type
     * @param validators
     * @param errorType
     */
    getErrorMessage(validators: IValidator[], errorType: string): string;
    /**
     * Get validate by error type
     * @param validators
     * @param errorType
     */
    getValidateByErrorType(validators: IValidator[], errorType: string): IValidator;
}
