export function maskEmail(email) {
  // Split the email into parts before and after the @ symbol
  const parts = email.split("@");
  const username = parts[0];
  const domain = parts[1];

  // Replace characters in the username randomly with asterisks
  const maskedUsername = username.replace(/[a-zA-Z0-9]/g, () =>
    Math.random() > 0.5
      ? "*"
      : username.charAt(Math.floor(Math.random() * username.length))
  );

  // Return the masked email address
  return maskedUsername + "@" + domain;
}

// Example usage
const email = "example@example.com";
const maskedEmail = maskEmail(email);
console.log(maskedEmail); // Outputs something like "e***m**e@***mple.com"
