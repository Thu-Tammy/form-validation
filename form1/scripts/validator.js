function Validator(options) {

    var selectorRules = {};

    function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
    var errorMess;

    var rules = selectorRules[rule.selector]
    
    for (let i = 0; i < rules.length; i++) {
        errorMess = rules[i](inputElement.value);
        if (errorMess) break;
    }

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

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push[rule.test]
            } else {
            selectorRules[rule.selector] = [rule.test];
            }
        
           
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

Validator.isRequired = function(selector, message) {
  return {
      selector: selector,
      test: function(value) {
            return value.trim() ? undefined : message ||"Please enter here"
      }
  };
}

Validator.isEmail = function(selector) {
  return {
      selector: selector,
      test: function(value) {
          var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          return regex.test(value) ? undefined : "Please enter your email";
      }
  }
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
              return value.length >= min ? undefined : message || `Password must be at least ${min} characters`
        }
    };
  }

  Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
              return value === getConfirmValue() ? undefined : message || "Incorrect value"
        }
    };
  }
