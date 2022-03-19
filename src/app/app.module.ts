import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrisutniKandidatiComponent } from './prisutni-kandidati/prisutni-kandidati.component';
import { NoviPrisutniKandidatComponent } from './novi-prisutni-kandidat/novi-prisutni-kandidat.component';
import { FormsModule } from '@angular/forms';
import { SviKandidatiComponent } from './svi-kandidati/svi-kandidati.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MoguciPrisutniComponent } from './moguci-prisutni/moguci-prisutni.component';
import { BazaComponent } from './baza/baza.component';


@NgModule({
  declarations: [
    AppComponent,
    PrisutniKandidatiComponent,
    NoviPrisutniKandidatComponent,
    PrisutniKandidatiComponent,
    SviKandidatiComponent,
    MoguciPrisutniComponent,
    BazaComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
