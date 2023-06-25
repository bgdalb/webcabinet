using MedicalCabinetDataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace MedicalCabinetDataLayer.Repositories
{
    public class UserRepository
    {
        private readonly MedicalCabinetContext dbContext;

        public UserRepository(MedicalCabinetContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public User GetUserById(long id)
        {
            var result = dbContext.Users
                .Where(u => u.UserId == id)
                .FirstOrDefault();

            return result;
        }

        public void InsertUser(User user)
        {
            dbContext.Users.Add(user);
        }

        public void UpdateUser(User user)
        {
            dbContext.Users.Update(user);
        }

        public void DeleteUser(User user)
        {
            dbContext.Users.Remove(user);
        }

        protected IQueryable<User> GetUserRecords()
        {
            return dbContext.Users.AsQueryable<User>();
        }

        public bool AnyUsers(Func<User, bool> expression)
        {
            return GetUserRecords().Any(expression);
        }

        public User GetUserByCredentials(string email, string password)
        {
            var result = dbContext.Users
                .Where(u => u.Email == email)
                .FirstOrDefault();

            return result;
        }

        public List<User> GetAllUsers()
        {
            return GetUserRecords().ToList();
        }

        public bool CheckExistingEmail(string email)
        {
            var result = dbContext.Users
                .Any(u => u.Email == email);

            return result;

            
        }

        public User CheckValidCredentials(string email, string password)
        {
            // Retrieve the user from the database based on the email
            var user = dbContext.Users.FirstOrDefault(u => u.Email == email);

            // If the user is found and the hashed password matches
            if (user != null)
            {
                return user; // Valid credentials
            }

            return null; // Invalid credentials
        }

  

        public User GetUserByEmail(string email)
        {
            var result = dbContext.Users
                .Where(u => u.Email == email)
                .FirstOrDefault();

            return result;
        }
    }

}
