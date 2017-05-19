export function signup(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = Math.random() > 0.6;
            result ? resolve(true) : reject(false);
        }, 1000);
    });
}
