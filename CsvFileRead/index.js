import fs from "fs";
import csv from "csv-parser";

function calculateData(data) {
  console.log(data);
  //Total users
  const totalUser = data.length;

  // Average Age
  const age = data.reduce((sum, user) => sum + Number(user.Age), 0);
  const averageAge = age / data.length;

  // Unique Cities
  const cities = [];
  data.map((user) => {
    const ifExists = cities.find((city) => city === user.City);
    if (!ifExists) {
      cities.push(user.City);
    }
  });

  return {
    totalUser: totalUser,
    averageAge: Number(averageAge.toFixed(2)),
    UniqueCities: cities,
  };
}

function readData() {
  try {
    const path = process.argv[2];
    if (!path) throw new Error("Path not provided!");

    const results = [];

    if (fs.existsSync(path)) {
      fs.createReadStream(path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          const data = calculateData(results);
          console.log(data);
        });
    } else {
      throw new Error("File not found!");
    }
  } catch (error) {
    console.log(error.message);
  }
}

readData();
