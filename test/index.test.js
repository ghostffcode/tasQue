// const Que = require('../src/index');
const Tasq = require('../dist/tasq.js');

let q = new Tasq(['Chrys']);

// Event Listeners
q.on('enqueue', (data) => {
  console.log(`Enqueue:: Added ${data}`);
});
//
// q.on('lastEnqueue', () => {
//   console.log('Last Enqueue:: Queue limit reached');
// });
//
// q.on('dequeue', (data) => {
//   console.log(`Dequeue:: removed ${data}`);
// });
//
// q.on('lastDequeue', (data) => {
//   console.log(`Last Dequeue:: Last data is ${data}`);
// });
//
// q.on('queueless', () => {
//   console.log(`Queue is empty`)
// })
//
// Enqueue
q.enqueue('Bliss');
q.enqueue('Lavie');

q.peek();

// Dequeue
q.dequeue();
q.dequeue();
q.dequeue();
// q.dequeue();

// console.log(q.isEmpty());
