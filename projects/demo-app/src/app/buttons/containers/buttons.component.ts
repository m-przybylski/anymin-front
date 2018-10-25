import { Component } from '@angular/core';

@Component({
  selector: 'test-button',
  template: `
  <div class='table'>
    <div class='row-header'>plat-icon-button</div>
    <div class='row' *ngFor='let color of colors'>
      <div class='column'>{{color}}</div>
      <div class='column'><a plat-icon-button [color]="color"><span>+</span></a></div>
    </div>
    <div class='row-header'>plat-stroked-button</div>
    <div class='row' *ngFor='let color of colors'>
      <div class='column'>{{color}}</div>
      <div class='column'><a plat-stroked-button [color]="color"><span>Button</span></a></div>
    </div>
    <div class='row-header'>plat-mini-flat-fab</div>
    <div class='row' *ngFor='let color of colors'>
      <div class='column'>{{color}}</div>
      <div class='column'><a plat-mini-flat-fab [color]="color"><span>+</span></a></div>
    </div>
    <div class='row-header'>plat-flat</div>
    <div class='row' *ngFor='let color of colors'>
      <div class='column'>{{color}}</div>
      <div class='column'><a plat-flat [color]="color"><span>Button</span></a></div>
    </div>
    <div class='row-header'>plat-button</div>
    <div class='row' *ngFor='let color of colors'>
      <div class='column'>{{color}}</div>
      <div class='column'><a plat-button [color]="color"><span>Button</span></a></div>
    </div>
    <div class='row-header'>plat-button-link</div>
    <div class='row' *ngFor='let color of colors'>
      <div class='column'>{{color}}</div>
      <div class='column'><a plat-button-link [color]="color"><span>Button</span></a></div>
    </div>
    <div class='row-header'>plat-large-icon-button</div>
    <div class='row' *ngFor='let color of colors'>
      <div class='column'>{{color}}</div>
      <div class='column'><a plat-large-icon-button [color]="color"><span>Button</span></a></div>
    </div>
    <div class='row-header'>plat-large-button</div>
    <div class='row' *ngFor='let color of colors'>
      <div class='column'>{{color}}</div>
      <div class='column'>
        <div><a plat-large-button [color]="color"><span>Button</span></a></div>
      </div>
    </div>
    <div class='row-header'>plat-stroked-large-button</div>
    <div class='row' *ngFor='let color of colors'>
      <div class='column'>{{color}}</div>
      <div class='column'><a plat-stroked-large-button [color]="color"><span>Button</span></a></div>
    </div>
  </div>
  `,
  styles: [
    `
      .table {
        width: 300px;
      }
      .row-header {
        height: 35px;
        text-align: center;
        border: black 1px solid;
      }
      .row {
        display: flex;
      }
      .column {
        flex: 1 0 0;
        padding: 8px 16px;
      }
    `,
  ],
})
export class ButtonTestingComponent {
  public colors = ['primary', 'secondary', 'danger', 'success'];
}
