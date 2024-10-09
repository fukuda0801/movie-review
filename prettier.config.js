module.exports = {
  printWidth: 100, // 折り返す行の長さを指定
  tabWidth: 2, // インデントのスペースの数を指定
  useTabs: false, // スペースではなくタブで行をインデントして、trueを設定することでタブを適用する
  semi: true, // ステートメントの最後にセミコロンを追加する。trueを設定することで最後にセミコロンを追加する
  singleQuote: false, // ダブルクォートの代わりにシングルクォートを使用する
  quoteProps: "as-needed", // オブジェクトのプロパティが引用されるときに変更する
  jsxSingleQuote: false, // JSXでダブルクォートの代わりにシングルクォートを使用する
  trailingComma: "es5", // 末尾のカンマの設定
  bracketSpacing: true, // オブジェクトリテラルの角かっこの内側にスペースを入れる
  bracketSameLine: false, // 複数行の要素の最終行の最後に「>」を置く。falseは次の行に置く
  arrowParens: "always", // アロー関数の()が省略可能でも常に書く。
  proseWrap: "preserve", // markdownの折返しの設定
  htmlWhitespaceSensitivity: "css", // HTMLファイルのグローバルな空白の感度を指定
  endOfLine: "lf", // 改行の文字コードを指定。lf: Linux、MacOS、gitリポジトリで一般的な、ラインフィード(\n)のみ
  embeddedLanguageFormatting: "off", // Prettierがファイルに埋め込まれた引用コードをフォーマットするかどうかを制御
};
