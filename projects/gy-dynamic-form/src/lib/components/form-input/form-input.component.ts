import { Component, OnInit, HostBinding, ViewEncapsulation, AfterContentInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interface/fieldConfig';
@Component({
  selector: '[app-form-input]',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  group: FormGroup;
  config: FieldConfig;

  @HostBinding('attr.class') style = 'form-group';

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }
}
