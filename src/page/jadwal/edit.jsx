import React, { useState, useEffect } from "react";
import Form from "./form";
import Alert from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { putData, getData } from "../../utils/fatch";
import moment from "moment";
export default function Edit() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jadwalId } = useParams();
  const [form, setForm] = useState({
    tgl_mulai: "",
    tgl_akhir: "",
    waktu: "",
    kegiatan: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let timeRange = "";
    if (value === "Pagi") {
      timeRange = "(06:00 - 18:00) Pagi";
    } else if (value === "Malam") {
      timeRange = "(18:00 - 06:00) Malam";
    }
    setForm({ ...form, [name]: value, waktu: timeRange });
  };

  const fetchOnejadwal = async () => {
    const res = await getData(`/cms/jadwal/${jadwalId}`);
    setForm({
      ...form,
      kegiatan: res.data.data.kegiatan,
      waktu: res.data.data.waktu,
      tgl_akhir: res.data.data.tgl_akhir
        ? moment(res.data.data.tgl_akhir).format("YYYY-MM-DD")
        : null,
      tgl_mulai: moment(res.data.data.tgl_mulai).format("YYYY-MM-DD"),
    });
  };

  useEffect(() => {
    fetchOnejadwal();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const formattedForm = {
      ...form,
      tgl_mulai: moment(form.tgl_mulai).isValid()
        ? moment(form.tgl_mulai).startOf("day").toISOString()
        : form.tgl_mulai,
      tgl_akhir: moment(form.tgl_akhir).isValid()
        ? moment(form.tgl_akhir).endOf("day").toISOString()
        : form.tgl_akhir,
    };

    const res = await putData(`/cms/jadwal/${jadwalId}`, formattedForm);

    if (res?.data?.data) {
      Alert({
        title: "success",
        icon: "success",
      });
      setIsLoading(false);
      navigate("/jadwal");
    } else {
      setIsLoading(false);
      Alert({
        title: res?.response?.data?.msg ?? "Internal server error",
        icon: "error",
      });
    }
  };
  return (
    <main className="container flex items-center justify-center  md:mt-[-4rem]">
      <div className="bg-white-20 md:ml-40 rounded-2xl mt-1 md:mt-[3rem] p-7 shadow-xl ">
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          form={form}
          isLoading={isLoading}
          edit
        />
      </div>
    </main>
  );
}
