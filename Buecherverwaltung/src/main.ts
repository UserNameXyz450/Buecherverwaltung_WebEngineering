import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../Frontend/app/app.config';
import { AppComponent } from '../Frontend/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
