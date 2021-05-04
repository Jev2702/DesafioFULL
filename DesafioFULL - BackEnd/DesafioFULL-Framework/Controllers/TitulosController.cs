using DesafioFULL.Models;
using DesafioFULL_Framework.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace DesafioFULL_Framework.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class TitulosController : ApiController
    {
        Notification notification;
        DbAccess db;
        public TitulosController()
        {
            db = new DbAccess();
        }

        //GET api/titulos
        public async Task<HttpResponseMessage> Get()
        {            
            try
            {
                var t = await db.Busca_Todos_Titulos();          
                //return Request.CreateResponse(HttpStatusCode.OK, t.);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(t)
                };
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
        //POST api/titulos
        public async Task<HttpResponseMessage> Post(Titulo titulo)
        {
            
            try
            {
                notification = new Notification("sucess", db.Add_Novo_Titulo(titulo));
                return Request.CreateResponse(HttpStatusCode.OK, notification);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

    }
}
