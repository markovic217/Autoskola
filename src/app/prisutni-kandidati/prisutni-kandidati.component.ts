import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cas } from 'src/assets/class/cas';
import { Polaze } from 'src/assets/class/polaze';
import { Kandidat } from '../../assets/class/kandidat';
import { KandidatiService } from '../service/kandidati.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './prisutni-kandidati.component.html',
  styleUrls: ['./prisutni-kandidati.component.scss']
})
export class PrisutniKandidatiComponent implements OnInit {
  kandidati: Kandidat[] = [];
  trenutniCas: Cas[] = [];
  odslusanCas: Cas[] = [];
  polozio: Polaze[] = [];
  constructor(private kandidatiService: KandidatiService) {
  }
  ngOnInit(): void {
    this.kandidati = this.kandidatiService.prisutniKandidati;
    this.trenutniCas = this.kandidatiService.TekuciCas;
  }
  deleteRow(i: number) {
    this.kandidati.splice(i, 1);
  }
  zavrsenCas(e: any, id: string, i: number) {
    var index: number = -1;
    if (e.target.checked)
      this.polozio.push(new Polaze(id, e.target.value));
    else {
      for (let i = 0; i < this.polozio.length; i++) {
        if (this.polozio[i].idKandidat == id && this.polozio[i].kod == e.target.value) {
          index = i;
        }
        break;
      }
      this.polozio.splice(index, 1);
    }
  }
  zavrsi() {
    this.kandidatiService.prisutniKandidati = new Array();
    this.kandidatiService.TekuciCas = new Array();
    this.polozio.forEach((p)=>{
      this.kandidatiService.postPolaze(p.idKandidat, p.kod).subscribe();
    })
    this.kandidatiService.getPolaze().subscribe((p)=>{this.kandidatiService.polaze = p})
    this.polozio = new Array();
  }
}
