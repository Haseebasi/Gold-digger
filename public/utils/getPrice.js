export function getPrice(){
    const randomPrice = Math.random() * (max - min + 1) + min
    randomPrice.toFixed(2)
}