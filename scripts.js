$(document).ready(function () {

    $('textarea').on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    function toggleRadioButtons() {
        var encodeToggle = document.getElementById('encode-toggle');
        var decodeToggle = document.getElementById('decode-toggle');

        encodeToggle.checked = true;
        $('#btn-primary').text('Encode'); 

        encodeToggle.addEventListener('change', function () {
            if (this.checked) {
                decodeToggle.checked = false;
                $('.btn-primary').text('Encode'); 
                $('#textoutput').attr('placeholder', 'Encoded text will appear here')
                $('#textinput').attr('placeholder', 'Text to be encoded')
            }
        });

        decodeToggle.addEventListener('change', function () {
            if (this.checked) {
                encodeToggle.checked = false;
                $('.btn-primary').text('Decode'); 
                $('#textoutput').attr('placeholder', 'Decoded text will appear here')
                $('#textinput').attr('placeholder', 'Text to be decoded')
            }
        });
    }

    toggleRadioButtons();

    function processInput() {
        var input = $('#textinput').val();
        var isEncode = $('#encode-toggle').is(':checked');
        var outputField = $('#textoutput');

        if (isEncode) {
            outputField.val(encodeURIComponent(input));
        } else {
            outputField.val(decodeURIComponent(input));
        }
    }

    $('.btn-primary').on('click', function (e) {
        e.preventDefault();
        processInput();
    });

});