using DesafioFULL_Framework.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace DesafioFULL_Framework.Controllers
{
    [System.Web.Http.RoutePrefix("api/teste")]
    public class TesteController : ApiController
    {
        // GET: Teste
        [System.Web.Http.HttpGet]
        public HttpResponseMessage Get()
        {
            DbAccess bd = new DbAccess();
            return
                Request.CreateResponse(HttpStatusCode.OK, new
                {
                    success = true,
                    result = "Successfully connected",

                });
        }
    }
}