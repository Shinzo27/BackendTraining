import { kafka } from "./index.js";

async function init() {
  const producer = kafka.producer();

  await producer.connect().then(() => console.log("Producer Connected!"));

  await producer.send({
    topic: "rider-update",
    messages: [
      {
        partition: 0,
        key: "location-update",
        value: JSON.stringify({ name: "Tony stark", location: "SOUTH" }),
      },
    ],
  });

  console.log("Message Sent!");

  await producer.disconnect();
}

init();
