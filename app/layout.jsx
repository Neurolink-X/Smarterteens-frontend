import "./globals.css";
import Navigation from "./navigation";
import Link from "next/link";
export const metadata={title:"SmarterTeens | Learn beyond the textbook",description:"Practical learning, real-world projects, career exploration and coaching tools.",robots:{index:false,follow:false}};
export default function Layout({children}){return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Navigation/><main id="main">{children}</main><footer className="site-footer"><div><strong>SmarterTeens</strong><p>Learn for exams. Build for life.</p></div><div><Link href="/courses">Explore courses</Link><Link href="/missions">Project studio</Link><Link href="/privacy">Privacy & safety</Link></div></footer></body></html>}