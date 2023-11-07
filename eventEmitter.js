class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = new Set();
    }
    this.events[eventName].add(listener);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => {
        listener(...args);
      });
    }
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName].delete(listener);
    }
  }

  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }

  async emitAsync(eventName, ...args) {
    if (this.events[eventName]) {
      for (const listener of this.events[eventName]) {
        await listener(...args);
      }
    }
  }
}
