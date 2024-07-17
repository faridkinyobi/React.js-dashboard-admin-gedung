// import React, { useState, useEffect,useCallback } from "react";
// import Form from "../admin/form";
// import Alert from "../../components/Alert";
// import { useNavigate, useParams } from "react-router-dom";
// import { putData, getData } from "../../utils/fatch";
// export default function Edit() {
//   const navigate = useNavigate();
//   const { PenyewaId } = useParams();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     alamat: "",
//     no_tlp: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const fetchOnePenyewa = useCallback(async () => {
//     const res = await getData(`/cms/penyewa/${PenyewaId}`);
//     setForm({
//       ...form,
//       name: res.data.data.name,
//       email: res.data.data.email,
//       alamat: res.data.data.alamat,
//       no_tlp: res.data.data.no_tlp,
//     });
//   },[PenyewaId]);
//   useEffect(() => {
//     fetchOnePenyewa();
//   }, [fetchOnePenyewa])

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     const res = await putData(`/cms/penyewa/${PenyewaId}`, form);
//     if (res?.data?.data) {
//       Alert({
//         title: "success",
//         icon: "success",
//       });
//       setIsLoading(false);
//       navigate("/penyewa");
//     } else {
//       setIsLoading(false);
//       Alert({
//         title: res?.response?.data?.msg ?? "Internal server error",
//         icon:
//           res?.response?.data?.msg === "Please provide email and password"
//             ? "warning"
//             : "error",
//       });
//     }
//   };
//   return (
//     <main className="bg-blue-30 md:h-[20rem] h-[28rem]">
//       <div className="container flex items-center justify-center">
//         <div className="bg-white-20 md:ml-40 rounded-2xl mt-10 sm:mt-[9rem] lg:mt-[2rem]">
//           <div className="m-10">
//             <Form
//               handleChange={handleChange}
//               handleSubmit={handleSubmit}
//               form={form}
//               isLoading={isLoading}
//               edit
//             />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
