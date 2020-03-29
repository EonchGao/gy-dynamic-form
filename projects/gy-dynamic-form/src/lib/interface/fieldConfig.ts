import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
    name: string;
    attrType?: string;
    required?: boolean;
    validations?: ValidatorFn[];
    validationMessages?: string;
    value?: any;
    disabled?: boolean;
    placeholder?: string;
    type: string;
    label?: string;
    options?: string[];
}
