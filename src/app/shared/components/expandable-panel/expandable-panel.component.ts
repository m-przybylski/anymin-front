import { Component, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Animations } from '../../animations/animations';
import { DOCUMENT } from '@angular/common';

// calculates min height the same as css 'calc((1em + 6px) * 3)'
// tslint:disable-next-line:no-magic-numbers
const minHeightFn = (size: number): number => (size + 6) * 3;

@Component({
  selector: 'plat-expandable-panel',
  templateUrl: './expandable-panel.component.html',
  styleUrls: ['./expandable-panel.component.sass'],
  animations: Animations.collapseExpandContainer,
})
export class ExpandablePanelComponent implements AfterViewInit {
  public collapseState: 'collapsed' = 'collapsed';
  public expandState: 'expanded' = 'expanded';
  public expandable: boolean;
  private _state: ContainerState;

  @ViewChild('content', { read: ElementRef })
  private content: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      const fontHeight = this.getEmSize();
      this.expandable = (this.content.nativeElement as HTMLElement).clientHeight > minHeightFn(fontHeight);
      this._state = this.expandable ? this.collapseState : this.expandState;
    }, 0);
  }
  public get state(): ContainerState {
    return this._state;
  }

  public toggleState = (): void => {
    if (!this.expandable) {
      return;
    }
    const fn = this._state === this.collapseState ? this.expand : this.collapse;
    fn();
  };

  private collapse = (): void => {
    this._state = this.collapseState;
  };
  private expand = (): void => {
    this._state = this.expandState;
  };

  private getEmSize = (): number => {
    const testElement = this.document.createElement('i');
    testElement.style.width = '1em';
    testElement.style.fontSize = '1em';
    testElement.style.position = 'absolute';
    (this.content.nativeElement as HTMLElement).appendChild(testElement);
    const size = testElement.clientWidth;
    (this.content.nativeElement as HTMLElement).removeChild(testElement);

    return size;
  };
}

type ContainerState = 'collapsed' | 'expanded';
