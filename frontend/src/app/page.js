"use client";

import Layout from "@/components/Layout";
import FormSection from "@/components/FormSection";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <Layout>
        <FormSection />
      </Layout>
    </>
  );
}
