export const battleShipMapValidator = (field) => {
    let count = 0;
    //check are there 17 block 
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (field[i][j] == "1") count++;
        }
    }
    if (count != 17) {
        return false;
    }
    let twoTileShipAmount = 1
    let threeTileShipAmount = 2;
    let fourTileShipAmount = 1;
    let fiveTileShipAmount = 1


    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (field[i][j] == 2) {
                let x = j;
                let y = i;

                if (field[++y][++x] != 0) {
                    return false
                }
                x -= 2;
                if (field[y][x < 1 ? 1 : x] != 0) {
                    return false
                }
            }

            if (field[i][j] == 1) {
                let x = j;
                let y = i;

                //check bottomleft and bottomright corners and right 
                if (field[++y][++x] != 0) {
                    return false
                }
                x -= 2;
                if (field[y][x < 1 ? 1 : x] != 0) {
                    return false
                }

                x = j;
                y = i;
                while (true) {
                    //go bottom to find lenght of ship
                    if (field[++y][x] == 1) {
                        //check right to is there any ship in contact

                        field[i][j] = 2;
                        field[y][x] = 2;

                        let count = 2;
                        while (field[++y][x] != 0) {
                            field[y][x] = 2;
                            count++;
                        }
                        switch (count) {
                            case 2:
                                twoTileShipAmount--;
                                break;
                            case 3:
                                threeTileShipAmount--;
                                break;
                            case 4:
                                fourTileShipAmount--;
                                break;
                            case 5:
                                fiveTileShipAmount--;
                                break;
                            default:
                                break;
                        }
                    }
                    x = j;
                    y = i;

                    //go right to find lenght of ship
                    if (field[y][++x] == 1) {

                        //check bottom to is there any ship in contact
                        field[i][j] = 2;
                        field[y][x] = 2;

                        let count = 2;
                        while (field[y][++x] != 0) {
                            field[y][x] = 2;
                            count++;
                        }
                        switch (count) {
                            case 2:
                                twoTileShipAmount--;
                                break;
                            case 3:
                                threeTileShipAmount--;
                                break;
                            case 4:
                                fourTileShipAmount--;
                                break;
                            case 5:
                                fiveTileShipAmount--;
                                break;
                            default:
                                break;
                        }
                    }

                    break;
                }
            }
        }
    }
    //check how many ship remain
    //if all amoun are 0 its valid board
    if (twoTileShipAmount != 0) return false
    if (threeTileShipAmount != 0) return false
    if (fourTileShipAmount != 0) return false
    if (fiveTileShipAmount != 0) return false
    return true;
}



