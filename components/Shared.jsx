import Link from "next/link";
import { ArrowRight, Check, GraduationCap, Languages, Users, CalendarClock, BookOpen, MessageCircle, ShieldCheck, Globe2, Star } from "lucide-react";

export const trustItems = [
 [GraduationCap,"Qualified Teachers"], [Users,"Private & Small Groups"], [CalendarClock,"Flexible Scheduling"], [Globe2,"Learn From Anywhere"]
];
export const teachingStandards = [
 [GraduationCap,"Al-Azhar & qualified educators","Learn with instructors educated at respected Islamic institutions and experienced in teaching students from different backgrounds."],
 [Languages,"Native Arabic speakers","Build natural pronunciation, listening and communication with teachers who speak Arabic natively."],
 [Users,"Male & female teachers","Choose a learning environment that matches your comfort and preferences."],
 [MessageCircle,"Private or small groups","Select focused one-to-one learning or an interactive small-group experience."],
 [BookOpen,"Structured learning","Follow a clear pathway with purposeful lessons, feedback and measurable progress."],
 [ShieldCheck,"Student-focused teaching","Patient, encouraging instruction designed around age, level, pace and goals."]
];
export const testimonials = [
 {quote:"My daughter now reads confidently, and her love for the Quran grows every week.", label:"Parent of Quran student"},
 {quote:"The teacher’s patience and personalized guidance transformed my Quran learning journey.", label:"Quran student"},
 {quote:"I finally speak Arabic without fear; every lesson feels practical, encouraging, and easy to follow.", label:"Arabic student"},
 {quote:"I began as a complete beginner and now speak simple Arabic in everyday conversations.", label:"Beginner Arabic student"}
];

export function SectionTitle({eyebrow,title,copy,center=false}){return <div className={center?"mx-auto max-w-3xl text-center":"max-w-3xl"}>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h2 className="h2 mt-3">{title}</h2>{copy&&<p className="lead mt-5">{copy}</p>}</div>}
export function TrustStrip(){return <section className="border-y border-black/[.05] bg-white"><div className="shell grid grid-cols-2 gap-0 lg:grid-cols-4">{trustItems.map(([Icon,t],i)=><div key={t} className="flex items-center gap-3 border-black/[.05] px-3 py-5 lg:border-r lg:px-6 last:border-r-0"><Icon className="h-5 w-5 text-[#0F6B4F]"/><span className="text-sm font-bold text-[#3F4B46]">{t}</span></div>)}</div></section>}
export function TeachingStandards(){return <section className="shell py-20 sm:py-28"><SectionTitle eyebrow="Our teaching standards" title="Learn from qualified teachers" copy="Our teaching team is selected for knowledge, experience, communication and the ability to help students make consistent progress."/><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{teachingStandards.map(([Icon,t,c])=><article key={t} className="card p-7"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F6B4F]/8 text-[#0F6B4F]"><Icon className="h-5 w-5"/></div><h3 className="mt-5 text-xl font-extrabold text-[#17231F]">{t}</h3><p className="mt-3 leading-7 text-[#66716C]">{c}</p></article>)}</div></section>}
export function Testimonials(){return <section className="soft-section py-20 sm:py-28"><div className="shell"><SectionTitle eyebrow="Student stories" title="Real progress. Real confidence." copy="A few words shared by students and parents from our current website."/><div className="mt-10 grid gap-4 md:grid-cols-2">{testimonials.map((t,i)=><figure key={i} className="card p-7 sm:p-8"><div className="flex gap-1 text-[#0F6B4F]">{[1,2,3,4,5].map(n=><Star key={n} className="h-4 w-4 fill-current"/>)}</div><blockquote className="mt-5 text-xl font-semibold leading-8 text-[#28332F]">“{t.quote}”</blockquote><figcaption className="mt-5 text-sm font-bold text-[#0F6B4F]">{t.label}</figcaption></figure>)}</div></div></section>}
export function FinalCTA({title="Your journey starts today.",copy="Book a free trial lesson and discover a clearer, more personal way to learn Arabic and the Quran."}){return <section className="shell py-20 sm:py-28"><div className="green-section overflow-hidden rounded-[2.5rem] p-8 text-center text-white sm:p-14 lg:p-20"><p className="text-xs font-bold uppercase tracking-[.22em] text-white/60">Free trial lesson</p><h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-[-.04em] sm:text-5xl">{title}</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">{copy}</p><Link href="/book-trial" className="mt-8 inline-flex items-center rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#0F6B4F] transition hover:-translate-y-0.5">Book Free Trial <ArrowRight className="ml-2 h-4 w-4"/></Link></div></section>}
export function CheckList({items}){return <div className="grid gap-3">{items.map(x=><div key={x} className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F6B4F]/10 text-[#0F6B4F]"><Check className="h-4 w-4"/></span><span className="text-[#52605A]">{x}</span></div>)}</div>}
