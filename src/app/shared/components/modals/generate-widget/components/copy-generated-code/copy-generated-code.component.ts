import { GenerateWidgetService } from '@platform/shared/components/modals/generate-widget/services/generate-widget.service';
import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[plat-copy-to-clipboard]',
})
export class CopyCodeToClipbord {
  @Input('plat-copy-to-clipboard')
  public textToCopy: string;
  constructor(private generateWidgetService: GenerateWidgetService) {}

  @HostListener('click')
  public onClick(): void {
    this.generateWidgetService.saveToClipboard(this.textToCopy);
  }
}
