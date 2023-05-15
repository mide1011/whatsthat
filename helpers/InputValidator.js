import * as EmailValidator from 'email-validator';



const isValidEmail = (email) => {
  return EmailValidator.validate(email)

}

const isValidPassword = (password) => {

  const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
  return PASSWORD_REGEX.test(password)


}

const validName = (name) => {
  const NAME_REGEX = /^[a-z ,.'-]+$/i;
  return NAME_REGEX.test(name)
}


const validateDetails = (firstName, lastName, email, password) => {


  return (validName(firstName) && validName(lastName) && isValidEmail(email) && isValidPassword(password))

  }



  const InputValidator = {
    isValidEmail,
    isValidPassword,
    validName,
    validateDetails
  }

  export default InputValidator;







