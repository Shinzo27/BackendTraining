import { createInterface } from "readline";
import dotenv from "dotenv";
import { insertData } from "./scripts/insertData.js";
import { deleteUser } from "./scripts/deleteData.js";
import { updateUser } from "./scripts/updateData.js";

dotenv.config();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Select Choice: 1. Insert User, 2. Update User, 3. Delete User: ",
  (answer) => {
    let choice = Number(answer);
    console.log(choice);
    if (choice < 1 || choice > 3) {
      console.log({
        message: "Enter choice properly!",
      });
      rl.close();
    }
    switch (choice) {
      case 1:
        onInsert();

      case 2:
        onUpdate();

      case 3:
        onDelete();
      default: {
        break;
      }
    }
  }
);

const onInsert = () => {
  rl.question("Enter name to insert: ", (answer) => {
    let name = answer;
    let email;
    let password;
    rl.question("Enter email to insert: ", (answer) => {
      let email = answer;
      rl.question("Enter password to insert: ", async (answer) => {
        let password = answer;

        const insert = await insertData(name, email, password);

        console.log(insert);
        return rl.close();
      });
    });
  });
};

const onUpdate = () => {
  rl.question("Enter Id to Update: ", (answer) => {
    let id = answer;
    let name;
    let email;
    let password;

    rl.question("Enter Name to Update: ", (answer) => {
      name = answer;
      rl.question("Enter Email to update: ", (answer) => {
        email = answer;
        rl.question("Enter Password to update: ", async (answer) => {
          password = answer;
          const updateData = await updateUser(id, name, email, password);

          console.log(updateData);
          return rl.close();
        });
      });
    });
  });
};

const onDelete = () => {
  rl.question("Enter Id to Delete: ", async (answer) => {
    const deleteData = await deleteUser(answer);

    console.log(deleteData);
    return rl.close();
  });
};
