using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesAPI.Migrations
{
    public partial class teachercars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RentalType",
                table: "Loans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TeacherCars",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeacherCars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TeacherCars_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TeacherCars_Cars_Id",
                        column: x => x.Id,
                        principalTable: "Cars",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TeacherCars_UserId",
                table: "TeacherCars",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeacherCars");

            migrationBuilder.DropColumn(
                name: "RentalType",
                table: "Loans");
        }
    }
}
