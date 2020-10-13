import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from 'ngx-typesafe-forms';
import { ErrorComponent } from './error.component';

class ErrorPageObject {
  constructor(
    protected fixture: ComponentFixture<TestHostComponent>,
  ) {}

  get content(): HTMLDivElement { return this.fixture.nativeElement.querySelector('div'); }
}

@Component({
  template: `<app-error [control]="formControl" [error]="error">{{ errorText }}</app-error>`
})
class TestHostComponent {
  @ViewChild(ErrorComponent) child: ErrorComponent;
  formControl: FormControl<string>;
  error: string;
  errorText: string;
}

describe('ErrorComponent', () => {
  const setup = () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const host = fixture.componentInstance;
    const component = host.child;
    const page = new ErrorPageObject(fixture);
    return { fixture, host, component, page };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ErrorComponent,
        TestHostComponent,
      ]
    })
    .compileComponents();
  }));

  it('shows the error when input error is valid', () => {
    const { host, fixture, page }  = setup();
    host.formControl = new FormControl<string>('', []);
    host.formControl.markAsTouched();

    host.formControl.setErrors({ minlength: true });
    host.error = 'minlength';
    host.errorText = 'ERROR';
    fixture.detectChanges();

    expect(page.content.innerText).toBe(host.errorText);
  });

  it('shows no error', () => {
    const { fixture, page }  = setup();

    fixture.detectChanges();

    expect(page.content).toBeNull();
  });

});
