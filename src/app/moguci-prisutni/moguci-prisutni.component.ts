import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Cas } from 'src/assets/class/cas';
import { Kandidat } from 'src/assets/class/kandidat';
import { Polaze } from 'src/assets/class/polaze';
import { KandidatiService } from '../service/kandidati.service';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-moguci-prisutni',
  templateUrl: './moguci-prisutni.component.html',
  styleUrls: ['./moguci-prisutni.component.scss']
})
export class MoguciPrisutniComponent implements OnInit {

  kandidat!: Kandidat;
  kandidati: Kandidat[] = [];
  prisutniKandidati: Kandidat[] = [];
  display: boolean = false;
  idInput!: FormControl;
  casovi: Cas[] = [];
  trenutniCas: Cas = new Cas("");
  polaze: Polaze[] = [];
  kandidatiStek: Kandidat[] = [];
  constructor(private kandidatiService: KandidatiService) {
    this.kandidati = kandidatiService.kandidati;
    this.kandidat = new Kandidat("", "", "");
  }

  ngOnInit(): void {
    this.get();
    this.kandidatiService.getCasovi().subscribe(cas => {
      this.casovi = cas
    })
    this.kandidatiService.getPolaze().subscribe((p) => { this.polaze = p })
  }

  get() {
    return new Promise<Kandidat[]>((resolve, reject) => {
      this.kandidatiService.getKandidati().subscribe((kandidat) => {
        this.kandidati = kandidat;
        resolve(this.kandidati);
      })
    })
  }

  deoKoda(izabraniKod: string) {
    if (izabraniKod == "T1" || izabraniKod == 'T2' || izabraniKod == 'T4' || izabraniKod == 'T5' || izabraniKod == 'T7' || izabraniKod == 'T12')
      return true;
    else
      return false;
  }

  async izaberiKod(kod: string) {
    this.kandidati = await this.get();
    this.kandidatiStek = this.kandidati;
    let izabraniKod = kod.split('-');
    var prosliCas: string[] = []
    var preprosliCas: string[] = []
    let polozeniKod: string[] = [];
    let klength = this.kandidati.length;
    let plength = this.polaze.length;
    let moguciKandidati: Kandidat[] = [];
    let ok1 = false, ok2 = false, ok3 = false, ok4 = true;
    var logic = () => {
      for (let i = 0; i < klength; i++) {
        for (let j = 0; j < plength; j++) {
          if (this.kandidati[i].id == this.polaze[j].idKandidat) {
            polozeniKod = this.polaze[j].kod.split('-');
            if (parseInt(polozeniKod[2]) == (parseInt(izabraniKod[2]) - 1) && polozeniKod[1] == izabraniKod[1] && polozeniKod[0] == 'O') {
              ok1 = true;
            }
            else if (polozeniKod[0] == 'O' && (izabraniKod[1] == prosliCas[1] &&
              parseInt(izabraniKod[2]) == (parseInt(prosliCas[2]) + 1)) || (izabraniKod[1] == preprosliCas[1] &&
                parseInt(izabraniKod[2]) == (parseInt(preprosliCas[2]) + 1))) {
              ok2 = true;
            }
            else if (izabraniKod[2] == "1") {
              ok3 = true;
            }
            if (isEqual(izabraniKod, polozeniKod)) {
              ok4 = false;
              break;
            }
          }
          else if ((prosliCas[0] == 'O' || preprosliCas[0] =='O') && (izabraniKod[1] == prosliCas[1] &&
            parseInt(izabraniKod[2]) == (parseInt(prosliCas[2]) + 1)) || (izabraniKod[1] == preprosliCas[1] &&
              parseInt(izabraniKod[2]) == (parseInt(preprosliCas[2]) + 1))) {
            ok2 = true;
          }
          else if (izabraniKod[2] == "1") {
            ok3 = true;
          }
        }
        if ((ok1 || ok2 || ok3) && ok4)
          moguciKandidati.push(this.kandidati[i]);
        ok1 = false, ok2 = false, ok3 = false, ok4 = true;
      }
    }
    if (izabraniKod[0] == 'O' && this.deoKoda(izabraniKod[1]))
      logic();
    else {
      ok4 = true;
      for (let i = 0; i < klength; i++) {
        for (let j = 0; j < plength; j++) {
          if (this.kandidati[i].id == this.polaze[j].idKandidat) {
            polozeniKod = this.polaze[j].kod.split('-');
            if (isEqual(izabraniKod, polozeniKod)) {
              ok4 = false;
              break;
            }
          }
        }
        if (ok4)
          moguciKandidati.push(this.kandidati[i])
        ok4 = true;
      }
    }
    this.kandidati = moguciKandidati;
  }
}
