//This file is acts on boardGO_old, as this one does not interact with the server
//thus it is easier to 

const expect = require('chai').expect;
const { Logic } = require('./logic.js');

describe('Stack.prototype.push()', () => {
    const getRandom = () => [
        Math.floor(Math.random() * 19), 
        Math.floor(Math.random() * 19)
    ];

    describe('Only player black moved', () => {
        let randomPos = [];
        const game = new Logic();

        beforeEach(() => {
            randomPos.push(getRandom());
            randomPos.push(getRandom());

            game.triggerMove(...randomPos[0]);
            game.triggerMove(...randomPos[1]);
        });

        it('Position is 1', () => {
            expect(game.GameBoard[randomPos[0][0]][randomPos[0][1]]).to.eql('1');
        });

        it('Can\'t make a second move', () => {
            expect(game.GameBoard[randomPos[1][0]][randomPos[1][1]]).to.eql(0);
        });

/*        it('adds the new item to the stack', () => {
            expect(stack.contents).to.eql([1, 2, 3, 4]);
        });*/
    });

    describe('Player black and player white moved', () => {
        let randomPos = [];
        const game = new Logic();

        beforeEach(() => {
            randomPos.push(getRandom());
            randomPos.push(getRandom());

            game.triggerMove(...randomPos[0]);
            game.makeMove(...randomPos[1]);
        });

        it('Position is 1', () => {
            expect(game.GameBoard[randomPos[0][0]][randomPos[0][1]]).to.eql('1');
        });

        it('Owner is 2', () => {
            expect(game.getOwner()).to.eql('2');
        });

        it('Position is 2', () => {
            expect(game.GameBoard[randomPos[1][0]][randomPos[1][1]]).to.eql('2');
        });
    });
});