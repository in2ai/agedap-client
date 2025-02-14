import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input()
  label: string = '';

  @Input()
  icon?: string; // Uses prime clases name

  @Input()
  type?: 'primary' | 'secondary' = 'primary'; // Uses bootstrap clases name

  @Input()
  isDisabled?: boolean = false;

  @Output()
  onClick = new EventEmitter<any>();

  onClickButton(event: any) {
    if (!this.isDisabled && this.onClick) this.onClick.emit(event);
  }
}
