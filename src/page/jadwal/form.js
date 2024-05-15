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
  const MinCreatDateMUlai = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const MinCreatDateAkhir = () => {
    const today = new Date(form.tgl_mulai);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <form>
      <Input
        name="tgl_mulai"
        type="date"
        placeholder="tanggal mulai"
        label="tanggal mulai"
        onChange={handleChange}
        value={form.tgl_mulai}
        min={MinCreatDateMUlai()}
      />
      <Input
        name="tgl_akhir"
        type="date"
        placeholder="tanggal akhir"
        label="tanggal akhir"
        onChange={handleChange}
        value={form.tgl_akhir}
        min={MinCreatDateAkhir()}
      />
      <Input
        name="waktu"
        type="text"
        placeholder="waktu"
        label="waktu"
        onChange={handleChange}
        value={form.waktu}
      />
      <Input
        name="kegiatan"
        type="text"
        placeholder="kegiatan"
        label="kegiatan"
        onChange={handleChange}
        value={form.kegiatan}
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
