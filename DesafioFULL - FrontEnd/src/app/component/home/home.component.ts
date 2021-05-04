import { Component, OnInit, ElementRef } from '@angular/core';
import { TitulosService } from '../../crud/titulos.service'
import * as moment from 'moment';
import { ValidateService } from 'src/app/utils/validate.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  title = 'DesafioFULL';
  data: any;
  parcelas: Array<any> = [];
  msgErro: string = "";
  abrirNovaDivida: any;
  element: ElementRef
  cod_Titulo: number = 0;
  devedor: string = "";
  cpf: string = "";
  multa: number = 0;
  juros: number = 0;
  numParcela: number = 1;
  dataParcela: string = "";
  valorParcela: number = 0.0;
  loading: boolean = false;
  constructor(private titulos: TitulosService, private el: ElementRef, private validate: ValidateService,) {
    this.data = []
    this.abrirNovaDivida = null;
    this.element = el
    this.parcelas = []
    this.data = []
  }
  async ngOnInit() {
    this.getTitulos()
    console.log('esse')
    let modal = this.element.nativeElement.querySelector(".modal-overlay");
    modal.classList.remove('active');

  }
  async getTitulos() {
    console.log("Antes de buscar");
    this.data = await this.titulos.getTitulos();
    console.log("Depois de buscar");
    this.data.forEach((divida: { Juros:number,Multa: number, valor_atual:number,valor_original: number, dias_atrasado: number, Parcelas: any[] }) => {
      divida['valor_original'] = 0
      divida['dias_atrasado'] = 0
      divida['valor_atual'] = 0
      divida.Parcelas.forEach((parcela) => {
        divida['valor_original'] += parcela.Valor
        let dataAtua = new Date()
        let dataFormatada = ((dataAtua.getDate())) + "/" + ((dataAtua.getMonth() + 1)) + "/" + dataAtua.getFullYear();
        var d1 = dataAtua;
        var d2 = dataFormatada;
        var diff = moment(d2, "DD/MM/YYYY").diff(moment(parcela.Data, "DD/MM/YYYY"));
        var dias = moment.duration(diff).asDays();
        divida['dias_atrasado'] = dias > divida['dias_atrasado'] ? dias : divida['dias_atrasado']
        divida.Multa = divida['valor_original'] * (divida.Multa / 100)
        parcela["dias"] = dias
        parcela["juros"] = (divida.Juros/30)*dias*parcela['Valor']
        parcela["total"] = parcela["juros"] + parcela['Valor']
        divida["valor_atual"] +=  parcela["total"]
      });

    });
    this.loading = false
  }

  open(e: Event): void {
    e.preventDefault();
    let modal = this.element.nativeElement.querySelector(".modal-overlay");
    modal.classList.add('active');
  }
  close(e: Event): void {
    e.preventDefault();
    let modal = this.element.nativeElement.querySelector(".modal-overlay");
    modal.classList.remove('active');
  }

  addParcela(e: Event): void {
    e.preventDefault();
    if (this.numParcela <= 0)
      this.msgErro += "Número da parcela não pode ser menor ou igual a 0!\n";
    if (this.valorParcela <= 0)
      this.msgErro += "O Valor da Parcela não pode ser menor ou igual a 0!\n";
    if (this.dataParcela == "")
      this.msgErro += "A data da parcela não pode está vazia.\n";

    if (this.msgErro == "") {
      let novaData = `${this.dataParcela.split("-")[2]}/${this.dataParcela.split("-")[1]}/${this.dataParcela.split("-")[0]}`
      this.parcelas.push({
        Parcela_Numero: this.numParcela, Data: novaData, Valor: this.valorParcela
      })
      this.numParcela++;
      this.clear()
      console.log('parcelas', this.parcelas)
    } else {
      alert(this.msgErro)
    }
    this.msgErro = "";
  }
  changeCpf(e: string) { //formata o cpf

    e = e.valueOf().toString().replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada

    this.cpf = e
    console.log("this.changeCpf", e);
  }

  clear() {
    this.dataParcela = "", this.valorParcela = 0.0;
  }
  async onSubmit() {
    let divida = {
      cod_Titulo: this.cod_Titulo,
      devedor: this.devedor,
      cpf_Devedor: this.cpf,
      multa: this.multa,
      juros: this.juros,
      parcelas: this.parcelas,
    }
    try {

      let valid = await this.validate.validateDivida(divida, this.data)
      let result = await this.titulos.addTitulo(divida)
      this.cod_Titulo = 0
      this.devedor = ""
      this.cpf = ""
      this.multa = 0
      this.juros = 0
      this.parcelas = []
      this.numParcela = 1
      this.clear()
      let modal = this.element.nativeElement.querySelector(".modal-overlay");
      modal.classList.remove('active');
      this.loading = true
      setTimeout(() => {
        this.getTitulos();
      }, 3000);
    } catch (error) {
      alert(error)
    } finally {

    }

  }
}
