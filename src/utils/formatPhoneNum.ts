export const changePhoneNumFormat = (phoneNum: string) => {
  return `${phoneNum.slice(0, 3)}-${phoneNum.slice(3, 7)}-${phoneNum.slice(
    -4
  )}`;
};
