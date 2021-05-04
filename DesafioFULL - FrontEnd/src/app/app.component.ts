import { Component, OnInit, ElementRef } from '@angular/core';
import {TitulosService} from './crud/titulos.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DesafioFULL';
  element: ElementRef

  constructor(private el: ElementRef, private titulos:TitulosService) {
    this.element = el;
  }

  async ngOnInit() {
  }
  
   
    
}
