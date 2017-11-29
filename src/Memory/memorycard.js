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
        this.cards = new Map([
            ["00", 1], ["10", 1], ["20", 2], ["30", 2],
            ["01", 3], ["11", 3], ["21", 4], ["31", 4],
            ["02", 5], ["12", 5], ["22", 6], ["32", 6]
        ]);
        this.cardvalues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
        this.positions = [
            "00", "10", "20", "30",
            "01", "11", "21", "31",
            "02", "12", "22", "32"
        ];
        // this.cardvalue              = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
        // this.defaultcardpositions   = [
        //     "00", "10", "20", "30",
        //     "01", "11", "21", "31",
        //     "02", "12", "22", "32"
        // ];
        // this.cardpositions  = this.defaultcardpositions;
        this.numOfCards     = 12;
    }

    /**
     * Get value of memorycard based on its position.
     *
     * @param {string} position - The positin of the memorycard.
     *
     * @returns {integer} value of memorycard.
     */
    getCardValue(position) {
        var value = this.cards.get(position);

        // console.log("Inne i getCardValue");
        // console.log(position);
        return value;
    }

    /**
     * Get id of memorycard based on value.
     *
     * @param {integer} id - The id of the card.
     *
     * @returns {array} possible id:s of card with value in format [id, id]
     */
    // getCardId(value) {
    //     if (value < 1 || value >= this.cardvalue[this.numOfCards - 1]) {
    //         return [-1, -1];
    //     }
    //
    //     var result = [];
    //     var pos = this.cardvalue.indexOf(value);
    //
    //     // walking cardvalue and adding posiiton to result[] where correct value
    //     while (result.indexOf(pos) === -1) {
    //         result.push(pos);
    //         pos = this.cardvalue.indexOf(value, pos + 1);
    //     }
    //
    //     // result contains positions and -1. Splice to take away -1.
    //     result.splice(2, 1);
    //
    //     return result;
    // }

    /**
     * Is two memorycards a pair.
     *
     * @param {integer} id - The id of the card.
     *
     * @returns {booelan} true if pair, false if not.
     */
    isPair(posone, postwo) {
        // if (cardone < 0 || cardone >= this.numOfCards) {
        //     return undefined;
        // }
        // if (cardtwo < 0 || cardtwo >= this.numOfCards) {
        //     return undefined;
        // }

        return this.cards.get(posone) == this.cards.get(postwo);
    }

    /**
    * Place memorycards = set this.cardpositions.
    */
    placeCards(random = true) {
        if (random) {
            this.shuffle();
        }

        for (let i = 0; i < this.positions.length; i++) {
            this.cards.set(this.positions[i], this.cardvalues[i]);
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
            temp = this.cardvalues[n];
            this.cardvalues[n] = this.cardvalues[i];
            this.cardvalues[i] = temp;
        }
    }
}

// Export module
module.exports = Memorycard;
