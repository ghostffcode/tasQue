'use strict';

// import {EventEmitter} from 'events';
const EventEmitter = require('events').EventEmitter;

class Tasq extends EventEmitter {

  /**
   * constructo => set default values
   * @type {Array}
   * @type {Number}
   */
  constructor (data = [], limit = -1) {
    super();
    this.data = data;
    this.limit = limit;
  }

  /**
   * Add value to our queue
   * @param  {any} data [description]
   * @return {any}      [description]
   */
  enqueue (data) {
    // emit event on enqueue
    this.emit('enqueue', data);
    return this.data.push(data);
    // return this.data.push(data);
  }

  /**
   * Remove value from our queue
   * @return {any} [description]
   */
  dequeue () {
    return this.data.shift();
  }


  isEmpty () {
    return (this.data.length < 1)
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
module.exports = Tasq;
