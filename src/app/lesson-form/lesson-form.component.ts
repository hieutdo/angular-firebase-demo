import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Lesson } from '../shared/model/lesson';
import { validateUrl } from '../shared/validators/validateUrl';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css'],
})
export class LessonFormComponent implements OnInit {
  form: FormGroup;

  @Input() initialValue: Lesson;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      url: ['', Validators.required],
      videoUrl: ['', [Validators.required, validateUrl]],
      tags: ['', Validators.required],
      longDescription: ['', Validators.required],
    });
    if (this.initialValue) {
      this.form.patchValue(this.initialValue);
    }
  }

  isErrorVisible(field: string, error: string) {
    const control = this.form.controls[field];
    return control.touched && control.errors && control.errors[error];
  }

  reset() {
    this.form.reset();
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }
}
