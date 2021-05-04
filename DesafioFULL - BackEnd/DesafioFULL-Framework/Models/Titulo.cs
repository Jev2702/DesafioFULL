using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Google.Cloud.Firestore;

namespace DesafioFULL.Models
{
    [FirestoreData]
    public class Titulo
    {
        [FirestoreProperty]
        public string Cod_Titulo { get; set; }
        [FirestoreProperty]
        public double Multa { get; set; }
        [FirestoreProperty]
        public double Juros { get; set; }
        [FirestoreProperty]
        public string Devedor { get; set; }
        [FirestoreProperty]
        public string Cpf_Devedor { get; set; }
        [FirestoreProperty]
        public List<Parcela> Parcelas { get; set; }
    }
}