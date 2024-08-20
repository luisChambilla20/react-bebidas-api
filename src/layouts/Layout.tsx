import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";

import Modal from "../components/Modal";
import Notification from "../components/Notification";

export const Layout = () => {
  const loadFromLocalStorage = useAppStore(
    (state) => state.loadFromLocalStorage
  );

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <>
      <Header />

      <main className="mx-auto container py-16">
        <Outlet />
      </main>

      <Modal />

      <Notification />
    </>
  );
};
