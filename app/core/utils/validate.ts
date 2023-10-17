export function validateEmail(input: string) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;

  if (input?.match(validRegex)) {
    // Extract the domain from the email.
    const parts = input.split('@');
    if (parts.length === 2) {
      const domain = parts[1];
      // List of major email providers for comparison.
      const validDomains = [
        'gmail.com',
        'yahoo.com',
        'outlook.com',
        'hotmail.com',
        'hotmail.es',
        'aol.com',
        'icloud.com',
        'protonmail.com',
        'zoho.com',
        'mail.com',
        'yandex.com'
        // Add more email providers here as needed
      ];

      if (validDomains.includes(domain)) {
        return true;
      }
    }
  }
  return false;
}

export function validatePassword(password: string) {
  // Verificar cada requisito por separado
  const lengthRequirement = password.length >= 8;
  const uppercaseRequirement = /[A-Z]/.test(password);
  const lowercaseRequirement = /[a-z]/.test(password);
  const numberRequirement = /\d/.test(password);

  return (
    lengthRequirement &&
    uppercaseRequirement &&
    lowercaseRequirement &&
    numberRequirement
  );
}
