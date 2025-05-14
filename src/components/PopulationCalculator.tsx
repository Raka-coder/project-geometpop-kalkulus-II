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

const PopulationCalculator = () => {
  const { toast } = useToast();

  // Form inputs
  const [initialPopulation, setInitialPopulation] = useState<number>(100);
  const [growthRate, setGrowthRate] = useState<number>(0.05);
  const [periods, setPeriods] = useState<number>(20);
  const [useCarryingCapacity, setUseCarryingCapacity] =
    useState<boolean>(false);
  const [carryingCapacity, setCarryingCapacity] = useState<number>(1000);

  // Calculation results
  const [populationData, setPopulationData] = useState<number[]>([]);
  const [finalPopulation, setFinalPopulation] = useState<number>(0);
  const [doublingTime, setDoublingTime] = useState<number>(0);
  const [totalIndividuals, setTotalIndividuals] = useState<number>(0);
  const [infiniteSum, setInfiniteSum] = useState<number | null>(null);

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
            Analisis
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
                    type="number"
                    value={initialPopulation}
                    onChange={(e) =>
                      setInitialPopulation(Number(e.target.value))
                    }
                    min="1"
                    step="1"
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
                      type="number"
                      value={growthRate}
                      onChange={(e) => setGrowthRate(Number(e.target.value))}
                      min="-0.99"
                      max="10"
                      step="0.01"
                      className="flex-1"
                    />
                    <span className="w-10 text-center">
                      {(growthRate * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Rasio pertumbuhan per periode (desimal)
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

              <div className="flex items-center space-x-3 pt-2">
                <Switch
                  id="use-carrying-capacity"
                  checked={useCarryingCapacity}
                  onCheckedChange={setUseCarryingCapacity}
                />
                <Label htmlFor="use-carrying-capacity">
                  Gunakan Daya Dukung Lingkungan
                </Label>
              </div>

              {useCarryingCapacity && (
                <div className="space-y-2">
                  <Label htmlFor="carrying-capacity">Daya Dukung (K)</Label>
                  <Input
                    id="carrying-capacity"
                    type="number"
                    value={carryingCapacity}
                    onChange={(e) =>
                      setCarryingCapacity(Number(e.target.value))
                    }
                    min={initialPopulation}
                    step="10"
                  />
                  <p className="text-sm text-muted-foreground">
                    Kapasitas maksimum populasi yang dapat didukung oleh
                    lingkungan
                  </p>
                </div>
              )}

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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info size={18} className="mr-2" />
                Analisis Deret Geometri
              </CardTitle>
              <CardDescription>
                Informasi tambahan dan analisis mendalam berdasarkan parameter
                model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-l-4 border-custom-yellow pl-3">
                    Waktu Penggandaan
                  </h3>
                  <p className="text-sm">
                    Waktu yang dibutuhkan untuk populasi menjadi dua kali lipat
                    dari ukuran awalnya.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {growthRate > 0 ? (
                      <>
                        <p className="text-xl font-bold text-dark-blue">
                          {doublingTime.toFixed(2)} periode
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Dengan tingkat pertumbuhan{' '}
                          {(growthRate * 100).toFixed(2)}% per periode
                        </p>
                      </>
                    ) : (
                      <p className="text-red-500">
                        Populasi tidak tumbuh (tingkat pertumbuhan ≤ 0)
                      </p>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold border-l-4 border-custom-yellow pl-3 mt-6">
                    Waktu Untuk Mencapai Target
                  </h3>
                  {growthRate > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm">
                        Berapa periode yang dibutuhkan untuk mencapai populasi
                        10 kali lipat dari populasi awal:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-xl font-bold text-dark-blue">
                          {calculateTimeToReachPopulation(
                            initialPopulation,
                            initialPopulation * 10,
                            growthRate
                          )}{' '}
                          periode
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-red-500">
                      Tidak dapat menghitung waktu pencapaian dengan tingkat
                      pertumbuhan ≤ 0
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-l-4 border-custom-yellow pl-3">
                    Total Individu Selama Periode
                  </h3>
                  <p className="text-sm">
                    Total individu yang ada selama semua periode (jumlah dari
                    semua periode). Ini adalah jumlah suku deret geometri.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-xl font-bold text-dark-blue mb-2">
                      {formatNumber(totalIndividuals)}
                    </p>
                    <div className="flex items-center">
                      <p className="text-sm text-muted-foreground">
                        <MathRenderer
                          type="inline"
                          formula="S_n = \frac{a(1 - r^n)}{1 - r}"
                        />
                      </p>
                      <p className="text-sm text-muted-foreground ml-2">
                        untuk {periods + 1} suku
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold border-l-4 border-custom-yellow pl-3 mt-6">
                    Analisis Jangka Panjang
                  </h3>
                  {infiniteSum !== null ? (
                    <>
                      <p className="text-sm">
                        Untuk rasio pertumbuhan |r| &lt; 1, jumlah deret
                        geometri tak hingga:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-xl font-bold text-dark-blue">
                          {formatNumber(infiniteSum)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          S<sub>∞</sub> = a/(1-r) = {initialPopulation}/(1-(
                          {growthRate.toFixed(2)}))
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-red-500">
                        Deret divergen (jumlah tak hingga tidak terhingga)
                        karena |r| ≥ 1
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Dengan tingkat pertumbuhan{' '}
                        {(growthRate * 100).toFixed(2)}%, populasi akan terus
                        bertambah tanpa batas
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Card className="bg-dark-blue/5 border-custom-yellow mt-4">
                <CardHeader className="py-3">
                  <CardTitle className="text-dark-blue text-lg">
                    Penjelasan Model
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">
                    <span className="font-semibold">Model Dasar: </span>
                    <span className="inline-flex items-center">
                      Pertumbuhan populasi mengikuti pola deret geometri dengan
                      rumus&nbsp;&nbsp;
                      <MathRenderer
                        formula="P(t) = P_0 (1 + r)^t"
                        type="inline"
                      />
                    </span>
                  </p>
                  {useCarryingCapacity ? (
                    <p className="text-sm mb-3">
                      <span className="font-semibold">
                        Model dengan Daya Dukung:
                      </span>
                      <span className="inline-flex items-center">
                        Ketika daya dukung diterapkan, model menggunakan
                        persamaan logistik
                        <MathRenderer
                          formula="P(t+1) = P(t) + r×P(t)×(1-P(t)/K)"
                          type="inline"
                        />
                        di mana K adalah kapasitas maksimum.
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm mb-3">
                      <span className="font-semibold">Keterbatasan:</span> Model
                      dasar tanpa daya dukung dapat menghasilkan pertumbuhan tak
                      terbatas yang tidak realistis dalam jangka panjang.
                      Aktifkan "Daya Dukung Lingkungan" untuk model yang lebih
                      realistis.
                    </p>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PopulationCalculator;
