import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interface/fieldConfig';
import { CheckboxValuePosterService } from '../../service/checkbox-value-poster.service';
@Component({
  selector: '[app-form-button]',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit {
  group: FormGroup;
  config: FieldConfig;
  constructor(
    private panelService: CheckboxValuePosterService
  ) { }


  ngOnInit() {
  }

  panel() {
    this.panelService.subject.next(null);
  }

}
