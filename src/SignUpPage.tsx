import { SubmitHandler, useForm } from "react-hook-form";
import "./Signup.css";
import { Link } from "react-router";

interface Signup {
  name?: string;
  password: string;
  username: string;
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({
    defaultValues: {
      name: "",
      password: "",
      username: "",
    },
  });

  const onSubmit: SubmitHandler<Signup> = (data) => {
    console.log(data);
    
  };

  return (
    <div className="signup-form">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "This is required" })}
          placeholder="Johnny"
          className={errors.name ? "error" : ""}
        />
        <span className="error-message">{errors.name?.message}</span>

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


        <p>Already A Member?<Link to="/api/Signin">Sign in</Link></p>

        <input type="submit" className="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignupPage;
