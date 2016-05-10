
;(function(){

    $(document).ready(function(){

    var block_for_text = document.querySelector('.typing_type');

    // animate letter, just push every letter to string from zero with little delay
    function animate_text(element){
        // take element text
        var text = element.innerHTML;
        // var to save string step by step
        var buf_text = '';

        //separate all characters in array, to add per 1 character
        var letter_array = [];
        for (var x = 0; x < text.length+1; x++)
        {
            var c = text.charAt(x); 
            letter_array.push(c); 
        }

        var counter = 0;                                 //  set your counter to 1

        function myLoop () {                             //  create a loop function
            setTimeout(function () {                     //  call a 25ms setTimeout when the loop is called
            buf_text += letter_array[counter];           
            element.innerHTML = buf_text;                //  add a character in text
            counter++;                                   //  increment the counter
                if (counter < letter_array.length) {     //  if the counter < then our character length, call the loop function
                    myLoop();                            //  ..  again which will trigger another 
                }                                        //  ..  setTimeout()
            }, 25);
        }
        myLoop();

    };

    setTimeout(function(){
        animate_text(block_for_text);
        $('.typing_animate_element').css({'display' : 'inline'});
        $(block_for_text).animate({'opacity': '1'}, 200);
    }, 1000);

    setTimeout(function(){
        $('.about_me_photo_animate_layer').fadeOut('slow');
    }, 1000);


    /*
        wrap each character in string with span for animation
    */
    function wrap_with_span(element){
        let text = element.innerHTML;
        let buf_text = '';
        let letter_array = [];
        for (let i = 0; i < text.length; i++) {
            let letter = '<span>' + text.charAt(i) + '</span>';
            if(text.charAt(i) == ' ') {
                letter = '<span>' + '&nbsp' + '</span>';
            }
            letter_array.push(letter);
        };
        for (let i = 0; i < letter_array.length; i++) {
            buf_text += letter_array[i];
        };
        element.innerHTML = buf_text; 
    }
   

    /*
        function that animate scale UP span array(this letters) with delay
    */
    function scale_up_letters(element, speed){
        let array = $(element).find('span');
        let counter = 0;

        function myLoop(){
            let elem = array[counter]
            setTimeout(function(){
                $(elem).animate({ scale: '1' });
                counter++;
                    if(counter < array.length){
                        myLoop();
                    }
            }, speed);
        }
        myLoop();
    }


    /*
        function that animate scale DOWN span array(this letters) with delay
    */
    function scale_down_letters(element, speed){
        let array = $(element).find('span');
        let counter = 0;

        function myLoop(){
            let elem = array[counter]
            setTimeout(function(){
                $(elem).animate({ scale: '0.3' });
                counter++;
                    if(counter < array.length){
                        myLoop();
                    }
            }, speed);
        }
        myLoop();
    }


    /*
        wrap title text with span for animation and animate it 
    */
    wrap_with_span($('.about_me_tech_title')[0]);
    scale_up_letters($('.about_me_tech_title'), 40);
    
    setTimeout(function(){
        scale_down_letters($('.about_me_tech_title'), 80);
    }, 500);

    setTimeout(function(){
        scale_up_letters($('.about_me_tech_title'), 80);
    }, 500);

    /*
        animate all div's in our about me text block    
    */
    let about_me_text_array = $('.about_me_tech_text');
    for (let i = 0; i < about_me_text_array.length; i++) {
        wrap_with_span(about_me_text_array[i]);
        scale_up_letters($(about_me_text_array[i]), 5);
        scale_down_letters($(about_me_text_array[i]), 5);
        scale_up_letters($(about_me_text_array[i]), 5);
    };


    /*
        scroll function for about me text animation
    */
    let about_me_text_block = $('.about_me_tech_wrapper')[0];
    $(about_me_text_block).waypoint(function(direction) {
        if (direction === 'up') {
            scale_down_letters($('.about_me_tech_title'), 10);
            for (let i = 0; i < about_me_text_array.length; i++) {
                scale_down_letters($(about_me_text_array[i]), 10);
            };
        }
    }, {
        offset: '75%'
    });

    $(about_me_text_block).waypoint(function(direction) {
        if (direction === 'down') {
            scale_up_letters($('.about_me_tech_title'), 10);
              for (let i = 0; i < about_me_text_array.length; i++) {
                scale_up_letters($(about_me_text_array[i]), 10);
            };
        }
    }, {
        offset: '75%'
    });

     $(about_me_text_block).waypoint(function(direction) {
        if (direction === 'down') {
            scale_up_letters($('.about_me_tech_title'), 10);
              for (let i = 0; i < about_me_text_array.length; i++) {
                scale_down_letters($(about_me_text_array[i]), 10);
            };
        }
    }, {
        offset: '-40%'
    });

    $(about_me_text_block).waypoint(function(direction) {
        if (direction === 'up') {
            scale_up_letters($('.about_me_tech_title'), 10);
              for (let i = 0; i < about_me_text_array.length; i++) {
                scale_up_letters($(about_me_text_array[i]), 10);
            };
        }
    }, {
        offset: '-40%'
    });




    /*
        form validation and other functions
    */
    function form_validate_required(element){
        if($(element).val() == ''){
            return false;
        }else{
            return true;
        }
    }

    function min_length(element, length){
        if($(element).val().length < length)
            return false;
        else
            return true;
    }

    function form_submit(form){
        let inputs = $(form).find('input');
        let textareas = $(form).find('textarea');

        let submit_btn = $(form).find('button');
        submit_btn.on('click', function(e){
            e.preventDefault();

            for (let i = 0; i < inputs.length; i++) {
                let this_error = $(inputs[i]).siblings('.error')[0];
                
                if(!min_length($(inputs[i]), 2)){
                    this_error.innerHTML = 'Min length 2 simbols';
                    $(this_error).slideDown('slow');
                }else{
                    $(this_error).slideUp('slow');
                }
            };
        });

    }

    let angular_todo_form = $('.angular_todo_form')[0];
    form_submit(angular_todo_form);

    // form_validate_required($('#angular_todo_form_title'));
    // min_length($('#angular_todo_form_title'), 2);






    // counter class
    let Counter = function(start_btn, reset_btn, ms_block1, sec_block1, min_block1){
        let ms = 0;
        let sec = 0;
        let min = 0;
        let timer_id;
        let ms_block = ms_block1;
        let sec_block = sec_block1;
        let min_block = min_block1; 

        let start_button = start_btn;
        let reset_button = reset_btn;

        function timer_start(){
            timer_id = setInterval(function(){

                if(ms > 100){
                    sec++;
                    ms = 0;
                }
                if(sec >= 10){
                    min++;
                    sec = 0;
                }

                if(sec < 10){
                    $(sec_block).text('0' + sec);
                }else{
                    $(sec_block).text(sec);
                }

                if(min < 10){
                    $(min_block).text('0' + min);
                }else{
                    $(min_block).text(min);
                }

                $(ms_block).text(ms);

                ms++;

            }, 10);
        };

        function timer_stop(){
            clearInterval(timer_id);
        };

        function timer_reset(){
            ms = 0;
            sec = 0;
            min = 0;
            clearInterval(timer_id);
            $(ms_block).text('00');
            $(sec_block).text('00');
            $(min_block).text('00');
            $(start_button).removeClass('active');
            $(start_button).text('start');
        };

        $(reset_button).click(function(){
            timer_reset();
        });

        $(start_button).click(function(){
            if(!$(this).hasClass('active')){
                $(this).text('stop');
                timer_start();
            }else{
                $(this).text('start');
                timer_stop();
            }
            $(this).toggleClass('active');
        });  
    }

    let new_counter = new Counter($('.start')[0], $('.stop')[0], $('#ms')[0], $('#sec')[0], $('#min')[0]);

    var photo = $('#svg'); 
    TweenLite.to(photo, 2, {attr{d:50}}); 

    // $('#animateUp')[0].beginElement();









 






















});



}());