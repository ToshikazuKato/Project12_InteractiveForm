$(document).ready(function() {

  //Define variables
  const jobTitle = $('#title');
  //const other = $('#title option[value="other"]')[0];
  const design = $('#design');
  const checkbox = $(':checkbox');
  const label = checkbox.parent();
  //Define functions

  //When the page first loads, the first text field should be in focus by default
  const autofocus = () =>{
    const name = $('#name');
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
      //Add selected values into array
      // const startAt = $(this).parent().text().indexOf('—')+2;
      // const endAt = $(this).parent().text().indexOf(',');
      // dayAndHour.push($("input:checked").parent()[$("input:checked").parent().length-1].innerText.slice(startAt,endAt));

      console.log(e.target.name);
      const selected = e.target.name;

      if( $(this).prop("checked") === true ){
        if(selected === 'js-frameworks' || selected === 'express'){
          selected === 'js-frameworks' ?
          $('input[name="express"]').attr("disabled",true) : $('input[name="js-frameworks"]').attr("disabled",true);
        }else if (selected === 'js-libs' || selected === 'node'){
          selected === 'js-libs' ?
          $('input[name="node"]').attr("disabled",true) :
          $('input[name="js-libs"]').attr("disabled",true);
        }
      }else{
        if(selected === 'js-frameworks' || selected === 'express'){
          selected === 'js-frameworks' ?
          $('input[name="express"]').attr("disabled",false) : $('input[name="js-frameworks"]').attr("disabled",false);
        }else if (selected === 'js-libs' || selected === 'node'){
          selected === 'js-libs' ?
          $('input[name="node"]').attr("disabled",false) :
          $('input[name="js-libs"]').attr("disabled",false);
        }
      }




    }); //click event
  }


  //Run
  autofocus();
  jobTitleTextField();
  designChange();
  registerActivity();

});//$(document).ready
