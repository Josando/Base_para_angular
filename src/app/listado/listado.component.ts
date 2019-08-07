import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { ListadoService } from './services/listado.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: [ './listado.component.scss' ],
  providers: [ListadoService]
})

export class ListadoComponent implements OnInit {
    constructor(private http: HttpClient, private list: ListadoService) { }

    items: Array<any>;
    results: any;
    pagingItems: Array<any>;

    ngOnInit() {
    const url = '../assets/pagination-data.json';
    this.list.getListado().subscribe(
      result => {this.results = result; },
       err => console.error(err),
         () => console.log('done')
       );
    }

    onChangePage(pagingItems: Array<any>) {
        this.pagingItems = pagingItems;
    }
}
