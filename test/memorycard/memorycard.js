/**
* Test for class memorycard.
 */
"use strict";

/* global describe it */

var assert = require("assert");
const Memorycard = require("../../src/Memory/memorycard");


/**
 * Check a card with its expected card face.
 */
function checkMemorycardvalue(id, expected) {
    let memorycard = new Memorycard();
    let res = memorycard.getCardValue(id);

    assert.equal(res, expected);
}

/**
* Check if two cards is a pair
*/
function isPair(cardone, cardtwo, expected) {
    let memorycard = new Memorycard();
    let res = memorycard.isPair(cardone, cardtwo);

    assert.equal(res, expected);
}

function checkCardId(value, expected) {
    let memorycard = new Memorycard();
    let res = memorycard.getCardId(value);

    assert.equal(res[0], expected[0]);
    assert.equal(res[1], expected[1]);
}

/**
 * Testsuite
 */
describe("Check memorycard", function() {
    var values = [
        {id: -1, value: undefined},
        {id: 0, value: 1},
        {id: 1, value: 1},
        {id: 2, value: 2},
        {id: 3, value: 2},
        {id: 4, value: 3},
        {id: 5, value: 3},
        {id: 6, value: 4}
    ];
    var pairs = [
        {cardone: 0, cardtwo: 1, expected: true},
        {cardone: 1, cardtwo: 2, expected: false},
        {cardone: -1, cardtwo: 2, expected: undefined},
        {cardone: 1, cardtwo: -1, expected: undefined},
    ];
    var cardids = [
        {value: 0, expected: [-1, -1]},
        {value: 300, expected: [-1, -1]},
        {value: 1, expected: [0, 1]},
        {value: 2, expected: [2, 3]},
        {value: 3, expected: [4, 5]}
    ];

    values.forEach(function(test) {
        describe("Get memorycard value with id " + test.id, function() {
            it("should be value " + test.value, function () {
                checkMemorycardvalue(test.id, test.value);
            });
        });
    });

    pairs.forEach(function(pair) {
        describe("Memorycard with id " + pair.cardone + " and " + pair.cardtwo, function() {
            it("should be a pair = " + pair.expected, function() {
                isPair(pair.cardone, pair.cardtwo, pair.expected);
            });
        });
    });

    cardids.forEach(function(cardid) {
        describe("Memorycard with value " + cardid.value, function() {
            it("should be have id pair = " + cardid.expected, function() {
                checkCardId(cardid.value, cardid.expected);
            });
        });
    });
});
