import {EventEmitter as event} from 'events';

// Tasq class constructor
const Tasq = function (data, limit) {
  data = data || [];
  limit = limit || -1;
  this.length = data.length;

  // for optional initial data in the queue
  if (data instanceof Array) {
    this.data = data;
  } else {
    throw new TypeError('Initial data for Tasq instance is not an array');
  }

  // for limit of the length of queue
  if (typeof limit === 'number') {
    if (limit !== 0) {
      this.limit = limit;
    } else {
      throw new TypeError('Limit cannot be less than or equal to 0');
    }
  } else {
    throw new TypeError('Tasq limit value is not a number, setting limit to -1');
  }
}

// events emitter as a prototype
Tasq.prototype = new event();

// enqueue method => add to Tasq
Tasq.prototype.enqueue = function (data) {

  let result = '';

  // check if the limit has been reached
  if (!this.isFull()) {
    // increment length
    this.length += 1;

    // push to queue
    result = this.data.push(data);

    // emit event on enqueue
    this.emit('enqueue', data);

    // emit limit reached
    if (this.isFull()) {
      this.emit('lastEnqueue', data);
    }

    return result;
  } else {
    this.emit('fullQueue', data);

    return data;
  }
}

// dequeue method => remove from Tasq
Tasq.prototype.dequeue = function () {

  let result;

  // check if the limit has been reached
  if (!this.isEmpty()) {
    // increment length
    this.length -= 1;

    // remove from Tasq
    result = this.data.shift();

    // emit event on dequeue
    this.emit('dequeue', result);

    // emit if was last
    if (this.isEmpty()) {
      this.emit('lastDequeue', result);
    }
  } else {
    this.emit('queueless');
    result = undefined;
  }

  return result;
}

// get peek value in a Tasq
Tasq.prototype.peek = function () {
  let result;
  if (this.length >= 1) {
    result = this.data[0];
  } else {
    this.emit('queueless');
  }

  return result;
}

// check if Tasq is empty
Tasq.prototype.isEmpty = function () {
  let result = false;

  if (this.length < 1) {
    result = true;
  }

  return result;
}

// check if the Tasq has reached its limit
Tasq.prototype.isFull = function () {
  let result = false;

  if (this.limit === this.length ) {
    result = true;
  }

  return result;
}

module.exports = Tasq;
