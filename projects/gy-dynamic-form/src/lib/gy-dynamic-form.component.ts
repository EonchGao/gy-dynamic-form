import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from './interface/fieldConfig';
import { CheckboxValuePosterService } from './service/checkbox-value-poster.service';

@Component({
  selector: 'gy-dynamic-form',
  template: `
    <form (ngSubmit)="handleSubmit($event)" [formGroup]="form" class="dynamic-form">
      <ng-container *ngFor="let config of configs" appDynamicField [config]="config" [group]="form">
      </ng-container>
    </form>
  `,
  styles: []
})
export class GyDynamicFormComponent implements OnInit, OnChanges {
  form: FormGroup;

  @Input()
  configs: FieldConfig[];

  @Output()
  submit = new EventEmitter<any>();

  get controlConfigs() { return this.configs.filter(item => item.type !== 'button'); }
  get value() { return this.form.value; }
  get valid() { return this.form.valid; }
  get changes(): Observable<any> { return this.form.valueChanges; }

  constructor(
    private fb: FormBuilder,
    private service: CheckboxValuePosterService
  ) {
  }

  ngOnInit() {
    this.form = this.creatForm();
  }

  ngOnChanges() {
    console.log(1);
    if (this.form) {
      this.service.clearValue();
      const setControls = Object.keys(this.form['controls']);
      const controlToSet = this.controlConfigs.map(item => item.name);

      setControls
        .filter(controlName => !controlToSet.includes(controlName))
        .forEach(controlName => {
          this.form.removeControl(controlName);
        });

      controlToSet
        .filter(controlName => !setControls.includes(controlName))
        .forEach(controlName => {
          const config = this.controlConfigs.find(item => item.name === controlName);
          this.form.addControl(controlName, this.creatControl(config));
        });
    }
  }

  creatForm(): FormGroup {
    const form = this.fb.group({});
    this.controlConfigs.forEach(config => {
      form.addControl(config.name, this.creatControl(config));
    });
    return form;
  }

  creatControl(fieldConfig: FieldConfig) {
    const { disabled, value, validations } = fieldConfig;
    return this.fb.control({ disabled, value }, validations);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.service.getValue().pipe(take(1)).subscribe(val => this.submit.emit({
      valid: this.valid,
      formVal: this.value,
      checkboxVal: val
    }));
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }
    this.configs.forEach(item => {
      if (item.name === name) {
        item.disabled = disable;
      }
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value);
  }
}
