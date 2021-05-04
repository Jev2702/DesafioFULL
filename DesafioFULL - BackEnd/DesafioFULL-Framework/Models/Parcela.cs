using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Google.Cloud.Firestore;
namespace DesafioFULL.Models
{
    [FirestoreData]
    public class Parcela
    {
        [FirestoreProperty]
        public int Parcela_Numero { get; set; }
        [FirestoreProperty]
        public string Data { get; set; }
        [FirestoreProperty]
        public double Valor { get; set; }

    }
}