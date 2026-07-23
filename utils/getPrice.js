export function getPrice(){
    const randomPrice = Math.random() * (3030 - 2980  + 1) + 2980 
    return randomPrice.toFixed(2)
}