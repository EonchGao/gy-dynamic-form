import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
// import { GyDynamicFormComponent } from 'gy-dynamic-form';


import { formsPool } from './form-pool';
import { GyDynamicFormComponent } from 'projects/gy-dynamic-form/src/public-api';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('dynamicForm')
  dynamicForm: GyDynamicFormComponent;

  formFieldConfigs = [];

  data: Array<any> = [];
  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {

    this.getData().subscribe((res: any) => {
      this.data = res.data;
      console.log('ssssssss-->', res)

      this.formFieldConfigs = this.transform(this.data);

    })
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

  panel() {
    console.log('取消')
  }



  transform(data: Array<any>) {
    const arr = [];

    if (data.length !== 0) {
      data.forEach(element => {
        arr.push({
          type: 'input',
          label: element.attrName,
          name: element.id,
          attrType: 'string',
          required: true,
          placeholder: '请输入',
          disabled: false,
          validations: [Validators.required, Validators.pattern(/(^[1-9]([0-9]+)?(\.[0-9]+)?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)],
          validationMessages: '请输入正确的格式'
        });
      });
      arr.push({
        label: '确定',
        name: 'submit',
        type: 'button',
        disabled: false,
      })
      return arr;
    }

    return arr;

  }

  getData() {
    const uli = 'http://aima-app-gw.zcptestkudu1.lunztech.cn/api/v1/QueryApolloSettings?spaceName=AimaSetting&key=047001';
    return this.http.get(uli);
  }

}
