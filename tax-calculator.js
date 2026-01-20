/**
 * 消費税計算ロジック
 * Bloggerのボタンから呼び出されます
 */
function calculateTax() {
  // 入力された値を取得
  const priceInput = document.getElementById('priceInput');
  const resultDisplay = document.getElementById('resultDisplay');

  // 要素が見つからない場合のガード
  if (!priceInput || !resultDisplay) return;

  const price = priceInput.value;

  // 数字が入力されているかチェック
  if (price === "" || price <= 0) {
    resultDisplay.innerText = "正しい数値を入力してください";
    resultDisplay.style.color = "red";
    return;
  }

  // 計算（10%の税込計算）
  const taxRate = 1.1;
  const totalPrice = Math.floor(price * taxRate); // 小数点切り捨て

  // 結果を表示
  resultDisplay.innerText = "税込価格： " + totalPrice.toLocaleString() + " 円";
  resultDisplay.style.color = "#333";
}