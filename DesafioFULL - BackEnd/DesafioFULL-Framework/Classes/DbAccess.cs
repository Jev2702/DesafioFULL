using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using DesafioFULL.Models;
using Google.Cloud.Firestore;
using Newtonsoft.Json;

namespace DesafioFULL_Framework.Classes
{
    public class DbAccess
    {
        private FirestoreDb db;

        public DbAccess()
        {
            Config_bd();
        }
        public void Config_bd()
        {
            try
            {
                string path = AppDomain.CurrentDomain.BaseDirectory + @"config.json";
                Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);
                db = FirestoreDb.Create("desafiofull-432cb");
            }
            catch (Exception e)
            {

            }
        }
        public string Add_Novo_Titulo(Titulo titulo)
        {
            CollectionReference colecao = db.Collection("titulos");

            var a = colecao.AddAsync(ConvertDicionary(titulo));
            
            if (a.Exception is null)
            {
                return "Titulo Adicionado Com Sucesso!";
            }else
            {
                throw new Exception("Falha ao Salvar!", a.Exception);
            }
            
        }

        //public string GetTitulos()
        //{
        //    Titulos ts = new Titulos();
        //    ts = Busca_Todos_Titulos();
        //    var json = JsonConvert.SerializeObject(ts.GetTitulos());
        //    return json;
        //}
             

        public async Task<string> Busca_Todos_Titulos()
        {
            Query query = db.Collection("titulos");
            QuerySnapshot doc_titulos = await query.GetSnapshotAsync();
            Titulos titulos = new Titulos();
            foreach(DocumentSnapshot doc in doc_titulos)
            {
                Titulo titulo = doc.ConvertTo<Titulo>();
                titulos.AddTitulo(titulo);
            }
            var json = JsonConvert.SerializeObject(titulos.GetTitulos());
            return json;
        }

        //Converte classe título em um dicionário
        private static Dictionary<string, object> ConvertDicionary(Titulo titulo)
        {
            var dictionary = new Dictionary<string, object>();
            
            dictionary.Add("Cod_Titulo", titulo.Cod_Titulo);
            dictionary.Add("Juros", titulo.Juros);
            dictionary.Add("Multa", titulo.Multa);
            dictionary.Add("Devedor", titulo.Devedor);
            dictionary.Add("Cpf_Devedor", titulo.Cpf_Devedor);
            ArrayList listParcelas = new ArrayList();
            foreach(Parcela parcela in titulo.Parcelas)
            {
                var dictionaryParcela = new Dictionary<string, object>();
                dictionaryParcela.Add("Parcela_Numero",parcela.Parcela_Numero);
                dictionaryParcela.Add("Data", parcela.Data);
                dictionaryParcela.Add("Valor", parcela.Valor);
                listParcelas.Add(dictionaryParcela);
            }
            dictionary.Add("Parcelas", listParcelas);            
            return dictionary;
            
        }
    }
}