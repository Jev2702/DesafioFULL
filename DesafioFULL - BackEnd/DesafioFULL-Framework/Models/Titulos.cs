using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DesafioFULL.Models
{
    public class Titulos
    {
        private List<Titulo> titulos { get; set; }
        
        public Titulos()
        {
            titulos = new List<Titulo>();
        }
        public void AddTitulo(Titulo titulo)
        {            
            titulos.Add(titulo);
        }
        public List<Titulo> GetTitulos()
        {
            return titulos;
        }
    }
}