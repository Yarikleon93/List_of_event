$("#createEventForm").validate({
    rules: {
        name: {
            required: true,
            minlength: 3,
            maxlength: 16
        },
        time_start: {
            required: true
        },
        time_finish: {
            required: true
        },
        date: {
            required: true
        }
    },
    messages:{
        name :{
            required:'Пожалуйста введите название',
            minlength:'Введите более 3 букв'
        },
        time_start: {
            required: 'Введите время начала события'
        },
        time_finish: {
            required: 'Введите время завершения события'
        },
        date: {
            required: 'Введите дату'
        }

    }
});