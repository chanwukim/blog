"use client";

import styles from "./mobile-menu.module.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import cn from "@/lib/cn";

import MenuIcon from "./icons/menu-icon";
import XIcon from "./icons/x-icon";
import Portal from "./portal";
import VisuallyHidden from "./visually-hidden";

interface MobileMenuProps {
  categories: string[];
}

export default function MobileMenu({ categories }: MobileMenuProps) {
  const [isShow, setIsShow] = useState(false);
  const pathname = usePathname();

  const currentCategory = pathname.split("category/")[1]
    ? decodeURIComponent(pathname.split("category/")[1])
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
                <VisuallyHidden>닫기</VisuallyHidden>
                <XIcon size={20} />
              </button>
            </div>
            <ul className={styles.categories}>
              <li>
                <Link
                  href="/"
                  className={cn("link", !currentCategory && styles.active)}
                >
                  전체글
                </Link>
              </li>
              {categories?.map((category) => (
                <li key={category}>
                  <Link
                    href={`/category/${encodeURIComponent(category)}`}
                    className={cn(
                      "link",
                      styles.link,
                      currentCategory === category && styles.active,
                    )}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.backdrop} onClick={handleClose}></div>
        </Portal>
      ) : (
        <button type="button" className={styles.button} onClick={handleOpen}>
          <VisuallyHidden>메뉴</VisuallyHidden>
          <MenuIcon size={20} />
        </button>
      )}
    </>
  );
}
