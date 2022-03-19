import { Component, OnInit } from '@angular/core';
import { Polaze } from 'src/assets/class/polaze';
import { KandidatiService } from '../service/kandidati.service';

@Component({
  selector: 'app-baza',
  templateUrl: './baza.component.html',
  styleUrls: ['./baza.component.scss']
})
export class BazaComponent implements OnInit {

  constructor(private kandidatiService: KandidatiService) { }
  polaze:Polaze[] = []
  ngOnInit(): void {
    this.kandidatiService.getPolaze().subscribe((p) => { this.polaze = p })
  }

}
