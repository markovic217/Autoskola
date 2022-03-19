import { Component, OnInit } from '@angular/core';
import { Kandidat } from '../../assets/class/kandidat';
import { KandidatiService } from '../service/kandidati.service';
import { FormControl } from '@angular/forms';
import { Cas } from 'src/assets/class/cas';
import { Polaze } from '../../assets/class/polaze';
import { isEqual } from 'lodash'

@Component({
  selector: 'app-novi-kandidat',
  templateUrl: './novi-prisutni-kandidat.component.html',
  styleUrls: ['./novi-prisutni-kandidat.component.scss']
})
export class NoviPrisutniKandidatComponent implements OnInit {
  kandidat!: Kandidat;
  kandidati: Kandidat[] = [];
  prisutniKandidati: Kandidat[] = [];
  display: boolean = false;
  idInput!: FormControl;
  casovi: Cas[] = [];
  trenutniCas: Cas[] = [];
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
  add() {
    let prisutniKandidati = new Array();
    this.kandidati.forEach(kandidat => {
      if (kandidat.isSelected)
        prisutniKandidati.push(kandidat);
    })
    this.kandidatiService.prisutniKandidati = prisutniKandidati
    this.kandidatiService.TekuciCas = this.trenutniCas;
  }
  get() {
    return new Promise<Kandidat[]>((resolve, reject) => {
      this.kandidatiService.getKandidati().subscribe((kandidat) => {
        this.kandidati = kandidat;
        this.idSelected.forEach((id) => {
          this.kandidati.forEach(kandidat => {
            if (kandidat.id == id)
              kandidat.isSelected = true;
          })
        })
        resolve(this.kandidati);
      })
    })
  }
  masterSel!: boolean;
  idSelected: string[] = [];
  onChange(e: any, i: number) {
    if (e.target.checked) {
      this.idSelected.push(e.target.value);
    }
    else {
      this.idSelected.splice(i, 1);
    }
    this.masterSel = this.kandidati.every(kandidat => {
      return kandidat.isSelected == true;
    })

    console.log(this.idSelected);
  }

  search() {
    let query = "";
    if (this.kandidat.id == "" && this.kandidat.ime == "" && this.kandidat.prezime == "") {
      this.get();
    }
    else {
      query = "where "
      if (this.kandidat.id != "")
        query += `id like '%25${this.kandidat.id}%25'`;
      if (this.kandidat.ime != "")
        query += `ime like '%25${this.kandidat.ime}%25'`;
      if (this.kandidat.prezime != "")
        query += `prezime like '%25${this.kandidat.prezime}%25'`;
      this.kandidatiService.getKandidatiLike(query).subscribe((kandidat) => {
        this.kandidati = kandidat;
        this.idSelected.forEach((id) => {
          this.kandidati.forEach(kandidat => {
            if (kandidat.id == id)
              kandidat.isSelected = true;
          })
        });
        this.masterSel = this.kandidati.every(kandidat => {
          return kandidat.isSelected == true;
        })
      })
    }
    console.log(this.polaze);
  }

  checkUncheckAll() {
    this.idSelected = new Array();
    if (this.masterSel) {
      this.kandidati.forEach(kandidat => {
        kandidat.isSelected = this.masterSel;
        this.idSelected.push(kandidat.id);
      })
    }
    else {
      this.kandidati.forEach(kandidat => {
        kandidat.isSelected = false;
      })
    }
    console.log(this.idSelected);
    console.log(this.kandidati);
  }
  izaberiCas(br: number) {
    this.brCas = br;
  }
  brCas: number = 0;
  deoKoda(izabraniKod: string) {
    if (izabraniKod == "T1" || izabraniKod == 'T2' || izabraniKod == 'T4' || izabraniKod == 'T5' || izabraniKod == 'T7' || izabraniKod == 'T12')
      return true;
    else
      return false;
  }

  async izaberiKod(kod: string) {
    this.kandidati = await this.get();
    this.kandidatiStek = this.kandidati;
    if (this.idSelected)
      this.idSelected.forEach((id) => {
        this.kandidati.forEach(kandidat => {
          if (kandidat.id == id)
            kandidat.isSelected = true;
        })
      })
    this.trenutniCas[this.brCas] = new Cas(kod);
    let izabraniKod = kod.split('-');
    var prosliCas: string[] = []
    var preprosliCas: string[] = []
    if (this.brCas > 0)
      prosliCas = this.trenutniCas[this.brCas - 1].kod.split('-');
    if (this.brCas > 1)
      preprosliCas = this.trenutniCas[this.brCas - 2].kod.split('-');
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
