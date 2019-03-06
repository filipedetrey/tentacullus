export const remakeString = (string: string) => {
    var length = string.length
    var remake: string = ""
    for (let i = 0; i < length; i++) {
        if (string.charAt(i) === string.charAt(i).toUpperCase()) {
            remake += " " + string.charAt(i)
        }
        else remake += string.charAt(i)
    }
    return remake.charAt(0).toUpperCase() + remake.slice(1);
}