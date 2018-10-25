import { NgModule } from '@angular/core';
import { AppComponent } from '@testing-app/core/containers/app.component';
import { CoreModule } from '@testing-app/core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ConultationFooterTestingModule } from '@testing-app/consultation-footers/consultation-footers.module';
import { ButtonTestingModule } from '@testing-app/buttons/buttons.module';

@NgModule({
  imports: [CoreModule, BrowserModule, AppRoutingModule, ConultationFooterTestingModule, ButtonTestingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
