const throwBall = (xs, ys, xe, ye, setPos) => {
    let g = 0.04
    let ls = (xe - xs) / 200
    let vs = -((800 - (ye -ys)) / 200)
    let t = 0

    let x = xs
    let y = ys

    let interval = setInterval(() => {
        t++
        if (t === 102) {
            clearInterval(interval)
        } else {
            x += 2 * ls
            y += 2 * vs
            setPos(x, y)
            vs = vs + 2 * g
        }
    }, 2)
}

export default throwBall