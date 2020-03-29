import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GyDynamicFormComponent } from 'gy-dynamic-form';
import { formsPool } from './form-pool';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('dynamicForm')
  dynamicForm: GyDynamicFormComponent;
  formsCanBeSelect = [
    'food', 'music', 'movie'
  ];
  formFieldConfigs = formsPool['food'];
  constructor(private cdr: ChangeDetectorRef) {

  }
  onSubmit(event) {
    console.log(event);
  }
  ngAfterViewInit() {
    console.log(3);
    let previousValid = this.dynamicForm.valid;
    this.dynamicForm.changes
      .subscribe(val => {
        if (previousValid !== this.dynamicForm.valid) {
          previousValid = this.dynamicForm.valid;
          this.dynamicForm.setDisabled('submit', !previousValid);
        }
      });
    setTimeout(() => {
      this.dynamicForm.setDisabled('submit', true);
    });

  }

  changeForm(formType) {
    this.formFieldConfigs = formsPool[formType];
    this.dynamicForm.setDisabled('submit', true);
  }
}
