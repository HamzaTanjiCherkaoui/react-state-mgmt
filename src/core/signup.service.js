export function signup(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = Math.random() > 0.5;
            result ? resolve(true) : reject(false);
        }, 1000);
    });
}
