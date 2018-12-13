$(document).ready(function() {

  //Define variables
  const jobTitle = $('#title');
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

  //error message
  const nameErrMes = 'Name: e.g. "Liam Gallagher" ';
  const mailErrMes = 'Email: e.g. "become.fullstack@example.com" ';
  const activityErrMes = "Register for Activities: * Please select one of the options *";
  const creditNumErrMes = 'Card Number: * Required';
  const zipErrMes = 'Zip Code: * ';
  const cvvErrMes = 'CVV: * ';
  const paymentErrMes = "I'm going to pay with: * select one of the options";
  const designErrMes = 'Design: *Please Select one of the options';
  //Define functions

  //When the page first loads, the first text field should be in focus by default
  const autofocus = () =>{
    name.focus();
  }

  //displays only when "Other" is selected. Otherwise hide input field
  $('#other-title').hide();
    jobTitle.change(e => {
      e.target.value !== "other" ? $('#other-title').hide() : $('#other-title').show();
    });

  const themeColorArr = {
                           "js puns" : ["cornflowerblue","darkslategrey","gold"],
                           "heart js" : ["tomato","steelblue","dimgrey"]
                        };

  const themeLogic = (theme) => {

    theme === "js puns" ? $(`#color option[value='${themeColorArr["heart js"][0]}']`).removeAttr('selected') :
                          $(`#color option[value='${themeColorArr["js puns"][0]}']`).removeAttr('selected');

    themeColorArr[theme].map( (val,index) => {
      if(index === 0){
        $(`#color option[value='${val}']`).attr('selected',true);
      }
      $(`#color option[value='${val}']`).show();

    } );
  }

  const hideDesignOption = (theme) =>{
    let type = "";
    theme === "js puns" ? type = "heart js" :
                          type = "js puns" ;

    themeColorArr[type].map( (val, index) => {
      $(`#color option[value='${val}']`).hide();
    } );

  }

  const designChange = () => {
    design.change(function(){
      const selectedDesign = $('#design option:selected').val();
      if($('#design option').length === 3){
        $('#design option:first-child').remove();
      }
      if(selectedDesign !== "Select Theme"){
        //run function
        themeLogic(selectedDesign);
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
  // * Refactor *
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
  // * Refactor *
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

  const errorMessage = (res, obj, val, message) => {
    if(res){
      obj.removeClass("invalid");
      obj.siblings(`label[for="${val}"]`).removeClass("invalidLabel");
    }else{
      obj.addClass("invalid");
      obj.siblings(`label[for="${val}"]`).addClass("invalidLabel");
      obj.siblings(`label[for="${val}"]`).text(message);
    }
  }

  name.blur( e => {
    const boo = validationForInput(e.target.value,nameRegex);
    errorMessage(boo, name, "name", nameErrMes);

  });

  mail.blur(e => {
    const boo = validationForInput(e.target.value,mailRegex);
    errorMessage(boo, mail, "mail", mailErrMes);

  });

  const activityValidation = () => {
    let selectedAct = [];
    label.find("input:checked").each((i, val)=>{
    selectedAct.push(val);
    });

    if(selectedAct.length > 0){
      return true;
    }else{
      $(".activities legend").addClass('invalidLabel');
      $(".activities legend").text(activityErrMes);
      return false;
    }

  }

  creditNum.blur(e => {
    const boo = validationForInput(e.target.value,creditNumRegex);
    errorMessage(boo, creditNum, "cc-num", creditNumErrMes);

  });

  zip.blur(e => {
    const boo = validationForInput(e.target.value,zipcodeRegex);
    errorMessage(boo, zip, "zip", zipErrMes);

  });

  cvv.blur(e => {
    const boo = validationForInput(e.target.value,cvvRegex);
    errorMessage(boo, cvv, "cvv", cvvErrMes);

  });

  const paymentValidation = option => {

      if(option === "credit card"){

        // credit number validation
        const resultCreditNum = creditNumRegex.test(creditNum.val());
        errorMessage(resultCreditNum, creditNum, "cc-num", creditNumErrMes);


        // zip code validation
        const resultZip = zipcodeRegex.test(zip.val());
        errorMessage(resultZip, zip, "zip", zipErrMes);

        // CVV validation
        const resultCVV = cvvRegex.test(cvv.val());
        errorMessage(resultCVV, cvv, "cvv", cvvErrMes);

        return `option === 'credit card' ?
                        (resultCreditNum === true ?
                          (resultZip === true ? resultCVV : false ; ) :
                        false ;) :
                      false;`

      }else{
        $("#payment").addClass('invalid');
        $('label[for="payment"]').addClass("invalidLabel");
        $('label[for="payment"]').text(paymentErrMes);
        return false;
      }

  }

  registerBtn.click( e => {
    const selectedDesign = $('#design option:selected').val();
    const activityValid = activityValidation();
    const selectedPayment = $('#payment option:selected').val();
    const paymentValid = paymentValidation(selectedPayment);

    let designBoo = false;
    selectedDesign !== "Select Theme" ? designBoo = true : designBoo = false;
    errorMessage(designBoo, design, "design", designErrMes);

    const boo = validationForInput(mail.val(),mailRegex);
    errorMessage(boo, mail, "mail", mailErrMes);

    if(name.val() === "" || mail.val() === "" || selectedDesign === "Select Theme" || activityValid === false || paymentValid === false){
      return false;
    }else{
      return true;
    }
  });

  // validation messages

  //Run
  autofocus();
  designChange();
  registerActivity();
  paymentOption();

});//$(document).ready
