import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Calculator, BookOpen, NotebookPen, Home } from 'lucide-react';
import DynamicBreadcrumb from '@/components/BreadCrumb';
import MathRenderer from '../components/MathRenderer';

type Question = {
  id: number;
  type: 'calculation' | 'theory';
  text: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-based)
  explanation: string;
  formula?: string;
};

const questions: Question[] = [
  {
    id: 1,
    type: 'calculation',
    text: 'Populasi bakteri membelah diri menjadi 2 setiap 20 menit. Jika awalnya ada 5 bakteri, berapa jumlah bakteri setelah 2 jam?',
    options: ['160 bakteri', '320 bakteri', '640 bakteri', '1280 bakteri'],
    correctAnswer: 1,
    explanation:
      '2 jam = 6 interval 20 menit. Menggunakan rumus pertumbuhan geometrik:',
    formula: 'P_n = P_0 \\times r^n = 5 \\times 2^6 = 320',
  },
  {
    id: 2,
    type: 'theory',
    text: 'Apa arti rasio pertumbuhan (r) = 1.5 dalam model pertumbuhan populasi geometrik?',
    options: [
      'Populasi meningkat 50% setiap periode',
      'Populasi menurun 50% setiap periode',
      'Populasi tetap stabil',
      'Populasi berfluktuasi acak',
    ],
    correctAnswer: 0,
    explanation:
      'Rasio 1.5 berarti populasi meningkat 50% setiap periode waktu karena:',
    formula: 'r = 1 + \\frac{50}{100} = 1.5',
  },
  {
    id: 3,
    type: 'calculation',
    text: 'Populasi burung menurun 15% per tahun. Jika saat ini ada 800 ekor, berapa populasi setelah 3 tahun?',
    options: ['491 ekor', '512 ekor', '578 ekor', '614 ekor'],
    correctAnswer: 0,
    explanation: 'Penurunan 15% berarti r = 0.85. Perhitungannya:',
    formula: 'P_3 = 800 \\times (0.85)^3 \\approx 491',
  },
  {
    id: 4,
    type: 'theory',
    text: 'Mengapa model pertumbuhan geometrik dianggap tidak realistis untuk jangka panjang?',
    options: [
      'Karena mengabaikan faktor pembatas lingkungan',
      'Karena terlalu kompleks',
      'Karena hanya berlaku untuk manusia',
      'Karena tidak bisa menghitung populasi awal',
    ],
    correctAnswer: 0,
    explanation:
      'Model ini mengasumsikan sumber daya tak terbatas, padahal di alam terdapat:',
    formula: '\\text{Faktor pembatas} = \\text{ruang, makanan, predator, dll.}',
  },
  {
    id: 5,
    type: 'calculation',
    text: 'Berapa kali pembelahan yang diperlukan untuk 1 sel menjadi lebih dari 10.000 sel jika setiap pembelahan jumlahnya menjadi 5 kali lipat?',
    options: ['4 kali', '5 kali', '6 kali', '7 kali'],
    correctAnswer: 2,
    explanation: 'Kita cari n terkecil dimana:',
    formula:
      '1 \\times 5^n > 10,\\!000 \\implies n = 6 \\ \\text{(karena } 5^6 = 15,\\!625\\text{)}',
  },
  {
    id: 6,
    type: 'theory',
    text: 'Dalam konteks konservasi, model pertumbuhan geometrik paling berguna untuk:',
    options: [
      'Memprediksi risiko kepunahan populasi kecil',
      'Menghitung daya dukung lingkungan',
      'Menganalisis rantai makanan',
      'Memperkirakan kebutuhan air',
    ],
    correctAnswer: 0,
    explanation:
      'Model ini efektif untuk populasi kecil karena dapat menunjukkan:',
    formula:
      '\\text{Trend } r < 1 \\text{ (penurunan) atau } r > 1 \\text{ (pemulihan)}',
  },
  {
    id: 7,
    type: 'calculation',
    text: 'Jika populasi meningkat dari 200 menjadi 338 dalam 2 tahun, berapa rasio pertumbuhan tahunannya?',
    options: ['1.2', '1.25', '1.3', '1.35'],
    correctAnswer: 2,
    explanation: 'Kita cari r yang memenuhi:',
    formula:
      '200 \\times r^2 = 338 \\implies r = \\sqrt{\\frac{338}{200}} = 1.3',
  },
];

