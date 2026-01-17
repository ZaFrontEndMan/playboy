import { Metadata } from 'next';
import { Package, Truck, Globe, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping - FUTUREWEAR',
  description: 'Shipping information and delivery options',
};

export default function ShippingPage() {
  return (
    <main className="relative min-h-screen">
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase mb-12">
            Shipping <span className="text-brand-green">Information</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-6 border border-brand-green/20">
              <Truck className="w-10 h-10 text-brand-green mb-4" />
              <h3 className="font-heading text-xl font-bold uppercase mb-2">Express Shipping</h3>
              <p className=" ">2-3 business days worldwide</p>
            </div>

            <div className="p-6 border border-brand-green/20">
              <Globe className="w-10 h-10 text-brand-green mb-4" />
              <h3 className="font-heading text-xl font-bold uppercase mb-2">Global Coverage</h3>
              <p className=" ">We ship to 100+ countries</p>
            </div>

            <div className="p-6 border border-brand-green/20">
              <Package className="w-10 h-10 text-brand-green mb-4" />
              <h3 className="font-heading text-xl font-bold uppercase mb-2">Free Shipping</h3>
              <p className=" ">On orders over $500</p>
            </div>

            <div className="p-6 border border-brand-green/20">
              <Clock className="w-10 h-10 text-brand-green mb-4" />
              <h3 className="font-heading text-xl font-bold uppercase mb-2">Same-Day Processing</h3>
              <p className=" ">Orders before 2pm EST</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-4 text-brand-green">
                Shipping Rates
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-brand-green/20 pb-3">
                  <span className="font-heading">United States</span>
                  <span className="text-brand-green">$15 (Free over $500)</span>
                </div>
                <div className="flex justify-between border-b border-brand-green/20 pb-3">
                  <span className="font-heading">Canada & Mexico</span>
                  <span className="text-brand-green">$25 (Free over $500)</span>
                </div>
                <div className="flex justify-between border-b border-brand-green/20 pb-3">
                  <span className="font-heading">Europe</span>
                  <span className="text-brand-green">$35 (Free over $500)</span>
                </div>
                <div className="flex justify-between border-b border-brand-green/20 pb-3">
                  <span className="font-heading">Rest of World</span>
                  <span className="text-brand-green">$45 (Free over $500)</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-4 text-brand-green">
                Order Processing
              </h2>
              <p className="  leading-relaxed mb-4">
                All orders are processed within 24 hours. Orders placed before 2:00 PM EST are 
                shipped the same day. You will receive a tracking number via email once your order ships.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-4 text-brand-green">
                Customs & Duties
              </h2>
              <p className="  leading-relaxed">
                International customers are responsible for any customs duties or import taxes. 
                These fees vary by country and are not included in our shipping rates.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-4 text-brand-green">
                Tracking Your Order
              </h2>
              <p className="  leading-relaxed">
                Once your order ships, you'll receive a tracking number via email. You can track 
                your package in real-time through our shipping partner's website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



