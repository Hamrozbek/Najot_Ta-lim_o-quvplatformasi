import { useEffect } from "react";
import { PATH } from "../../components";

const DashboarHome = () => {
  useEffect(() => {
    location.pathname = PATH.gropus
  }, [])
  return "";
}

export default DashboarHome
