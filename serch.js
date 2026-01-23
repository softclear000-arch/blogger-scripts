async function searchWords() {
  const resultArea = document.getElementById('result-area');
  
  // 1. 入力された文字を取得
  const chars = [
    document.getElementById('char1').value.toLowerCase(),
    document.getElementById('char2').value.toLowerCase(),
    document.getElementById('char3').value.toLowerCase(),
    document.getElementById('char4').value.toLowerCase(),
    document.getElementById('char5').value.toLowerCase()
  ].filter(c => c !== "");

  if (chars.length < 5) {
    resultArea.innerText = "5つの文字をすべて入力してください。";
    return;
  }

  resultArea.innerText = "検索中...";

  try {
    // ※ ここはご自身のGitHub上のテキストファイルのURLに書き換えてください
    const githubTxtUrl = 'https://raw.githubusercontent.com/ユーザー名/リポジトリ名/main/words.txt';
    const response = await fetch(githubTxtUrl);
    const data = await response.text();
    const wordList = data.split(/\r?\n/);

    const matches = wordList.filter(word => {
      const lowerWord = word.toLowerCase();
      return chars.every(char => lowerWord.includes(char));
    });

    if (matches.length > 0) {
      resultArea.innerHTML = "<strong>見つかった単語:</strong><br>" + matches.join(', ');
    } else {
      resultArea.innerText = "一致する単語は見らませんでした。";
    }

  } catch (error) {
    resultArea.innerText = "データの取得に失敗しました。";
  }
}