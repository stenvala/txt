import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MobxAngularModule } from "mobx-angular";
import { LocalStorageModule } from "angular-2-local-storage";

import { AppRoutingModule } from "./app.routes";

import { AppComponent } from "./app.component";
import { NavFavoritesComponent } from "./nav-favorites/nav-favorites.component";
import { NavHistoryComponent } from "./nav-history/nav-history.component";
import { PageComponent } from "./page/page.component";
import { FormsModule } from "@angular/forms";

import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    NavFavoritesComponent,
    NavHistoryComponent,
    PageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,

    MobxAngularModule,
    LocalStorageModule.forRoot({
      prefix: "txt",
      storageType: "localStorage",
    }),
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
