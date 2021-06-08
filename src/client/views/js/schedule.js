

const startTimeInput = document.querySelector("[name='startTime']");
const endTimeInput = document.querySelector("[name='endTime']");
const submitBtn = document.getElementById("createScheduleSubmitBtn");
const timeInputs = document.querySelector(".time_err");

[startTimeInput, endTimeInput].forEach(elem=>{

    elem.addEventListener("clocklet.closed", e=>{
        var message = document.createElement("small");
        if(moment(startTimeInput.value, "hh:mm A").isAfter(moment(endTimeInput.value, "hh:mm A")) || startTimeInput.value == endTimeInput.value){
            if(!submitBtn.disabled){
                submitBtn.disabled = true;
                message.innerText="Start time must be before endtime";
                timeInputs.append(message);
            }
        }else if(moment(startTimeInput.value, "hh:mm A").isBefore(moment("10:00 AM", "hh:mm A")) || moment(startTimeInput.value, "hh:mm A").isAfter(moment("10:00 PM", "hh:mm A")) || moment(endTimeInput.value, "hh:mm A").isAfter(moment("10:00 PM", "hh:mm A")) || moment(endTimeInput.value, "hh:mm A").isBefore(moment("10:00 AM", "hh:mm A"))){
            if(!submitBtn.disabled){
                submitBtn.disabled = true;
                message.innerText="Time must be between 10:00 AM to 10:00 PM";
                timeInputs.append(message);
            }
        }else{
            submitBtn.disabled = false;
            var errText = timeInputs.querySelector("small");
            if(errText){
                errText.remove()
            }
        }
    });
});