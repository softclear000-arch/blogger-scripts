async function searchWords() {
  const resultArea = document.getElementById('result-area');

  // 1. 入力された文字を取得し、正規化（全角に統一）して空欄を除外
  const chars = [
    document.getElementById('char1').value,
    document.getElementById('char2').value,
    document.getElementById('char3').value,
    document.getElementById('char4').value,
    document.getElementById('char5').value
  ]
  .map(c => c.normalize('NFKC').trim()) // 半角を全角に変換し、余計な空白を削除
  .filter(c => c !== ""); 

  if (chars.length === 0) {
    resultArea.innerText = "検索するカタカナを1つ以上入力してください。";
    return;
  }
  resultArea.innerText = chars.length;
  //resultArea.innerText = "検索中...";
/*
  try {
    // ※ ここをあなたのGitHub Raw URLに書き換えてください
    //const githubTxtUrl = 'https://raw.githubusercontent.com/ユーザー名/リポジトリ名/main/words.txt';
    const githubTxtUrl = 'https://raw.githubusercontent.com/softclear000-arch/blogger-scripts/refs/heads/main/luw_5char_words_utf8_uniq.txt’；
    const response = await fetch(githubTxtUrl);
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    // UTF-8としてテキストを読み込む（fetchは標準でUTF-8対応です）
    const data = await response.text();
    const wordList = data.split(/\r?\n/).filter(line => line.trim() !== "");

    // 2. 入力されたすべてのカタカナを含む単語をフィルタリング
    const matches = wordList.filter(word => {
      // 検索対象の単語も正規化して比較
      const normalizedWord = word.normalize('NFKC');
      return chars.every(char => normalizedWord.includes(char));
    });

    // 3. 結果を表示（最初の5つだけ）
    if (matches.length > 0) {
      const firstFive = matches.slice(0, 5);
      let html = `<p style="font-weight:bold;">検索結果（${matches.length}件中、最大5件を表示）:</p><ul>`;
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
    resultArea.innerText = "データの取得に失敗しました。ファイルがUTF-8で保存されているか確認してください。";
  }
*/
 
}








