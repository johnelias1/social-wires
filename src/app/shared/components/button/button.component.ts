import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  constructor(public router: Router) {}

  @Input() textColor!: string;
  @Input() type: string = 'button';
  @Input() backgroundColor: string = 'var(--mainColor)';
  @Input() width!: string;
}
