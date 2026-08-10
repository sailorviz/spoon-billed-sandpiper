export function getYearPosition(
    index,
    data
){

    return (
        index /
        (data.length - 1)
    )
    *
    100;

}