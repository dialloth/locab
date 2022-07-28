import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import styles from "../styles/headerfooter/navbar.module.css";
import { useTranslation } from "next-i18next";
import { CurrentUserContext } from "../contexts/currentUserContext";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const onSelectChange = (e) => {
    const locale = e.target.value;
    router.push(router.asPath, router.asPath, {
      locale,
      scroll: false,
    });
  };
  const { t } = useTranslation("header");
  const [showLinks, setshowLinks] = useState(false);
  const handleShowLinks = () => {
    setshowLinks(!showLinks);
  };
  const router = useRouter();

  const currentRoute = router.pathname;

  const { currentUserProfile } = useContext(CurrentUserContext);

  return (
    <nav
      className={`${styles.navbar} ${showLinks ? styles.show_nav : "hidden"}`}
    >
      <div className={styles.logocontainer}>
        <Link href="/" className={styles.logo}>
          <a>
            <img
              src="/logo/logo.webp"
              alt="logo_principal"
              width="49w"
              height="54px"
            />
          </a>
        </Link>
        <Link href="/" className={styles.logo2}>
          <a>
            <img
              src="/logo/logoText.webp"
              alt="logo"
              width="126w"
              height="34px"
            />
          </a>
        </Link>
      </div>
      <ul className={styles.items}>
        <li className={styles.navbar_item}>
          <Link href="/" className={styles.navbarlink}>
            <a
              className={
                currentRoute === "/" ? styles.active : styles.non_active
              }
            >
              {t("accueil")}
            </a>
          </Link>
        </li>
        <li className={styles.navbar_item}>
          <Link href="/aboutUs" className={styles.navbarlink}>
            <a
              className={
                currentRoute === "/aboutUs" ? styles.active : styles.non_active
              }
            >
              {t("quisommesnous")}
            </a>
          </Link>
        </li>
        <li
          className={`${styles.navbar_item} ${styles.none}`}
          style={{ display: "none" }}
        >
          <Link href="/blog" className={styles.navbarlink}>
            <a
              style={{ display: "none" }}
              className={
                currentRoute === "/blog" ? styles.active : styles.non_active
              }
            >
              Blog
            </a>
          </Link>
        </li>
        <li className={styles.navbar_item} style={{ display: "none" }}>
          <Link href="/contact" className={styles.navbarlink}>
            <a
              style={{ display: "none" }}
              className={
                currentRoute === "/contact" ? styles.active : styles.non_active
              }
            >
              Contact
            </a>
          </Link>
        </li>
        <li className={styles.navbar_item}>
          <Link
            href="/reservation?showUnavailable=true"
            className={styles.navbarlink}
          >
            <a>
              <button className={styles.reservationButton}>Reservation</button>
            </a>
          </Link>
        </li>
        <li className={styles.navbar_item}>
          <div>
            {currentUserProfile ? (
              <button
                className={styles.log}
                onClick={() => signOut()}
                type="button"
              >
                {t("sedeconnecter")}
              </button>
            ) : (
              <Link href="/signup">
                <a className={styles.log}>{t("seconnecter")}</a>
              </Link>
            )}
          </div>
          <div className={styles.languageSelect}>
            <select
              className={styles.testSign}
              name="languages"
              id="language-select"
              value={router.locale}
              label="Languages"
              onChange={onSelectChange}
              data-cy="translate-button"
            >
              {router.locales.map((language, index) => (
                <option value={language} key={index}>
                  {language === "en" ? "🇬🇧" : language === "fr" ? "🇫🇷" : null}
                </option>
              ))}
            </select>
          </div>
        </li>
      </ul>
      <div className={styles.divlogoIcon1}>
        <Link href="/" className={styles.linklogotransparent}>
          <a>
            <img
              src="/logo/logo_transparent.webp"
              alt="logo_transparent"
              width="113w"
              height="30px"
            />
          </a>
        </Link>
      </div>
      <div className={styles.divlogoIcon}>
        <Link href="/">
          <a>
            <img
              src="/logo/icon_logo.webp"
              alt="logo_icon"
              width="45w"
              height="45px"
            />
          </a>
        </Link>
      </div>
      <div className={styles.btnBurger} onClick={handleShowLinks}>
        <span className={styles.burger_Line} />
      </div>
    </nav>
  );
};
export default Navbar;
