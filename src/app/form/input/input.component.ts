import { Component, Input } from '@angular/core';
import { FormControl } from 'ngx-typesafe-forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() field: string;
  @Input() id: string;
  @Input() control: FormControl<string>;
  @Input() type = 'text';
}
