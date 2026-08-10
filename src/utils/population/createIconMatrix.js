function getMatrixColumns(count){

    if(count < 50)
        return 5;


    if(count < 150)
        return 10;


    return 30;

}

export function createIconMatrix(
    icons
){

    const matrix = [];
    const count = icons.length;
    // const columns = getMatrixColumns(count);
    const columns = 20;


    for(
        let i = 0;
        i < icons.length;
        i += columns       // 当前这一行开始的位置 index
    ){

        matrix.push(
            icons.slice(
                i,
                i + columns
            )
        );

    }


    return matrix;

}