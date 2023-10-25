export const blockInvalidChar = (e) => {
  return ["e", "E", "+", "-", ".", ","].includes(e.key) && e.preventDefault();
};
