import { MathJax } from 'better-react-mathjax';

const MathRenderer = ({ formula, type = 'block' }) => {
  const mathContent =
    type === 'inline' ? `\\(${formula}\\)` : `\\[${formula}\\]`;

  return <MathJax>{mathContent}</MathJax>;
};

export default MathRenderer;
