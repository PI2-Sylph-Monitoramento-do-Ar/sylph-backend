export const isObjectEmpty = (obj: object): boolean => {
    if(obj == null) return true
    return Object.keys(obj).length === 0
}