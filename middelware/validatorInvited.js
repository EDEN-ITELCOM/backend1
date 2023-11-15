const {check, validationResult}=require("express-validator")

exports.registerValidation=()=>[
  check("invitedname","inviter name require !").notEmpty(),
  check("invitedlastname","inviter lastname require !").notEmpty()
]

exports.Validator=(req,res,next)=>{
  const errors=validationResult(req)
  errors.isEmpty()?next():res.status(400).send(errors.array())
}