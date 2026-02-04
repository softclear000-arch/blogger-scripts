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
  //resultArea.innerText = chars.length;
  //resultArea.innerText = "検索中...";

 try {
  // --- 手順1：GitHubから単語ファイルをダウンロードする ---
  
  // GitHubにあるテキストファイルの場所（URL）を指定します
  const githubTxtUrl = 'https://raw.githubusercontent.com/softclear000-arch/blogger-scripts/refs/heads/main/luw_5char_sample_utf8.txt';

  // 指定したURLにアクセスして、データを取ってくるよう命令します（fetch）
  const response = await fetch(githubTxtUrl);
  
  // もし通信に失敗（ファイルが見つからない等）したら、エラーとして処理を中断します
  if (!response.ok) {
    throw new Error('データの読み込みに失敗しました');
  }
  
  // --- 手順2：届いたデータを「単語のリスト」に変換する ---

  // 通信で届いた中身を「テキスト（文字列）」として読み込みます
  const data = await response.text();
  
  // テキストを「改行」で区切って、1行ずつのリスト（配列）に作り変えます
  // .filter(line => line.trim() !== "") は、空の行を無視するための処理です
  const wordList = data.split(/\r?\n/).filter(line => line.trim() !== "");

  // --- 手順3：入力された文字が含まれているかチェックする ---

  // 全ての単語が入った「wordList」の中から、条件に合うものだけを選び出します
  const matches = wordList.filter(word => {
    // 単語の中の「半角カタカナ」や「濁点」のズレを直して、比較しやすくします
    const normalizedWord = word.normalize('NFKC');
    
    // 入力された文字（chars）の「すべて」が、その単語に含まれているか確認します
    // すべて含まれていれば true、1つでも欠けていれば false を返します
    return chars.every(char => normalizedWord.includes(char));
  });

  // --- 手順4：結果を画面に表示する ---

  // もし1つ以上見つかった場合

  if (matches.length > 0) {
    // たくさん見つかっても大変なので、最初の5つだけを切り出します
    const firstFive = matches.slice(0, 5);
    
    // 表示するためのHTML（見た目のコード）を組み立てます
    let html = `<p style="font-weight:bold;">検索結果（${matches.length}件中、最大5件を表示）:</p><ul>`;
    
    // 5つの単語を1つずつ <li>（箇条書きの点）の中に入れます
    firstFive.forEach(w => {
      html += `<li>${w}</li>`;
    });
    
    html += `</ul>`; // 箇条書きを閉じる
    
    // 組み立てたHTMLをブログの画面に流し込みます
    resultArea.innerHTML = html;

  } else {
    // 1つも見つからなかった場合の表示
    resultArea.innerText = "一致する単語は見つかりませんでした。";
  }
} catch (error) {
  // 通信トラブルやプログラムミスなど、どこかでエラーが起きた場合の処理
  console.error('Error:', error);
  resultArea.innerText = "データの取得に失敗しました。ファイルが正しく公開されているか確認してください。";
}
}










