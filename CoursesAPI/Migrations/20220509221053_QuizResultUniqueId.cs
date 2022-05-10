using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesAPI.Migrations
{
    public partial class QuizResultUniqueId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentQuizResults",
                table: "StudentQuizResults",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentQuizResults",
                table: "StudentQuizResults");
        }
    }
}
