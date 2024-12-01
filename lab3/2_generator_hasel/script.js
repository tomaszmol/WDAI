document.getElementById("generate-password").addEventListener("click", () => {
  const minLength = parseInt(document.getElementById("min-length").value);
  const maxLength = parseInt(document.getElementById("max-length").value);
  const includeUppercase = document.getElementById("include-uppercase").checked;
  const includeSpecial = document.getElementById("include-special").checked;

  if (
    minLength > maxLength ||
    isNaN(minLength) ||
    isNaN(maxLength) ||
    minLength < 0 ||
    maxLength < 0
  ) {
    alert("Niepoprawnie podane wartości, podaj wartości ponownie.");
    return;
  }

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!@#$%^&*()_+[]{}<>?,.";
  const numericChars = "0123456789";

  let characterPool = lowercaseChars + numericChars;
  if (includeUppercase) characterPool += uppercaseChars;
  if (includeSpecial) characterPool += specialChars;

  const passwordLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  alert(`Twoje wygenerowane hasło: ${password}`);
});
