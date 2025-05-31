import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ChevronRight, Calculator, TrendingUp, Info } from 'lucide-react';
import PopulationChart from './PopulationChart';
import {
  calculatePopulationGrowth,
  calculateFiniteGeometricSum,
  calculateInfiniteGeometricSum,
  calculateDoublingTime,
  calculateTimeToReachPopulation,
} from '@/utils/populationCalculations';
import { useToast } from '@/components/ui/use-toast';
import MathRenderer from './MathRenderer';

// Helper function to parse number inputs with comma as decimal separator
const parseCommaNumber = (value: string): number => {
  if (!value) return 0;
  // Replace commas with dots for proper parsing
  return parseFloat(value.replace(',', '.'));
};

// Helper function to format number with comma as decimal separator
const formatCommaNumber = (value: number): string => {
  if (isNaN(value)) return '';
  // Convert to string with dots as decimal separator and then replace with comma
  return value.toString().replace('.', ',');
};

const PopulationCalculator = () => {
  const { toast } = useToast();

  // Form inputs (using string for input values to handle comma separators)
  const [initialPopulationStr, setInitialPopulationStr] =
    useState<string>('100');
  const [growthRateStr, setGrowthRateStr] = useState<string>('0,05');
  const [periods, setPeriods] = useState<number>(20);
  const [useCarryingCapacity, setUseCarryingCapacity] =
    useState<boolean>(false);
  const [carryingCapacityStr, setCarryingCapacityStr] =
    useState<string>('1000');

  // Parsed numeric values
  const [initialPopulation, setInitialPopulation] = useState<number>(100);
  const [growthRate, setGrowthRate] = useState<number>(0.05);
  const [carryingCapacity, setCarryingCapacity] = useState<number>(1000);

  // Calculation results
  const [populationData, setPopulationData] = useState<number[]>([]);
  const [finalPopulation, setFinalPopulation] = useState<number>(0);
  const [doublingTime, setDoublingTime] = useState<number>(0);
  const [totalIndividuals, setTotalIndividuals] = useState<number>(0);
  const [infiniteSum, setInfiniteSum] = useState<number | null>(null);

  // Update parsed numeric values when string inputs change
  useEffect(() => {
    setInitialPopulation(parseCommaNumber(initialPopulationStr));
    setGrowthRate(parseCommaNumber(growthRateStr));
    setCarryingCapacity(parseCommaNumber(carryingCapacityStr));
  }, [initialPopulationStr, growthRateStr, carryingCapacityStr]);

  // Calculate population based on current inputs
  const calculatePopulation = () => {
    if (initialPopulation <= 0) {
      toast({
        title: 'Input tidak valid',
        description: 'Populasi awal harus lebih besar dari 0',
        variant: 'destructive',
      });
      return;
    }

    if (growthRate < -0.99) {
      toast({
        title: 'Input tidak valid',
        description: 'Tingkat pertumbuhan tidak boleh kurang dari -0.99 (-99%)',
        variant: 'destructive',
      });
      return;
    }

    // Calculate population growth
    const popData = calculatePopulationGrowth(
      initialPopulation,
      growthRate,
      periods,
      useCarryingCapacity ? carryingCapacity : undefined
    );
    setPopulationData(popData);
    setFinalPopulation(popData[periods]);

    // Calculate doubling time
    if (growthRate > 0) {
      setDoublingTime(calculateDoublingTime(growthRate));
    } else {
      setDoublingTime(-1); // Population doesn't double with negative growth
    }

    // Calculate total individuals over time (sum of geometric series)
    const commonRatio = 1 + growthRate;
    setTotalIndividuals(
      calculateFiniteGeometricSum(initialPopulation, commonRatio, periods + 1)
    );

    // Calculate infinite sum (long-term population) if applicable
    setInfiniteSum(
      calculateInfiniteGeometricSum(initialPopulation, commonRatio)
    );

    toast({
      title: 'Kalkulasi selesai',
      description: `Hasil perhitungan untuk ${periods} periode telah diperbarui.`,
    });
  };

  // Calculate initial population when component mounts
  useEffect(() => {
    calculatePopulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format large numbers for display
  const formatNumber = (num: number): string => {
    if (isNaN(num) || num === Infinity || num === -Infinity) {
      return 'Tidak terdefinisi';
    }

    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)} juta`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)} ribu`;
    } else {
      return num.toFixed(2);
    }
  };

  return (
    <div className="w-full font-nunitosans">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="calculator" className="flex items-center">
            <Calculator size={16} className="mr-2" />
            Kalkulator
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center">
            <TrendingUp size={16} className="mr-2" />
            Analisis Pertumbuhan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Pertumbuhan Populasi</CardTitle>
              <CardDescription>
                Masukkan nilai untuk menghitung pertumbuhan populasi berdasarkan
                deret geometri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="initial-population">Populasi Awal (P₀)</Label>
                  <Input
                    id="initial-population"
                    type="text"
                    value={initialPopulationStr}
                    onChange={(e) => setInitialPopulationStr(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Jumlah individu pada awal periode
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="growth-rate">Tingkat Pertumbuhan (r)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="growth-rate"
                      type="text"
                      value={growthRateStr}
                      onChange={(e) => setGrowthRateStr(e.target.value)}
                      className="flex-1"
                    />
                    <span className="w-10 text-center">
                      {(parseCommaNumber(growthRateStr) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Rasio pertumbuhan per periode
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="periods">Jumlah Periode (n)</Label>
                <div className="flex flex-col space-y-2">
                  <Slider
                    id="periods"
                    value={[periods]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(value) => setPeriods(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">1</span>
                    <span className="text-sm font-medium">{periods}</span>
                    <span className="text-sm">100</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Jumlah interval waktu untuk disimulasikan
                </p>
              </div>

              {/* <div className="flex items-center space-x-3 pt-2">
                <Switch
                  id="use-carrying-capacity"
                  checked={useCarryingCapacity}
                  onCheckedChange={setUseCarryingCapacity}
                />
                <Label htmlFor="use-carrying-capacity">
                  Gunakan Daya Dukung Lingkungan
                </Label>
              </div> */}

              {/* {useCarryingCapacity && (
                <div className="space-y-2">
                  <Label htmlFor="carrying-capacity">Daya Dukung (K)</Label>
                  <Input
                    id="carrying-capacity"
                    type="text"
                    value={carryingCapacityStr}
                    onChange={(e) => setCarryingCapacityStr(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Kapasitas maksimum populasi yang dapat didukung oleh
                    lingkungan
                  </p>
                </div>
              )} */}

              <Button
                onClick={calculatePopulation}
                className="w-full bg-custom-yellow text-dark-blue hover:bg-custom-yellow/90 font-medium"
              >
                Hitung Pertumbuhan Populasi
                <ChevronRight className="ml-2" size={16} />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hasil Pertumbuhan Populasi</CardTitle>
              <CardDescription>
                Visualisasi pertumbuhan populasi berdasarkan parameter yang
                dimasukkan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <PopulationChart
                populationData={populationData}
                carryingCapacity={
                  useCarryingCapacity ? carryingCapacity : undefined
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Populasi Awal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-dark-blue">
                      {formatNumber(initialPopulation)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Populasi Akhir</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-dark-blue">
                      {formatNumber(finalPopulation)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Pertumbuhan Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-custom-yellow">
                      {formatNumber(finalPopulation - initialPopulation)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(
                        (finalPopulation / initialPopulation - 1) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Periode Waktu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-dark-blue">
                      {periods}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-dark-blue mb-4">
                Aplikasi dalam Pemodelan Populasi
              </h2>
              <p className="text-gray-700 mb-4">
                Deret geometri memiliki aplikasi yang kuat dalam pemodelan
                pertumbuhan populasi:
              </p>

              <h3 className="text-xl font-semibold text-dark-blue mt-6 mb-3">
                Model Pertumbuhan Eksponensial
              </h3>
              <p className="text-gray-700 mb-4">
                Model pertumbuhan eksponensial menggunakan deret geometri di
                mana ukuran populasi pada waktu t dapat dinyatakan sebagai:
              </p>
              <div className="bg-dark-blue/5 p-4 rounded-lg mb-6 flex flex-col items-center justify-center gap-4">
                <p className="text-center text-sm font-bold text-dark-blue">
                  <MathRenderer
                    type="inline"
                    formula="P(t) = P_0 \times (1 + r)^t"
                  />
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                Di mana P<sub>0</sub> adalah populasi awal dan r adalah tingkat
                pertumbuhan per periode waktu.
              </p>

              {/*  */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PopulationCalculator;
