import { useEffect } from "react";
import { LoginForm } from "../../modules";
import { Logo } from "../../assets/images";

const Login = () => {
  useEffect(() => {
    document.querySelectorAll(".logo").forEach((logo: any) => {
      logo.style.left = Math.random() * 100 + "vw";
      logo.style.animationDuration = (15 + Math.random() * 10) + "s";
      logo.style.width = (10 + Math.random() * 90) + "px";
    });
  }, []);

  return (
    <div className="relative h-[100vh] flex justify-center items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img src={Logo} className="logo floating absolute" />
        <img src={Logo} className="logo floating absolute" />
        <img src={Logo} className="logo floating absolute" />
        <img src={Logo} className="logo floating absolute" />
        <img src={Logo} className="logo floating absolute" />
        <img src={Logo} className="logo floating absolute" />
        <img src={Logo} className="logo floating absolute" />
        <img src={Logo} className="logo floating absolute" />
        <img src={Logo} className="logo floating absolute" />
        <img src={Logo} className="logo floating absolute" />
      </div>

      <div className="w-[360px]">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
