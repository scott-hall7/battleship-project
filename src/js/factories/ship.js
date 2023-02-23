const Ship = (l, name) => {

    const length = l;
    const shipName = name;

    let hits = 0;

    const hit = () =>  {
        hits += 1;
    }

    const isSunk = () => {
        if (hits === length) return true;
        return false;
    }

    return {length, shipName, hit, isSunk}
}

export default Ship;