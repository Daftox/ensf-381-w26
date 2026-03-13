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

    const typeCup = document.getElementById('type_cup');
    const typeCone = document.getElementById('type_cone');
    const toppingInputs = [
        document.getElementById('topping1'),
        document.getElementById('topping2'),
        document.getElementById('topping3')
    ];

    function calculateTotalPrice() {
        let total = BASE_PRICE;
        let toppingsCount = 0;

        toppingInputs.forEach(input => {
            if (input.checked) {
                toppingsCount++;
            }
        });

        total += toppingsCount * TOPPING_PRICE;
        totalPriceSpan.textContent = total.toFixed(2);
    }

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', calculateTotalPrice);
    });

    submitBtn.addEventListener('click', function() {
        const isBaseSelected = typeCup.checked || typeCone.checked;
        
        let isToppingSelected = false;
        toppingInputs.forEach(input => {
            if (input.checked) isToppingSelected = true;
        });

        if (!isBaseSelected || !isToppingSelected) {
            alert('Please select one base flavor and at least one topping before finishing your order.');
            return;
        }

        window.location.href = 'order_summary.html';
    });
});