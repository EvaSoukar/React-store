import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  return (
    <Providers>
      <ScrollToTop />
      <Navbar />
      <div className="bg-black min-h-screen text-white">
        <div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </Providers>
  )
}
export default RootLayout;