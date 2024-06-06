import React from "react";
import Input from "../../components/TextInputLabel";
import Button from "../../components/Button";
import InputRp from "../../components/TextInputNumber/index";
export default function Form({
  form,
  handleSubmit,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <form>
      <InputRp
        prefix={"Rp "}
        placeholder="RP"
        label="pengeluaran"
        name="pengeluaran"
        value={form.pengeluaran}
        onValueChange={(values) => {
          const { floatValue } = values;
          handleChange({ target: { name: "pengeluaran", value: floatValue } });
        }}
      />
      <Input
        name="desc"
        type="text"
        placeholder="Descripsi pengeluaran"
        label="Keterangan"
        onChange={handleChange}
        value={form.desc}
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
