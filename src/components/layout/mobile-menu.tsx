"use client";

import styles from "./mobile-menu.module.css";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import CategoriesNav from "../blog/categories-nav";
import MenuIcon from "../icons/menu-icon";
import XIcon from "../icons/x-icon";
import Portal from "../utils/portal";

interface MobileMenuProps {
  categories: string[];
}

export default function MobileMenu({ categories }: MobileMenuProps) {
  const [isShow, setIsShow] = useState(false);
  const pathname = usePathname();

  const currentCategory = pathname.split("categories/")[1]
    ? decodeURIComponent(pathname.split("categories/")[1])
    : "";

  function handleOpen() {
    document.body.style.overflow = "hidden";
    setIsShow(true);
  }

  function handleClose() {
    document.body.style.overflow = "unset";
    setIsShow(false);
  }

  useEffect(() => {
    document.body.style.overflow = "unset";
    setIsShow(false);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleClose);

    return () => {
      window.removeEventListener("resize", handleClose);
    };
  }, []);

  return (
    <>
      {isShow ? (
        <Portal>
          <div className={styles.menu}>
            <div className={styles.header}>
              <button
                type="button"
                className={styles.button}
                onClick={handleClose}
              >
                <span className="sr-only">닫기</span>
                <XIcon size={20} />
              </button>
            </div>
            <CategoriesNav categories={categories} />
          </div>
          <div className={styles.backdrop} onClick={handleClose}></div>
        </Portal>
      ) : (
        <button type="button" className={styles.button} onClick={handleOpen}>
          <span className="sr-only">메뉴</span>
          <MenuIcon size={20} />
        </button>
      )}
    </>
  );
}
