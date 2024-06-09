import React, { useEffect } from "react";
import { fetchOrderPending } from "../../redux/orderPending/actions";
import { fetchTotalOrderSukses } from "../../redux/OrderStatusSukses/actions";
import { fetchTotalStatusPending } from "../../redux/order/actions";
import { fetchPelanggan} from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  // FaDonate,
  FaRestroom,
  // FaHandHoldingUsd,
  FaChartBar,
  FaClock,
  // FaGlobe,
} from "react-icons/fa";
import InfoCard from "../../components/card";
import { formatDate } from "../../utils/formatDate";

export default function Dashboard() {
  const dispatch = useDispatch();

  const OrderPending = useSelector((state) => state.OrderPending);
  const StatusPending = useSelector((state) => state.Order);
  const TotSukses = useSelector((state) => state.Card);
  const Card = useSelector((state) => state.User);

  useEffect(() => {
    dispatch(fetchOrderPending());
    dispatch(fetchTotalOrderSukses());
    dispatch(fetchPelanggan(true));
    dispatch(fetchTotalStatusPending());
  }, [dispatch]);

  return (
    <main className="px-4 lg:px-20 ">
      <div className="items-center flexCenter">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:mr-5">
          <InfoCard
            className="bg-green-10  shadow-emerald-50/60"
            icon={
              <FaRestroom className=" text-white-10/90 px-5 py-2 mr-2 bg-green-600/50 w-28 h-full text-left rounded-s-lg" />
            }
            title="Total Pelanggan"
            number={Card.data | "Loading..."}
          />
          <InfoCard
            className="bg-red-400 w-[18rem]  shadow-emerald-50/60"
            icon={
              <FaChartBar className=" text-white-10/90 px-5 py-2 mr-2 bg-red-600/50 w-28 h-full text-left rounded-s-lg" />
            }
            title="Order sukses"
            number={TotSukses.data | "Loading..."}
          />

          {/* <div className="bg-yellow-300 w-[18rem] h-32  justify-items-center  items-center flex rounded-lg shadow-md shadow-emerald-50/60">
            <FaChartBar className=" text-white-10/90 px-5 py-2 mr-2 bg-yellow-600/50 w-28 h-full text-left rounded-s-lg" />
            <div className="text-left">
              <h4 className="my-1 font-extrabold">Jumlah Transaksi</h4>
              <h1 className=" text-lg font-medium">100000</h1>
            </div>
          </div> */}
          {/* <div className="bg-blue-400 w-[18rem] h-32  justify-items-center  items-center flex rounded-lg shadow-md shadow-emerald-50/60">
            <FaHandHoldingUsd className=" text-white-10/90 px-5 py-2 mr-2 bg-blue-600/50 w-28 h-full text-left rounded-s-lg" />
            <div className="text-left">
              <h4 className="my-1 font-extrabold">Total </h4>
              <h1 className=" text-lg font-medium">100000</h1>
            </div>
          </div> */}
          <InfoCard
            className="bg-pink-400  shadow-emerald-50/60"
            icon={
              <FaClock className=" text-white-10/90 px-5 py-2 mr-5 bg-pink-600/50 w-28 h-full text-left rounded-s-lg" />
            }
            title="Order Pending"
            number={StatusPending.data | "Loading..."}
          />

          {/* <div className="bg-purple-400 w-[18rem] h-32  justify-items-center  items-center flex rounded-lg shadow-md shadow-emerald-50/60">
            <FaDonate className=" text-white-10/90 px-5 py-2 mr-5 bg-purple-600/50 w-28 h-full text-left rounded-s-lg" />
            <div className="text-left">
              <h4 className="my-1 font-extrabold">Total Omzet</h4>
              <h1 className=" text-lg font-medium">100000</h1>
            </div>
          </div> */}
        </div>
      </div>
      <div className="mt-10 mb-2 overflow-x-scroll md:overflow-hidden text-blue-30">
        <table className=" text-center  w-full border border-blue-20">
          <thead className=" bg-blue-400 table-fixed">
            <tr>
              <th className="  p-2">Nama</th>
              <th className="  p-2">Paket</th>
              <th className="  p-2">Status</th>
              <th className="  p-2">date</th>
            </tr>
          </thead>
          <tbody>
            {OrderPending.status === "process" ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              OrderPending.data.map((item, index) => (
                <tr className="border border-blue-20" key={index}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.NumberOrder}</td>
                  <td className="p-2">
                    <p
                      className={`py-2 px-1 ${
                        item.status !== "panding"
                          ? "bg-amber-500"
                          : item.status !== "sukses"
                          ? "bg-lime-600"
                          : "bg-red-500"
                      }`}
                    >
                      {item.status}
                    </p>
                  </td>
                  <td className="p-2">
                    {formatDate(new Date(item.date))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
