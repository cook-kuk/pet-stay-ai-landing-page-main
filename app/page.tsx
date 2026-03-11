"use client"

import { AppProvider } from "@/components/petstay/app-context"
import { GlobalModal } from "@/components/petstay/global-modal"
import { HeroSection } from "@/components/petstay/hero-section"
import { ViralHooksSection } from "@/components/petstay/viral-hooks-section"
import { PersonalityTypesSection } from "@/components/petstay/personality-types-section"
import { RecommendedProductsSection } from "@/components/petstay/recommended-products-section"
import { ProductFlowSection } from "@/components/petstay/product-flow-section"
import { CompatibilitySection } from "@/components/petstay/compatibility-section"
import { CommunitySection } from "@/components/petstay/community-section"
import { WhyItWorksSection } from "@/components/petstay/why-it-works-section"
import { FinalCtaSection } from "@/components/petstay/final-cta-section"
import { Header } from "@/components/petstay/header"

export default function Home() {
  return (
    <AppProvider>
      <main className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <ViralHooksSection />
        <PersonalityTypesSection />
        <RecommendedProductsSection />
        <ProductFlowSection />
        <CompatibilitySection />
        <CommunitySection />
        <WhyItWorksSection />
        <FinalCtaSection />
        <GlobalModal />
      </main>
    </AppProvider>
  )
}
