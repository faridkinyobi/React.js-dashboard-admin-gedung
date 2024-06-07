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
    status_kegiatan: "",
    lama: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchOnejadwal = async () => {
    const res = await getData(`/cms/jadwal/${jadwalId}`);
    setForm({
      ...form,
      kegiatan: res.data.data.kegiatan,
      waktu: res.data.data.waktu,
      tgl_akhir: moment(res.data.data.tgl_akhir).format("YYYY-MM-DD"),
      tgl_mulai: moment(res.data.data.tgl_mulai).format("YYYY-MM-DD"),
    });
  };

  useEffect(() => {
    fetchOnejadwal();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await putData(`/cms/jadwal/${jadwalId}`, form);
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
        icon:
          res?.response?.data?.msg === "Please provide email and password"
            ? "warning"
            : "error",
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
