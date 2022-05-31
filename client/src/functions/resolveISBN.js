const resolveISBN = (input) => {
    let resolve = ''
    let j = 0
    for (let i = 0; i < input.length && i < 13; i++) {
        j++
        resolve = resolve + input[i]
        if (input[j] !== '-') {
            switch (j) {
                case 1:
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
                default:
                    break
            }
        }
    }

    return resolve
}

export default resolveISBN