"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const date = new Date();
  await queryInterface.bulkInsert("Users", [
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
    },
    {
      name: "Pratham Patel",
      email: "prathampatel@gmail.com",
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Users", null, {});
}
