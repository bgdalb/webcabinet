using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.IO;

namespace MedicalCabinetBusinessLogic
{

    public class Base64Decoder
    {
        public void DecodeBase64Image(string base64String, string outputPath)
        {
            try
            {
                byte[] imageBytes = Convert.FromBase64String(base64String);
                File.WriteAllBytes(outputPath, imageBytes);
                Console.WriteLine("Image decoded and saved successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error decoding and saving image: " + ex.Message);
            }
        }
    }

}
