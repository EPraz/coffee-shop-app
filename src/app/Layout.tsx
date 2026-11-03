import { CartNavLink } from "../features/cart/CartNavLink";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { Brand } from "../shared/Brand";

function Navigation() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  return (
    <>
      <a className="skip-link" href="#main">
        {t("nav.skip")}
      </a>
      <header className="site-header">
        <Link to="/" className="logo-link" aria-label="Bruma Café">
          <Brand />
        </Link>
        <nav className="desktop-nav" aria-label={t("nav.shop")}>
          <NavLink to="/coffees">{t("nav.shop")}</NavLink>
          <Link to="/#philosophy">{t("nav.philosophy")}</Link>
          <NavLink to="/orders">{t("history.nav")}</NavLink>
        </nav>
        <div className="header-actions">
          <label className="language-control">
            <span className="sr-only">{t("nav.language")}</span>
            <select
              value={i18n.resolvedLanguage ?? "en"}
              onChange={(event) => void i18n.changeLanguage(event.target.value)}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="pt">PT</option>
            </select>
          </label>
          <CartNavLink />
          <button
            type="button"
            className="icon-button mobile-menu-toggle"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label={t("nav.shop")}
        >
          <Link to="/coffees" onClick={() => setMenuOpen(false)}>
            {t("nav.shop")}
            <ArrowUpRight size={20} />
          </Link>
          <Link to="/#philosophy" onClick={() => setMenuOpen(false)}>
            {t("nav.philosophy")}
            <ArrowUpRight size={20} />
          </Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>
            {t("history.nav")}
            <ArrowUpRight size={20} />
          </Link>
        </nav>
      )}
    </>
  );
}
function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link to="/" aria-label="Bruma Café">
          <Brand />
        </Link>
        <p>{t("home.footerLine")}</p>
        <Link className="text-link" to="/coffees">
          {t("nav.shop")}
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="footer-bottom">
        <p>{t("home.footerNote")}</p>
        <span>{t("home.copyright")}</span>
      </div>
    </footer>
  );
}
export function Layout() {
  const { t } = useTranslation();
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    const pageChanged = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        }),
      );
    } else if (pageChanged) {
      window.scrollTo(0, 0);
      document
        .querySelector<HTMLElement>("main")
        ?.focus({ preventScroll: true });
    }
  }, [location.pathname, location.hash, location.key]);
  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <div className="demo-note">
        <ShoppingBag size={13} aria-hidden="true" />
        {t("common.demo")}
      </div>
      <Footer />
    </>
  );
}
