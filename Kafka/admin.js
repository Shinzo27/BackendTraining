import { kafka } from "./index.js";

async function init() {
const admin = kafka.admin();
  await admin.connect().then(() => console.log("Admin connected!"));

  console.log("Creating topic [rider-update]");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-update",
        numPartitions: 2,
      },
    ],
  });
  console.log("Created topic [rider-update]");

  console.log("Admin disconnedted!");
  await admin.disconnect();
}

init();
