using MedicalCabinetAPI.Settings;
using MedicalCabinetBusinessLogic.Converters;
using MedicalCabinetDataLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new TimeSpanConverter());
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
}); ;

//builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors();

Dependencies.Inject(builder);



builder.Services.AddDbContext<MedicalCabinetContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        x => x.MigrationsAssembly("MedicalCabinetDataLayer")
    )
);




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(
      x => x.AllowAnyMethod()
      .AllowAnyHeader()
      .WithOrigins("http://localhost:4200", "http://localhost:4200")
      .AllowCredentials()
    );


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
