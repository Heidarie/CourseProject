using System.Text;

namespace CoursesAPI.Extensions
{
    public static class ReadExtensions
    {
        public static string ReadAsString(this IFormFile file)
        {
            StringBuilder result = new StringBuilder();
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                while (reader.Peek() >= 0)
                    result.AppendLine(reader.ReadLine());
            }
            return result.ToString();
        }
    }
}
