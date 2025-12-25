$(document).ready(function () {

    // ===== STATE =====
    var jsp = "";
    var jsp_i = "";
    var peu = "";
    var sound_on = 1;

    // ===== INIT SOUNDS (SAME AS KHONA) =====
    if (sound_on === 1 && typeof ion !== "undefined") {
        ion.sound({
            sounds: [
                { name: "b1", path: "assets/sounds/", volume: 1 },
                { name: "b2", path: "assets/sounds/", volume: 1 },
                { name: "a1", path: "assets/sounds/", volume: 1 },
                { name: "a2", path: "assets/sounds/", volume: 1 },
                { name: "s1", path: "assets/sounds/", volume: 1 },
                { name: "s2", path: "assets/sounds/", volume: 1 },
                { name: "c1", path: "assets/sounds/", volume: 1, loop: true },
                { name: "c2", path: "assets/sounds/", volume: 1 }
            ],
            preload: true,
            multiplay: true
        });
    }

    function play(name) {
        try {
            if (sound_on === 1) ion.sound.play(name);
        } catch (e) {}
    }

    function stop(name) {
        try {
            if (sound_on === 1) ion.sound.stop(name);
        } catch (e) {}
    }

    // ===== PLATFORM SELECT =====
    function fixplatformBox(el) {
        $('.sps-i').removeClass('active');
        el.addClass('active');

        if (el.hasClass('sps-i-1')) { jsp = 'Windows'; jsp_i = '<i class="fab fa-windows"></i>'; }
        if (el.hasClass('sps-i-4')) { jsp = 'Android'; jsp_i = '<i class="fab fa-android"></i>'; }
        if (el.hasClass('sps-i-5')) { jsp = 'iOS'; jsp_i = '<i class="fab fa-apple"></i>'; }

        play("b1");
    }

    $('.sps-i').on('click', function () {
        fixplatformBox($(this));
    });

    // ===== STEP 1 : PROCEED =====
    $('#stb-ee-f').on('click', function () {

        if ($('#epu-u-i').val().trim() === '' || jsp === '') return;

        play("b2");

        peu = $('#epu-u-i').val().trim();

        $('.b-s-c-w').fadeOut(400, function () {
            $('.i-w-b-r-t-y').html(`
                <div class="step-box">
                    <p>🔍 Searching account <strong>${peu}</strong>...</p>
                </div>
            `).fadeIn();
        });

        play("c1"); // looping loading sound
        setTimeout(stepGenerating, 2200);
    });

    // ===== STEP 2 =====
    function stepGenerating() {
        $('.i-w-b-r-t-y').html(`
            <div class="step-box">
                <p>⚙️ Generating rewards for <strong>${jsp}</strong>...</p>
            </div>
        `);

        setTimeout(stepAlmostDone, 2600);
    }

    // ===== STEP 3 =====
    function stepAlmostDone() {
        stop("c1");
        play("s1");

        $('.i-w-b-r-t-y').html(`
            <div class="step-box">
                <p>✅ Almost done!</p>
                <div class="verify-wrap">
                    <button id="verify-btn" class="p-b animate__animated animate__pulse animate__infinite">
                        Verify Now
                    </button>
                </div>
            </div>
        `);
    }

    // ===== FINAL STEP : LOCKER =====
    $(document).on('click', '#verify-btn', function () {
        play("s2");
        if (typeof CPABuildLock === "function") {
            CPABuildLock();
        }
    });

});

/* ===== FORCE REMOVE LOADER ===== */
$(window).on('load', function () {
    setTimeout(function () {
        if ($('.imjaprl').length) {
            $('.imjaprl').fadeOut(400, function () {
                $(this).remove();
            });
        }
    }, 800);
});
