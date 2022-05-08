using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesAPI.Migrations
{
    public partial class QuizzesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MyProperty",
                table: "FlashcardsGroups",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "GroupName",
                table: "FlashcardsGroups",
                type: "nvarchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)");

            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "FlashcardsGroups",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "QuizGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupName = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    Author = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Image = table.Column<byte[]>(type: "image", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Quizzes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CorrectAnswersNumber = table.Column<int>(type: "int", nullable: false),
                    CorrectAnswers = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answers = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quizzes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuizGroups");

            migrationBuilder.DropTable(
                name: "Quizzes");

            migrationBuilder.DropColumn(
                name: "Author",
                table: "FlashcardsGroups");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "FlashcardsGroups",
                newName: "MyProperty");

            migrationBuilder.AlterColumn<string>(
                name: "GroupName",
                table: "FlashcardsGroups",
                type: "nvarchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)");
        }
    }
}
