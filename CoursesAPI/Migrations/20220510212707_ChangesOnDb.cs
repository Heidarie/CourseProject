using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesAPI.Migrations
{
    public partial class ChangesOnDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ResultPercentage",
                table: "StudentQuizResults",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<Guid>(
                name: "OwnerId",
                table: "QuizGroups",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "OwnerId",
                table: "FlashcardsGroups",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "QuizGroups");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "FlashcardsGroups");

            migrationBuilder.AlterColumn<double>(
                name: "ResultPercentage",
                table: "StudentQuizResults",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
