export interface QuizQuestion {
  unitId: string;
  question: string;
  options: string[]; // 5択。correctIndexが正解
  correctIndex: number;
  explanation: string;
}

export const QUIZZES: QuizQuestion[] = [
  // ── Phase 0: Shopify 基礎知識 ──────────────────────────────
  {
    unitId: "P0-01",
    question: "2026年現在、Shopify が利用されているストア数はおよそいくつか？",
    options: [
      "200万店超",
      "50万店超",
      "10万店超",
      "1,000万店超",
      "500万店超",
    ],
    correctIndex: 0,
    explanation:
      "2026年現在、Shopify は世界175か国以上・200万店超のストアで利用されており、Amazon・Walmart に次ぐ世界第3位の EC 流通総額を誇ります。",
  },
  {
    unitId: "P0-02",
    question:
      "Shopify の料金プランを安価な順に並べた場合、正しい順序はどれか？",
    options: [
      "Basic → Grow → Advanced → Plus",
      "Grow → Basic → Advanced → Plus",
      "Basic → Advanced → Grow → Plus",
      "Starter → Basic → Grow → Plus",
      "Basic → Grow → Plus → Advanced",
    ],
    correctIndex: 0,
    explanation:
      "Shopify のプランは安価な順に Basic / Grow / Advanced / Plus です。Grow は Basic の上位・Advanced の下位に位置します（日本円建てで月額 3,650 円〜が目安）。",
  },
  {
    unitId: "P0-03",
    question:
      "Shopify の App Store に登録されているアプリ数は 2026 年時点でおよそ何種類か？",
    options: [
      "8,000 種類以上",
      "500 種類以上",
      "2,000 種類以上",
      "50,000 種類以上",
      "100 種類以上",
    ],
    correctIndex: 0,
    explanation:
      "Shopify の App Store には 8,000 以上のアプリが登録されており、決済・在庫・マーケティング・レビュー収集など多岐にわたる機能をストアに追加できます。",
  },
  {
    unitId: "P0-04",
    question:
      "Shopify Payments を利用することで得られる最大の経済的メリットはどれか？",
    options: [
      "追加の取引手数料（Transaction Fee）がゼロになる",
      "月額プラン料金が半額になる",
      "すべての決済方法が追加料金なく使い放題になる",
      "配送ラベルが自動発行される",
      "カスタマーサポートが 24 時間対応になる",
    ],
    correctIndex: 0,
    explanation:
      "Shopify Payments 以外の決済プロバイダーを使うと、プランに応じて 0.5〜2% の追加取引手数料が発生します。Shopify Payments を使うとこの手数料が免除されます。",
  },
  {
    unitId: "P0-05",
    question:
      "日本の「特定商取引法」に基づき、EC サイトへの掲載が義務付けられている情報として正しいのはどれか？",
    options: [
      "販売事業者の氏名（名称）・住所・電話番号",
      "ストアに使用しているテーマ名",
      "運営者の SNS アカウント URL",
      "スタッフの人数と氏名",
      "商品の製造年月日",
    ],
    correctIndex: 0,
    explanation:
      "特定商取引法では、通信販売において「事業者の氏名・住所・電話番号・メールアドレス・販売価格・支払方法・引渡時期・返品条件」などの開示が義務付けられています。",
  },

  // ── Phase 1: ストア開設・初期設定 ────────────────────────────
  {
    unitId: "P1-01",
    question:
      "Shopify の無料トライアルを開始するために必要なものはどれか？",
    options: [
      "メールアドレスのみ",
      "クレジットカードとメールアドレス",
      "法人登録番号とメールアドレス",
      "電話番号とクレジットカード",
      "SNS アカウントとメールアドレス",
    ],
    correctIndex: 0,
    explanation:
      "Shopify のトライアルはメールアドレスを入力するだけで開始でき、クレジットカード情報の入力は不要です。3日間すべての基本機能が利用できます。",
  },
  {
    unitId: "P1-02",
    question:
      "Shopify の `.myshopify.com` サブドメイン（ストア識別子）について正しい説明はどれか？",
    options: [
      "アカウント作成後に変更できない",
      "いつでも無制限に変更できる",
      "有料プランに移行後のみ変更できる",
      "カスタムドメイン購入後に自動変更される",
      "月1回まで変更可能",
    ],
    correctIndex: 0,
    explanation:
      "`.myshopify.com` のサブドメインはアカウント作成後に変更できません。管理画面に表示されるストア名は後から変えられますが、URL は永久に固定されます。",
  },
  {
    unitId: "P1-03",
    question:
      "Shopify がすべてのストアに追加費用なく自動提供しているセキュリティ機能はどれか？",
    options: [
      "SSL 証明書（HTTPS）の自動発行",
      "DDoS 攻撃の無制限防御",
      "WAF（Web アプリケーションファイアウォール）",
      "毎日の自動バックアップ",
      "二要素認証の強制",
    ],
    correctIndex: 0,
    explanation:
      "Shopify はすべてのストアに無料で SSL 証明書を自動発行し、追加の設定なしに HTTPS 通信が利用できます。これにより安全な決済処理が可能になります。",
  },
  {
    unitId: "P1-04",
    question:
      "Shopify テーマのビジュアルエディタにある「セクション」の説明として正しいのはどれか？",
    options: [
      "ページを構成するパーツをドラッグ＆ドロップで並び替えられるモジュール",
      "商品のカテゴリ分類に使うグループ機能",
      "スタッフごとのアクセス権限を管理する区分",
      "テーマの CSS ファイルを直接編集する機能",
      "注文をまとめて管理する単位",
    ],
    correctIndex: 0,
    explanation:
      "セクションはページを構成するモジュール単位のパーツです。ビジュアルエディタ上でドラッグ＆ドロップによる並び替えや、テキスト・画像などの設定変更がコード不要で行えます。",
  },
  {
    unitId: "P1-05",
    question:
      "Shopify Payments の審査を通過するために必要な書類として正しいのはどれか？",
    options: [
      "本人確認書類（身分証明書）と銀行口座情報",
      "税理士の署名入り決算書",
      "商標登録証明書",
      "販売する商品の写真 10 枚以上",
      "法人設立 5 年以上の証明書",
    ],
    correctIndex: 0,
    explanation:
      "Shopify Payments の有効化には、本人確認書類（運転免許証・マイナンバーカードなど）と振込先の銀行口座情報が必要です。個人事業主も申請できます。",
  },
  {
    unitId: "P1-06",
    question:
      "KOMOJU 経由で Shopify ストアに追加できる国内決済方法として正しいのはどれか？",
    options: [
      "PayPay・Paidy・コンビニ払い",
      "Apple Pay・Google Pay・LINE Pay",
      "Visa・Mastercard・JCB のみ",
      "楽天ペイ・d払い・au PAY",
      "銀行振込のみ",
    ],
    correctIndex: 0,
    explanation:
      "KOMOJU は Shopify 公式パートナーの決済ゲートウェイで、PayPay・Paidy・コンビニ払い（セブン‑イレブン・ファミリーマートなど）を追加できます。",
  },
  {
    unitId: "P1-07",
    question:
      "Shopify で「¥5,000 以上の購入で送料無料」という条件を設定する場所はどれか？",
    options: [
      "設定 → 配送と配達 → 配送ゾーン",
      "設定 → 支払い → 決済プロバイダー",
      "マーケティング → 割引",
      "オンラインストア → テーマ → カスタマイズ",
      "商品 → コレクション → 条件設定",
    ],
    correctIndex: 0,
    explanation:
      "送料ゾーン・無料配送閾値の設定は「設定 → 配送と配達」から行います。ゾーンごとに「一定金額以上で送料無料」などの条件を設定できます。",
  },
  {
    unitId: "P1-08",
    question:
      "日本の消費税における「軽減税率 8%」が適用される商品カテゴリはどれか？",
    options: [
      "食料品（外食・酒類を除く）",
      "電化製品全般",
      "衣料品全般",
      "書籍・雑誌（すべて）",
      "医薬品全般",
    ],
    correctIndex: 0,
    explanation:
      "軽減税率（8%）が適用されるのは「飲食料品（外食・酒類は除く）」と「定期購読契約の新聞」です。電化製品・衣料品・一般書籍などは通常税率（10%）が適用されます。",
  },
  {
    unitId: "P1-09",
    question:
      "Shopify の通知メールテンプレートをカスタマイズするために使用するテンプレート言語はどれか？",
    options: [
      "Liquid",
      "HTML/CSS のみ",
      "Markdown",
      "Handlebars",
      "Twig",
    ],
    correctIndex: 0,
    explanation:
      "Shopify の通知メールテンプレートは「Liquid」という Shopify 独自のテンプレート言語で記述されており、変数・条件分岐・ループを使ったカスタマイズが可能です。",
  },
  {
    unitId: "P1-10",
    question:
      "Shopify で特商法ページ・プライバシーポリシー・利用規約などの法的ページを作成・公開する場所はどれか？",
    options: [
      "オンラインストア → ページ",
      "設定 → 法的情報（Legal）",
      "商品 → コレクション",
      "アプリ → アプリを追加する",
      "マーケティング → コンテンツ",
    ],
    correctIndex: 0,
    explanation:
      "「設定 → 法的情報」にはポリシーのひな形（テンプレート）が用意されていますが、実際のページとして顧客に公開するには「オンラインストア → ページ」から作成します。",
  },

  // ── Phase 2: 商品・販売管理 ────────────────────────────────
  {
    unitId: "P2-01",
    question: "Shopify の商品管理における「SKU」の正しい説明はどれか？",
    options: [
      "在庫管理のための商品識別コード",
      "商品の税率区分を示すコード",
      "商品の重量を表す単位",
      "販売チャネルの設定コード",
      "商品画像のファイル名",
    ],
    correctIndex: 0,
    explanation:
      "SKU（Stock Keeping Unit）は在庫管理のための商品識別コードです。独自のコードを設定することで在庫追跡・仕入れ管理・外部システムとの連携が容易になります。",
  },
  {
    unitId: "P2-02",
    question:
      "Shopify 標準機能でバリエーションに設定できるオプションの最大数はいくつか？",
    options: [
      "3 種類（例：色・サイズ・素材）",
      "1 種類のみ",
      "5 種類まで",
      "10 種類まで",
      "無制限",
    ],
    correctIndex: 0,
    explanation:
      "Shopify 標準機能では最大 3 種類のオプション（例：色・サイズ・素材）をバリエーションとして設定できます。4 種類以上が必要な場合はアプリの追加が必要です。",
  },
  {
    unitId: "P2-03",
    question:
      "Shopify の「自動コレクション」の説明として正しいのはどれか？",
    options: [
      "設定した条件（タグ・価格・タイトルなど）に合う商品が自動的に追加される",
      "在庫がなくなると自動的にコレクションから削除される",
      "一定期間が経過すると自動的に非公開になるコレクション",
      "Shopify が売れ筋商品を自動選定して作るコレクション",
      "SNS 投稿に連動して商品が自動更新されるコレクション",
    ],
    correctIndex: 0,
    explanation:
      "自動コレクションは「商品タグ・価格・タイトル内の文字列」などの条件を事前に設定しておくと、条件を満たす商品が自動的に追加されます。手動で商品を選ぶ「手動コレクション」と使い分けましょう。",
  },
  {
    unitId: "P2-04",
    question:
      "EC 向け商品画像のフォーマットとして、ファイルサイズと画質のバランスから最も推奨される形式はどれか？",
    options: [
      "WebP",
      "BMP",
      "TIFF",
      "GIF",
      "PSD",
    ],
    correctIndex: 0,
    explanation:
      "WebP は Google が開発した画像形式で、JPEG・PNG と比べて同等の画質でファイルサイズを大幅に削減できます。ページ表示速度の改善と Core Web Vitals の向上に効果的です。",
  },
  {
    unitId: "P2-05",
    question:
      "Shopify で注文を「フルフィルメント済み（発送済み）」にするために必要な操作はどれか？",
    options: [
      "追跡番号を入力して発送済みにマークする",
      "商品の在庫数を手動で減らす",
      "注文をアーカイブする",
      "顧客にメールを手動で送信する",
      "返金処理を実施する",
    ],
    correctIndex: 0,
    explanation:
      "フルフィルメント（出荷処理）は注文詳細画面から追跡番号を入力して「フルフィルメント済み」にマークします。このとき顧客へ発送通知メールが自動送信されます。",
  },
  {
    unitId: "P2-06",
    question:
      "Shopify で複数の倉庫・実店舗をまたいで在庫を管理する機能はどれか？",
    options: [
      "ロケーション（Locations）機能",
      "コレクション機能",
      "バリエーション機能",
      "スタッフ権限機能",
      "マーケット（Markets）機能",
    ],
    correctIndex: 0,
    explanation:
      "「ロケーション」機能を使うと、複数の倉庫・店舗・配送元に在庫を分配して管理できます。注文時にどのロケーションから出荷するかも設定できます。",
  },
  {
    unitId: "P2-07",
    question:
      "Shopify の「自動割引」と「割引コード」の最大の違いはどれか？",
    options: [
      "自動割引は顧客がコードを入力しなくても条件を満たせば自動適用される",
      "自動割引は特定の顧客グループにのみ適用できる",
      "割引コードは Shopify が自動生成するため手動で設定できない",
      "自動割引は送料にのみ適用される",
      "割引コードは期間限定でのみ使用できる",
    ],
    correctIndex: 0,
    explanation:
      "自動割引は、顧客がチェックアウト時にコードを入力する手間なく、設定した条件（購入金額・商品数など）を満たせば自動的に割引が適用されます。",
  },
  {
    unitId: "P2-08",
    question:
      "Shopify で PDF・音楽ファイルなどのデジタル商品を販売する際に使う Shopify 公式アプリはどれか？",
    options: [
      "Digital Downloads",
      "Shopify Flow",
      "Shopify Email",
      "Oberlo",
      "Shopify Balance",
    ],
    correctIndex: 0,
    explanation:
      "「Digital Downloads」は Shopify 公式のデジタル商品配信アプリです。購入後に自動でダウンロードリンクを顧客に送信でき、ダウンロード回数制限なども設定できます。",
  },
  {
    unitId: "P2-09",
    question:
      "Shopify 純正のサブスクリプション（定期購入）機能「Shopify Subscriptions」について正しい説明はどれか？",
    options: [
      "Shopify 標準機能として追加料金なく使えるサブスク管理アプリ",
      "月額 $99 の有料オプション",
      "Shopify Plus（上位プラン）限定の機能",
      "別途 API を用いた開発が必須",
      "海外向け販売専用の機能",
    ],
    correctIndex: 0,
    explanation:
      "Shopify Subscriptions は Shopify 公式の定期購入アプリで追加料金なく利用できます（Shopify Payments の利用が条件）。設定画面から定期購入のサイクルや割引率を設定できます。",
  },
  {
    unitId: "P2-10",
    question:
      "Shopify で CSV を使って商品を一括インポートする際、必須の列（省略不可）はどれか？",
    options: [
      "Title（商品タイトル）",
      "Body（商品説明文）",
      "Vendor（販売元）",
      "Tags（タグ）",
      "Image Src（画像 URL）",
    ],
    correctIndex: 0,
    explanation:
      "商品インポート用 CSV では「Title（商品タイトル）」列が必須です。画像 URL は https:// で始まる URL が必要で、ローカルファイルパスは使えません。",
  },

  // ── Phase 3: 集客・マーケティング ────────────────────────────
  {
    unitId: "P3-01",
    question:
      "Shopify の SEO 設定で「メタディスクリプション」の推奨文字数として最も適切なのはどれか？",
    options: [
      "120〜160 文字程度",
      "10〜30 文字程度",
      "300〜500 文字程度",
      "1,000 文字以上",
      "文字数制限なし（長いほどよい）",
    ],
    correctIndex: 0,
    explanation:
      "メタディスクリプションは検索結果ページに表示される説明文です。Google は通常 120〜160 文字程度を表示するため、その範囲でページの特徴を簡潔に伝える内容が推奨されます。",
  },
  {
    unitId: "P3-02",
    question:
      "Shopify ブログの記事 SEO において「内部リンク」を張る主な目的はどれか？",
    options: [
      "関連ページへの誘導とページランクの分散による SEO 強化",
      "ブログの文字数を増やすための装飾",
      "外部サイトからのリンクを呼び込むための施策",
      "検索エンジンのクローラーをブロックするための設定",
      "SNS シェア数を増やすための仕組み",
    ],
    correctIndex: 0,
    explanation:
      "内部リンクは関連する商品ページや他のブログ記事へ誘導することで、ユーザーの回遊率向上と検索エンジンのクロール効率改善（ページランク分散）に貢献します。",
  },
  {
    unitId: "P3-03",
    question:
      "Shopify 内蔵のメールマーケティングツール「Shopify Email」の無料送信上限はどれか？",
    options: [
      "月 10,000 通まで無料",
      "月 500 通まで無料",
      "月 1,000 通まで無料",
      "完全無料（上限なし）",
      "すべて有料（無料枠なし）",
    ],
    correctIndex: 0,
    explanation:
      "Shopify Email は月に最大 10,000 通まで無料で使えます。それを超えた分は 1,000 通あたり約 $1 の追加料金が発生します。",
  },
  {
    unitId: "P3-04",
    question:
      "Shopify ストアで Instagram Shopping を設定する際に必要な前提条件はどれか？",
    options: [
      "Facebook ビジネスアカウントと Instagram プロアカウントの連携",
      "Instagram フォロワーが 10 万人以上",
      "Shopify Plus プランへの加入",
      "有料の Instagram パートナーシップ契約",
      "Google アナリティクスの導入",
    ],
    correctIndex: 0,
    explanation:
      "Instagram Shopping を利用するには、Facebook ビジネスマネージャーと Instagram のプロアカウント（ビジネスまたはクリエイター）を連携させる必要があります。",
  },
  {
    unitId: "P3-05",
    question:
      "Google Merchant Center に商品情報を登録する際に Shopify が自動生成できる「フィード」の形式はどれか？",
    options: [
      "XML 形式の商品フィード",
      "PDF 形式のカタログ",
      "Word 文書形式の商品リスト",
      "JSON のみ対応",
      "手動登録のみ（自動生成不可）",
    ],
    correctIndex: 0,
    explanation:
      "Shopify は「Google & YouTube」アプリを通じて、Google Merchant Center 向けの XML 形式商品フィードを自動生成・同期できます。これにより Google ショッピング広告の配信が可能になります。",
  },
  {
    unitId: "P3-06",
    question:
      "Shopify の「カート放棄（カゴ落ち）メール」が送信されるタイミングとして正しいのはどれか？",
    options: [
      "顧客がカートに商品を入れたまま購入を完了せずにサイトを離れた後",
      "顧客が商品ページを閲覧しただけで購入しなかった場合",
      "在庫がなくなった商品をお気に入りに入れていた顧客",
      "注文完了後 24 時間以内にレビューを書かなかった場合",
      "パスワードを一定期間変更していない顧客",
    ],
    correctIndex: 0,
    explanation:
      "カゴ落ちメールは、カートに商品を追加した後チェックアウトを完了せずにサイトを離れた場合に送信されます。Shopify では送信タイミング・件名・メール本文を設定できます。",
  },
  {
    unitId: "P3-07",
    question:
      "EC 事業における「リファラルマーケティング」の説明として最も正しいのはどれか？",
    options: [
      "既存顧客が友人・知人を紹介することで新規顧客を獲得する手法",
      "検索エンジンの検索結果に広告を掲載する手法",
      "インフルエンサーに一方的に商品を送る手法",
      "SNS のハッシュタグキャンペーンのみを指す",
      "メールマガジンによる新規顧客獲得手法",
    ],
    correctIndex: 0,
    explanation:
      "リファラルマーケティング（紹介マーケティング）は既存顧客が友人・知人を紹介した際に両者に特典（割引・ポイントなど）を付与することで新規顧客を獲得する手法です。",
  },
  {
    unitId: "P3-08",
    question:
      "「Shopify Markets」の主な機能として正しいのはどれか？",
    options: [
      "国・地域ごとに言語・通貨・価格を自動的に切り替える越境 EC 機能",
      "国内の複数倉庫を管理するロジスティクス機能",
      "各国の税務申告を自動化する機能",
      "海外の仕入れ先と直接契約する B2B 機能",
      "多言語の顧客サポートを自動化する AI 機能",
    ],
    correctIndex: 0,
    explanation:
      "Shopify Markets は 1 つのストアから複数の国・地域向けに異なる言語・通貨・価格・ドメインを設定できる越境 EC 機能です。関税の目安表示や地域別の支払い方法設定も可能です。",
  },

  // ── Phase 4: 分析・改善・運用 ────────────────────────────────
  {
    unitId: "P4-01",
    question:
      "Shopify の分析ダッシュボードで「コンバージョン率」として表示される指標はどれか？",
    options: [
      "訪問者のうち実際に購入を完了した割合",
      "商品ページを閲覧したユーザーの割合",
      "カートに商品を追加したユーザーの割合",
      "メールを開封したユーザーの割合",
      "広告をクリックしたユーザーの割合",
    ],
    correctIndex: 0,
    explanation:
      "コンバージョン率（CVR）は「ストアへの訪問者数のうち実際に購入を完了したユーザーの割合」を示します。一般的な EC サイトの CVR は 1〜3% 程度が目安です。",
  },
  {
    unitId: "P4-02",
    question:
      "Shopify に GA4（Google Analytics 4）を導入する際の推奨方法はどれか？",
    options: [
      "「Google & YouTube」アプリ経由で GA4 測定 ID を連携する",
      "next.config.ts に GA4 スクリプトをハードコードする",
      "Shopify 管理画面の HTML に直接 gtag.js を貼り付ける",
      "GA4 は Shopify に対応していないため外部サービスを使う",
      "Liquid テーマファイルに直接 script タグを追記する",
    ],
    correctIndex: 0,
    explanation:
      "Shopify に GA4 を導入する推奨方法は「Google & YouTube」アプリ経由での連携です。eコマース計測（購入・カート追加等）のイベントが自動でセットアップされます。",
  },
  {
    unitId: "P4-03",
    question: "EC サイトの「CRO（Conversion Rate Optimization）」の説明として正しいのはどれか？",
    options: [
      "既存のトラフィックからの購入率を高める最適化施策",
      "検索エンジンからの流入を増やす SEO 施策",
      "SNS 広告の費用対効果を改善する施策",
      "配送速度を改善して顧客満足度を高める施策",
      "メールの開封率を改善するマーケティング施策",
    ],
    correctIndex: 0,
    explanation:
      "CRO（Conversion Rate Optimization）はトラフィックを増やすのではなく「既存の訪問者からいかに多くの購入を生み出すか」を最適化する施策全般を指します。A/B テストや UX 改善が中心です。",
  },
  {
    unitId: "P4-04",
    question: "「RFM 分析」の 3 つの指標として正しいのはどれか？",
    options: [
      "Recency（最終購買日）・Frequency（購買頻度）・Monetary（購買金額）",
      "Revenue（売上）・Frequency（頻度）・Margin（利益率）",
      "Reach（リーチ）・Frequency（頻度）・Motivation（動機）",
      "Retention（継続率）・Frequency（頻度）・Monetization（収益化）",
      "Rate（比率）・Feature（機能）・Market（市場）",
    ],
    correctIndex: 0,
    explanation:
      "RFM 分析は R（Recency：最終購買からの経過日数）・F（Frequency：購買回数）・M（Monetary：累計購買金額）の 3 軸で顧客をセグメント分けし、優良顧客・離反リスク顧客などを識別します。",
  },
  {
    unitId: "P4-05",
    question: "「Shopify Flow」が利用できるプランはどれか？",
    options: [
      "Advanced プラン以上（Advanced・Plus）",
      "すべてのプランで無料利用可能",
      "Basic プランのみ",
      "Grow プランのみ",
      "Plus プランのみ",
    ],
    correctIndex: 0,
    explanation:
      "Shopify Flow は高度な業務自動化ツールで、Advanced プラン以上（Advanced・Shopify Plus）でのみ利用できます。トリガー・条件・アクションを組み合わせてワークフローを設計できます。",
  },
  {
    unitId: "P4-06",
    question:
      "Shopify ストアで「ネガティブレビュー」を受けた際の対応として最も適切なのはどれか？",
    options: [
      "誠実に謝罪・解決策を提示するコメントで返信する",
      "すぐに削除申請を行う",
      "返信せずに無視する",
      "同商品のポジティブレビューを大量に集めて目立たなくする",
      "レビューシステム自体を非表示にする",
    ],
    correctIndex: 0,
    explanation:
      "ネガティブレビューへの誠実な返信は、他の顧客に「問題が起きても誠実に対応するブランド」という印象を与えます。透明性ある対応がブランド評価と信頼性の向上につながります。",
  },
  {
    unitId: "P4-07",
    question:
      "Shopify ストアの表示速度と Core Web Vitals を計測する Google の公式ツールはどれか？",
    options: [
      "PageSpeed Insights（Lighthouse）",
      "Google Search Console",
      "Google Analytics",
      "Google Merchant Center",
      "Google Tag Manager",
    ],
    correctIndex: 0,
    explanation:
      "PageSpeed Insights（内部で Lighthouse を使用）は Google が提供するページ速度・Core Web Vitals の計測ツールです。モバイル・デスクトップ別にスコアと具体的な改善提案が得られます。",
  },
  {
    unitId: "P4-08",
    question:
      "Shopify の「Fraud Protect（不正防止）」機能が提供する主な保護はどれか？",
    options: [
      "承認した注文でチャージバックが発生した場合に Shopify が損失をカバーする",
      "不審な注文を自動キャンセルして不正を未然に防ぐ",
      "クレジットカード情報を暗号化して保護する",
      "顧客の IP アドレスを自動ブロックする",
      "全注文に対して本人確認（SMS 認証）を強制する",
    ],
    correctIndex: 0,
    explanation:
      "Shopify Fraud Protect（一部の国・プランで利用可能）は、承認された注文でチャージバックが発生した場合に Shopify が損失をカバーする保証サービスです。",
  },

  // ── Phase 5: カスタマイズ・拡張 ────────────────────────────
  {
    unitId: "P5-01",
    question: "Shopify の「Liquid」テンプレート言語で変数を出力する構文はどれか？",
    options: [
      "{{ variable }}",
      "<% variable %>",
      "{ variable }",
      "[[ variable ]]",
      "${ variable }",
    ],
    correctIndex: 0,
    explanation:
      "Liquid では二重の波括弧 {{ }} を使って変数・式を出力します。ロジック（if / for 等）には {% %} を使います。この構文は Shopify のすべてのテーマファイルで使用されています。",
  },
  {
    unitId: "P5-02",
    question:
      "Shopify テーマの「sections/」ディレクトリに格納されるファイルの説明として正しいのはどれか？",
    options: [
      "テーマエディタで設定・並び替えができる独立したコンテンツブロックの Liquid ファイル",
      "全ページ共通の HTML 骨格（header・footer を含む）",
      "商品・コレクション等のデータ取得ロジック",
      "CSS と JavaScript のみを管理するアセットファイル",
      "サードパーティアプリが自動生成するコード",
    ],
    correctIndex: 0,
    explanation:
      "sections/ はテーマエディタでドラッグ&ドロップや設定変更ができる独立したコンテンツブロックの Liquid ファイルを格納します。{% schema %} タグで設定項目を定義します。",
  },
  {
    unitId: "P5-03",
    question:
      "Shopify カスタムセクション開発で、テーマエディタの設定項目（テキスト・画像・カラー等）を定義するために使う記述方式はどれか？",
    options: [
      "{% schema %} タグ内に JSON で記述する",
      "Liquid の変数として先頭に記述する",
      "CSS 変数として :root セレクタに定義する",
      "JavaScript の config.js ファイルに記述する",
      "YAML 形式でファイル先頭のフロントマターに記述する",
    ],
    correctIndex: 0,
    explanation:
      "カスタムセクションの設定項目は Liquid ファイル内の {% schema %} タグに JSON で記述します。この定義に基づいて Shopify テーマエディタで設定 UI が自動生成されます。",
  },
  {
    unitId: "P5-04",
    question:
      "Shopify の「Storefront API」と「Admin API」の使い分けとして正しいのはどれか？",
    options: [
      "Storefront API は顧客向け公開情報の取得・カート操作に使い、Admin API はストアの管理操作に使う",
      "Storefront と Admin は機能が全く同じで認証方式だけが異なる",
      "Storefront API は REST 専用、Admin API は GraphQL 専用",
      "Storefront API は Shopify Plus のみ利用可能",
      "Admin API は無料、Storefront API は有料",
    ],
    correctIndex: 0,
    explanation:
      "Storefront API は商品検索・カート作成・チェックアウトなど顧客向けフロントエンド機能に使います。Admin API は注文管理・在庫操作など管理者権限が必要な操作に使います。",
  },
  {
    unitId: "P5-05",
    question:
      "Shopify CLI で新規アプリを作成する際に使われる公式標準フレームワークはどれか？",
    options: [
      "Remix",
      "Next.js",
      "Nuxt.js",
      "SvelteKit",
      "Express.js",
    ],
    correctIndex: 0,
    explanation:
      "Shopify CLI では公式テンプレートとして Remix を採用しています。生成されるボイラープレートには OAuth・セッション管理・API プロキシが組み込み済みです。",
  },
  {
    unitId: "P5-06",
    question: "Shopify の「Hydrogen」フレームワークの説明として正しいのはどれか？",
    options: [
      "Storefront API をベースにした React 製のヘッドレス EC フレームワーク",
      "Shopify テーマファイルを編集するための CLI ツール",
      "Shopify Admin の UI 拡張を開発するためのツール",
      "商品データを CSV からインポートするためのライブラリ",
      "Shopify バックエンド API をモックするテストフレームワーク",
    ],
    correctIndex: 0,
    explanation:
      "Hydrogen は Shopify が提供する React ベースのヘッドレス EC フレームワークです。Storefront API と深く統合されており、Vite + React で完全カスタムの EC フロントエンドを構築できます。",
  },
  {
    unitId: "P5-07",
    question:
      "Shopify Plus 限定機能「Checkout Extensions」で主にできることはどれか？",
    options: [
      "チェックアウト画面の UI やロジックをコードでカスタマイズする",
      "管理画面のデザインテーマを変更する",
      "商品ページに独自のタブセクションを追加する",
      "配送業者との専用 API 連携を構築する",
      "顧客の購買履歴を外部 CRM に自動同期する",
    ],
    correctIndex: 0,
    explanation:
      "Checkout Extensions は Shopify Plus 限定で、チェックアウト画面に独自の UI ブロック（アップセル・オプション選択など）を追加したりロジックをカスタマイズしたりできます。",
  },
  {
    unitId: "P5-08",
    question:
      "「Shopify Functions」で記述できる処理として正しいのはどれか？",
    options: [
      "割引・配送・支払いなどのビジネスロジックをサーバーレスで実行する",
      "テーマの Liquid テンプレートを動的に書き換える",
      "管理画面のナビゲーション構造を変更する",
      "顧客のメールアドレスを自動収集する",
      "ストアフロントのデザインを JavaScript で変更する",
    ],
    correctIndex: 0,
    explanation:
      "Shopify Functions はディスカウント・配送料計算・支払い方法フィルタリングなどのビジネスロジックを WebAssembly（Rust 等）でサーバーレス実行できる拡張機能です。",
  },
  {
    unitId: "P5-09",
    question: "Shopify の「Theme Check」ツールの主な用途はどれか？",
    options: [
      "Liquid テーマのコード品質・エラーを自動検証する lint ツール",
      "テーマのデザインを A/B テストするためのツール",
      "テーマのバックアップを自動作成するツール",
      "本番環境へのデプロイを自動化する CI ツール",
      "テーマのファイルサイズを圧縮するビルドツール",
    ],
    correctIndex: 0,
    explanation:
      "Theme Check は Shopify 公式の Liquid テーマ lint ツールです。未使用変数・廃止済み記法・アクセシビリティ問題などを CLI または VSCode 拡張機能で検出できます。GitHub Actions で CI 統合することでPR ごとに自動チェックが実行されます。",
  },
];
