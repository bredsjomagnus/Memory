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
}

// Export module
module.exports = Gameboard;
