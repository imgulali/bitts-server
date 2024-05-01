export const cleanPhoneNumber = (phone) => {
  let cleanedNumber = phone.replace(/\D/g, "");

  if (cleanedNumber.length === 11 && cleanedNumber.startsWith("0")) {
    cleanedNumber = "92" + cleanedNumber.substring(1);
  }
  return cleanedNumber;
};