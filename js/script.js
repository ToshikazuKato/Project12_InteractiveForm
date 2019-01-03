$(document).ready(function() {

  // ****************conditional ErrMessage and real-time error message ****************

  //Define variables
  const jobTitle = $('#title');
  const design = $('#design');
  const themeColorArr = {
                           "js puns" : ["cornflowerblue","darkslategrey","gold"],
                           "heart js" : ["tomato","steelblue","dimgrey"]
                        };
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
  const creditCard = $('#credit-card');
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
  const creditNumErrMesEmpty = 'Card Number: * Enter Credit Card Number';
  const creditNumErrMes = 'Card Number: * Enter 13 to 16 digits Number';
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

  //hide color label and menu by default
  $("#colors-js-puns").hide();
  //T-shirt design logic
  const designChange = () => {
    //only display the color options that match the design selected in the "Design" menu ${themeColorArr}
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
    //hide the color options that doesn't match the design selected in the "Design" menu ${themeColorArr}
    const hideDesignOption = (theme) =>{
      let type = "";
      theme === "js puns" ? type = "heart js" :
                            type = "js puns" ;

      themeColorArr[type].map( (val, index) => {
        $(`#color option[value='${val}']`).hide();
      } );

    }
    //display and hide depending on the design selected
    design.change( e => {
      const selectedDesign = $('#design option:selected').val();
      if($('#design option').length === 3){
        $('#design option:first-child').remove();
      }
      if(selectedDesign !== "Select Theme"){
        //run function
        $("#colors-js-puns").show();
        themeLogic(selectedDesign);
        hideDesignOption(selectedDesign);
        let designBoo = false;
        selectedDesign !== "Select Theme" ? designBoo = true : designBoo = false;
        errorMessage(designBoo, design, "design", designErrMes);
      }
    });
  }
  //display price for activities that are selected
  const displayPrice = (ele, ths) => {
    if ( $(ths).prop("checked") === true ) {
      price += activities[ele];
    }else{
      price -= activities[ele];
    }
    $('#total')[0].innerText = `Total:$${price}`;
  }
  //check whether at least one activity is selected or not. Display error message by adding css class if needed.
  const activityValidation = () => {
    let selectedAct = [];
    label.find("input:checked").each((i, val)=>{
      selectedAct.push(val);
    });

    if(selectedAct.length > 0){
      $(".activities legend").removeClass('invalidLabel');
      return true;
    }else{
      $(".activities legend").addClass('invalidLabel');
      $(".activities legend").text(activityErrMes);
      return false;
    }

  }
  //Register ativity logic
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
    //Make it disable when any other activity are planned on the same day as the activity selected by checkbox
    checkbox.click(function(e) {

      const selected = e.target.name;

      if($('#total').length === 0){
        const totalPrice = `<span id="total">Total:$${activities[selected]} </span>`;
        $('.activities label:last').after(totalPrice);
      }
      displayPrice(selected, this);

      const checkboxValidation = (name, boo, color) => {
        $(`input[name='${name}']`).attr("disabled",boo),
        $(`input[name='${name}']`).parent().css("color",color)
      }

      if( $(this).prop("checked") === true ){
        if(selected === 'js-frameworks' || selected === 'express'){
          selected === 'js-frameworks' ? checkboxValidation("express", true, "grey"):
                                         checkboxValidation("js-frameworks", true, "grey");

        }else if (selected === 'js-libs' || selected === 'node'){
          selected === 'js-libs' ? checkboxValidation("node", true, "grey"):
                                   checkboxValidation("js-libs", true, "grey");
        }
      }else{
        if(selected === 'js-frameworks' || selected === 'express'){
          selected === 'js-frameworks' ? checkboxValidation("express", false, "black"):
                                         checkboxValidation("js-frameworks", false, "black");

        }else if (selected === 'js-libs' || selected === 'node'){
          selected === 'js-libs' ? checkboxValidation("node", false, "black"):
                                   checkboxValidation("js-libs", false, "black");

        }
      }
      activityValidation();
    }); //click event
  }
  // Payment option logic
  const paymentOption = () => {
    //function that hides element for payment option by index
    const hideEle = index => {
      index !== 0 ? creditCard.siblings().eq(index).hide() : creditCard.hide();
    }

    //Credit card is selected by default
    if($('#payment option').length === 4){
      $('#payment option:first-child').remove();
    }
    hideEle(3);
    hideEle(4);
    //check what's selected and show&hide elements depending selected option
    payment.change(function(){
      const selectedPayment = $('#payment option:selected').val();

      if(selectedPayment === 'credit card'){
        creditCard.show();
        hideEle(3);
        hideEle(4);

      }else if(selectedPayment === 'paypal'){
        creditCard.siblings().eq(3).show();
        hideEle(0);
        hideEle(4);

      }else{
        creditCard.siblings().eq(4).show();
        hideEle(0);
        hideEle(3);

      }
    });
  }
  //validation check by parameters (value, regex)
  const validationForInput = (val, reg) => {
    return reg.test(val);
  }
  //Add or remove error message by adding css class depending on the result of validationForInput function
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
  //real-time validation for name
  name.blur( e => {
    const boo = validationForInput(e.target.value,nameRegex);
    errorMessage(boo, name, "name", nameErrMes);

  });
  //real-time validation for mail
  mail.blur( e => {
    const boo = validationForInput(e.target.value,mailRegex);
    errorMessage(boo, mail, "mail", mailErrMes);

  });
  //real-time validation for credit card number
  creditNum.blur(e => {
    const boo = validationForInput(e.target.value,creditNumRegex);
    //Achieved conditional error message validation
    e.target.value === "" ? errorMessage(boo, creditNum, "cc-num", creditNumErrMesEmpty) :
                            errorMessage(boo, creditNum, "cc-num", creditNumErrMes);
  });
  //real-time validation for zip code
  zip.blur(e => {
    const boo = validationForInput(e.target.value,zipcodeRegex);
    errorMessage(boo, zip, "zip", zipErrMes);

  });
  //real-time validation for cvv
  cvv.blur(e => {
    const boo = validationForInput(e.target.value,cvvRegex);
    errorMessage(boo, cvv, "cvv", cvvErrMes);

  });
  // payment validation when credit card is selected
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

  //check all required fields are filled correectly on submission
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

  //Run
  autofocus();
  designChange();
  registerActivity();
  paymentOption();

});//$(document).ready
