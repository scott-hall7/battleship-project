const Ship = (l, alignment) => {

    const length = l;

    let hits = 0;
    let sunk = false;

    const hit = () =>  {
        hits += 1;
    }

    const isSunk = () => {
        if (hits === length) sunk = true;
    }

    //const createShip

    return {length, hits, sunk, hit, isSunk}
}

export default Ship;