export const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
export const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
export const phoneNumberRegex = /^(?:\+44\d{10}|07\d{9}|7\d{9})$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validatePostcode = (postcode: string): boolean => {
  return postcodeRegex.test(postcode.trim());
};

export const validateName = (name: string): boolean => {
  return name.trim().length > 0 && nameRegex.test(name.trim());
};

export const validateDob = (dob: string): boolean => {
  if (!dob) return false;

  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 18;
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  return phoneNumberRegex.test(phoneNumber.trim());
};

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email.trim());
};
