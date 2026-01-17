import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - FUTUREWEAR',
  description: 'Learn about our mission and vision for the future of fashion',
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase mb-12">
            About <span className="text-brand-green">Us</span>
          </h1>

          <div className="space-y-8 text-lg  ">
            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-4 text-brand-green">
                Our Story
              </h2>
              <p className="leading-relaxed">
                FUTUREWEAR was born from the intersection of luxury fashion and digital innovation. 
                We believe that streetwear is more than just clothing—it's a statement, a lifestyle, 
                and a vision for the future.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-4 text-brand-green">
                Our Mission
              </h2>
              <p className="leading-relaxed">
                To redefine premium streetwear for the digital age. Every piece we create combines 
                cutting-edge design with exceptional quality, crafted for those who dare to stand out.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold uppercase mb-4 text-brand-green">
                Our Values
              </h2>
              <ul className="space-y-3 leading-relaxed">
                <li>• Innovation in design and materials</li>
                <li>• Commitment to sustainability</li>
                <li>• Exclusive, limited-edition drops</li>
                <li>• Premium quality in every detail</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



