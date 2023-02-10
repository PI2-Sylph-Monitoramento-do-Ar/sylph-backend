export const getNextSixHours = () => {
    const date = new Date()
    const nextSixHours = []
    for(let i=0; i<6; i++){
        date.setHours(date.getHours() + 1)
        nextSixHours.push(date.getHours())
    }
    return nextSixHours;
}