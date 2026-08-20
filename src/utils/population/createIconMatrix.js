export function createIconMatrix(
    icons,
    columns
){

    const matrix = [];
    const count = icons.length;
    // const columns = 20;


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