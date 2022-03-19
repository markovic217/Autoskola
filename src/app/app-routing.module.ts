import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrisutniKandidatiComponent } from './prisutni-kandidati/prisutni-kandidati.component';
import { NoviPrisutniKandidatComponent } from './novi-prisutni-kandidat/novi-prisutni-kandidat.component';
import { SviKandidatiComponent } from './svi-kandidati/svi-kandidati.component';
import { MoguciPrisutniComponent } from './moguci-prisutni/moguci-prisutni.component';
import { BazaComponent } from './baza/baza.component';

const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"home", component:SviKandidatiComponent},
  {path:"prisutni", component:PrisutniKandidatiComponent},
  {path:"noviPrisutni", component:NoviPrisutniKandidatComponent},
  {path:"moguci", component:MoguciPrisutniComponent},
  {path:"baza", component:BazaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
