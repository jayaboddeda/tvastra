function clickEvent(first,next){
    if(first.value.length){
        document.getElementById(next).focus();
    }
    
}

const resendBtn = document.querySelector('#resend');
const change_number_resend = document.querySelector('.change_number_resend');


const timer = document.querySelector('.timer').children[0];

let timerCount = parseInt(timer.innerHTML.split(' ')[2]);
const countDown = setInterval(() => {
        if(timerCount === 0) {
            timer.innerHTML = 'Resend';
            clearInterval(countDown);
            const resendotp = async () => {
                const mobile = document.querySelector('p').textContent;
            const response = await fetch('/resend', {
                method: 'post',
                headers:{ 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ phone: mobile }),
             });
            window.location.replace(response.url);
        }

        resendBtn.addEventListener('click', resendotp);
        } else {
            timerCount--;
            timer.innerHTML = `Resend in ${timerCount}`;	
        }
        
    },1000);