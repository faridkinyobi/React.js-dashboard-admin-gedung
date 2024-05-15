import React from "react";
import Input from "../../components/TextInputLabel";
import Button from "../../components/Button";
import { config } from "../../config";
export default function Form({
  form,
  handleSubmit,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <form>
      <Input
        name="type"
        type="text"
        placeholder="Nama Bank"
        label="Nama Bank"
        onChange={handleChange}
        value={form.type}
      />
      <Input
        name="avatar"
        type="file"
        placeholder="img"
        label="Foto Bank"
        onChange={handleChange}
        // value={form.avatar}
      />
      {form.avatar !== "" && (
        <div>
          <img
            width={171}
            height={180}
            alt="171x180"
            src={`${config.api_image}/${form.avatar}`}
          />
        </div>
      )}
      <Input
        name="Number"
        type="number"
        placeholder="Masukan Nomer Rekening"
        label="Nomer Rekening"
        onChange={handleChange}
        value={form.Number}
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
