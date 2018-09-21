'use strict';

// function loadApp() {
//     window.open('/index.html', 'JS Calculator', 'width=290px, height=450px');
//     return false;
// }

function trackMouse() {
    $('#calculator-form').mouseover(function() {
        $(this).css("box-shadow", "10px 10px 20px #000046");
    }).mouseleave(function() {
        $(this).css("box-shadow", "-5px -5px 20px #000046");
    });
}

function handleNumberClick() {
    $('#calculator-form').on('click', '.calculator-button', function() {
        var beforeVal = $('#main-display').val().toLocaleString("en");
        // beforeVal = addCommas(beforeVal);
        beforeVal = beforeVal.toLocaleString("en");

        var calcBtnValue = $(this).attr('value');
        console.log("calcBtn: " + calcBtnValue);

        if (calcBtnValue === "%" || calcBtnValue === "C" || calcBtnValue === "CE" || calcBtnValue === "=") {
            return false;
        } else if (calcBtnValue === "x") {
            $('#main-display').val(beforeVal + "*");
        } else {
            var newVal = beforeVal.toLocaleString("en") + calcBtnValue;

            // $('#main-display').val(beforeVal + calcBtnValue);
            $('#main-display').val(newVal);
        }

        newVal = $('#main-display').val();
        $('#main-display').val(newVal);

        if (newVal.length === 4) {
            newVal = newVal.replace(/,/g, "");
            $('#main-display').val(addCommas(newVal));
        } else if (newVal.length >= 6) {
            newVal = newVal.replace(/,/g, "");
            $('#main-display').val(addCommas(newVal));
        } else {
            //else
        }

        fitFontSize();
    });
}

function sendToDisplay() {
    var v = $('#main-display').val();
    v = addCommas(v);

    console.log("send: " + v);

    $('#main-display').val(v);
}

function handleClear() {
    $('#clear-display').on('click', function() {
        $('#main-display').val("");

        fitFontSize();
    });
}

function handleClearEntry() {
    $('#clear-entry').on('click', function() {
        var inputValue = $('#main-display').val();
        inputValue = inputValue.substring(0, inputValue.length - 1);

        $('#main-display').val(inputValue);

        if (inputValue.length === 4) {
            inputValue = inputValue.replace(/,/g, "");
            $('#main-display').val(addCommas(inputValue));
        } else if (inputValue.length <= 25) {
            inputValue = inputValue.replace(/,/g, "");
            $('#main-display').val(addCommas(inputValue));
        } else {
            //else
        }

        fitFontSize();
    });
}

function handleCalcPercent() {
    $('#percentage').on('click', function() {
        var inputValue = $('#main-display').val();
        inputValue = inputValue.replace(/,/g, "");

        if (inputValue > 0) {
            inputValue = addCommas(inputValue / 100);
            $('#main-display').val(inputValue);
        }

        fitFontSize();
    });
}

function addCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function handleEqualClick() {
    $('#equalization').on('click', function() {
        var beforeVal = $('#main-display').val();
        $('#top-display').val(beforeVal);

        console.log("running calculation: [ " + beforeVal + " ]");

        beforeVal = beforeVal.replace(/,/g, "");
        beforeVal = eval(beforeVal);

        console.log("evaluated value: [ " + beforeVal + " ]");

        $('#main-display').val(addCommas(beforeVal));

        fitFontSize();
    });
}

function fitFontSize() {
  var inputValue = $('#main-display').val();

  if (inputValue.length <= 15) {
    $('#main-display').css('font-size', '30px')
  } else if (inputValue.length >= 16 && inputValue.length <= 23) {
    $('#main-display').css('font-size', '20px')
  } else if (inputValue.length >= 24) {
    $('#main-display').css('font-size', '14px')
  }
}

function handleSubmit() {
    $('#calculator-form').submit(function(e) {
        e.preventDefault();

    });
}

function startApp() {
    // loadApp();
    trackMouse();
    handleNumberClick();
    handleClear();
    handleClearEntry();
    handleCalcPercent();
    handleEqualClick();
}

$(startApp);