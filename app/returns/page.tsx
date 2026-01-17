import { Metadata } from 'next';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Returns - FUTUREWEAR',
  description: 'Return and exchange policy',
};

export default function ReturnsPage() {
  return (
    <main className="relative min-h-screen">
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase mb-12">
            Returns & <span className="text-brand-green">Exchanges</span>
          </h1>

          <div className="mb-16 p-8 border border-brand-green/20 bg-brand-green/5">
            <div className="flex gap-4 items-start">
              <RotateCcw className="w-8 h-8 text-brand-green flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-2xl font-bold uppercase mb-3">30-Day Returns</h3>
                <p className="  leading-relaxed">
                  We offer free returns within 30 days of delivery. Items must be unworn, 
                  unwashed, and in original condition with all tags attached.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-6 text-brand-green">
                How to Return
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-heading">
                    1
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold uppercase mb-1">
                      Contact Support
                    </h3>
                    <p className=" ">
                      Email us at returns@futurewear.com with your order number
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-heading">
                    2
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold uppercase mb-1">
                      Receive Label
                    </h3>
                    <p className=" ">
                      We'll send you a prepaid return shipping label
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-heading">
                    3
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold uppercase mb-1">
                      Ship It Back
                    </h3>
                    <p className=" ">
                      Pack the item securely and drop it off at any carrier location
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-heading">
                    4
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold uppercase mb-1">
                      Get Your Refund
                    </h3>
                    <p className=" ">
                      Refunds are processed within 5-7 business days of receiving your return
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-6 text-brand-green">
                Return Policy Details
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-2 border-brand-green pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-brand-green" />
                    <h3 className="font-heading font-semibold uppercase">Eligible Items</h3>
                  </div>
                  <ul className="  space-y-1">
                    <li>• Unworn items in original condition</li>
                    <li>• Items with all original tags attached</li>
                    <li>• Items in original packaging</li>
                    <li>• Returns initiated within 30 days of delivery</li>
                  </ul>
                </div>

                <div className="border-l-2 border-brand-pink pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-brand-pink" />
                    <h3 className="font-heading font-semibold uppercase">Non-Returnable Items</h3>
                  </div>
                  <ul className="  space-y-1">
                    <li>• Worn or washed items</li>
                    <li>• Items without original tags</li>
                    <li>• Limited edition drops (final sale)</li>
                    <li>• Sale items marked as final sale</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-6 text-brand-green">
                Exchanges
              </h2>
              <p className="  leading-relaxed mb-4">
                We're happy to exchange items for a different size or color. The fastest way to 
                ensure you get what you want is to return the item and place a new order.
              </p>
              <p className="  leading-relaxed">
                For exchanges, contact our support team at exchanges@futurewear.com
              </p>
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-6 text-brand-green">
                Damaged or Defective Items
              </h2>
              <p className="  leading-relaxed">
                If you receive a damaged or defective item, please contact us within 48 hours 
                of delivery. We'll send you a replacement immediately at no additional cost.
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 border border-brand-green/20 bg-brand-green/5">
            <h3 className="font-heading text-2xl font-bold uppercase mb-4">
              Need Help?
            </h3>
            <p className="  mb-6">
              Our customer support team is here to assist with your return or exchange.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-brand-green text-white font-heading uppercase tracking-wider hover:bg-brand-green/80 transition-all"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}



