using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesAPI.Migrations
{
    public partial class QuizResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StudentQuizResults",
                columns: table => new
                {
                    StudentId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuizId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GatheredPoints = table.Column<int>(type: "int", nullable: false),
                    MaxPoints = table.Column<int>(type: "int", nullable: false),
                    ResultPercentage = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentQuizResults");
        }
    }
}
