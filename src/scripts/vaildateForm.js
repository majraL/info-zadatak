$('#btn-submit').on('click', (e) => {
  e.preventDefault();

  const mail = $('#email');
  const mailValue = mail.val();
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const errorMessage = "<span class='help-block smk-error-msg'>Enter a valid email</span>";
  
  const validateEmail = el => {
    return reg.test(el);
  }

  const message = () => {
    $(mail).parent().addClass('has-feedback has-error');
    $(errorMessage).insertAfter(mail);
  }

  if($('#form').smkValidate()) {

    if(validateEmail(mailValue)) {
      return false;
    } else {
      message();
    }

  }

});
  