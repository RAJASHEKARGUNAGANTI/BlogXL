import Blogs from "@/components/Blogs";
import Hero from "@/components/Hero";
export default function Home() {
  return <>
    <Hero/>
    <div className="py-2"><Blogs/></div>
    </>
}
