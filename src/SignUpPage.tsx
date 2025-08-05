import { SubmitHandler, useForm } from "react-hook-form";
import "./Signup.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

interface Signup {
  name?: string;
  password: string;
  username: string;
}

const SignupPage = () => {
  const [respon,setResponsse] = useState<string>("")
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

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Signup> = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/Signup",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(data)
      })
      if(response.status===201){
        setTimeout(() => {
          navigate(
            "/api/Signin"
          )
        },1000)
        const donet = await response.text()
        setResponsse(donet)
        setTimeout(() => {
          setResponsse("")
        },1200)
      }else{
        const errorText   = await response.text()
        setResponsse(errorText)
        setTimeout(() => {
          setResponsse("")
        },800)
      }
    } catch (error:unknown) {
      console.log("Network error",error);
      
    }
    
  };

  return (
    <div className="signup-form">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "This is required" })}
          placeholder="Display Name"
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
          placeholder="Password "
          className={errors.password ? "error" : ""}
        />
        <span className="error-message">{errors.password?.message}</span>


        <p>Already A Member?<Link to="/api/Signin">Sign in</Link></p>
        <p>{respon}</p>

        <input type="submit" className="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignupPage;
