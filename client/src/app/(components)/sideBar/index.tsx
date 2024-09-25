"use client"
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSideBarCollapsed } from '@/state';
import {  Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, Settings, SlidersHorizontal, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react'
interface SidebarLinkProps{
    href : string;
    icon : LucideIcon;
    label :string;
    isCollapsed :boolean;
}
const SideBarLInk=({
    href,
    icon:Icon,
    label,
    isCollapsed

}:SidebarLinkProps)=>{
    const pathname=usePathname();
    const isActive=pathname===href||(pathname === "/" && href==="/dashboard");
    return (
        <Link href={href}>
        <div className={`cursor-pointer flex items-center ${isCollapsed?"justify-center py-4":"justify-start px-7 py-4"}
         hover:text-blue-500 gap-3 transition-colors ${isActive ?"bg-blue-200": ""}`}>
        <Icon className='w-6 h-6 !text-gray-700'/>
        <span className={`${isCollapsed?"hidden":"block"} font-medium text-gray-700`}>{label}</span>
        </div>
        </Link>
    )


}
function SideBar() {
    const dispatch=useAppDispatch();
    const isSidebarCollapsed=useAppSelector((state)=>state.global.isSideBarCollapsed);
    const toggleSideBar=()=>{
        dispatch(setIsSideBarCollapsed(!isSidebarCollapsed));
    }
    const sideBarClassNames=`md:relative fixed  flex flex-col ${isSidebarCollapsed ? 'w-0 md:w-16':'w-72 md:w-64'} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sideBarClassNames}>
        {/* {top logo} */}
        <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed?"px-5":"px-8"}`}>
            <div>logo</div>
            <h1 className={`${isSidebarCollapsed?'hidden':'block'} font-extrabold text-2xl`}>GREEN</h1>
        
        <button className='md:hidden px-3 py-3 bg-gray-100  rounded-full hover:bg-blue-100' onClick={toggleSideBar}>
<Menu className='w-4 h-4'/>
        </button>
        </div>
        {/*LINKS*/}
        <div className='flex-grow mt-8'>
        <SideBarLInk href='/dashboard' icon={Layout} label='Dashboard' isCollapsed={isSidebarCollapsed}/>
        <SideBarLInk href='/inventory' icon={Archive} label='Inventory' isCollapsed={isSidebarCollapsed}/>
        <SideBarLInk href='/products' icon={Clipboard} label='Products' isCollapsed={isSidebarCollapsed}/>
        <SideBarLInk href='/users' icon={User} label='Users' isCollapsed={isSidebarCollapsed}/>
        <SideBarLInk href='/settings' icon={SlidersHorizontal} label='Settings' isCollapsed={isSidebarCollapsed}/>
        <SideBarLInk href='/expenses' icon={CircleDollarSign} label='Expenses' isCollapsed={isSidebarCollapsed}/>
        </div>
        {/* {FOOTER} */}
        <div className={`${isSidebarCollapsed?"hidden":"block"} mb-10`}>
            <p className='text-center text-xs text-gray-500'>&copy; 2024 GREEN</p>
        </div>
    </div>
  )
}
export default SideBar;
