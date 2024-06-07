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
  handleFasilitasChange,
  handleHargaChange,
  handlePlusFasilitas,
  handlePlusHarga,
}) {
  // console.log("handleFasilitasChange", handleFasilitasChange);
  // console.log(" handleHargaChange", handleHargaChange);
  // console.log("handlePlusHarga", handlePlusHarga);
  // console.log(" handlePlusFasilitas", handlePlusFasilitas);
  return (
    <form>
      <div className=" flex flex-row">
        <div>
          <Input
            name="titel"
            type="text"
            placeholder="Paket"
            label="Titel paket yang disewakan "
            onChange={handleChange}
            value={form.titel}
          />
          {form.fasilitas.map((fasilitas, index) => (
            <div key={index}>
              <Input
                name="detail"
                type="text"
                placeholder="Kursi Vip"
                label="Detail Fasilitas"
                onChange={(e) => handleFasilitasChange(e, index)}
                value={fasilitas.detail}
              />
            </div>
          ))}
          <Button
            title="Tambah fasilitas"
            onClick={handlePlusFasilitas}
            className={` btn mt-5 py-2 mx-1 px-5 border bg-blue-200 border-blue-400  hover:outline-blue-400 hover:bg-blue-400/90 shadow `}
          />
        </div>
        <div>
          {form.harga.map((harga, index) => (
            <div key={index} className=" border-2">
              <Input
                name="kegiatan"
                type="text"
                placeholder="kegiatan"
                label="kegiatan"
                onChange={(e) => handleHargaChange(e, index)}
                value={harga.kegiata}
              />
              <Input
                name="hari"
                type="text"
                placeholder="hari"
                label="hari"
                onChange={(e) => handleHargaChange(e, index)}
                value={harga.hari}
              />
              <Input
                name="warga"
                type="text"
                placeholder="warga"
                label="warga"
                onChange={(e) => handleHargaChange(e, index)}
                value={harga.warga}
              />
              <label>Harga Detail</label>
              <InputRp
                // customInput={Input}
                thousandSeparator={true}
                prefix={"Rp "}
                name="hargadetail"
                value={harga.hargadetail}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  handleHargaChange(
                    { target: { name: "hargadetail", value: floatValue } },
                    index
                  );
                }}
              />
            </div>
          ))}
          <Button
            className={`btn mt-5 py-2 mx-1 px-5 border bg-yellow-200 border-yellow-400  hover:outline-yellow-400 hover:bg-yellow-400/90 shadow `}
            title="Tambah Harga"
            onClick={handlePlusHarga}
          />
        </div>
      </div>

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
