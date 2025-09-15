
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using figAPI.Data;
using Microsoft.EntityFrameworkCore.Diagnostics;
using AutoMapper;
using System.Text.Json.Serialization;
using System.Text.Json;


namespace figAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //add connection to sqlite from config
            services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection"))
                    .ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning)));

            //add CORS services
            services.AddCors();

            // In ConfigureServices method, replace this:
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.WriteIndented = true; // For pretty formatting
                // Add other System.Text.Json options as needed
            });

            services.AddControllers()
              .AddJsonOptions(options =>
              {
                  options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
              });

            //add seeder to services to enable populate db with data
            services.AddTransient<Seeder>();

            //add scope
            services.AddScoped<IContactRepository, ContactRepository>();

            //add automapper service
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /*  public void Configure(IApplicationBuilder app, IHostingEnvironment env, Seeder seeder)
         {
             if (env.IsDevelopment())
             {
                 app.UseDeveloperExceptionPage();
             }
             else
             {
                 // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                 //app.UseHsts();
             }

             // seed call
             seeder.SeedContacts();
             //
             app.UseCors(x => x.WithOrigins("http://localhost:8000")
                 .AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
             //app.UseHttpsRedirection();
             //use default files index.html, index.js, etc
             app.UseDefaultFiles();
             //allow kestrel to host app in wwwroot folder
             app.UseStaticFiles();
             app.UseMvc();
         } */

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Seeder seeder)
        {
            
            // CREATE DATABASE FIRST - before any seeding
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<DataContext>();

                // This creates the database and tables if they don't exist
                context.Database.EnsureCreated();

                // OR use migrations if you have them:
                // context.Database.Migrate();
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }



            // Seed call
            seeder.SeedContacts();

            // CORS - fix the configuration (can't use both WithOrigins and AllowAnyOrigin)
            //app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            // Or if you want to restrict to specific origins:
            app.UseCors(x => x.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("Pagination")); // Add this line

            // Uncomment if you want HTTPS redirection
             app.UseHttpsRedirection();

            // Use default files index.html, index.js, etc
            app.UseDefaultFiles();

            // Allow kestrel to host app in wwwroot folder
            app.UseStaticFiles();
            

            // Modern routing (replaces UseMvc)
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
             {
                 endpoints.MapControllers();
                 // If you have default route for MVC:
                 //endpoints.MapControllerRoute(
                 //    name: "default",
                   //  pattern: "{controller=contacts}/{action=Index}/{id?}");
             }); 
        }
    }
}
