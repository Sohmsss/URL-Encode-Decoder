$(document).ready(function () {

    function loadGoogleAnalytics() {
        if (!window.ga) { 
            var script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-0V3MP2TH6L';
            document.head.appendChild(script);
    
            script.onload = function() {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
    
                gtag('config', 'G-0V3MP2TH6L');
            };
        }
    }
    
    if (userHasConsented()) {
        loadGoogleAnalytics();
    }

    document.getElementById('acceptAllCookies').addEventListener('click', function() {
        setCookieConsent(true, true);
        console.log('logging accepted consent');
        loadGoogleAnalytics(); 
    });
    
    function setCookieConsent(necessary, analytics) {
        localStorage.setItem('cookieConsent', JSON.stringify({necessary: necessary, analytics: analytics}));
        document.getElementById('cookieConsentBanner').style.display = 'none';
        document.getElementById('cookieSettingsPanel').style.display = 'none';
    }
    
    window.onload = function() {
        var consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            document.getElementById('cookieConsentBanner').style.display = 'block';
        }
    };    

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