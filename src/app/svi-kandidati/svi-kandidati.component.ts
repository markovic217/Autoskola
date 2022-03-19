import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Kandidat } from '../../assets/class/kandidat';
import { KandidatiService } from '../service/kandidati.service';

@Component({
  selector: 'app-svi-kandidati',
  templateUrl: './svi-kandidati.component.html',
  styleUrls: ['./svi-kandidati.component.scss']
})
export class SviKandidatiComponent implements OnInit {
  kandidat!: Kandidat;
  kandidati: Kandidat[] = [];
  display: boolean = false;
  idInput!: FormControl;
  constructor(private kandidatiService: KandidatiService) {
    this.kandidati = kandidatiService.kandidati;
    this.kandidat = new Kandidat("", "", "");
  }
  ngOnInit(): void {
    this.get();
  }

  get() {
    this.kandidatiService.getKandidati().subscribe((kandidat) => {
      this.kandidati = kandidat;
    });
  }

  postKandidat(kandidat: Kandidat) {
    this.kandidatiService.postKandidat(kandidat).subscribe(() => { this.get() });
    this.idDelete = new Array();
    this.kandidat.id = "";
    this.kandidat.ime = "";
    this.kandidat.prezime = "";
  }

  displayCols(del: boolean) {
    if (del && this.display && this.idDelete.length != 0) {
      if (confirm("Da li zelite da obrisete izabrane kandidate?")) { //this.kandidatiService.deleteKandidat
        if (this.masterSel == true) {
          this.kandidatiService.deleteKandidati().subscribe();
          //window.alert("Svi kandidati su obrisani")
        }
        else {
          this.idDelete.forEach(id => {
            this.kandidatiService.deleteKandidat(id).subscribe();
          })
          this.idDelete = new Array();
          //window.alert("Kandidati obrisani")
        }
        this.get();
        this.display = !this.display;
      }
    }
    else {
      this.display = !this.display;
      this.kandidati.forEach(kandidat => kandidat.isSelected = false);
      this.idDelete = new Array();
      this.masterSel = false;
    }
  }

  idDelete: string[] = [];
  onChange(e: any) {
    if (e.target.checked)
      this.idDelete.push(e.target.value);
    else {
      var index = -1;
      for (let i = 0; i < this.idDelete.length; i++) {
        if (this.idDelete[i] === e.target.value) {
          index = i;
          break;
        }
      }
      this.idDelete.splice(index, 1);
    }
    this.masterSel = this.kandidati.every(kandidat => {
      return kandidat.isSelected == true;
    })
  }
  masterSel!: boolean;
  checkUncheckAll() {
    if (this.masterSel) {
      this.kandidati.forEach(kandidat => {
        kandidat.isSelected = this.masterSel;
        this.idDelete.push(kandidat.id);
      })
    }
    else
      this.idDelete = new Array();
    this.kandidati.forEach(kandidat => {
      kandidat.isSelected = this.masterSel;
    })
  }
}
