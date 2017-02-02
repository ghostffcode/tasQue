// import {EventEmitter as event} from 'events';

class Tasq {

  /**
   * [data description]
   * @type {Array}
   * @type {Array}
   */
  constructor(data = [], limit = -1) {
    this.data = data;
    this.limit = limit;
  }

  /**
   * Add value to our queue
   * @param  {any} data [description]
   * @return {any}      [description]
   */
  enqueue (data) {
    return this.data.push(data);
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

module.exports = Tasq;

// Tasq.prototype = new event();

// export default Tasq;
