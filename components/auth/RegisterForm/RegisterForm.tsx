import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/utils/axios-client";
import Link from "next/link";
import { createRef, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export default function Signup() {
  const route = useRouter();
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const phoneNumberRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const passwordConfirmationRef = createRef<HTMLInputElement>();
  const { setUser, setToken } = useAuth();
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const onSubmit = async (ev: any) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      phone_number: phoneNumberRef.current?.value,
      password: passwordRef.current?.value,
      password_confirmation: passwordConfirmationRef.current?.value,
    };
    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        Cookies.set('ACCESS_TOKEN', data.token, { expires: 7 }); // Set token in cookies
        route.push('/dashboard')
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <Input ref={nameRef} type="text" placeholder="Full Name" />
          <Input ref={emailRef} type="email" placeholder="Email Address" />
          <Input ref={phoneNumberRef} type="text" placeholder="Phone Number" />
          <PasswordInput
            ref={passwordRef}
            placeholder="Password"
            showPassword={showPassword}
            onTogglePasswordVisibility={togglePasswordVisibility}
          />
          <PasswordInput
            ref={passwordConfirmationRef}
            placeholder="Confirm Password"
            showPassword={showPasswordConfirmation}
            onTogglePasswordVisibility={togglePasswordConfirmationVisibility}
          />
          <Button type="submit" label="Signup" btn="btn-block btn-auth" />
          <p className="message">
            Already registered? <Link href="/auth/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
