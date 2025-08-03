import { SubmitHandler, useForm } from "react-hook-form";
import "./Signup.css";
import { Link } from "react-router";

interface SignIn {
  password: string;
  username: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const onSubmit: SubmitHandler<SignIn> = (data) => {
    
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
              message: "Minimum length is 3",
            },
          })}
          placeholder="Mike_tyson_62"
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
          placeholder="********"
          className={errors.password ? "error" : ""}
        />
        <span className="error-message">{errors.password?.message}</span>


        <p>Not A Member?<Link to="/api/Signup">Sign Up</Link></p>

        <input type="submit" className="submit" value="Sign In" />
      </form>
    </div>
  );
};

export default SignInPage;
