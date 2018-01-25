import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Config} from '../../../../config';
import {ApiKeyService} from './api-key.service';

type Headers = {[key: string]: string}

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor(private apiKeyService: ApiKeyService) {}

  private getAuthHeaders = (): Headers => {
    const headers: Headers = {}
    const apiKey = this.apiKeyService.getApiKey()

    if (apiKey) {
      headers[Config.http.apiHeader] = apiKey
    }

    return headers
  }

  private getRequestWithAuthHeaders = <T>(request: HttpRequest<T>): HttpRequest<T> =>
    request.clone({
      setHeaders: this.getAuthHeaders()
    })

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.getRequestWithAuthHeaders(request))
  }
}
