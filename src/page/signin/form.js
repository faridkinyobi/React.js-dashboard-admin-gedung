import React from "react";
import Input from "../../components/TextInputLabel";
import Button from "../../components/Button";

const FormSignin = ({form,handleSubmit,handleChange,isLoading}) => {
  return (
    <form>
      <Input
        name="email"
        type="text"
        placeholder="email"
        label="email"
        onChange={handleChange}
        value={form.email}
      />
      <Input
        name="password"
        type="password"
        placeholder="password"
        label="Password"
        onChange={handleChange}
        value={form.password}
      />
      <Button
        className={`btn mt-5 py-3  border-0 w-full lg:w-full block  hover:outline-green-10 hover:bg-green-10/90 ${isLoading? "bg-gray-10":"bg-green-10"}`}
        type="button"
        title="Sing in"
        onClick={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
      />
      {/* <h2 className="my-3 mx-4 text-xl block">
        New here
        <NavLink className=" text-blue-10 mx-1" href="/signup">
          sing up
        </NavLink>
      </h2> */}
    </form>
  );
};

export default FormSignin;
