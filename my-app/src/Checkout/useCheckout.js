import { useStateValue } from "../StateProvider";
import { useState, useEffect } from "react";

const useCheckout = (callback, validate) => {
  const [values, setValues] = useState({
    gender: "Nam",
    name: "",
    phoneNumber: "",
    shippingMethod: "Giao tận nơi",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [intitalState, dispatch] = useStateValue();

  const clearErrors = (name) => {
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const newValues = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const changeProfile = () => {
    dispatch({
      type: "CHANGE_PROFILE",
      payload: {
        name: values.name,
        phoneNumber: values.phoneNumber,
        address: values.address,
        request: values.request,
        gender: values.gender,
        shippingMethod: values.shippingMethod,
      },
    });
  };

  const handleChange = (e) => {
    const { name, htmlFor, value, innerHTML } = e.target;
    clearErrors(name || htmlFor);
    newValues(name || htmlFor, value || innerHTML);
  };
  useEffect(() => {
    changeProfile();
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  useEffect(() => {
    // console.log(Object.keys(errors).length)
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  return { values, handleSubmit, handleChange, errors };
};

export default useCheckout;
