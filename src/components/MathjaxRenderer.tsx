import React, { useEffect, useRef } from 'react';

interface MathjaxRendererProps {
  formula: string; // Rumus matematika dalam format LaTeX
  type?: 'inline' | 'block'; // Jenis rendering: inline atau block
}

const MathjaxRenderer: React.FC<MathjaxRendererProps> = ({ formula, type = 'block' }) => {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mathRef.current && typeof window !== 'undefined') {
      // Pastikan MathJax sudah dimuat
      const MathJax = (window as any).MathJax;

      if (MathJax) {
        // Render rumus matematika
        MathJax.typesetPromise([mathRef.current]).catch((err: any) => {
          console.error('MathJax rendering error:', err);
        });
      }
    }
  }, [formula]);

  return (
    <div ref={mathRef}>
      {type === 'inline' ? `\\(${formula}\\)` : `\\[${formula}\\]`}
    </div>
  );
};

export default MathjaxRenderer;