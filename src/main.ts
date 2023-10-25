import {bootstrapApplication, BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {importProvidersFrom} from "@angular/core";
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig
} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {AppRoutes} from "./app/routes/main.rout";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(AppRoutes, withInMemoryScrolling({
        scrollPositionRestoration: 'disabled',
    }), withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
    })),
    provideAnimations()
]
}).catch(err => console.error(err));
