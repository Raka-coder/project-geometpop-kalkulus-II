import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative gradient-bg py-24 md:py-36 overflow-hidden font-nunitosans">
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Background pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fca311 2px, transparent 2px)',
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center md:text-center">
          <div className="mb-10 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Pemodelan Pertumbuhan Populasi
            </h1>
            <h2 className="text-xl md:text-2xl md:text-center text-custom-yellow mb-6">
              dengan{' '}
              <Typewriter
                words={['Deret Geometri', 'Aplikasi GeometPop!']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h2>
            <p className="text-custom-gray mb-8 md:text-center font-medium md:text-lg max-w-3xl">
              Eksplorasi bagaimana deret geometri dapat digunakan untuk
              memodelkan pertumbuhan populasi dari waktu ke waktu dengan
              berbagai parameter dan batasan periode yang akan ditentukan.
            </p>
            <div className="flex flex-wrap md:items-center md:justify-center gap-4">
              <Button
                asChild
                className="bg-custom-yellow text-dark-blue hover:bg-custom-yellow/90 font-medium"
              >
                <Link to="/modeling">
                  Mulai Pemodelan
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
              {/* <Button
                asChild
                variant="outline"
                className="bg-dark-blue text-custom-gray hover:bg-dark-blue/90 font-medium"
              >
                <Link to="/about">Pelajari Deret Geometri</Link>
              </Button> */}
            </div>
          </div>

          {/* <div className="md:w-1/2 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-full max-w-md card-shadow">
              <div className="text-center p-4">
                <h3 className="text-white text-2xl font-semibold mb-2">
                  Deret Geometri
                </h3>
                <div className="bg-dark-blue/60 rounded-lg p-4 mb-4">
                  <p className="text-custom-yellow text-xl mb-2">Rumus Umum:</p>
                  <div className="text-white text-xl mb-2">
                    <MathRenderer
                      type="inline"
                      formula="S_n = \frac{a(1 - r^n)}{1 - r}"
                    />
                  </div>
                  <p className="text-white text-sm">Dimana:</p>
                  <p className="text-white flex items-center justify-center text-sm">
                    <MathRenderer type="inline" formula="a" /> = suku pertama
                  </p>
                  <p className="text-white flex items-center justify-center text-sm">
                    <MathRenderer type="inline" formula="r" /> = rasio{' '}
                  </p>
                  <p className="text-white flex items-center justify-center text-sm">
                    <MathRenderer type="inline" formula="n" /> = jumlah suku
                  </p>
                </div>
                <p className="text-custom-gray text-base">
                  Eksplorasi aplikasi matematika untuk menganalisis pertumbuhan
                  populasi dengan geometri.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
