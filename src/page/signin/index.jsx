import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSignin from "./form";
import Alert from "../../components/Alert";
import { postData } from "../../utils/fatch";
import { userLogin } from "../../redux/auth/actions";
import { useDispatch } from "react-redux";

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await postData(`/cms/auth/signin`, form);
    if (res?.data?.data) {
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.role
          // res.data.data.refreshToken
        )
      );
      setIsLoading(false);
      navigate("/dashboard");
    } else {
      setIsLoading(false);
      Alert({
        title: res?.response?.data?.msg ?? "Internal server error",
        icon:
          res?.response?.data?.msg === "Please provide email and password"
            ? "warning"
            : "error",
      });
    }
  };

  return (
    <main className="md:h-[20rem] h-[28rem] ">
      <div className="container flex items-center justify-center">
        <div className="md:ml-40 rounded-2xl mt-10 md:mt-[6rem] p-10 bg-whitw-20 text-blue-30  shadow-2xl">
          <h1 className="text-center font-bold text-3xl my-5">Sing In</h1>
          <FormSignin
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}
