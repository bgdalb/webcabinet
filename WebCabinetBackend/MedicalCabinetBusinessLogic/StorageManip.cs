using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCabinetBusinessLogic
{
    public class StorageManip
    {

        public void createDirectoryIfInexistent(string DirectoryPath, long userID)
        {
            //Create directory if unexistent
            string directoryPathToBeCreated = DirectoryPath + userID;
            if (!Directory.Exists(directoryPathToBeCreated))
            {
                Directory.CreateDirectory(directoryPathToBeCreated);

            }
           
        }
    }
}
