import { kafka } from "./index.js";

async function start() {
  const consumer = kafka.consumer({ groupId: "user-1" });

  await consumer.connect().then(() => console.log("Consumer connected!"));

  await consumer.subscribe({ topic: "rider-update", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      console.log({
        topic: topic,
        partition: partition,
        value: message.value.toString(),
      });
      await heartbeat();
    },
  });
}

start();

//   CLUSTER_ID: "RF0xxlupRJOYnCSSfdk_mg"
