/**
 * Created by cornelia on 5/04/15.
 */



//function to set the time on the counter and enable timer controls
var setTimer = function(){
    var days = parseInt(document.getElementById('days').value);
    var hours = parseInt(document.getElementById('hours').value);
    var minutes = parseInt(document.getElementById('minutes').value);
    var seconds = parseInt(document.getElementById('seconds').value);
    var duration = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
    document.getElementById('timer').innerHTML = duration;
    document.getElementById('timerControls').style.display="block";
};

//function to determine the end date of the timer
var getEndDate = function(){
    var days = parseInt(document.getElementById('days').value);
    var hours = parseInt(document.getElementById('hours').value);
    var minutes = parseInt(document.getElementById('minutes').value);
    var seconds = parseInt(document.getElementById('seconds').value);
    var userTime = moment().add(days, 'days').add(hours, 'hours').add(minutes, 'minutes').add(seconds, 'seconds');
    console.log(userTime.format('YYYY-MM-DDTHH:mm:ss'));
    return(userTime.format('YYYY-MM-DDTHH:mm:ss'));
};

//determine the difference between start and end date and count down
var userTime;
var countdown = function() {
    var endTime = moment(userTime, "YYYY-MM-DDTHH:mm:ss");
    var startTime = moment();
    var timeLeft = endTime.diff(startTime, 'milliseconds', true);

    if(timeLeft > 0){
        //calculate remaining days
        var daysLeft = Math.floor(moment.duration(timeLeft).asDays());
        endTime = endTime.subtract(daysLeft, 'day');
        timeLeft = endTime.diff(startTime, 'milliseconds', true);

        //calculate remaining hours
        var hoursLeft = Math.floor(moment.duration(timeLeft).asHours());
        endTime = endTime.subtract(hoursLeft, 'hours');
        timeLeft = endTime.diff(startTime, 'milliseconds', true);

        //calculate remaining minutes
        var minutesLeft = Math.floor(moment.duration(timeLeft).asMinutes());
        endTime = endTime.subtract(minutesLeft, 'minutes');
        timeLeft = endTime.diff(startTime, 'milliseconds', true);

        //calculate remaining seconds
        var secondsLeft = Math.floor(moment.duration(timeLeft).asSeconds());


        var duration1 = daysLeft + ' days ' + hoursLeft + ' hours ' + minutesLeft + ' minutes ' + secondsLeft + ' seconds';
        document.getElementById('timer').innerHTML = duration1;
    }
    else
    {
        stopTimer();
        document.getElementById('timeUp').play();
    }

};

var timerId;

var startTimer = function(){
    userTime = getEndDate();
    startCountdown();
};

var startCountdown = function(){
    if(timerId){
        return
    }
    timerId = setInterval(countdown, 1000);
    countdown();
};

var stopTimer = function(){
    clearInterval(timerId);
    timerId = null;
};

var resetTimer = function(){
    clearInterval(timerId);
    timerId = null;
    var days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        reset = '00';
    var duration = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
    document.getElementById('timer').innerHTML = duration;
};

//add user's time to the counter
document.getElementById('btnSetTimer').addEventListener('click', setTimer);

//start the counter
document.getElementById('btnStartTimer').addEventListener('click', startTimer);

//stop the counter
document.getElementById('btnStopTimer').addEventListener('click', stopTimer);

//reset the counter to zero
document.getElementById('btnResetTimer').addEventListener('click', resetTimer);




