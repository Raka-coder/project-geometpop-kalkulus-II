
/**
 * Calculate population based on geometric series
 *
 * @param initialPopulation - Initial population size
 * @param growthRate - Growth rate as a decimal (e.g., 0.05 for 5% growth)
 * @param periods - Number of time periods to calculate
 * @param carryingCapacity - Environmental carrying capacity (optional)
 * @returns Array of population values for each period
 */
export const calculatePopulationGrowth = (
  initialPopulation: number,
  growthRate: number,
  periods: number,
  carryingCapacity?: number
): number[] => {
  const results: number[] = new Array(periods + 1);
  results[0] = initialPopulation;

  // Without carrying capacity constraint (pure geometric growth)
  if (!carryingCapacity || carryingCapacity <= 0) {
    for (let t = 1; t <= periods; t++) {
      // P(t) = P(0) * (1 + r)^t
      results[t] = initialPopulation * Math.pow(1 + growthRate, t);
    }
  } else {
    // With carrying capacity constraint (logistic growth model)
    for (let t = 1; t <= periods; t++) {
      // Logistic growth equation: P(t+1) = P(t) + r*P(t)*(1 - P(t)/K)
      const prevPopulation = results[t - 1];
      const growthFactor =
        growthRate * prevPopulation * (1 - prevPopulation / carryingCapacity);
      results[t] = prevPopulation + growthFactor;
    }
  }

  // Return the results without rounding
  return results;
};

/**
 * Calculate the sum of a finite geometric series
 *
 * @param firstTerm - First term of the geometric series
 * @param commonRatio - Common ratio of the geometric series
 * @param numTerms - Number of terms in the series
 * @returns Sum of the geometric series
 */
export const calculateFiniteGeometricSum = (
  firstTerm: number,
  commonRatio: number,
  numTerms: number
): number => {
  // Formula: S_n = a(1-r^n)/(1-r) for r ≠ 1
  if (commonRatio === 1) {
    return firstTerm * numTerms;
  }

  return (
    (firstTerm * (1 - Math.pow(commonRatio, numTerms))) / (1 - commonRatio)
  );
};

/**
 * Calculate the sum of an infinite geometric series (only if |r| < 1)
 *
 * @param firstTerm - First term of the geometric series
 * @param commonRatio - Common ratio of the geometric series
 * @returns Sum of the infinite geometric series or null if |r| >= 1
 */
export const calculateInfiniteGeometricSum = (
  firstTerm: number,
  commonRatio: number
): number | null => {
  // Formula: S = a/(1-r) only if |r| < 1
  if (Math.abs(commonRatio) >= 1) {
    return null; // Series diverges
  }

  return firstTerm / (1 - commonRatio);
};

/**
 * Calculate the time to reach a specific population
 *
 * @param initialPopulation - Initial population
 * @param targetPopulation - Target population to reach
 * @param growthRate - Growth rate as a decimal
 * @returns Number of periods needed to reach target population
 */
export const calculateTimeToReachPopulation = (
  initialPopulation: number,
  targetPopulation: number,
  growthRate: number
): number => {
  // Formula: t = log(P_target/P_initial) / log(1 + r)
  if (
    growthRate <= 0 ||
    initialPopulation <= 0 ||
    targetPopulation <= initialPopulation
  ) {
    return -1; // Invalid inputs or target can't be reached
  }

  const timePeriodsDecimal =
    Math.log(targetPopulation / initialPopulation) / Math.log(1 + growthRate);
  return Math.ceil(timePeriodsDecimal); // Round up to next whole period
};

/**
 * Calculate population doubling time
 *
 * @param growthRate - Growth rate as a decimal
 * @returns Number of periods until population doubles
 */
export const calculateDoublingTime = (growthRate: number): number => {
  // Formula: t = log(2) / log(1 + r)
  if (growthRate <= 0) {
    return -1; // Invalid input
  }

  const doublingTime = Math.log(2) / Math.log(1 + growthRate);
  // Return exact value without rounding
  return doublingTime;
};
