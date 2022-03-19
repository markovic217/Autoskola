import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IKandidat } from '../../assets/interface/ikandidat';
import { ICas } from 'src/assets/interface/icas';
import { Observable } from 'rxjs';
import { Kandidat } from '../../assets/class/kandidat';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IPolaze } from '../../assets/interface/ipolaze';
import { Cas } from 'src/assets/class/cas';
import { Polaze } from 'src/assets/class/polaze';
@Injectable({
  providedIn: 'root'
})
export class KandidatiService {
  kandidati:Kandidat[] = [];
  prisutniKandidati:Kandidat[] = [];
  TekuciCas:Cas[] = [];
  polaze:Polaze[] = [];
  constructor(private http: HttpClient) {
    this.getKandidati().subscribe((k)=> this.kandidati = k);
   // this.getPolaze().subscribe((p)=> this.polaze = p);
  }
  errorHandler: ErrorHandler = new ErrorHandler();

  Url = window.location.protocol + '//' + window.location.hostname + ':5000/';
  
  getKandidati(): Observable<IKandidat[]> {
    return this.http.get<IKandidat[]>(this.Url + "kandidat").pipe(
      catchError((error: HttpErrorResponse) => { return throwError(error.message) })
    );
  }
  getCasovi(): Observable<ICas[]> {
    return this.http.get<ICas[]>(this.Url + "cas").pipe(
      catchError((error: HttpErrorResponse) => { return throwError(error.message) })
    );
  }
  getPolaze(): Observable<IPolaze[]> {
    return this.http.get<IPolaze[]>(this.Url + "polaze").pipe(
      catchError((error: HttpErrorResponse) => { return throwError(error.message) })
    );
  }
  getKandidatiLike(query:string): Observable<IKandidat[]> {
    return this.http.get<IKandidat[]>(this.Url + "kandidat/" + query).pipe(
      catchError((error: HttpErrorResponse) => { return throwError(error.message) })
    );
  }
  postKandidat(Kandidat: Kandidat): Observable<Kandidat> {
    return this.http.post<Kandidat>(this.Url + "kandidat", Kandidat).pipe(
      catchError((error: HttpErrorResponse) => { return throwError(error.message) })
    );
  }
  postPolaze(id:string, kod:string): Observable<Polaze> {
    console.log(Polaze);
    return this.http.post<Polaze>(this.Url + "polaze", {id,kod}).pipe(
      catchError((error: HttpErrorResponse) => { return throwError(error.message) })
    );
  }
  deleteKandidati(){
    return this.http.delete(this.Url + "kandidat/delete").pipe(
      catchError((error: HttpErrorResponse) => { return throwError(error.message) })
    )
  }
  deleteKandidat(id:string){
    return this.http.delete(this.Url + "kandidat/delete/" + id).pipe(
      catchError((error: HttpErrorResponse) => { return throwError(error.message) })
    )
  }
}
