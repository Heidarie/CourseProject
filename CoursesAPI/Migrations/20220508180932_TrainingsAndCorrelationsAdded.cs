using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoursesAPI.Migrations
{
    public partial class TrainingsAndCorrelationsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventDateTime",
                table: "Trainings");

            migrationBuilder.DropColumn(
                name: "Group",
                table: "Flashcards");

            migrationBuilder.RenameColumn(
                name: "GroupID",
                table: "Quizzes",
                newName: "QuizGroupId");

            migrationBuilder.AddColumn<Guid>(
                name: "FlashcardsGroupId",
                table: "Flashcards",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "TrainingsDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EventDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ParticipantsRegistered = table.Column<int>(type: "int", nullable: false),
                    ParticipantsLimit = table.Column<int>(type: "int", nullable: false),
                    TrainingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingsDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingsDetails_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_QuizGroupId",
                table: "Quizzes",
                column: "QuizGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Flashcards_FlashcardsGroupId",
                table: "Flashcards",
                column: "FlashcardsGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingsDetails_TrainingId",
                table: "TrainingsDetails",
                column: "TrainingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flashcards_FlashcardsGroups_FlashcardsGroupId",
                table: "Flashcards",
                column: "FlashcardsGroupId",
                principalTable: "FlashcardsGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quizzes_QuizGroups_QuizGroupId",
                table: "Quizzes",
                column: "QuizGroupId",
                principalTable: "QuizGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flashcards_FlashcardsGroups_FlashcardsGroupId",
                table: "Flashcards");

            migrationBuilder.DropForeignKey(
                name: "FK_Quizzes_QuizGroups_QuizGroupId",
                table: "Quizzes");

            migrationBuilder.DropTable(
                name: "TrainingsDetails");

            migrationBuilder.DropIndex(
                name: "IX_Quizzes_QuizGroupId",
                table: "Quizzes");

            migrationBuilder.DropIndex(
                name: "IX_Flashcards_FlashcardsGroupId",
                table: "Flashcards");

            migrationBuilder.DropColumn(
                name: "FlashcardsGroupId",
                table: "Flashcards");

            migrationBuilder.RenameColumn(
                name: "QuizGroupId",
                table: "Quizzes",
                newName: "GroupID");

            migrationBuilder.AddColumn<DateTime>(
                name: "EventDateTime",
                table: "Trainings",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "Flashcards",
                type: "nvarchar(255)",
                nullable: false,
                defaultValue: "");
        }
    }
}
