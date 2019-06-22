import { ErrorTypes } from './../../enums/error-types.enum';
import { FormErrorService } from './../../services/form-error.service';
import { IValidator } from '../../interfaces/IValidator';
export declare class ErrorMessagesComponent {
    private formErrorService;
    errors: any;
    validators: IValidator[];
    errorTypes: typeof ErrorTypes;
    constructor(formErrorService: FormErrorService);
    getErrorMessage(errorType: string): string;
}
