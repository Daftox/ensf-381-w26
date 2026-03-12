document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.getElementById('timerDisplay');
    const totalPriceSpan = document.getElementById('totalPrice');
    const orderForm = document.getElementById('customizeForm');
    const submitBtn = document.getElementById('submitOrderBtn');
    
    let timeLeft = 10 * 60;
    const BASE_PRICE = 6.00;
    const TOPPING_PRICE = 1.50;
    let timerInterval;

    function startTimer() {
        clearInterval(timerInterval);
        updateTimerDisplay();
        timerInterval = setInterval(updateTimerDisplay, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            window.location.href = 'order_summary.html';
        }
    }

    startTimer();

    const allInputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    
    function calculateTotalPrice() {
        let total = BASE_PRICE;
        const selectedToppings = document.querySelectorAll('input[name^="topping"]:checked');
        total += selectedToppings.length * TOPPING_PRICE;
        totalPriceSpan.textContent = total.toFixed(2);
    }
    
    allInputs.forEach(input => {
        input.addEventListener('change', calculateTotalPrice);
    });
    
    calculateTotalPrice();
    submitBtn.addEventListener('click', function(event) {
        const isBaseSelected = document.querySelector('input[name="type"]:checked') !== null;
        const isToppingSelected = document.querySelectorAll('input[name^="topping"]:checked').length > 0;
        
        if (!isBaseSelected || !isToppingSelected) {
            alert('Please select one base flavor and at least one topping before finishing your order.');
            return;
        }
        
        window.location.href = 'order_summary.html';
    });
});