function QuizPage() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(parseInt(value));
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
    setAnsweredQuestions([]);
  };

  const progressValue = ((currentQuestion + 1) / questions.length) * 100;

  const config = {
    loader: { load: ['input/asciimath'] },
    asciimath: {
      displaystyle: true,
      delimiters: [['$$', '$$']],
    },
  };

  const title = 'Kuis Pemodelan Populasi';

  const breadcrumbItems = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Kuis', icon: NotebookPen },
  ];

  return (
    <>
      <Helmet>
        <title>GeometPop - {title}</title>
        <meta
          name="description"
          content="Aplikasi GeometPop untuk pemodelan pertumbuhan populasi dengan deret geometri."
        />
        <link rel="canonical" href="/quiz" />
      </Helmet>
    <div className="min-h-screen bg-custom-gray/10 py-12 px-4 font-nunitosans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 cursor-pointer">
          <DynamicBreadcrumb pages={breadcrumbItems} />
        </div>
        <h1 className="text-3xl font-bold text-dark-blue mb-6">
          Kuis Pemodelan Populasi
        </h1>
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-semibold text-dark-blue">
                  Kuis Pemodelan Populasi
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Uji pemahaman Anda tentang model pertumbuhan geometrik dengan
                  menjawab pertanyaan berikut.
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="text-sm md:text-base py-2 px-4 md:py-2 md:px-3 border-custom-yellow text-dark-blue"
              >
                Skor: {score}/{questions.length}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!quizCompleted ? (
              <>
                <Progress value={progressValue} className="h-2" />

                <div className="flex items-start gap-2">
                  {questions[currentQuestion].type === 'calculation' ? (
                    <Calculator className="h-6 w-6 text-dark-blue mt-1" />
                  ) : (
                    <BookOpen className="h-6 w-6 text-dark-blue mt-1" />
                  )}
                  <div className="space-y-2 flex-1">
                    <Label className="text-lg font-semibold text-gray-800">
                      Pertanyaan {currentQuestion + 1} dari {questions.length} (
                      {questions[currentQuestion].type === 'calculation'
                        ? 'Hitungan'
                        : 'Teori'}
                      ):
                    </Label>
                    <p className="text-base md:text-lg font-medium text-gray-900">
                      {questions[currentQuestion].text}
                    </p>
                  </div>
                </div>

                <RadioGroup
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="text-base font-normal cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {showExplanation && (
                  <div
                    className={`p-4 rounded-lg border ${
                      selectedAnswer ===
                      questions[currentQuestion].correctAnswer
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="space-y-3">
                      <p className="font-medium">
                        {selectedAnswer ===
                        questions[currentQuestion].correctAnswer
                          ? 'Jawaban Anda Benar!'
                          : 'Jawaban Anda Salah'}
                      </p>
                      <p className="text-gray-700">
                        {questions[currentQuestion].explanation}
                      </p>
                      {questions[currentQuestion].formula && (
                        <div className="p-3 bg-custom-gray/50 rounded-md">
                          <MathRenderer
                            formula={`${questions[currentQuestion].formula}`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-custom-yellow mb-4">
                  Kuis Selesai!
                </h3>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-40 h-40 mb-4">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-custom-yellow/90"
                        strokeWidth="8"
                        strokeDasharray={`${(score / questions.length) * 251} 251`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-dark-blue">
                      {Math.round((score / questions.length) * 100)}%
                    </div>
                  </div>
                  <p className="text-lg">
                    Anda menjawab <span className="font-bold">{score}</span>{' '}
                    dari {questions.length} pertanyaan dengan benar
                  </p>
                </div>
                <Button
                  onClick={handleRestartQuiz}
                  className="bg-custom-yellow text-dark-blue hover:bg-custom-yellow/90"
                >
                  Ulangi Kuis
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-6">
            {!quizCompleted && (
              <>
                <Button
                  variant="outline"
                  onClick={handleRestartQuiz}
                  className="border-dark-blue text-dark-blue hover:bg-gray-50 sm:w-auto w-full md:w-auto"
                >
                  Mulai Ulang
                </Button>
                <div className="sm:flex sm:flex-row sm:items-center sm:gap-3">
                  {answeredQuestions.includes(currentQuestion) ? (
                    <Button onClick={handleNextQuestion} className="w-full md:w-auto">
                      {currentQuestion < questions.length - 1
                        ? 'Pertanyaan Berikutnya'
                        : 'Selesaikan Kuis'}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={handleSubmit}
                      disabled={selectedAnswer === null}
                      className="bg-custom-yellow text-dark-blue hover:bg-custom-yellow/90 sm:w-full w-full md:w-full"
                    >
                      Periksa Jawaban
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardFooter>
        </Card>

        <Card className="mt-8 p-6">
          <h2 className="text-2xl font-semibold text-dark-blue mb-4 flex items-center gap-2">
             Ringkasan Konsep
          </h2>
          <div className="prose prose-indigo max-w-none">
            <h4 className="text-lg font-semibold text-dark-blue">
              Model Pertumbuhan Geometrik
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-dark-blue mb-2">Rumus Dasar</h5>
                <div className="p-3 bg-dark-blue/5 rounded-md mb-3">
                  <MathRenderer formula=" P_n = P_0 \times r^n " />
                </div>
                <ul className="space-y-2 text-gray-700 text-sm grid grid-cols-1">
                  <li className="flex items-center">
                    <MathRenderer formula={'P_n'} />
                    <span className="ml-2">: Populasi pada periode ke-n</span>
                  </li>
                  <li className="flex items-center">
                    <MathRenderer formula={'P_0'} />
                    <span className="ml-2">: Populasi awal</span>
                  </li>
                  <li className="flex items-center">
                    <MathRenderer formula={'r'} />
                    <span className="ml-2">
                      : Rasio pertumbuhan per periode
                    </span>
                  </li>
                  <li className="flex items-center">
                    <MathRenderer formula={'n'} />
                    <span className="ml-2">: Jumlah periode waktu</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-dark-blue mb-2">
                  Interpretasi Rasio (r)
                </h5>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-center">
                    <span className="font-semibold text-green-600">
                      <MathRenderer formula={'r > 1'} />
                    </span>
                    {}:<span></span>
                    <span className="ml-2">Pertumbuhan populasi</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold text-blue-600">
                      <MathRenderer formula={'r = 1'} />
                    </span>
                    {}:<span></span>
                    <span className="ml-2">Populasi stabil</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold text-red-600">
                      <MathRenderer formula={'0 < r < 1'} />
                    </span>
                    {}:<span></span>
                    <span className="ml-2">Penurunan populasi</span>
                  </li>
                </ul>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-dark-blue mt-6">
              Contoh Aplikasi
            </h4>
            <div className="grid md:grid-cols-2 gap-6 mt-2">
              <div>
                <h5 className="font-medium text-dark-blue mb-2">
                  Pertumbuhan Populasi
                </h5>
                <div className="p-4 bg-dark-blue/5 rounded-lg">
                <p className="text-sm font-bold text-dark-blue">
                  <MathRenderer formula="\text{Jika } P_0 = 10, r = 2, n = 4:" />
                </p>
                <p className="text-sm font-bold text-dark-blue">
                  <MathRenderer formula="P_4 = 10 \times 2^4 = 160 \text{ populasi}" />
                </p>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-dark-blue mb-2">
                  Penurunan Populasi
                </h5>
                <div className="p-4 bg-dark-blue/5 rounded-lg">
                <p className="text-sm font-bold text-dark-blue">

                  <MathRenderer formula="\text{Jika } P_0 = 1000, r = 0.8, n = 3: " />
                </p>
                  <p className="text-sm font-bold text-dark-blue">

                  <MathRenderer formula=" P_3 = 1000 \times (0.8)^3 = 512 \text{ individu}" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
}

export default QuizPage;