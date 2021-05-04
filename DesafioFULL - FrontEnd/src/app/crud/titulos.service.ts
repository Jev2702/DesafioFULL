import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TitulosService {

  constructor(private http: HttpClient) {

  }
  getTitulos = () => new Promise((resolve, reject) => {
    this.http.get<any>('https://localhost:44397/api/titulos').subscribe({
      next: data => {
        console.log('data', data)
        resolve(data);
      },
      error: error => {
        reject(error.message);
      }
    })
  });
  addTitulo = (divida:{
    cod_Titulo: Number,
    cpf_Devedor: string,
    devedor: string,
    multa: number,
    juros: number,
    parcelas: Array<any> }) => new Promise((resolve, reject) => {
    const headers = { 'Content-Type': 'application/json'};
    this.http.post<any>('https://localhost:44397/api/titulos',
     JSON.stringify(divida),{headers}

    ).subscribe({
      next: data => {
        console.log('data', data)
        resolve(data);
      },
      error: error => {
        reject(error.message);
      }
    })
  });
  
  
}
