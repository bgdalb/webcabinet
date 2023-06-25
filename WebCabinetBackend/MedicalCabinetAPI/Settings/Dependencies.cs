using Microsoft.EntityFrameworkCore;
using MedicalCabinetDataLayer;
using MedicalCabinetBusinessLogic.Services;
using MedicalCabinetDataLayer.Repositories;
using MedicalCabinetBusinessLogic;

namespace MedicalCabinetAPI.Settings
{
    public static class Dependencies
    {

        public static void Inject(WebApplicationBuilder applicationBuilder)
        {
            var connectionString = applicationBuilder.Configuration.GetConnectionString("DefaultConnection");

            applicationBuilder.Services.AddControllers();
            applicationBuilder.Services.AddSwaggerGen();

            applicationBuilder.Services.AddDbContext<MedicalCabinetContext>(options =>
            options.UseSqlServer(connectionString));

            AddRepositories(applicationBuilder.Services);
            AddServices(applicationBuilder.Services);



        }

        private static void AddServices(IServiceCollection services)
        {
            services.AddScoped<UserService>();
            services.AddScoped<AppointmentService>();
            services.AddScoped<DoctorService>();
            services.AddScoped<MedicalHistoryService>();
            services.AddScoped<RoleService>();
            services.AddScoped<PatientService>();
            services.AddScoped<ServiceService>();
            services.AddScoped<PasswordHashService>();
            services.AddScoped<Base64Decoder>();
            services.AddScoped<StorageManip>();
            
        }

        private static void AddRepositories(IServiceCollection services)
        {
            services.AddScoped<AppointmentRepository>();
            services.AddScoped<DoctorRepository>();
            services.AddScoped<MedicalHistoryRepository>();
            services.AddScoped<PatientRepository>();
            services.AddScoped<RoleRepository>();
            services.AddScoped<ServiceRepository>();
            services.AddScoped<UserRepository>();
            services.AddScoped<UnitOfWork>();
        }

    }
}