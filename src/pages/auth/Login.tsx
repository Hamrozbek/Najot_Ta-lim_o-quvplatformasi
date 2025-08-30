// import { Vedio } from "../../assets/vedios";
import { LoginForm } from "../../modules";

const Login = () => {
  return (
    <div className="relative h-[100vh] flex justify-center items-center">
      {/* <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover -z-10">
        <source src={Vedio} type="video/mp4" />
      </video> */}

      <div className="w-[360px] relative z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
