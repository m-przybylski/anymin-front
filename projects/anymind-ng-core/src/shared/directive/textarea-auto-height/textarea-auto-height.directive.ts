import { Directive, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { Config } from '../../../config';
import { COMPONENTS_CONFIG } from '../../injection-tokens/injection-tokens';
import { LoggerService } from '../../../services/logger.service';

@Directive({
  selector: 'textarea[autoheight]',
})
export class TextareaAutoHeightDirective implements OnInit {
  private readonly maxHeightTextarea = this.config.textareaHeight.maxHeight;
  private htmlElement: HTMLElement;

  constructor(logger: LoggerService, @Inject(COMPONENTS_CONFIG) private config: Config, private element: ElementRef) {
    if (this.element.nativeElement.tagName !== 'TEXTAREA') {
      logger.error('This element is not TEXTAREA');
    }
    this.htmlElement = this.element.nativeElement;
  }

  @HostListener('input')
  public onInput = (): void => {
    this.onChange();
  };

  public ngOnInit(): void {
    this.resizeElement();
  }

  private onChange = (): void => {
    this.htmlElement.style.height = 'auto';
    this.htmlElement.style.height = `${Math.min(this.element.nativeElement.scrollHeight, this.maxHeightTextarea)}px`;
  };

  private resizeElement = (): void => {
    // TODO add windowAnimationFrame and cancelAnimationFrame

    const elementStyles = this.element.nativeElement.style;
    const elementScrollHeight = this.element.nativeElement.scrollHeight;

    elementStyles.height = `${Math.min(elementScrollHeight, this.maxHeightTextarea)}px`;
  };
}
