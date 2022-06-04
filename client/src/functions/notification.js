const notification = (title, msg, page, setPage, alt, sendInfo) => {
    if (Notification.permission === 'granted') {
        var notification = new Notification(title, {
            body: msg
        })
        notification.onclick = () => {
            if (page !== undefined) {
                setPage(page)
            }
        }
    }
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                var notification = new Notification(title, {
                    body: msg
                })
                notification.onclick = () => {
                    if (page !== undefined) {
                        setPage(page)
                    }
                }
            } else {
                if (alt) {
                    setTimeout(() => sendInfo(title + ' ' + msg), 3500)
                }
            }
        })
    }
    else if (alt) {
        setTimeout(() => sendInfo(title + ' ' + msg), 3500)
    }
}

export default notification