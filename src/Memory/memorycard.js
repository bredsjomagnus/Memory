/**
 * A module for a standard playing card.
 *
 * @module
 */
"use strict";

class Memorycard {
    /**
     * @constructor
     */
    constructor() {
        this.cardvalue              = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
        this.defaultcardpositions   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.cardpositions          = this.defaultcardpositions;
        this.numOfCards             = this.cardvalue.length;
    }

    /**
     * Get value of memorycard based on the id.
     *
     * @param {integer} id - The id of the memorycard.
     *
     * @returns {integer} value of memorycard.
     */
    getCardValue(id) {
        if (id < 0 || id >= this.numOfCards) {
            return undefined;
        }
        return this.cardvalue[id];
    }

    /**
     * Get id of memorycard based on value.
     *
     * @param {integer} id - The id of the card.
     *
     * @returns {array} possible id:s of card with value in format [id, id]
     */
    getCardId(value) {
        if (value < 1 || value >= this.cardvalue[this.numOfCards - 1]) {
            return [-1, -1];
        }

        var result = [];
        var pos = this.cardvalue.indexOf(value);

        // walking cardvalue and adding posiiton to result[] where correct value
        while (result.indexOf(pos) === -1) {
            result.push(pos);
            pos = this.cardvalue.indexOf(value, pos + 1);
        }

        // result contains positions and -1. Splice to take away -1.
        result.splice(2, 1);

        return result;
    }

    /**
     * Is two memorycards a pair.
     *
     * @param {integer} id - The id of the card.
     *
     * @returns {booelan} true if pair, false if not.
     */
    isPair(cardone, cardtwo) {
        if (cardone < 0 || cardone >= this.numOfCards) {
            return undefined;
        }
        if (cardtwo < 0 || cardtwo >= this.numOfCards) {
            return undefined;
        }

        return this.cardvalue[cardone] == this.cardvalue[cardtwo];
    }

    /**
    * Place memorycards = set this.cardpositions.
    */
    placeCards(random = true) {
        if (random) {
            this.shuffle();
        }
    }

    shuffle() {
        var n = this.numOfCards,
            temp,
            i;

        // While there remain elements to shuffle…
        while (n) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * n--);

            // And swap it with the current element.
            temp = this.cardpositions[n];
            this.cardpositions[n] = this.cardpositions[i];
            this.cardpositions[i] = temp;
        }
    }
}

// Export module
module.exports = Memorycard;
