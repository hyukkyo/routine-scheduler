export const generatePastelColor = (): string => {
  // 파스텔톤을 위해 기본 채도를 높게 설정
  const hue = Math.floor(Math.random() * 360); // 0-359 색상
  const saturation = 45 + Math.floor(Math.random() * 30); // 45-74% 채도로 증가
  const lightness = 45 + Math.floor(Math.random() * 20); // 45-64% 명도로 조정
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
