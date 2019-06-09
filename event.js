
var events = [];
$('#createEventForm').on('submit', function (event) {
    event.preventDefault();

    const formData = serializeForm($('#createEventForm'));

    var isEventValid = validateEvent(formData);
    if (isEventValid) {
        events.push(formData);
        addEventOnBoard(formData);
    }
   //debugger
});

// $(".dell").click(function(ev){
//     var div = ev.target.parentNode;
//     div.remove();

// })
$("#dell").click(function(event){
    var div = event.target.parentNode;
    console.log(div);
})

function addEventOnBoard(event) {
    var box = getDayBox(event);
    box.append(drawEvent(event));
    
}

function drawEvent(event) {
    const eventElement = $('<div>').addClass('event-' + event.date + '-' + event.time_start + '-' + event.time_finish);
    const eventNameElement = $('<div>').addClass('event-name day1 name').text(event.name);
    const startTimeElement = $('<div>').addClass('event-start-time day1 time').text(event.time_start);
    const finistTimeElement = $('<div>').addClass('finish-start-time day1 time').text(event.time_finish);
    const edit = $('<div>').addClass('edit day1').attr('id', 'edit');
    const dell = $('<div>').addClass('dell day1').attr('id', 'dell');
    eventElement.append(eventNameElement, startTimeElement, finistTimeElement, edit, dell);
    return eventElement;
}

function getDayBox(event) {
    var boxSelector = '#' + event.date;
    var box = $(boxSelector);

    if (!box.length) {
        box = $('<div>')
            .attr('id', event.date).addClass('box')
            .append(
                $('<div>').addClass('box-header day').text(event.date)
            );
        $('#dashboard').append(box);
    }
    
    return box
}

function serializeForm(form) {
    if (!form) {
        return null;
    }

    return form.serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
}

function validateEvent(event) {
    if (!events.length) {
        return true;
    }
    var isEventIntersectWithOthers = events.some(function(e) {
        return e.date == event.date && (isTimeBetween(event.time_start, e.time_start, e.time_finish) || isTimeBetween(event.time_finish, e.time_start, e.time_finish));
    });
    return !isEventIntersectWithOthers;
}

function isTimeBetween(time, start, end) {
    var timePattern = 'hh:mm';
    var startTime = moment(start, timePattern);
    var endTime = moment(end, timePattern);

    return moment(time, timePattern).isBetween(startTime, endTime);
}