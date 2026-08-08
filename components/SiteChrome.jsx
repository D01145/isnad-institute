"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

const links = [
  ["Home","/"], ["Arabic Course","/arabic-course"], ["Quran Classes","/quran-classes"], ["Pricing","/pricing"], ["About","/about"], ["Contact","/contact"]
];

export function Header(){
 const [open,setOpen]=useState(false);
 return <header className="sticky top-0 z-50 border-b border-black/[0.05] bg-[#FAFAF8]/90 backdrop-blur-xl">
  <div className="shell flex h-20 items-center justify-between">
   <Link href="/" className="flex items-center gap-3" aria-label="Isnad Institute home">
    <Image src="/isnad-logos.png" alt="Isnad Institute" width={58} height={58}className="h-12 w-12 object-contain"priority/>
    <span className="hidden text-base font-bold tracking-[0.08em] text-[#0F6B4F] sm:block">ISNAD INSTITUTE</span>
   </Link>
   <nav className="hidden items-center gap-6 lg:flex">{links.map(([l,h])=><Link key={h} href={h} className="text-sm font-semibold text-[#56615D] hover:text-[#0F6B4F]">{l}</Link>)}</nav>
   <div className="hidden lg:block"><Link href="/book-trial" className="btn-primary">Book Free Trial <ArrowRight className="ml-2 h-4 w-4"/></Link></div>
   <button onClick={()=>setOpen(!open)} className="rounded-full border border-black/10 p-2.5 lg:hidden" aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
  </div>
  {open&&<div className="border-t border-black/5 bg-[#FAFAF8] lg:hidden"><div className="shell grid gap-1 py-4">{links.map(([l,h])=><Link onClick={()=>setOpen(false)} key={h} href={h} className="rounded-xl px-3 py-3 font-semibold hover:bg-white">{l}</Link>)}<Link href="/book-trial" onClick={()=>setOpen(false)} className="btn-primary mt-2">Book Free Trial</Link></div></div>}
 </header>
}

export function Footer(){return <footer className="bg-[#10231D] text-white"><div className="shell py-14"><div className="grid gap-10 md:grid-cols-4">
 <div className="md:col-span-2"><div className="flex items-center gap-3"><div className="rounded-2xl bg-white p-2"><Image src="/isnad-logo-4.png" alt="Isnad Institute" width={48} height={48} className="h-10 w-10 object-contain"/></div><strong className="tracking-[.12em]">ISNAD INSTITUTE</strong></div><p className="mt-5 max-w-md text-sm leading-7 text-white/65">Authentic knowledge. Modern learning. Live online Arabic and Quran education for children and adults worldwide.</p><a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white" href="mailto:hello@isnadinstitute.com"><Mail className="h-4 w-4"/>hello@isnadinstitute.com</a></div>
 <div><p className="text-xs font-bold uppercase tracking-[.2em] text-white/45">Programs</p><div className="mt-4 grid gap-3 text-sm text-white/70"><Link href="/arabic-course">Arabic Course</Link><Link href="/quran-classes">Quran Classes</Link><Link href="/pricing">Pricing</Link></div></div>
 <div><p className="text-xs font-bold uppercase tracking-[.2em] text-white/45">Institute</p><div className="mt-4 grid gap-3 text-sm text-white/70"><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/book-trial">Book Free Trial</Link></div></div>
 </div><div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between"><span>© 2026 Isnad Institute. All rights reserved.</span><span>isnadinstitute.com</span></div></div></footer>}

export function Page({children}){return <><Header/><main>{children}</main><Footer/></>}
