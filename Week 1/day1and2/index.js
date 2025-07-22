console.log('1. Start');

// Next tick queue
process.nextTick(() => console.log('2. Next tick'));

// Microtask queue (Promise)
Promise.resolve().then(() => console.log('3. Promise'));

// Timer phase
setTimeout(() => console.log('4. Timeout'), 0);

// Check phase
setImmediate(() => console.log('5. Immediate'));

console.log('6. End');

import fs from 'fs'

console.log('1. Reading sync file.');
const data = fs.readFileSync('hello.txt', 'utf-8')
console.log('2. File contains this Data" ' + data);
console.log("3. Done reading file");

console.log('1. Reading async file.');
const data1 = fs.readFile('hello.txt', 'utf-8', (err, data) => {
    if(err) throw err;
    console.log('2. File contents: '  + data1);
})
console.log("3. Done reading file");

async function readFiles() {
  try {
    console.log('1. Starting to read files...');
    const data = await fs.readFile('hello.txt', 'utf-8', (err, data) => {
        if(err) throw err;
        console.log('2. File contents: '  + data);
    })
    return { data };
  } catch (error) {
    console.error('Error reading files:', error);
  }
}

console.log(readFiles());
const promise1 = Promise.resolve("First result");
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Second result"), 1000)
);
const promise3 = fs.readFile("hello.txt", "utf8", (err, data) => {
    if (err) throw error;
    console.log(data);
}); // Read local file instead of fetch

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log("Results:", results);
    // results[0] is from promise1
    // results[1] is from promise2
    // results[2] is the content of myfile.txt
  })
  .catch((error) => {
    console.error("Error in one of the promises:", error);
  });

function fetchData() {
  return new Promise((resolve, reject) => {
    // Simulating an error
    reject(new Error("Network error"));
  });
}

fetchData().then(
  (data) => console.log("Data:", data),
  (error) => console.log("Error handled in then:", error.message)
);

fetchData()
  .then((data) => console.log("Data:", data))
  .catch((error) => console.log("Error handled in catch:", error.message));

async function getData() {
  console.log('Starting...');
  const result = await someAsyncOperation();
  console.log(`Result: ${result}`);
  return result;
}

function someAsyncOperation() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Operation completed'), 1000);
  });
}

// Call the async function
getData().then(data => console.log('Final data:', data));

import { createServer } from 'http';

const server = createServer((req, res) => {
    const { method } = req
    console.log(method);
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end("Hello world!")
})

const PORT = 8000
server.listen(PORT, () => {
    console.log("Server running on http://localhost:8000");
})

import { sub, sum } from './module.js'
import { error } from 'console';

const sumPrint = sum(10, 12)
console.log(sumPrint);

const subPrint = sub(15, 12)
console.log(subPrint);


async function appendToFile() {
  try {
    // Append a timestamped log entry
    const logEntry = `${new Date().toISOString()}: Application started\n`;
    await fs.appendFile('logs.log', logEntry, 'utf8', (err, data) => {
        if(err) throw err;
        console.log("Entry added!");
    });
  } catch (err) {
    console.error('Error appending to file:', err);
  }
}

appendToFile();