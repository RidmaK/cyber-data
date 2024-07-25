import { useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axiosClient from "../../../utils/axios-client";
import Input from "../../common/Input";
import PasswordInput from "../../common/PasswordInput";
import Button from "../../common/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setUser, setToken, token } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    axiosClient
      .post("/login", { email, password })
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        Cookies.set('ACCESS_TOKEN', data.token, { expires: 7 }); // Set token in cookies
        route.push('/dashboard')
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setMessage(response.data.errors || "Invalid credentials.");
          } else {
            setMessage(response.data.message || "Invalid credentials.");
          }
        } else {
          setMessage("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message && (
            <div className="alert">
              <p>{message}</p>
            </div>
          )}
          <Input ref={emailRef} type="email" placeholder="Email" />
          <PasswordInput
            ref={passwordRef}
            placeholder="Password"
            showPassword={showPassword}
            onTogglePasswordVisibility={togglePasswordVisibility}
          />
          <Button type="submit" label="Login" btn="btn-block btn-auth" />
          <p className="message">
            Not registered? <Link href="/auth/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
