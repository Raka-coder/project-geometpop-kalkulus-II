import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Timer,
  Calculator,
  ChartNoAxesColumnIncreasing,
  Trophy,
  RocketIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuizCallToAction() {
  return (
    <div className="w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-custom-gray to-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-dark-blue mb-4">
              Uji Pemahamanmu Tentang{' '}
              <span className="text-custom-yellow">Pemodelan Populasi</span>
            </h2>

            <p className="text-lg text-gray-600 mb-6">
              Jelajahi konsep deret geometri melalui kuis interaktif kami.
              Temukan seberapa dalam pemahamanmu tentang pertumbuhan dan
              penurunan populasi!
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Timer className="h-6 w-6 text-dark-blue" />
                <span className="text-gray-700">7 pertanyaan menarik</span>
              </div>
              <div className="flex items-center gap-3">
                <ChartNoAxesColumnIncreasing className="h-6 w-6 text-dark-blue" />
                <span className="text-gray-700">Laporan hasil instan</span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-dark-blue" />
                <span className="text-gray-700">Raih skor sempurna</span>
              </div>
            </div>
            <Button
              asChild
              variant="default"
              className="w-full md:w-auto bg-custom-yellow hover:bg-custom-yellow/90 text-dark-blue font-medium"
            >
              <Link to="/quiz">
                Mulai Kuis Sekarang
                <RocketIcon className="mr-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="hidden md:block relative bg-custom-yellow">
            <div className="relative h-full flex items-center justify-center p-8">
              <div className="bg-white p-6 rounded-lg shadow-md max-w-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-custom-gray p-2 rounded-full">
                    <Calculator className="h-6 w-6 text-dark-blue" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Contoh Soal</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Jika populasi meningkat 30% per tahun, berapa rasio
                  pertumbuhan (r) dalam model geometrik?
                </p>
                <div className="space-y-2">
                  <div className="px-3 py-2 bg-green-50 rounded-md border border-green-200">
                    <p className="text-sm font-medium text-green-700">
                      r = 1.3
                    </p>
                  </div>
                  <div className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-sm text-gray-600">r = 0.7</p>
                  </div>
                  <div className="px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-sm text-gray-600">r = 1.03</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
