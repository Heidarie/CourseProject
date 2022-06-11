using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesAPI.Migrations
{
    public partial class teachercar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeacherCars_Cars_Id",
                table: "TeacherCars");

            migrationBuilder.AddColumn<Guid>(
                name: "CarId",
                table: "TeacherCars",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TeacherCars_CarId",
                table: "TeacherCars",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherCars_Cars_CarId",
                table: "TeacherCars",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeacherCars_Cars_CarId",
                table: "TeacherCars");

            migrationBuilder.DropIndex(
                name: "IX_TeacherCars_CarId",
                table: "TeacherCars");

            migrationBuilder.DropColumn(
                name: "CarId",
                table: "TeacherCars");

            migrationBuilder.AddForeignKey(
                name: "FK_TeacherCars_Cars_Id",
                table: "TeacherCars",
                column: "Id",
                principalTable: "Cars",
                principalColumn: "Id");
        }
    }
}
