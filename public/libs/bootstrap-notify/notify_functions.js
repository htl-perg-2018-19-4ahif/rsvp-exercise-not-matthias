function showError(message) {
    if (!message || message.length == 0) return;
    $.notify({
        icon: 'fa fa-exclamation-triangle',
        title: '',
        message: message
    }, {
        type: 'danger',
        delay: 30000,
        mouse_over: "pause",
        animate: {
            enter: 'animated bounceInRight',
            exit: 'animated bounceOutUp'
        }
    });
}

function showWarning(message) {
    if (!message || message.length === 0) return;
    $.notify({
        icon: 'fa fa-warning',
        title: '',
        message: message
    }, {
        type: 'warning',
        delay: 30000,
        mouse_over: "pause",
        animate: {
            enter: 'animated bounceInRight',
            exit: 'animated bounceOutUp'
        }
    });
}

function showInfo(message) {
    if (!message || message.length === 0) return;
    $.notify({
        icon: 'fa fa-info',
        title: '',
        message: message
    }, {
        type: 'info',
        delay: 30000,
        mouse_over: "pause",
        animate: {
            enter: 'animated bounceInRight',
            exit: 'animated bounceOutUp'
        }
    });
}

function showSuccess(message) {
    if (!message || message.length === 0) return;
    $.notify({
        icon: 'fa fa-check',
        title: '',
        message: message
    }, {
        type: 'success',
        delay: 30000,
        mouse_over: "pause",
        animate: {
            enter: 'animated bounceInRight',
            exit: 'animated bounceOutUp'
        }
    });
}
