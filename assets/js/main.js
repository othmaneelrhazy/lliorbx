$(document).ready(function () {

    // ===== SETTINGS =====
    var s_s = 1; // sound switch
    var jsp = "";
    var jsp_i = "";
    var peu = "";

    // ===== BLOCK KEYS (OPTIONAL) =====
    document.onkeydown = function (e) {
        if (e.keyCode === 123) return false;
        if (e.ctrlKey && e.shiftKey) return false;
        if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) return false;
    };

    // ===== RANDOM STYLE (SAFE) =====
    try {
        var styles = [
            "./assets/css/a-c-c1.css",
            "./assets/css/a-c-c2.css",
            "./assets/css/a-c-c3.css",
            "./assets/css/a-c-c4.css",
            "./assets/css/a-c-c5.css",
            "./assets/css/a-c-c6.css"
        ];
        var style = styles[Math.floor(Math.random() * styles.length)];
        $('<link/>', { rel: 'stylesheet', href: style }).appendTo('head');
    } catch (e) {
        console.log("Style load skipped");
    }

    // ===== PLATFORM SELECT =====
    function fixplatformBox(el) {
        $('.sps-i').removeClass('active');
        el.addClass('active');

        if (el.hasClass('sps-i-1')) {
            jsp = 'Windows';
            jsp_i = '<i class="fab fa-windows"></i>';
        }
        if (el.hasClass('sps-i-4')) {
            jsp = 'Android';
            jsp_i = '<i class="fab fa-android"></i>';
        }
        if (el.hasClass('sps-i-5')) {
            jsp = 'iOS';
            jsp_i = '<i class="fab fa-apple"></i>';
        }
    }

    $('.sps-i').on('click', function () {
        fixplatformBox($(this));
    });

    // ===== STEP 1 : PROCEED =====
    $('#stb-ee-f').on('click', function () {

        // validation
        if ($('#epu-u-i').val().trim() === '' || jsp === '') {
            return;
        }

        peu = $('#epu-u-i').val().trim();

        // UI transition
        $('.b-s-c-w').fadeOut(300, function () {
            $('.i-w-b-r-t-y').fadeIn(300);
            $('#f-t-f-p-t-u-v').text(peu);
            $('#f-t-f-p-t-p-v').html(jsp_i);
        });

        // ===== TRIGGER CPA LOCKER (SAFE) =====
        setTimeout(function () {
            if (typeof CPABuildLock === "function") {
                CPABuildLock();
            }
        }, 1200);
    });

});

/* ===== FORCE REMOVE LOADER (FINAL FIX) ===== */
$(window).on('load', function () {
    setTimeout(function () {
        if ($('.imjaprl').length) {
            $('.imjaprl').fadeOut(400, function () {
                $(this).remove();
            });
        }
    }, 800);
});
