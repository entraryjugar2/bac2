
window.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("cardForm");
  const cardInput = document.getElementById("cardNumber");
  const expiryInput = document.getElementById("expiry");
  const cvvInput = document.getElementById("cvv");

  /* ===== helpers ===== */
  const markError = el => el.classList.add("input-error");
  const clearError = el => el.classList.remove("input-error");

  /* ===== limpiar error al escribir ===== */
  [cardInput, expiryInput, cvvInput].forEach(input => {
    input.addEventListener("input", () => clearError(input));
  });

  /* ===== formato automático ===== */
  cardInput.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/(.{4})/g, "$1 ").trim();
    e.target.value = v;
  });

  expiryInput.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length >= 3) v = v.slice(0,2) + "/" + v.slice(2,4);
    e.target.value = v;
  });

  cvvInput.addEventListener("input", e => {
    e.target.value = e.target.value.replace(/\D/g, "");
  });

  /* ===== VALIDACIÓN FINAL FUERTE ===== */
  form.addEventListener("submit", e => {

    e.preventDefault(); // 🚨 BLOQUEA SIEMPRE

    let valid = true;

    const card = cardInput.value.replace(/\s/g, "");
    const expiry = expiryInput.value;
    const cvv = cvvInput.value;

    [cardInput, expiryInput, cvvInput].forEach(clearError);

    if (card.length < 13 || card.length > 16) {
      markError(cardInput);
      valid = false;
    }

   if (!/^\d{2}\/\d{2}$/.test(expiry) || isExpired(expiry)) {
  markError(expiryInput);
  valid = false;
}

    if (cvv.length < 3) {
      markError(cvvInput);
      valid = false;
    }

    if (valid) {
      // ✅ solo aquí se permite enviar
      form.submit();
    }
  });

});

function isExpired(expiry) {
  const [mm, yy] = expiry.split("/");

  const month = parseInt(mm, 10);
  const year = 2000 + parseInt(yy, 10);

  if (month < 1 || month > 12) return true;

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  if (year < currentYear) return true;
  if (year === currentYear && month < currentMonth) return true;

  return false;
}




