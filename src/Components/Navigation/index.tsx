import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "../../hooks/useMediaQuery";
import useScroll from "../../hooks/useScroll";
import LanguageSwitcher from "../LanguageSwitcher";
import { type RootState, type AppDispatch } from "../../store/store";
import { signOut } from "../../features/auth/authSlice";

const NAV_LINKS = [
  { path: "/about", label: "about" },
  { path: "/dash-board", label: "diagonise" },
  { path: "/contact", label: "contactUs" },
];

const MOBILE_LINKS = [
  { path: "/about", label: "about" },
  { path: "/dash-board", label: "upload" },
  { path: "/profile", label: "profile" },
  { path: "/contact", label: "contactUs" },
];

const Navigation = () => {
  const isDesktop = useMediaQuery("(min-width : 1060px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { scroll } = useScroll();
  const isTopOfPage = scroll ? "bg-transparent drop-shadow backdrop-blur-sm" : "";

  const { user, isSucess } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
    
  const handleSignout = () => {
    dispatch(signOut());
    navigate("/");
  };

  const AuthButton = () =>
    user || isSucess ? (
      <button
        onClick={handleSignout}
        className="px-8 py-2 text-white rounded-lg bg-gray-700 transition capitalize"
      >
        {t("signout") ?? "sign out"}
      </button>
    ) : (
      <Link
        to="/dash-board"
        className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition capitalize"
      >
        {t("getStarted") ?? "get started"}
      </Link>
    );

  const DesktopNav = () => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-10 text-sm capitalize text-black">
        {NAV_LINKS.map(({ path, label }) => (
          <Link key={label} to={path}>
            {t(label)}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-10 capitalize text-[16px]">
        <LanguageSwitcher />
        <AuthButton />
      </div>
    </div>
  );

  const MobileMenu = () => (
  <AnimatePresence>
    <div className="fixed z-40 top-0 w-[300px] bottom-0 h-full bg-dark-green-20 drop-shadow-xl right-0 text-black">
      <div className="flex justify-end p-12 text-2xl">
        <button onClick={() => setMenuOpen(false)} data-testid="hamburgerClose">
          <XMarkIcon className="h-6 w-6 text-white" />
        </button>
      </div>
      <div className="flex justify-center items-center flex-col gap-10 text-xl capitalize" data-testid="MobileMenuChildren">
        {MOBILE_LINKS.map(({ path, label }) => (
          <Link key={label} to={path} className="text-white" onClick={() => setMenuOpen(false)}>
            {t(label)}
          </Link>
        ))}
        <LanguageSwitcher />
        <AuthButton />
      </div>
    </div>
  </AnimatePresence>
  );

  return (
    <nav>
      <div className="w-full py-6 z-40 fixed top-0 left-0">
        <div className={`mx-auto w-[85%] ${isTopOfPage}`}>
          <div className="flex items-center justify-between w-full gap-20">
            <Link to="/">
              <h2 className="font-bold text-2xl text-dark-green-20">
                {t("livestockDiseaseDetector")}
              </h2>
            </Link>

            {isDesktop ? (
              <DesktopNav />
            ) : (
              <button
                className="rounded-full bg-green-600 hover:bg-green-700 p-2 transition duration-300"
                onClick={() => setMenuOpen(!menuOpen)}
                data-testid="hamburger"
              >
                {!menuOpen ? (
                  <Bars3Icon className="h-6 w-6 text-white" />
                ) : (
                  <XMarkIcon className="h-6 w-6 text-white" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {!isDesktop && menuOpen && <MobileMenu />}
    </nav>
  );
};

export default Navigation;
