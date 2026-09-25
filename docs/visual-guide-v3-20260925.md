# LP 画像中心の改善版（V3）

- 基準: main / 51e84e3。V1・V2・公開 workflow は変更していません。
- 作業ブランチ: feat/visual-guide-20260925
- 改善版: LaViora_Meta広告v3/index.html
- 新規画像: LaViora_Meta広告v3/images/skin-{dryness,friction,pores}-v3.webp（PNG 原本も同梱）
- 作成方法: 内蔵 image_gen。WebP は表示速度のための形式変換で、構図や色調の追加加工なし。

## 読み方の設計

- 画像だけで意味を推測させず、原因名 → イラストと補助ラベル → 肌への影響、のセットにしています。
- 写真は既存素材を使用。新しい症例・体験談・治療成果の写真は生成していません。
- 3段階の考え方は実際の施術写真と既存の芽のイラストを併用。写真は施術イメージであり、細胞変化を証明する画像ではありません。
- 施術の流れは写真を大きくした2列レイアウト。予約は3ステップの図解。
- 説明画像の文字はHTMLに分離し、スマホでの可読性・修正性を確保。
- ベージュ・アイボリー・ブラウン・くすんだオリーブの既存トーンを継承。
- 症例7件、体験談5件、比較表、価格、実績数値、品質・プライバシー、最後のメッセージは維持。
- 詳細成分はページ内で開閉。外部遷移は既存のLINE導線のみ。

## 表示検証

- 320 / 375 / 390 / 430 / 600 / 1280 px で横はみ出し、画像欠落、ID重複なし。
- 症例・体験談カルーセルのキーボード操作、FAQ・成分詳細の開閉を確認。
- V2の主要保護箇所のHTML一致を確認：ファーストビュー、共感、症例・体験談、実績、個室・スタッフ、品質、比較表、オファー・価格、FAQ、最後のメッセージ、LINE導線。
- 390 px で主な改修4セクションの初期表示文字数: 3,254 → 2,245（約31%削減）。HTMLのテキストで比較し、開閉詳細は閉じた状態。
- ページ内の画像要素: 33 → 39。追加分は説明イラスト3点と既存施術写真3点。ほかに同じ線幅・配色のコードネイティブ図解を追加。
- 新規3イラストの表示用 WebP 合計: 約436 KB。既存画像は変更なし。

## 原因説明の参照

説明イラストは概念図であり、厳密な縮尺や施術効果を表すものではありません。従来の原因説明を短くし、一般的な肌の仕組みを以下で確認しました。

- [AAD — Acne causes](https://www.aad.org/public/diseases/acne/causes/acne-causes): 毛穴に皮脂や古い角質が詰まることとニキビ。
- [AAD — Skin-care habits](https://www.aad.org/public/diseases/acne/skin-care/habits-stop): 洗いすぎ、こすりすぎ、乾燥による刺激。
- [DermNet — Skin barrier function](https://dermnetnz.org/topics/skin-barrier-function): 角層による水分保持と外部刺激に対するバリア。

## 生成プロンプト

## dryness

```text
Use case: scientific-educational.
Asset type: text-free explanatory illustration for a refined Japanese skin-care salon website, first of a coherent series.
Primary request: Show why dry skin can lose moisture: a simple clean enlarged cutaway of the outermost skin barrier, warm pink-beige flat brick-like corneocytes with a few small gaps between them, and three small muted blue water droplets with fine upward arrows escaping through those gaps.
Style/medium: sophisticated editorial gouache and fine pencil illustration, clear readable educational shapes, matte restrained texture, not photorealistic and not glossy 3D.
Composition/framing: one compact central diagram filling most of a landscape 3:2 canvas, generous but not excessive margins. Background warm ivory #f7f3eb, taupe outlines, muted peach skin, soft desaturated blue water, olive accents. Skin is a shallow layered slice, not a full anatomical body. Diagram is conceptual, not quantitative.
Constraints: absolutely no words, letters, numbers, logos or watermark; no face, no decorative botanicals, no medical efficacy or before/after claims, no deep tissues, no gore. Explain the cause, not a treatment. Visually legible when shown at 150px wide.
```

## friction

```text
Use case: scientific-educational.
Asset type: text-free explanatory illustration for a refined Japanese skin-care salon website.
Primary request: A close crop of a woman's lower cheek and jaw, with a soft cotton washcloth being rubbed too firmly across the cheek by her hand, two small restrained olive curved motion lines indicating rubbing, a small subtle diffuse pink irritated patch on her cheek. This illustrates friction from over-cleansing. Hand must have anatomically correct fingers. No bottle, no mirror.
Style/medium: sophisticated editorial gouache and fine pencil illustration, warm peach and taupe, matte restrained paper texture, clean clear contours, not photorealistic, not manga, not glossy 3D. Mostly flat forms with subtle natural shading.
Composition/framing: landscape 3:2 canvas, compact close-up filling most of frame; cheek and cloth the only subjects, face cropped above nose and below neckline, no whole room. Uniform warm ivory #f7f3eb background with muted peach skin, off-white cloth, taupe outlines and desaturated olive motion lines.
Constraints: absolutely no words, letters, numbers, logos or watermark. No decorative objects or botanicals, no before/after comparison, no medical efficacy claim, no gore or angry red skin. Educational conceptual illustration, legible at 150px wide.
```

## pores

```text
Use case: scientific-educational.
Asset type: text-free explanatory illustration for a refined Japanese skin-care salon website.
Primary request: simple educational cutaway of a single clogged hair follicle in skin. Show a shallow peach skin surface and rounded follicle cavity reaching downward, a very fine thin hair inside, muted pale yellow sebum and small cream dead-skin flakes accumulating together and obstructing the follicle opening at the surface. The pore opening remains clearly connected to the surface. No blackheads scattered randomly, no explosion of bacteria, no arrows entering deep tissue.
Style/medium: sophisticated editorial gouache and fine pencil illustration, matte restrained paper texture, clean educational shapes; not glossy 3D or photorealistic. Same premium warm earthy editorial tone as a skin-care magazine.
Composition/framing: one clear central skin cutaway filling most of a landscape 3:2 canvas. Flat warm ivory #f7f3eb background. Taupe outlines, muted peach skin, soft cream/yellow contents. Rounded gentle shapes.
Constraints: absolutely no text, letters, numbers, logos or watermark; no deep tissue blood vessels, no gore, no treatment efficacy, no before/after comparisons or decorative objects. Conceptual diagram not quantitatively scaled, legible when displayed 150px wide.
```
