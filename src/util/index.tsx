export const getRandomColor = () => {
  const randomColors = ["#D72638", "#3F88C5", "#F49D37", "#140F2D", "#F22B29"];
  const randNo = Math.floor(randomColors.length * Math.random());
  return randomColors[randNo];
};

export const VerifyData = (i?: string) => {
  return i ? i : `Not Available`;
};
