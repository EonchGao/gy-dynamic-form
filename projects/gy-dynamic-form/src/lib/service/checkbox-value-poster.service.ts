import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CheckboxValuePosterService {
    valuePoster = new BehaviorSubject(null);
    controller = {};
    constructor() { }

    postValue(valObj) {
        const controlName = Object.keys(valObj)[0];
        this.controller[controlName] = valObj[controlName];
        this.valuePoster.next(this.controller);
    }

    clearValue() {
        this.valuePoster.next(null);
    }

    getValue() {
        return this.valuePoster.asObservable();
    }
}
