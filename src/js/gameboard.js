import Ship from "./ship";

const Gameboard = () => {

    const shipCoordinates = [];
    const missedAttacks = [];

    const placeShip = (l, alignment) => {
        let ship = Ship(l, alignment);
        

    }

    const receiveAttack = (attackCoordinate) =>  {
        if (shipCoordinates === attackCoordinate) console.log('hit') //  Sends hit function at ship
        else missedAttacks.push(attackCoordinate)
    }



    //  Detects if all ships are sunk.
    const shipStatus = () =>  {

    }
    //  If ship coordinates.length === 0, display as all ships sunk

}  