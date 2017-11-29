/**
 * A module for Memory game brain.
 *
 * @module
 */
"use strict";

class Gamebrain {
    /**
     * @constructor
     */
    constructor() {
        this.colors = [
            "blackplayer",
            "redplayer",
            "blueplayer",
            "greenplayer",
            "pinkplayer",
            "orangeplayer"
        ];
        this.usedcolors = [];
        this.players = new Map();
    }

    addPlayer(player, color) {
        this.players.set(player, color);
        // console.log("Players (according to GameBrain)");
        console.log(this.players);
    }

    dropPlayer(player) {
        this.players.delete(player);
        // console.log("Players (accroding to GameBrain)");
        console.log(this.players);
    }

    /**
    * Decide unique color for 'player' and add player to player Map
    *
    * @param {string} player - nickname of player to add to game
    *
    * @return {string} colorclass for player
    */
    setPlayerColor(player) {
        var color = "blackplayer";
        var notuniquecolor = true;

        while (notuniquecolor) {
            color = this.colors[Math.floor(Math.random() * this.colors.length)];
            if (this.usedcolors.indexOf(color) === -1) {
                notuniquecolor = false;
                this.usedcolors.push(color);
                this.addPlayer(player, color);
            }
        }
        return color;
    }

    getPlayersNicks() {
        return [...this.players.keys()];
    }

    getPlayersColors() {
        return [...this.players.values()];
    }
}

// Export module
module.exports = Gamebrain;
