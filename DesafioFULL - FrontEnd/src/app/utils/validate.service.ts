import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateDivida = (divida: {
    cod_Titulo: Number,
    cpf_Devedor: string,
    devedor: string,
    multa: number,
    juros: number,
    parcelas: Array<any>
  }, data:any
  ) => new Promise((resolve, reject) => {
    data.forEach((element: { Cod_Titulo: Number; }) => {
      if (element.Cod_Titulo === divida.cod_Titulo)
        reject("Título ja cadastrado informe outro codigo!");
    });
    if (divida.cod_Titulo.toString() === "") {
      reject("Preencha todos os campos!");
    }
    if (divida.cod_Titulo < 0) {
      reject("Numero do titulo informado não é válido!");
    }

    if (divida.devedor === "") {
      reject("Preencha todos os campos!");
    }
    if (divida.cpf_Devedor === "") {
      reject("Preencha todos os campos!");

    }
    if (this.cpfValidator(divida.cpf_Devedor) !== "") {
      reject(this.cpfValidator(divida.cpf_Devedor))
    }
    if (divida.multa.toString() === "") {
      reject("Preencha todos os campos!");
    }
    if (divida.multa < 0) {
      reject("Valor dos multa invalida!");
    }
    if (divida.juros.toString() === "") {
      reject("Preencha todos os campos!");
    }
    if (divida.juros < 0) {
      reject("Valor do juros invalido!");
    }
    if (divida.parcelas.length === 0) {
      reject("Informe pelo menos uma Percela!");
    }
    resolve(true);
  });

  cpfValidator = (cpf: string) => {
    // const re = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
    let strCPF = cpf.replace('.', '').replace('.', '')

    strCPF = strCPF.replace('-', '')
    var Soma;
    var Resto;
    Soma = 0;

    if (cpf.length < 11) return 'Ooops! Insira um cpf válido.'
    if (strCPF === "00000000000") return 'Ooops! Insira um cpf válido.';

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return 'Ooops! Insira um cpf válido.';

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return 'Ooops! Insira um cpf válido.';
    if (!cpf || cpf.length <= 0) return 'CPF não pode ser vazio.';
    //if (!re) return 'Ooops! Insira um cpf válido.';

    return '';
  };
}
