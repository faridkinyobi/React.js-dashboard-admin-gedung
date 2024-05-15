import React from "react";
import Input from "../../../components/TextInputLabel";
import Button from "../../../components/Button";
export default function Form({
  form,
  handleSubmit,
  handleChange,
  isLoading,
  edit
}) {
  return (
    <form>
      <Input
        name="name"
        type="text"
        placeholder="name"
        label="name"
        onChange={handleChange}
        value={form.name}
      />
      <Input
        name="email"
        type="email"
        placeholder="email"
        label="email"
        onChange={handleChange}
        value={form.email}
      />
      <Input
        name="role"
        type="text"
        placeholder="role"
        label="role"
        onChange={handleChange}
        value={form.role}
      />
      <Input
        name="password"
        type="password"
        placeholder="password"
        label="password"
        onChange={handleChange}
        value={form.password}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="confirm Password"
        label="confirm Password"
        onChange={handleChange}
        value={form.confirmPassword}
      />
     
      <Button
        className={`btn mt-5 py-3  border-0 w-full lg:w-full block  hover:outline-green-10 hover:bg-green-10/90 ${
          isLoading ? "bg-gray-10" : "bg-green-10"
        }`}
        type="button"
        title={`${edit ? "Ubah" : "Simpan"}`}
        onClick={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
}
