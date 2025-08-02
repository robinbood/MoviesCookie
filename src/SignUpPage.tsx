import { useForm } from "react-hook-form";

interface Signup {
    name?:string,
    password:string,
    username:string
}

const SignupPage = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<Signup>({
        defaultValues:{
            name:"",
            password:"",
            username:""
        }
    })

    return (
        <>
        <form onSubmit={handleSubmit((data) => {

        })}></form>
            <input {...register("name",{required:"This is required"})} placeholder="Johnny"/>
            <input {...register("username",{
                required:"we really need this,trust me!",
                minLength : {
                    value:3,
                    message:"min length is 3"
                }
            })} />
            <input {...register("password",{
                required:"This is required",
                minLength:{
                    value:6,
                    message:"Not everyone is dumb yk"
                }
            })}/>

            <input type="submit"  className="submit" />
        </>
    )
}
export default SignupPage;