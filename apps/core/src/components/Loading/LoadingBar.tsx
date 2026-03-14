import styled, { keyframes } from 'styled-components';

const LoadingBar = () => (
  <Bar />
);

const progress = keyframes`
  0% { width: 0%; opacity: 1; }
  80% { width: 90%; opacity: 1; }
  100% { width: 100%; opacity: 0; }
`;

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background-color: ${({ theme }) => theme.primaryNormal};
  animation: ${progress} 1.5s ease-in-out forwards;
  z-index: 9999;
`;

export default LoadingBar;
