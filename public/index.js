const statusBtn=document.getElementById('connection-status')
const priceDisplay = document.getElementById('price-display')

const investmentForm = document.querySelector('form');
const investedAmount = document.getElementById('investment-amount')
const investBtn = document.getElementById('invest-btn')


const dialog = document.querySelector('dialog');
const closeDialogBtn = dialog.querySelector('button');
const summaryText = document.getElementById('investment-summary');


const eventSource = new EventSource('/api/live')

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const price = data.temp

  priceDisplay.textContent = price
  if (investBtn.disabled){
    statusBtn.textContent = "Live Price 🟢"
    investBtn.disabled = false
  }
  
}
eventSource.onerror = () => {
    statusBtn.textContent = "Live Price 🔴"
    investBtn.disabled = true
}

investmentForm.addEventListener('submit', function (e) {
    e.preventDefault(); 
    const amount = parseFloat(investedAmount.value);
    const currentPrice = parseFloat(priceDisplay.textContent);

    
    if (isNaN(amount) || amount <= 0) return;

    if (!isNaN(currentPrice) && currentPrice > 0) {
        const ounces = (amount / currentPrice).toFixed(2)
        summaryText.textContent = `You just bought ${ounces} ounces (ozt) for £${amount.toFixed(2)}. You will receive documentation shortly.`
    } else {
        summaryText.textContent = `You just invested £${amount.toFixed(2)}. You will receive documentation shortly.`
    }
    dialog.showModal()
});
closeDialogBtn.addEventListener('click',function(){
    dialogue.closeModal()
})