async function searchWords() {
  const resultArea = document.getElementById('result-area');
  
  // 1. 入力された文字を取得し、空欄を除外する
  const chars = [
    document.getElementById('char1').value.toLowerCase(),
    document.getElementById('char2').value.toLowerCase(),
    document.getElementById('char3').value.toLowerCase(),
    document.getElementById('char4').value.toLowerCase(),
    document.getElementById('char5').value.toLowerCase()
  ].filter(c => c !== ""); // 入力されている文字だけを取り出す

  // 何も入力されていない場合はメッセージを出して終了
  if (chars.length === 0) {
    resultArea.innerText = "検索する文字を1つ以上入力してください。";
    return;
  }

  resultArea.innerText = "検索中...";

  try {
    // ※ ここをご自身のGitHubの「Raw」URLに書き換えてください
    //const githubTxtUrl = 'https://raw.githubusercontent.com/ユーザー名/リポジトリ名/main/words.txt';
    const githubTxtUrl = 'https://raw.githubusercontent.com/softclear000-arch/blogger-scripts/refs/heads/main/luw_5char_words_utf8_uniq.txt’；
    const response = await fetch(githubTxtUrl);
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.text();
    const wordList = data.split(/\r?\n/).filter(line => line.trim() !== "");

    // 2. 入力されたすべての文字を含む単語をフィルタリング
    const matches = wordList.filter(word => {
      const lowerWord = word.toLowerCase();
      // 入力された全ての文字（chars）が、単語（lowerWord）に含まれているかチェック
      return chars.every(char => lowerWord.includes(char));
    });

    // 3. 結果を表示（最初の5つだけを表示）
    if (matches.length > 0) {
      // 最初の5つを切り出す
      const firstFive = matches.slice(0, 5);
      
      let html = `<strong>検索結果（${matches.length}件中、最初の5件を表示）:</strong><ul>`;
      firstFive.forEach(w => {
        html += `<li>${w}</li>`;
      });
      html += `</ul>`;
      
      resultArea.innerHTML = html;
    } else {
      resultArea.innerText = "一致する単語は見つかりませんでした。";
    }

  } catch (error) {
    console.error('Error:', error);
    resultArea.innerText = "データの取得に失敗しました。";
  }
}