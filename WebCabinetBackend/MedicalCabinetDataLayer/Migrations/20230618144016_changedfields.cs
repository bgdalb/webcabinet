using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedicalCabinetDataLayer.Migrations
{
    /// <inheritdoc />
    public partial class changedfields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PicturePath",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Patients",
                newName: "PicturePath");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Doctors",
                newName: "PicturePath");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Doctors");

            migrationBuilder.RenameColumn(
                name: "PicturePath",
                table: "Patients",
                newName: "Surname");

            migrationBuilder.RenameColumn(
                name: "PicturePath",
                table: "Doctors",
                newName: "Surname");

            migrationBuilder.AddColumn<string>(
                name: "PicturePath",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
