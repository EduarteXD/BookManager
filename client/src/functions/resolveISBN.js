const resolveISBN = (input) => {
    let resolve = ''
    let j = 0
    input = input.replace(/-+/g, "")
    if (isNaN(input)) {
        return false
    }
    for (let i = 0; i < input.length && i < 13; i++) {
        j++
        switch (j) {
            case 4:
                j++
                resolve = resolve + '-'
                break
            case 6:
                j++
                resolve = resolve + '-'
                break
            case 11:
                j++
                resolve = resolve + '-'
                break
            case 16:
                j++
                resolve = resolve + '-'
                break
            default:
                break
        }
        resolve = resolve + input[i]
    }

    return resolve
}

export default resolveISBN