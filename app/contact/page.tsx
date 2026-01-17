import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Contact - FUTUREWEAR',
  description: 'Get in touch with us',
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase mb-12">
            Contact <span className="text-brand-green">Us</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold uppercase mb-6 text-brand-green">
                Send us a message
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-brand-green/20 focus:border-brand-green/60 focus:outline-none transition-colors text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-brand-green/20 focus:border-brand-green/60 focus:outline-none transition-colors text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-brand-green/20 focus:border-brand-green/60 focus:outline-none transition-colors text-white resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <Button
                  type="submit"
                  variant="solid"
                  size="md"
                  className="w-full py-4 bg-brand-green text-white font-heading uppercase tracking-wider hover:bg-brand-green/80 transition-all"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold uppercase mb-6 text-brand-green">
                Get in touch
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-brand-green flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-semibold uppercase mb-2">Email</h3>
                    <p className=" ">support@futurewear.com</p>
                    <p className=" ">press@futurewear.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-brand-green flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-semibold uppercase mb-2">Phone</h3>
                    <p className=" ">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-brand-green flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg font-semibold uppercase mb-2">Location</h3>
                    <p className=" ">123 Future Street</p>
                    <p className=" ">New York, NY 10001</p>
                    <p className=" ">United States</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-brand-green/20">
                  <h3 className="font-heading text-lg font-semibold uppercase mb-4">Business Hours</h3>
                  <div className="space-y-2  ">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



