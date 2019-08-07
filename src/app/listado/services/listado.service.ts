import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable(
/*   {
  providedIn: 'root'
} */
)
export class ListadoService {

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string) { }

  getListado() {

    const url = '../assets/pagination-data.json';
    return  this.http.get(url);

}

}
