const { json } = require("express");
const ws = require ("ws");

class RingBuffer {
    maxSize;
    currentValues = Array(this.maxSize).fill(0)
    bufferIndex = 0;
    totalValues = 0;

    constructor(maxSize) {
        this.maxSize = maxSize;
    }

    // returns the total of all the numbers in the ring buffer
    getTotal() {
        var currentTotal = 0;
        var start;
        if (this.totalValues < this.maxSize) {
            start = 0;
        } else {
            start = this.bufferIndex;
        }

        for (let index = 0; index < this.totalValues; index++) {
            currentTotal += this.currentValues[(index + start) % this.maxSize];
        }
        return currentTotal
    }

    // Push will place a value into the ring buffer, if the ring buffer is full then the oldest value is replaced
    push(value) {
        this.currentValues[this.bufferIndex] = value;
        this.bufferIndex = (this.bufferIndex + 1) % this.maxSize;
        this.totalValues = Math.min(this.maxSize, this.totalValues + 1);
    }

    // Number of values in the ring buffer
    length() {
        return this.totalValues;
    }
}

class Aq1Stats {
    buffer = new RingBuffer(10);
    currentAverage = {average: 0, movement: 0};
    previousAverage = 0;
    valueCallbacks = [];
    averageCallbacks = [];

    constructor() {
        this.generateValue = this.generateValue.bind(this);
        this.getRandomInt = this.getRandomInt.bind(this);
        this.generateMovingAverage = this.generateMovingAverage.bind(this);
        this.getMovingAverage = this.getMovingAverage.bind(this);
        this.setNewAverageCallback = this.setNewAverageCallback.bind(this);
        this.setNewValueCallback = this.setNewValueCallback.bind(this);
        this.removeCallback = this.removeCallback.bind(this);

        setInterval(this.generateValue, 2000);
        setInterval(this.generateMovingAverage, 4250);
    }

    generateValue() {
        var nextValue = this.getRandomInt(1, 5);
        this.buffer.push(nextValue);
        this.valueCallbacks.forEach(callback => callback(nextValue));
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateMovingAverage() {
        let newAverage = this.buffer.getTotal() / this.buffer.length();
        let movement = this.previousAverage - newAverage;
        this.previousAverage = newAverage;
        this.currentAverage.average = newAverage;
        this.currentAverage.movement = movement;
        this.averageCallbacks.forEach(callback => callback(this.currentAverage));
    }

    getMovingAverage() {
        return this.currentAverage;
    }

    setNewValueCallback(callback) {
        this.valueCallbacks.push(callback);
    }

    setNewAverageCallback(callback) {
        this.averageCallbacks.push(callback);
    }

    removeCallback(callback) {
        if ((index = this.valueCallbacks.indexOf(callback)) >= 0) {
            this.valueCallbacks.splice(index, 1);
        }
        if ((index = this.averageCallbacks.indexOf(callback)) >= 0) {
            this.averageCallbacks.splice(index, 1);
        }
    }
}

class Aq1DataFeed {
    valueTimer = null;
    averageTimer = null;
    socketServer;
    connections = [];
    stats = new Aq1Stats();
    constructor(wsport) {
        this.sendAverage = this.sendAverage.bind(this);
        this.sendValue = this.sendValue.bind(this);
        this.getRecentAverage = this.getRecentAverage.bind(this);
        this.socketServer = new ws.Server({ port: wsport });
        const datafeed = this;
        this.stats.setNewAverageCallback(this.sendAverage);
        this.stats.setNewValueCallback(this.sendValue);
        this.socketServer.on('connection', function connection(connectedSocket) {
            // Save the connection
            datafeed.connections.push(connectedSocket);
        });
    }

    getRecentAverage() {
        return this.stats.getMovingAverage();
    }

    sendValue(value) {
        var message = JSON.stringify({type: "value", payload: {value: value}});
        this.connections.forEach(connection => connection.send(message));
    }

    sendAverage(averageData) {
        var message = JSON.stringify({type: "avg", payload: {average: averageData.average, movement: averageData.movement}});
        this.connections.forEach(connection => connection.send(message));
    }
}

module.exports = Aq1DataFeed;