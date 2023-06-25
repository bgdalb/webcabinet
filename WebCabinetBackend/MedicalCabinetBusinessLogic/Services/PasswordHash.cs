using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic
{
    public class PasswordHashService
    {
        private const int SaltSize = 16;
        private const int HashSize = 64;
        private const int Iterations = 10000;

        public string HashPassword(string password)
        {
            // Generate a random salt
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[SaltSize]);

            // Hash the password with the salt
            byte[] hash = new Rfc2898DeriveBytes(password, salt, Iterations).GetBytes(HashSize);

            // Combine the salt and hash
            byte[] hashBytes = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

            // Convert the combined salt and hash to base64 string
            string hashedPassword = Convert.ToBase64String(hashBytes);

            return hashedPassword;
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            // Convert the hashed password from base64 string to byte array
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);

            // Get the salt from the hash bytes
            byte[] salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            // Compute the hash of the provided password using the salt
            byte[] computedHash = new Rfc2898DeriveBytes(password, salt, Iterations).GetBytes(HashSize);

            // Compare the computed hash with the stored hash
            for (int i = 0; i < HashSize; i++)
            {
                if (hashBytes[i + SaltSize] != computedHash[i])
                    return false;
            }

            return true;
        }
    }
}
