let seconds = 0, minutes = 0;
let sessionTime=15, breakTime=5;
let sessionTimeValue = document.getElementById("session-time");
let breakTimeValue = document.getElementById("break-time");
let startPauseButton = document.getElementById("start-pause-button");
let resetButton = document.getElementById("reset-button");
let sessionTimeIncreaseButton = document.getElementById("session-time-increase-button");
let sessionTimeDecreaseButton = document.getElementById("session-time-decrease-button");
let breakTimeIncreaseButton = document.getElementById("break-time-increase-button");
let breakTimeDecreaseButton = document.getElementById("break-time-decrease-button");
let sessionBreakHeader = document.getElementById("session-break-header");
let timerDisplay = document.getElementById("timer-display");
let counter=1;
let timerId;
let sessionFlag=true, breakFlag=true;

function startSessionTime(){
    if(sessionFlag){
        minutes=sessionTime;
        if(minutes==0) return;
        sessionFlag=false;
        breakFlag=true;
    }
    timerId=setInterval(function () {
        if(seconds>0)
        seconds--;
        else if(minutes>0){
            seconds=59;
            minutes--;
        }
        if(minutes==0&&seconds==0){
            clearInterval(timerId);
            startBreakTime();
        }
        if(minutes<10) minutes="0" + minutes;
        if(seconds<10) seconds="0" + seconds;
        timerDisplay.innerHTML=minutes+" : "+seconds;
        minutes = minutes-1+1;
        seconds = seconds-1+1;
    },1000);
    timerDisplay.style.color="blue";
    sessionBreakHeader.innerHTML="Session "+counter;
    startPauseButton.removeEventListener("click",pauseBreakTime);
    startPauseButton.removeEventListener("click",startSessionTime);
    resetPlusMinusButtons();
    startPauseButton.innerHTML="Pause";
    startPauseButton.addEventListener("click",pauseSessionTime);
}

function pauseSessionTime(){
    clearInterval(timerId);
    startPauseButton.removeEventListener("click",pauseSessionTime);
    startPauseButton.removeEventListener("click",startBreakTime);
    //setPlusMinusButtons();
    startPauseButton.innerHTML="Resume";
    startPauseButton.addEventListener("click",startSessionTime);
}

function startBreakTime(){
    let localflag=true;
    if(breakFlag){
        minutes=breakTime;
        breakFlag=false;
        sessionFlag=true;
        if(minutes==0) localflag=false;
    }
    if(localflag){
        timerId=setInterval(function(){
            if(seconds>0)
            seconds--;
            else if(minutes>0){
                seconds=59;
                minutes--;
            }
            if(minutes==0&&seconds==0){
                clearInterval(timerId);
                counter++;
                startSessionTime();
            }
            if(minutes<10) minutes="0" + minutes;
            if(seconds<10) seconds="0" + seconds;
            timerDisplay.innerHTML=minutes+" : "+seconds;
            minutes = minutes-1+1;
            seconds = seconds-1+1;
        },1000);
        timerDisplay.style.color="green";
        sessionBreakHeader.innerHTML="Break "+counter;
        startPauseButton.removeEventListener("click",pauseSessionTime);
        startPauseButton.removeEventListener("click",startBreakTime);
        resetPlusMinusButtons();
        startPauseButton.innerHTML="Pause";
        startPauseButton.addEventListener("click",pauseBreakTime);
    }
    else{
        counter++;
        startSessionTime();
    }
}

function pauseBreakTime(){
    clearInterval(timerId);
    startPauseButton.removeEventListener("click",pauseBreakTime);
    //setPlusMinusButtons();
    startPauseButton.innerHTML="Resume";
    startPauseButton.addEventListener("click",startBreakTime);
}

startPauseButton.addEventListener("click",startSessionTime);

function sessionTimeIncreaseFunction() {
    sessionTime++;
    sessionTimeValue.innerHTML=sessionTime+" MIN";
    if(sessionTime<10)
    timerDisplay.innerHTML="0"+sessionTime+" : 00";
    else
    timerDisplay.innerHTML=sessionTime+" : 00";
}
function sessionTimeDecreaseFunction() {
    if(sessionTime>0){
        sessionTime--;
        sessionTimeValue.innerHTML=sessionTime+" MIN";
        if(sessionTime<10)
        timerDisplay.innerHTML="0"+sessionTime+" : 00";
        else
        timerDisplay.innerHTML=sessionTime+" : 00";
    }
}
function breakTimeIncreaseFunction() {
    breakTime++;
    breakTimeValue.innerHTML=breakTime+" MIN";
}
function breakTimeDecreaseFunction() {
    if(breakTime>0){
        breakTime--;
        breakTimeValue.innerHTML=breakTime+" MIN";
    }
}
function setPlusMinusButtons(){
    sessionTimeIncreaseButton.addEventListener("click",sessionTimeIncreaseFunction);
    sessionTimeDecreaseButton.addEventListener("click",sessionTimeDecreaseFunction);
    breakTimeIncreaseButton.addEventListener("click",breakTimeIncreaseFunction);
    breakTimeDecreaseButton.addEventListener("click",breakTimeDecreaseFunction);
}
function resetPlusMinusButtons(){
    sessionTimeIncreaseButton.removeEventListener("click",sessionTimeIncreaseFunction);
    sessionTimeDecreaseButton.removeEventListener("click",sessionTimeDecreaseFunction);
    breakTimeIncreaseButton.removeEventListener("click",breakTimeIncreaseFunction);
    breakTimeDecreaseButton.removeEventListener("click",breakTimeDecreaseFunction);
}

resetButton.addEventListener("click",function (){
    clearInterval(timerId);
    seconds = 0;
    minutes = 0;
    sessionTime=15;
    breakTime=5;
    counter=1;
    sessionFlag=true;
    breakFlag=true;
    startPauseButton.removeEventListener("click",startSessionTime);
    startPauseButton.removeEventListener("click",startBreakTime);
    startPauseButton.removeEventListener("click",pauseSessionTime);
    startPauseButton.removeEventListener("click",pauseBreakTime);
    startPauseButton.innerHTML="Start";
    sessionBreakHeader.innerHTML="Pomodoro";
    sessionTimeValue.innerHTML="15 MIN";
    breakTimeValue.innerHTML="5 MIN";
    resetPlusMinusButtons();
    setPlusMinusButtons();
    timerDisplay.innerHTML="15 : 00";
    startPauseButton.addEventListener("click",startSessionTime);
});
window.addEventListener("load",function () {
    setPlusMinusButtons();
});
 