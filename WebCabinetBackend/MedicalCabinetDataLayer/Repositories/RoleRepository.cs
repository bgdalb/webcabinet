using MedicalCabinetDataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MedicalCabinetDataLayer.Repositories
{
    public class RoleRepository
    {
        private readonly MedicalCabinetContext dbContext;

        public RoleRepository(MedicalCabinetContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Role GetRoleById(long id)
        {
            var result = dbContext.Roles
                .Where(r => r.RoleId == id)
                .FirstOrDefault();

            return result;
        }

        public void InsertRole(Role role)
        {
            dbContext.Roles.Add(role);
        }

        public void UpdateRole(Role role)
        {
            dbContext.Roles.Update(role);
        }

        public void DeleteRole(Role role)
        {
            dbContext.Roles.Remove(role);
        }

        protected IQueryable<Role> GetRoleRecords()
        {
            return dbContext.Roles.AsQueryable<Role>();
        }

        public bool AnyRoles(Func<Role, bool> expression)
        {
            return GetRoleRecords().Any(expression);
        }

        public List<Role> GetAllRoles()
        {
            return GetRoleRecords().ToList();
        }
    }
}
