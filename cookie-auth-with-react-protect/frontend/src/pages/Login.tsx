import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { useLoginMutation } from "../redux/services/auth";

type LoginInput = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const [loginUser, { isSuccess, isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    console.log(data);
    loginUser(data);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Enter Your Email</label>
        <input
          placeholder="Enter Your Email"
          type="text"
          {...register("email", {
            required: "Email address is required",
            pattern: {
              value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
              message: "Enter a valid email address",
            },
          })}
        />
        <span>{errors.email?.message}</span>
        <br />
        <br />
        <label htmlFor="name">Enter Your Password</label>
        <input
          placeholder="Enter Your password"
          type="text"
          {...register("password", {
            required: "Password Is Required",
            minLength: {
              value: 6,
              message: "Password Must be 6 character long",
            },
          })}
        />
        <span>{errors.password?.message}</span>

        <input
          type="submit"
          value={isSuccess ? "✔" : isLoading ? "loading..." : "Login"}
        />
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 40rem;
  margin-inline: auto;
  border: 1px solid #dde;
  padding: 2rem 1.5rem;
  border-radius: 0.4rem;

  & label {
    margin-bottom: 0.5rem;
    display: inline-block;
  }

  & input {
    border: 1px solid #cfcfcf;
    padding: 0.8rem 1.2rem;
    border-radius: 0.2rem;
    width: 100%;
  }

  & input[type="submit"] {
    margin-top: 2rem;
    border: 1px solid #dde;
    background-color: #9ab4ec;
    padding: 0.7rem 1rem;
    border-radius: 0.3rem;
  }
`;
