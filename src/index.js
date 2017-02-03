'use strict';

// import {EventEmitter} from 'events';
const EventEmitter = require('events').EventEmitter;

class TasQue extends EventEmitter {

  /**
   * constructor => set default values
   * @type {Array}
   * @type {Number}
   */
  constructor (data = [], limit = -1) {
    super();

    if (data instanceof Array) {
      this.data = data;
    } else {
      this.data = [data];
    }

    if (typeof limit === 'number') {
      this.limit = limit;
    }

  }

  /**
   * Add value to our queue
   * @param  {any} data [description]
   * @return {any}      [description]
   */
  enqueue (data) {

    if (!this.isFull) {
      // emit event on enqueue
      this.emit('enqueue', data);
      let queueResult = this.data.push(data);

      if (this.isFull()) {
        this.emit('lastEnqueue', data);
      }

      return queueResult;

    } else {
      this.emit('fullQueue', data);
      return data;
    }
  }

  /**
   * Remove value from our queue
   * @return {any} [description]
   */
  dequeue () {
    if (!this.isEmpty()) {
      let queueResult = this.data.shift();

      // emit event on dequeue
      this.emit('dequeue', queueResult);

      // emit if was last
      if (this.isEmpty()) {
        this.emit('lastDequeue', queueResult);
      }

      return queueResult;
    } else {

      this.emit('queueless');
      return undefined;
    }
  }


  isEmpty () {
    return (this.data.length < 1)
           ? true
           : false;
  }


  isFull () {
    return (this.limit === this.data.length)
           ? true
           : false;
  }

  /**
   * Get peek value in our queue without removing it
   * @return {any} [description]
   */
  peek () {
    if (this.data.length > 0) {
      return this.data[0];
    }
    return undefined;
  }

}

// we export the class instance via a function call
module.exports = TasQue;
