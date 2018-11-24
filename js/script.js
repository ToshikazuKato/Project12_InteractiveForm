$(document).ready(function() {

  //Define variables
  const jobTitle = $('#title');
  //const other = $('#title option[value="other"]')[0];
  const design = $('#design');
  const checkbox = $(':checkbox');
  const label = checkbox.parent();
  const activities = {
    'all' : 200,
    'js-frameworks' : 100,
    'js-libs' : 100,
    'express' : 100,
    'node' : 100,
    'build-tools' : 100,
    'npm' : 100
  };
  let price = 0;
  const payment = $('#payment');
  const registerBtn = $('[type="submit"]');
  const name = $('#name');
  const mail = $('#mail');
  const creditNum = $('#cc-num');
  const zip = $('#zip');
  const cvv = $('#cvv');
  //regex
  const nameRegex = /^[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/g;
  const mailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const creditNumRegex = /(5[1-5]\d{14})|(4\d{12}(\d{ 3})?)|(3[47]\d{13})|(6011\d{14})|((30[0-5]|36\d|38\d)\d{11})/;
  const zipcodeRegex = /^\d{5}$/;
  const cvvRegex = /^\d{3}$/;

  //Define functions

  //When the page first loads, the first text field should be in focus by default
  const autofocus = () =>{
    name.focus();
  }

  //Generate input text for job role when the user selects "other" from dropdwon menu
  const generateJobTitle = () => {
    const input = `<input type="text" id="other-title" name="user_jobTitle" placeholder="Your Job Role">`;
    $('#title').after(input);
  }

  //Insert text field when other is selected in job role
  const jobTitleTextField = () =>{
    jobTitle.change(function(){
      const selectedJob = $('#title option:selected').val();
      if( selectedJob === "other" ){
        generateJobTitle();
      }else{

        if($('#other-title')){
            $('#other-title').remove();
        }

      }
    });
  }

  const showDesignOption = (theme) =>{
    if(theme === "js puns"){
      $('#color option[value="tomato"]').removeAttr('selected');

      $('#color option[value="cornflowerblue"]').show();
      $('#color option[value="cornflowerblue"]').attr('selected',true);
      $('#color option[value="darkslategrey"]').show();
      $('#color option[value="gold"]').show();
    }else{
      $('#color option[value="cornflowerblue"]').removeAttr('selected');

      $('#color option[value="tomato"]').show();
      $('#color option[value="tomato"]').attr('selected',true);
      $('#color option[value="steelblue"]').show();
      $('#color option[value="dimgrey"]').show();
    }

  }

  const hideDesignOption = (theme)=>{
    if(theme === "js puns"){
      $('#color option[value="tomato"]').hide();
      $('#color option[value="steelblue"]').hide();
      $('#color option[value="dimgrey"]').hide();
    }else{
      $('#color option[value="cornflowerblue"]').hide();
      $('#color option[value="darkslategrey"]').hide();
      $('#color option[value="gold"]').hide();
    }

  }

  const designChange = () => {
    design.change(function(){
      const selectedDesign = $('#design option:selected').val();
      if($('#design option').length === 3){
        $('#design option:first-child').remove();
      }
      if(selectedDesign !== "Select Theme"){
        //run function
        showDesignOption(selectedDesign);
        hideDesignOption(selectedDesign);
      }
    });
  }

  const displayPrice = (ele, ths) => {
    if ( $(ths).prop("checked") === true ) {
      price += activities[ele];
    }else{
      price -= activities[ele];
    }
    $('#total')[0].innerText = `Total:$${price}`;
  }

  const registerActivity = () => {
    let checkboxArr = [];
    const dayAndHour = [];
    label.map((val) => {
      checkboxArr.push(label[val].innerText);
    });

    activityName = [];
    for (let i = 1; i < checkbox.length; i++) {
      activityName.push(checkbox[i].name);
    };

    checkbox.click(function(e) {

      const selected = e.target.name;

      if($('#total').length === 0){
        const totalPrice = `<span id="total">Total:$${activities[selected]} </span>`;
        $('.activities label:last').after(totalPrice);
      }
      displayPrice(selected, this);

      if( $(this).prop("checked") === true ){
        if(selected === 'js-frameworks' || selected === 'express'){
          selected === 'js-frameworks' ?
          (
            $('input[name="express"]').attr("disabled",true),
            $('input[name="express"]').parent().css("color",'grey')
          ) :
          (
            $('input[name="js-frameworks"]').attr("disabled",true),
            $('input[name="js-frameworks"]').parent().css("color",'grey')
          );
        }else if (selected === 'js-libs' || selected === 'node'){
          selected === 'js-libs' ?
          (
          $('input[name="node"]').attr("disabled",true),
          $('input[name="node"]').parent().css("color",'grey')
          ) :
          (
          $('input[name="js-libs"]').attr("disabled",true),
          $('input[name="js-libs"]').parent().css("color",'grey')
          );
        }
      }else{
        if(selected === 'js-frameworks' || selected === 'express'){
          selected === 'js-frameworks' ?
          (
            $('input[name="express"]').attr("disabled",false),
            $('input[name="express"]').parent().css("color",'black')
          ) :
          (
            $('input[name="js-frameworks"]').attr("disabled",false),
            $('input[name="js-frameworks"]').parent().css("color",'black')
          );
        }else if (selected === 'js-libs' || selected === 'node'){
          selected === 'js-libs' ?
          (
          $('input[name="node"]').attr("disabled",false),
          $('input[name="node"]').parent().css("color",'black')
          ) :
          (
          $('input[name="js-libs"]').attr("disabled",false),
          $('input[name="js-libs"]').parent().css("color",'black')
          );
        }
      }

    }); //click event
  }

  const paymentOption = () => {
    //Credit card is selected by default
    $('#credit-card').siblings().eq(4).hide();
    $('#credit-card').siblings().eq(3).hide();

    payment.change(function(){
      const selectedPayment = $('#payment option:selected').val();

      if($('#payment option').length === 4){
        $('#payment option:first-child').remove();
      }


      if(selectedPayment === 'credit card'){
        $('#credit-card').show();
        $('#credit-card').siblings().eq(4).hide();
        $('#credit-card').siblings().eq(3).hide();

      }else if(selectedPayment === 'paypal'){
        $('#credit-card').siblings().eq(3).show();
        $('#credit-card').hide();
        $('#credit-card').siblings().eq(4).hide();
      }else{
        $('#credit-card').siblings().eq(4).show();
        $('#credit-card').hide();
        $('#credit-card').siblings().eq(3).hide();
      }
    });
  }

  const validationForInput = (val,reg) => {
    return reg.test(val);
  }
  name.blur( e => {
    const boo = validationForInput(e.target.value,nameRegex);
    boo === true ? name.removeClass("invalid") : name.addClass("invalid");
  });

  // const formatEmail = email => {
  //   const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  //   return regex.test(email);
  // }

  mail.blur(e => {
    const boo = validationForInput(e.target.value,mailRegex);
    boo === true ? mail.removeClass("invalid") : mail.addClass("invalid");
  });

  const activityValidation = () => {
    let selectedAct = [];
    label.find("input:checked").each((i, val)=>{
    selectedAct.push(val);
    });

    if(selectedAct.length > 0){
      return true;
    }else{
      return false;
    }

  }

  creditNum.blur(e => {
    const boo = validationForInput(e.target.value,creditNumRegex);
    boo === true ? creditNum.removeClass("invalid") : creditNum.addClass("invalid");
  });

  zip.blur(e => {
    const boo = validationForInput(e.target.value,zipcodeRegex);
    boo === true ? zip.removeClass("invalid") : zip.addClass("invalid");
  });

  cvv.blur(e => {
    const boo = validationForInput(e.target.value,cvvRegex);
    boo === true ? cvv.removeClass("invalid") : cvv.addClass("invalid");
  });

  const paymentValidation = option => {

      // credit number validation
      const creditNumRegex = /(5[1-5]\d{14})|(4\d{12}(\d{ 3})?)|(3[47]\d{13})|(6011\d{14})|((30[0-5]|36\d|38\d)\d{11})/;
      const resultCreditNum = creditNumRegex.test(creditNum.val());
      resultCreditNum === false ? creditNum.addClass('invalid') : creditNum.removeClass('invalid') ;
      //return option === 'credit card' ? resultCreditNum : false;

      // zip code validation
      const zipcodeRegex = /^\d{5}$/;
      const resultZip = zipcodeRegex.test(zip.val());
      resultZip === false ? zip.addClass('invalid') : zip.removeClass('invalid') ;
      //return option === 'credit card' ? resultZip : false;

      // CVV validation
      const cvvRegex = /^\d{3}$/;
      const resultCVV = cvvRegex.test(cvv.val());
      resultCVV === false ? cvv.addClass('invalid') : cvv.removeClass('invalid') ;
      //return option === 'credit card' ? resultCVV : false;

      return `option === 'credit card' ?
                      (resultCreditNum === true ?
                        (resultZip === true ? resultCVV : false ; ) :
                      false ;) :
                    false;`

  }

  registerBtn.click( e => {
    const activityValid = activityValidation();
    const selectedPayment = $('#payment option:selected').val();
    const paymentValid = paymentValidation(selectedPayment);
    if(name.val() === "" || activityValid === false || paymentValid === false){
      return false;
    }else{
      return true;
    }
  });


  //Run
  autofocus();
  jobTitleTextField();
  designChange();
  registerActivity();
  paymentOption();

});//$(document).ready
