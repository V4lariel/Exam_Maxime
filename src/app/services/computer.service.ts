import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Computer} from "../models/computer";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
marqueDisponible = ['Dell', 'HP', 'Apple', 'Asus'];
typeDisponible = ['Portable', 'Fixe', 'Tablette Hybride'];
categoryDisponible = ['Gaming', 'Bureautique', 'Premier prix'];
apiURL = 'http://localhost:3000/computers';
  constructor(private http: HttpClient) { }

  handleError(error) {
    let errorMessage = '';
    if ( error.error instanceof ErrorEvent ) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getAllComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.apiURL).pipe(retry(1), catchError(this.handleError))
  }
  getComputerByID(id: number): Observable<Computer> {
    return this.http.get<Computer>(this.apiURL +'/'+ id).pipe(retry(1), catchError(this.handleError))
  }
  add(computer: Computer): Observable<Computer> {
    return this.http.post<Computer>(this.apiURL, computer).pipe(retry(1), catchError(this.handleError))
  }
  edit(computerToEdit: Computer): Observable<Computer> {
    return this.http.put<Computer>(this.apiURL+'/'+computerToEdit.id, computerToEdit).pipe(retry(1), catchError(this.handleError)
    );
  }
  delete(id: number): Observable<Computer>  {
    return this.http.delete<Computer>(this.apiURL+'/'+ id).pipe(retry(1), catchError(this.handleError)
    );
  }
}
