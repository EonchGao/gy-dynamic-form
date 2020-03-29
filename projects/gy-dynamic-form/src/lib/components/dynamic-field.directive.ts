import {
    Type,
    Input,
    OnInit,
    Directive,
    OnChanges,
    ComponentRef,
    ViewContainerRef,
    ComponentFactoryResolver,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormInputComponent } from './form-input/form-input.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormRadioComponent } from './form-radio/form-radio.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FieldConfig } from '../interface/fieldConfig';
import { Field } from '../interface/field';


const components: { [type: string]: Type<Field> } = {
    input: FormInputComponent,
    button: FormButtonComponent,
    select: FormSelectComponent,
    radio: FormRadioComponent,
    checkbox: FormCheckboxComponent
};
@Directive({
    selector: '[appDynamicField][config][group]'
})
export class DynamicFieldDirective implements OnChanges, OnInit {
    @Input()
    config: FieldConfig;
    @Input()
    group: FormGroup;
    component: ComponentRef<Field>;
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
    ) { }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }

    ngOnInit() {
        if (!components[this.config.type]) {
            const supportedTypes = Object.keys(components).join(',');
            throw new Error(
                `supportedTypes are ${supportedTypes} `
            );
        }
        const componentFactory = this.componentFactoryResolver.
            resolveComponentFactory(components[this.config.type]);
        this.component = this.viewContainerRef.createComponent(componentFactory);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    }
}
