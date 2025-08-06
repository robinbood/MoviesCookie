import { SubmitHandler, useForm } from "react-hook-form";
import "./Signup.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

interface SignIn {
  username: string;
  password: string;
}

const SignInPage = () => {
  const [respon, setResponsse] = useState<string>("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignIn> = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/SignIn", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status===200) {
        
        navigate("/api/home");
      } else {
        const errorText = await response.text();
        setResponsse(errorText);
        setTimeout(() => {
          setResponsse("");
        }, 200);
      }
    } catch (error: unknown) {
      console.log("Network Error:", error);
    }
  };

  return (
    <div className="signup-form">
      <h2>Enter Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", {
            required: "We really need this, trust me!",
            minLength: {
              value: 3,
              message: " Minimum length is 3",
            },
          })}
          placeholder="Username"
          className={errors.username ? "error" : ""}
        />

        <span className="error-message">{errors.username?.message}</span>

        <input
          type="password"
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 6,
              message: "Not everyone is dumb, you know!",
            },
          })}
          placeholder="Password"
          className={errors.password ? "error" : ""}
        />
        <span className="error-message">{errors.password?.message}</span>

        <p>
          Not A Member?<Link to="/api/Signup">Sign Up</Link>
        </p>
        <p>{respon}</p>

        <input type="submit" className="submit" value="Sign In" />
      </form>
    </div>
  );
};

export default SignInPage;
