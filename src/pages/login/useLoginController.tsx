import { useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginPost } from "../../store/auth/authDataSlice";

const useLoginController = () => {

  const { otpError } = useSelector(
    (state: any) => state.auth
);

const [show, setShow] = useState(false);
const [otpNumber, setOtpNumber] = useState("");
const [otpErrorShow, setotpErrorShow] = useState(false);
const handleClose = () => setShow(false);
const dispatch = useDispatch<any>();

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter the valid username")
        .required("Username should not be empty"),
    password: yup
        .string()
        .min(3, "Please enter the min 3 letter")
        .required("Password should not be empty"),
});
let _Fields = { email: "", password: "" };



const handleSubmit = (event: any) => {
    const userPayload = {
        email: event.email,
        password: event.password,
    };
    dispatch(loginPost(userPayload));

};

const formik = useFormik({
    initialValues: _Fields,
    validationSchema: schema,
    onSubmit: handleSubmit,
});




  return {
    formik,
    handleClose,
    show,
    otpNumber,
    otpErrorShow,
    otpError,
    setOtpNumber,
    setotpErrorShow
  }
}

export default useLoginController