import Header from "./components/Header";
import Footer from './components/Footer'

export default function UserLayout({ children }) {
  
  return (
    <div >
        <Header />
        <main  className=" bg-[#F9FAFB] pb-20">
          {children}
        </main>
        <footer id="footer" className="w-full h-[200px]  flex items-center bg-white border-t-2">
              <Footer/>
        </footer>
    </div>
  );}