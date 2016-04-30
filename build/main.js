'use strict';

;(function () {

    var block_for_text = document.querySelector('.typing_type');

    // animate letter, just push every letter to string from zero with little delay
    function animate_text(element) {
        // take element text
        var text = element.innerHTML;
        // var to save string step by step
        var buf_text = '';

        //separate all characters in array, to add per 1 character
        var letter_array = [];
        for (var x = 0; x < text.length + 1; x++) {
            var c = text.charAt(x);
            letter_array.push(c);
        }

        var counter = 0; //  set your counter to 1

        function myLoop() {
            //  create a loop function
            setTimeout(function () {
                //  call a 25ms setTimeout when the loop is called
                buf_text += letter_array[counter];
                element.innerHTML = buf_text; //  add a character in text
                counter++; //  increment the counter
                if (counter < letter_array.length) {
                    //  if the counter < then our character length, call the loop function
                    myLoop(); //  ..  again which will trigger another
                } //  ..  setTimeout()
            }, 25);
        }
        myLoop();
    };

    setTimeout(function () {
        animate_text(block_for_text);
        $('.typing_animate_element').css({ 'display': 'inline' });
        $(block_for_text).animate({ 'opacity': '1' }, 200);
    }, 3000);

    setTimeout(function () {
        $('.about_me_photo_animate_layer').fadeOut('slow');
    }, 2000);

    // animation photo add final fade animation
})();