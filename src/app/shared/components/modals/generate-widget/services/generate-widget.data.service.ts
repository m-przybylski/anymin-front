// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { WidgetButtonType } from '../components/generate-widget-button-type/generate-widget-button-type.component';
import { Config } from '../../../../../../config';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable()
export class GenerateWidgetDataService {
  constructor(private sanitizer: DomSanitizer) {}

  public getWidgetLink(widgetId: string): string {
    return `${Config.links.widget}/${widgetId}`;
  }

  public getWidgetSdkLink(widgetId?: string): string {
    return `<script>(function(d,id,amWidgetId){if(d.getElementById(id))return;var a="${
      Config.links.widgetSdk
    }",t=d.getElementsByTagName("head")[0],s=d.createElement("script");s.id=id;s.setAttribute('data-widgetid',amWidgetId);s.src=a,t.appendChild(s)})(document,'anymind-widget-jssdk','${
      widgetId ? widgetId : ''
    }')</script>`;
  }

  public getButtonCode(widgetId: string, buttonType: WidgetButtonType): string {
    return `<button data-anymind-widget="${widgetId}" class="anymind-button${
      buttonType === WidgetButtonType.FLOATING ? ' anymind-floating' : ''
    }"></button>`;
  }

  public getRendertronLink(widgetLink: string): SafeResourceUrl {
    /**
     * should return something like that:
     * does not work on localhost :(
     * https://app.anymind.com/rendertron/render/http://stage.anymind.com/widget/DoqwiYhinf0
     */
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${Config.links.rendertron}${widgetLink}`);
  }
}
