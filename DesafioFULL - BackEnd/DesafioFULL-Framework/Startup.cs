
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

[assembly: OwinStartup(typeof(DesafioFULL_Framework.Startup))]

namespace DesafioFULL_Framework
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // configuracao WebApi
            var config = new HttpConfiguration();

            // configurando rotas
            config.EnableCors();
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApiWithAction",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional });

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            config.Routes.MapHttpRoute(
                name: "Error404",
                routeTemplate: "{*url}",
                defaults: new { controller = "Error", action = "Error404" }
            );
            // ativando cors
            app.UseCors(CorsOptions.AllowAll);
            // ativando configuração WebApi

        }
    }
}