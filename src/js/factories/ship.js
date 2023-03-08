const Ship = (l, vertical) => {

    const length = l;
    let isVertical = vertical;

    let hits = 0;

    const hit = () =>  {
        hits++;
    }

    const isSunk = () => {
        if (hits === length) return true;
        return false;
    }

    return {length, isVertical, hits, hit, isSunk}
}

export default Ship;