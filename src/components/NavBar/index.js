import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "../Button/index";
import Link from "../NavLink/index";
import Logo from "../../logo5coklat.svg";
import {
  accessJadwal,
  accessPelanggan,
  accessOrders,
  accessUser,
  accessPayments,
  accessPaket,
  accessPenyewa,
  accessHome,
  accessAdmin,
  accessBukti,
} from "../../const/access";
// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const navitem = [
  {
    titel: "home",
    url: "/dashboard",
    roles: accessHome.lihat,
  },
  {
    titel: "order",
    url: "/order",
    roles: accessOrders.lihat,
  },
  {
    titel: "jadwal",
    url: "/jadwal",
    roles: accessJadwal.lihat,
  },
  {
    titel: "penyewa",
    url: "/penyewa",
    roles: accessPenyewa.lihat,
  },
  {
    titel: "paket",
    url: "/paket",
    roles: accessPaket.lihat,
  },
  {
    titel: "payment",
    url: "/payment",
    roles: accessPayments.lihat,
  },
  {
    titel: "Bukti",
    url: "/bukti",
    roles: accessBukti.lihat,
  },
  {
    titel: "laporan",
    url: "/laporan",
    roles: accessUser.lihat,
  },
  {
    titel: "user",
    url: "",
    roles: accessUser.lihat,
  },
];

export default function NavBar() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };
  const hendelDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full  lg:py-2 bg-blue-30 mb-8 drop-shadow-md">
      <div className=" padding-container flexBetween ">
        <img src={Logo} alt="Logo" width={190} height={120} />
        <div
          className={`pb-4 lg:gap-1  lg:flex px-2  absolute lg:static  w-full lg:w-auto left-0 top-20  translate-all ease-in-out duration-700
           ${
             clicked ? "left-[-100rem]" : ""
           }  bg-slate-950/80 lg:bg-transparent `}
        >
          {navitem.map((item, index) => (
            <ul className=" list-none lg:my-auto lg:mr-3 my-2" key={index}>
              <Link
                onMouseEnter={
                  item.titel === "user" ? hendelDropdown : undefined
                }
                className="text-2xl lg:text-xl font-medium mx-5 lg:mx-1 text-gray-10 hover:text-white-20/90"
                role={role}
                roles={item.roles}
                href={item.url}
              >
                {item.titel}
              </Link>
            </ul>
          ))}
          {isOpen && (
            <ul className=" text-gray-10 hover:text-white-20/90 dropdown-menu transition-transform delay-700 origin-top-right lg:absolute lg:left-[58rem]  lg:mt-[3rem] text-xl w-36   bg-blue-40 rounded-md px-3 py-2 mb-1 ml-7">
              <li className="my-1 py-1 pl-2 hover:bg-gray-10/30 hover:rounded-lg ">
                <Link
                  className="text-xl "
                  role={role}
                  roles={accessPelanggan.lihat}
                  href={"/pelanggan"}
                >
                  {"pelanggan"}
                </Link>
              </li>
              <li className="my-1 py-1 pl-2 hover:bg-gray-10/30 hover:rounded-lg ">
                <Link
                  className="text-xl "
                  role={role}
                  roles={accessAdmin.lihat}
                  href={"/admin"}
                >
                  {"admin"}
                </Link>
              </li>
            </ul>
          )}
          <Button
            className={`btn_blue font-semibold rounded-full text-base border-0 ml-10 
          `}
            type="button"
            title="log out"
            onClick={handleLogout}
          />
        </div>
        <div
          className="absolute top-0 right-0 m-5 p-1 rounded-xl border-2 border-gray-10 lg:hidden ms:hidden active:border-white-10 mr-7"
          onClick={handleClick}
        >
          {clicked ? (
            <FiMenu className="text-3xl text-gray-10 active:text-white-10" />
          ) : (
            <FiX className="text-3xl  text-gray-10 active:text-white-10" />
          )}
        </div>
      </div>
    </nav>
  );
}
