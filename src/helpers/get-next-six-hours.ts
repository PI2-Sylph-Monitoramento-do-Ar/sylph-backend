export const getNextSixHours = () => {
    let date = new Date()
    console.log(date)
    const nextSixHours = []
    for(let i=0; i<6; i++){
        date.setHours(date.getHours() + 1)
        nextSixHours.push(date.getHours())
    }
    console.log(nextSixHours)
    return nextSixHours;
}