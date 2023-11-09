import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as TbIcons from "react-icons/tb";
// tabler icons - json, lock, unlock

export const SidebarData = [
  { title: "Home", path: "/", icon: <AiIcons.AiFillHome />, cName: "sidebar-text", },
  { title: "AD Search", path: "/ad/search", icon: <TbIcons.TbUsers />, cName: "sidebar-text", },
  { title: "AD User", path: "/ad/user", icon: <TbIcons.TbUser />, cName: "sidebar-text", },
  { title: "CAL-ID Booking", path: "/calid/booking", icon: <RiIcons.RiTeamLine />, cName: "sidebar-text", },
  { title: "Custom Fetch Hook", path: "/fetchhook", icon: <FaIcons.FaExchangeAlt />, cName: "sidebar-text", },

  { title: "User Context Display", path: "/usercontextdisplay", icon: <FaIcons.FaRegAddressCard />, cName: "sidebar-text", },
  { title: "WMPlus Personnal", path: "/wmp/personnalinfo", icon: <FaIcons.FaReadme />, cName: "sidebar-text", },


  { title: "Token Example", path: "logintoken", icon: <TbIcons.TbLockAccess />, cName: "sidebar-text", },
  { title: "Login", path: "login", icon: <TbIcons.TbLogin />, cName: "sidebar-text", },
]