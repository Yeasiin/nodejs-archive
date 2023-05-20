import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

import { useRegisterMutation } from "../redux/services/auth";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>();

  const [registerUser, { isLoading, isError, error }] = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    registerUser(data);
  };

  useEffect(() => {
    console.log(error?.data.message);
  }, [isError]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Enter Your Name</label>
        <input
          placeholder="Enter Your Name"
          type="text"
          {...register("name", {
            required: "Name Is Required",
            minLength: { value: 3, message: "Minimum 3 character is required" },
          })}
        />
        <span>{errors.name?.message}</span>
        <br />
        <br />
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
        <br />
        <br />
        <label htmlFor="name">Confirm Password</label>
        <input
          placeholder="Confirm password"
          type="text"
          {...register("confirm", {
            required: "Confirm Password Is required",
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Your Passwords do not match";
              }
            },
          })}
        />
        <span>{errors.confirm?.message}</span>
        <input type="submit" value={isLoading ? "loading..." : "Register"} />
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 40rem;
  margin-inline: auto;
  border: 0.2rem solid #dde;
  padding: 2rem 1.5rem;
  border-radius: 0.4px;

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
