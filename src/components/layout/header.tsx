"use client";

import styles from "./header.module.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import { SITE_CONFIG } from "@/lib/constants";

import { Title } from "@/components/ui/title";

import MobileMenu from "./mobile-menu";

interface HeaderProps {
  categories: string[];
}

export default function Header({ categories }: HeaderProps) {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isHidden, setIsHidden] = useState(false);

  function handleDetectScroll() {
    if (scrollY >= window.scrollY) {
      setIsHidden(false);
    } else if (scrollY < window.scrollY && 400 <= window.scrollY) {
      setIsHidden(true);
    }

    setScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleDetectScroll);

    return () => {
      window.removeEventListener("scroll", handleDetectScroll);
    };
  }, [scrollY]);

  useEffect(() => {
    setScrollY(window.scrollY);
  }, []);

  return (
    <header data-hidden={isHidden} className={styles.header}>
      <div className={styles.inner}>
        <Title
          as={Link}
          href="/"
          size="subtitle-2"
          weight="medium"
          className={styles.title}
        >
          {SITE_CONFIG.title}
        </Title>

        <div className={`only-mobile ${styles.action}`}>
          <MobileMenu categories={categories} />
        </div>
      </div>
    </header>
  );
}
