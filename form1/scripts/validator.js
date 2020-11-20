function Validator(options) {

    function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
    var errorMess = rule.test(inputElement.value);
    if (errorMess) {
        errorElement.innerText = errorMess;
        inputElement.parentElement.classList.add('invalid');
    } else {
        errorElement.innerText = "";
        inputElement.parentElement.classList.remove('invalid');

    }

    }
    var formElement = document.querySelector(options.form)

    if (formElement) {
        options.rules.forEach(function(rule){

           
            var inputElement = formElement.querySelector(rule.selector);
            
            if (inputElement) {
                inputElement.onblur = function() {
                    //value: inputElement.value
                    //test func: rule.test
                 validate(inputElement, rule);
                }
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        })
    }
}

Validator.isRequired = function(selector) {
  return {
      selector: selector,
      test: function(value) {
            return value.trim() ? undefined : "Vui lòng nhập trường này"
      }
  };
}

Validator.isEmail = function(selector) {
  return {
      selector: selector,
      test: function(value) {
          var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          return regex.test(value) ? undefined : "Vui lòng nhập email";
      }
  }
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
              return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`
        }
    };
  }

  Validator.isConfirmed = function(selector, getConfirmValue) {
    return {
        selector: selector,
        test: function(value) {
              return value === getConfirmValue() ? undefined : "Giá trị nhập vào không chính xác"
        }
    };
  }
