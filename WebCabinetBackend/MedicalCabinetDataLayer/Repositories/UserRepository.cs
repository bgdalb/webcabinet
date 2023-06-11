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

        public List<User> GetAllUsers()
        {
            return GetUserRecords().ToList();
        }
    }

}
