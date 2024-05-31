"use client";

import Layout from "@/components/Layout";
import FormSection from "@/components/FormSection";
import NavBar from "@/components/NavBar";
import ConsultWindow from "@/components/ConsultWindow";

export default function Home() {
  return (
    <>
      <NavBar />
      <Layout>
        <ConsultWindow />
      </Layout>
    </>
  );
}
