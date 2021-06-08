var tags = document.querySelectorAll("input.tags")
const otp_submit = document.querySelector(".otp_submit");
const submit_btn = document.querySelector("#submit_btn");
const change_number_form = document.querySelector(".change_number_form");
const otp_verify = document.querySelector(".otp_verify");
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// tagify
for (let i = 0; i < tags.length; i++) {
    new Tagify(tags[i])
}


// for select tag
function selectOptionFromBackend(optionsList, value) {
    for (var i = 0; i < optionsList.options.length; i++) {
        option = optionsList.options[i];
        if (option.value == value) {
            console.log(value);
            option.selected = 'selected';
        }
    }
}

selectOptionFromBackend(gender, '<%= user_data.gender %>');



// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "flex";
    otp_submit.style.display = "none";
}
submit_btn.onclick = function () {
    change_number_form.style.display = "none";
    otp_submit.style.display = "flex";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    modal.style.transform = "scale(1)";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
                const mobile = document.getElementById("mobile-number").value;
            const response = await fetch('/change_number_resend', {
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


