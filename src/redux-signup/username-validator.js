export function validateUserName(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const value = Math.random() > 0.5;
            value ? resolve(true) : reject(false);
        }, 250);
    });
}