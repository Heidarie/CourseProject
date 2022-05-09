using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesAPI.Migrations
{
    public partial class ImageNullInQuizGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "QuizGroups",
                type: "image",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "image");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "QuizGroups",
                type: "image",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "image",
                oldNullable: true);
        }
    }
}
