import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from 'ngx-typesafe-forms';

class InputPageObject {
  constructor(
    protected fixture: ComponentFixture<TestHostComponent>,
  ) {}

  input(id: string): HTMLInputElement { return this.fixture.nativeElement.querySelector(`#${id}`); }
}

@Component({
  template: `
    <app-input [control]="control" [id]="id" [field]="field" [type]="type"></app-input>
  `
})
class TestHostComponent {
  @ViewChild(InputComponent) child: InputComponent;
  field: string;
  id: string;
  control: FormControl<string>;
  type: string;
}

describe('InputComponent', () => {
  const setup = () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const host = fixture.componentInstance;
    const component = host.child;
    const page = new InputPageObject(fixture);
    fixture.detectChanges();

    return { fixture, host, component, page };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputComponent,
        TestHostComponent,
      ]
    })
    .compileComponents();
  }));

  it('sets type text', () => {
    const { fixture, page, host }  = setup();
    host.field = 'First Name';
    host.id = 'firstName';
    host.control = new FormControl<string>('', []);

    fixture.detectChanges();

    const inputDefault = page.input(host.id);
    expect(inputDefault.id).toBe(host.id);
    expect(inputDefault.placeholder).toBe(host.field);
    expect(inputDefault.type).toBe('text');
  });

  it('sets type email', () => {
    const { fixture, page, host }  = setup();
    host.field = 'First Name';
    host.id = 'firstName';
    host.type = 'email';

    fixture.detectChanges();

    const inputEmail = page.input(host.id);
    expect(inputEmail.id).toBe(host.id);
    expect(inputEmail.placeholder).toBe(host.field);
    expect(inputEmail.type).toBe(host.type);
  });
});

