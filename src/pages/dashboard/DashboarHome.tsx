import { useEffect } from "react";
import { PATH } from "../../components";

const DashboarHome = () => {
  useEffect(() => {
    location.pathname = PATH.stacks
  }, [])
  return "";
}

export default DashboarHome
