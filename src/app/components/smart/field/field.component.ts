import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-field',
  imports: [ReactiveFormsModule],
  templateUrl: './field.component.html',
})
export class FieldComponent {
  @Input()
  label: string = '';

  @Input()
  id?: string = '';

  @Input()
  placeholder?: string;

  @Input()
  type?: string = 'text';

  @Input()
  control: FormControl = new FormControl('');
}
