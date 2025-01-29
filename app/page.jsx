import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { features } from "@/data/features";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function Home() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section with fade-in */}
      <div className="animate-fade-in-down-main duration-700 delay-100">
        <HeroSection />
      </div>

      {/* Features Section with fade-in and staggered cards */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background animate-fade-in-up duration-700 delay-200">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter gradient-text text-center mb-12">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-primary transition-colors duration-300"
                >
                  <CardContent className="pt-6 text-center flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center">
                      {feature.icon}
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section with fade-in */}
      <section className="w-full py-12 md:py-24 bg-muted/50 animate-fade-in-up duration-700 delay-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {["50+", "10,000+", "98%", "24/7"].map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col gradient-text items-center justify-center space-y-2 animate-fade-in-up duration-700 delay-${
                  400 + i * 100
                }`}
              >
                <h3 className="text-4xl lg:text-5xl font-bold">{stat}</h3>
                <p className="text-muted-foreground text-lg">
                  {
                    [
                      "Industries Covered",
                      "Interview Questions",
                      "Uptime",
                      "AI Support",
                    ][i]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with fade-in */}
      <section className="w-full py-12 md:py-24 bg-background animate-fade-in-up duration-700 delay-400">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-5xl font-bold mb-4 animate-fade-in duration-700 delay-500 gradient-text">
              How It Works
            </h2>
            <p className="text-muted-foreground animate-fade-in duration-700 delay-600 sm:text-base md:text-xl">
              Four simple steps to accelerate your career growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center space-y-4 animate-fade-in-up duration-700 delay-${
                  700 + index * 100
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with fade-in */}
      <section className="w-full py-12 md:py-24 animate-fade-in-up duration-700 delay-500">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-5xl font-bold mb-4 animate-fade-in duration-700 delay-600 gradient-text">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground animate-fade-in duration-700 delay-700 sm:text-base md:text-lg">
              Find answers to common questions about our platform
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`animate-fade-in-up duration-700 delay-${
                    800 + index * 100
                  }`}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-left cursor-pointer ">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section with bounce */}
      <section className="w-full animate-fade-in-up duration-700 delay-600">
        <div className="sm:mx-4 md:mx-auto py-6 md:py-12 gradient px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-primary-foreground animate-fade-in duration-700 delay-700">
              Ready to take your career to the{" "}
              <span className="gradient-title">next level</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-primary-foreground/90 md:text-xl animate-fade-in duration-700 delay-800">
              Join a growing community leveraging AI-powered tools for career
              success.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="mt-10 animate-bounce hover:scale-110 hover:animate-none hover:bg-gradient-title px-24 py-5 md:py-7 mb-6 cursor-pointer md:mb-10"
              >
                Start Your Journey Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
