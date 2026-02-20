"use client";

import React, { useState, useEffect } from "react";
import { Page, Car, SAMPLE_CARS } from "@/types";
import { Layout } from "@/components/Layout";
import Home from "@/components/pages/Home";
import Inventory from "@/components/pages/Inventory";
import Details from "@/components/pages/Details";
import Finance from "@/components/pages/Finance";
import SellCar from "@/components/pages/SellCar";
import Login from "@/components/pages/Login";
import Service from "@/components/pages/Service";

export default function AppPage() {
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage, selectedCar]);

  const handleCarSelect = (carId: string) => {
    const car = SAMPLE_CARS.find((c) => c.id === carId);
    if (car) {
      setSelectedCar(car);
      setActivePage(Page.DETAILS);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case Page.HOME:
        return (
          <Home onNavigate={setActivePage} onCarSelect={handleCarSelect} />
        );
      case Page.INVENTORY:
        return <Inventory onCarSelect={handleCarSelect} />;
      case Page.DETAILS:
        return selectedCar ? (
          <Details car={selectedCar} onNavigate={setActivePage} />
        ) : (
          <Inventory onCarSelect={handleCarSelect} />
        );
      case Page.FINANCE:
        return <Finance />;
      case Page.SELL:
        return <SellCar />;
      case Page.LOGIN:
        return <Login onNavigate={setActivePage} />;
      case Page.SERVICE:
        return <Service />;
      default:
        return (
          <Home onNavigate={setActivePage} onCarSelect={handleCarSelect} />
        );
    }
  };

  if (activePage === Page.LOGIN) {
    return <Login onNavigate={setActivePage} />;
  }

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      {renderContent()}
    </Layout>
  );
}
