using System.Text;

namespace CoursesAPI.Extensions
{
    public static class ReadExtensions
    {
        public static string ReadAsString(this IFormFile file)
        {
            string s = "";
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                s = Convert.ToBase64String(fileBytes);
                // act on the Base64 data
            }

            return s;
        }


    }
}
