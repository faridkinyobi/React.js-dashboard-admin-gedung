import React from "react";
import Input from "../../components/TextInputLabel";
import Button from "../../components/Button";
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
        name="alamat"
        type="text"
        placeholder="alamat"
        label="alamat"
        onChange={handleChange}
        value={form.alamat}
      />
      <Input
        name="no_tlp"
        type="tel"
        placeholder="08XXXXXXXXXX"
        label="no_tlp"
        onChange={handleChange}
        value={form.no_tlp}
        maxLength={12} 
        pattern="[0-9]{12}"
      />
      {/* <Input
        name="status kegiatan"
        type="text"
        placeholder="Status Kegiatan"
        label="Status Kegiatan"
        onChange={handleChange}
        value={form.status_kegiatan}
      /> */}
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
