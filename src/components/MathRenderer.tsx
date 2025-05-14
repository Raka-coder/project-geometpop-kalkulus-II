import { MathJax } from 'better-react-mathjax';

const MathRenderer = ({ formula, type = 'block' }) => {
  const mathContent =
    type === 'inline' ? `\\(${formula}\\)` : `\\[${formula}\\]`;

  return (
    <MathJax
      {...({
        options: {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
            processRefs: true,
            processEnvironments: true,
          },
          loader: { load: ['input/tex', 'output/chtml'] },
        },
      } as any)}
      className={`math-renderer ${type === 'inline' ? 'inline' : 'block'}`}
    >
      {mathContent}
    </MathJax>
  );
};

export default MathRenderer;