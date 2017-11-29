/**
 * A module for player.
 *
 * @module
 */
"use strict";

class Gameboard {
    /**
     * @constructor
     *
     * @param {int} width - number of cards horizontaly.
     * @param {int} height - number of cards verticaly.
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.numOfCards = width*height;
        this.position = [];
        this.cardvalue = [];
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    addPosition(position) {
        this.position.push(position);
    }

    addCardValue(cardvalue) {
        this.cardvalue.push(cardvalue);
    }
}

// Export module
module.exports = Gameboard;
