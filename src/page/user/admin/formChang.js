import React from "react";
import Input from "../../../components/TextInputLabel";
import Button from "../../../components/Button";
export default function Form({ form, handleSubmit, handleChange, isLoading }) {
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
        name="OldPassword"
        type="password"
        placeholder="oldPassword"
        label="Password lama"
        onChange={handleChange}
        value={form.OldPassword}
      />
      <Input
        name="newPassword"
        type="password"
        placeholder="newPassword"
        label="New Password"
        onChange={handleChange}
        value={form.newPassword}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="newPassword"
        label="Confirm New Password"
        onChange={handleChange}
        value={form.confirmPassword}
      />
      <Button
        className={`btn mt-5 py-3  border-0 w-full lg:w-full block  hover:outline-green-10 hover:bg-green-10/90 ${
          isLoading ? "bg-gray-10" : "bg-green-10"
        }`}
        type="button"
        title={`change`}
        onClick={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
}
