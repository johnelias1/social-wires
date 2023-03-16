import {
  Component,
  OnInit,
  Input,
  Output,
  Optional,
  Self,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { SelectOption } from '../../interfaces/select-option';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  providers: [],
})
export class InputFormComponent implements OnInit, ControlValueAccessor {
  @Input() type = 'text';
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() customClass = '';
  @Input() autocomplete = false;
  @Input() id!: string;
  @Input() name = '';
  @Input() width = '80%';
  @Input() isDisabled = false;
  @Input() autofocus = false;
  @Input() required = false;
  @Input() minlength!: number;
  @Input() options: SelectOption[] = [];
  @Output() onChangeValue = new EventEmitter<string>();
  @Output() onInputType = new EventEmitter<string>();

  @Input() value!: string;
  pattern!: RegExp;
  onChange = (_: any) => {};
  onTouch = () => {};

  ngOnInit(): void {}

  constructor(@Self() @Optional() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  onInput(value: any) {
    console.log(value);
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
    this.onInputType.emit(value);
  }

  onChangeInput(value: any) {
    console.log(value);
    this.onChangeValue.emit(value);
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
