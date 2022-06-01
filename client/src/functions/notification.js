const notification = (title, msg) => {
    if (Notification.permission === 'granted') {
        var notification = new Notification(title, {
            body: msg
        })
    }
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
               var notification = new Notification(title, {
                   body: msg
               })
            }
        })
    }
}

export default notification