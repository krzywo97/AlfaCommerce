using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AlfaCommerce
{
    public class Program
    {
        private static String CertificateFilename { get; set; }
        private static String CertificatePassword { get; set; }

        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((context, _) =>
                {
                    CertificateFilename = context.Configuration["HttpsCertificate:Filename"];
                    CertificatePassword = context.Configuration["HttpsCertificate:Password"];
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureKestrel(o =>
                    {
                        if (!string.IsNullOrEmpty(CertificateFilename))
                        {
                            o.ListenAnyIP(5001,
                                options => { options.UseHttps(CertificateFilename, CertificatePassword); });
                            o.ListenAnyIP(5000);
                        }
                    });

                    webBuilder.UseStartup<Startup>();
                });
    }
}