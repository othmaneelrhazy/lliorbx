$(document).ready(function () {

    var jsp = "";
    var jsp_i = "";
    var peu = "";

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

    $('.sps-i').click(function () {
        fixplatformBox($(this));
    });

    // ===== STEP 1 : USER SUBMIT =====
    $('#stb-ee-f').click(function () {

        if ($('#epu-u-i').val().trim() === '' || jsp === '') return;

        peu = $('#epu-u-i').val().trim();

        $('.b-s-c-w').fadeOut(function () {
            $('.i-w-b-r-t-y').html(`
                <div class="fake-step">
                    <p>🔍 Searching account <strong>${peu}</strong>...</p>
                </div>
            `).fadeIn();
        });

        // Step 2
        setTimeout(showGenerating, 2000);
    });

    function showGenerating() {
        $('.i-w-b-r-t-y').html(`
            <div class="fake-step">
                <p>⚙️ Generating rewards for <strong>${jsp}</strong>...</p>
            </div>
        `);

        // Step 3
        setTimeout(showAlmostDone, 2500);
    }

    function showAlmostDone() {
        $('.i-w-b-r-t-y').html(`
            <div class="fake-step">
                <p>✅ Almost done!</p>
                <button id="verify-btn" class="p-b">Verify Now</button>
            </div>
        `);
    }

    // ===== FINAL STEP : LOCKER =====
    $(document).on('click', '#verify-btn', function () {
        if (typeof CPABuildLock === "function") {
            CPABuildLock();
        }
    });

});

// ===== FORCE REMOVE LOADER =====
$(window).on('load', function () {
    setTimeout(function () {
        $('.imjaprl').fadeOut(function () {
            $(this).remove();
        });
    }, 800);
});
