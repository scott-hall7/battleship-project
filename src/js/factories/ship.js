const Ship = (l) => {

    const length = l;

    let hits = 0;

    const hit = () =>  {
        hits++;
    }

    const isSunk = () => {
        if (hits === length) return true;
        return false;
    }

    return {length, hits, hit, isSunk}
}

export default Ship;