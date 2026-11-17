// FIRST MOVE content library. Add new lessons here; do not modify HTML for content changes.
export const lessons = [
  {
    id: 'absolute-distance', number: '01', category: '絕對值', difficulty: 2, minutes: 5,
    title: '絕對值，不只是去掉符號', subtitle: '把代數式變成數線上的距離',
    question: '求 |x − 2| + |x + 4| 的最小值，其中 x 為實數。',
    focus: '先觀察兩個絕對值在數線上代表什麼距離。',
    choices: [
      { text: '直接把兩個絕對值的符號去掉', correct: false, feedback: '這樣可能忽略正負號。先確認每個距離所對應的點，會比較穩定。' },
      { text: '將式子視為點 x 到 2 與 −4 的距離總和', correct: true, feedback: '很好。把代數式轉成幾何圖像，可以直接看出距離總和何時最小。' },
      { text: '先令 x = 0 試試看', correct: false, feedback: '代入能得到一個數值，但還不能保證是最小值。可以先找式子的結構。' }
    ],
    hint: '在數線上標出 −4 與 2。當 x 落在兩點之間，兩段距離加起來等於多少？',
    solution: '由三角不等式，|x − 2| + |x + 4| ≥ |2 − (−4)| = 6。當 −4 ≤ x ≤ 2 時等號成立，所以最小值為 6。',
    reflection: '絕對值之和不一定需要分段硬算。先辨認「距離」常能找到更簡潔的突破口。',
    check: { question: '哪些 x 可以讓這個式子取得最小值？', answer: '−4 ≤ x ≤ 2' }
  },
  {
    id: 'amgm-equality', number: '02', category: '不等式', difficulty: 3, minutes: 6,
    title: '算幾不等式的等號陷阱', subtitle: '有下界，不代表取得到',
    question: '已知 x 為實數，求 x² + 4 + 1/(x² + 4) 的最小值。',
    focus: '使用不等式之前，先看等號條件與變數範圍。',
    choices: [
      { text: '用算幾不等式得到最小值 2', correct: false, feedback: '可以得到下界 2，但等號需要 x² + 4 = 1，對實數 x 不可能。下界未必是最小值。' },
      { text: '令 t = x² + 4，先確認 t 的範圍', correct: true, feedback: '正是核心。此時 t ≥ 4，原式變成 t + 1/t，可以在正確範圍內求最小值。' },
      { text: '將分母通分後直接微分', correct: false, feedback: '可以嘗試，但這題更關鍵的是先辨認定義域與等號條件。' }
    ],
    hint: '設 t = x² + 4，則 t ≥ 4。比較 t + 1/t 與 4 + 1/4，或研究它在 t ≥ 4 的單調性。',
    solution: '令 t = x² + 4 ≥ 4。因 t ≥ 4，(t + 1/t) − (4 + 1/4) = (t − 4)(1 − 1/(4t)) ≥ 0。故最小值為 17/4，在 x = 0 時取得。',
    reflection: '不等式給出的下界，只有在等號條件可以滿足時，才能直接視為最小值。',
    check: { question: '算幾不等式得到 2，為什麼不能當答案？', answer: '等號條件不成立' }
  },
  {
    id: 'slope-change', number: '03', category: '解析幾何', difficulty: 1, minutes: 4,
    title: '斜率，是兩個變化量的比較', subtitle: '從「走多遠」理解公式',
    question: '直線通過 A(1, 2) 與 B(5, 10)，斜率是多少？',
    focus: '不要急著背公式；先看往右走多少、往上走多少。',
    choices: [
      { text: '往右 4、往上 8，因此斜率是 8/4', correct: true, feedback: '很好。斜率就是鉛直變化量與水平變化量的比值，所以是 2。' },
      { text: '把 1、2、5、10 全部相加', correct: false, feedback: '斜率不是點座標的總和，而是兩點之間的變化比例。' },
      { text: '用兩點到原點的距離相除', correct: false, feedback: '斜率描述方向與傾斜程度，不是兩點到原點的距離比。' }
    ],
    hint: '從 A 移動到 B，x 增加 5 − 1 = 4，y 增加 10 − 2 = 8。',
    solution: '斜率 m = Δy/Δx = (10 − 2)/(5 − 1) = 8/4 = 2。分母若為 0，則是鉛直直線，斜率未定義。',
    reflection: '公式 m = Δy/Δx 是在記錄變化率。理解分子與分母，才不容易把座標代反。',
    check: { question: '如果兩點的 x 座標相同，斜率為何？', answer: '未定義' }
  },
  {
    id: 'quadratic-vertex', number: '04', category: '多項式', difficulty: 2, minutes: 5,
    title: '二次式的最小值藏在哪裡？', subtitle: '先找結構，再動手展開',
    question: '求 x² − 6x + 13 的最小值，其中 x 為實數。',
    focus: '想想能否把二次式改寫成「平方 + 常數」。',
    choices: [
      { text: '把式子改寫成 (x − 3)² + 4', correct: true, feedback: '沒錯。平方項不小於 0，因此最小值直接看出是 4。' },
      { text: '認為 x² ≥ 0，所以最小值是 13', correct: false, feedback: '這忽略了 −6x 的影響。各項分別估計，未必能同時取到等號。' },
      { text: '先把每一項都變成正數', correct: false, feedback: '改變每一項的符號會改變原式。試試配方法。' }
    ],
    hint: 'x² − 6x + 13 = (x² − 6x + 9) + 4。',
    solution: '原式 = (x − 3)² + 4 ≥ 4。當 x = 3 時取等號，所以最小值為 4。',
    reflection: '把問題換成更容易判斷的形式，比機械地計算更重要；配方法就是一種重新表徵。',
    check: { question: '最小值在哪一個 x 取得？', answer: 'x = 3' }
  },
  {
    id: 'arithmetic-common-difference', number: '05', category: '數列', difficulty: 2, minutes: 5,
    title: '等差數列的隱藏規律', subtitle: '從跨好幾項的差，找出每一步的變化',
    question: '設 (aₙ) 為實數等差數列，n = 1, 2, 3, …。已知第 3 項是 24，第 7 項是 12。依項次從小到大看，第一次出現負數是在第幾項？',
    focus: '先找出每跨一個相鄰間隔，數值會改變多少。',
    choices: [
      { text: '先算 12 − 24，再除以第 3 項到第 7 項的項數 5', correct: false, feedback: '你已經找出兩端的總變化。5 是列出的項數，每次變化發生在兩項之間。試著在相鄰項之間畫箭頭，數一數有幾支。' },
      { text: '先數第 3 項到第 7 項跨了幾步，再把總變化分到每一步', correct: true, feedback: '每跨一步都加上同一個數。用總變化除以步數，就能找出這個固定變化量，並用它從第 7 項繼續推。' },
      { text: '先算 12 ÷ 24，再用這個倍數推算接下來的各項', correct: false, feedback: '相除可以比較兩個已知項的倍數關係。等差數列固定的是後一項減前一項的差，可以先從這個差想起。' }
    ],
    hint: '依序寫出第 3 項到第 7 項的項次，在相鄰兩項之間畫箭頭。兩端的總變化平均分到每支箭頭後，每一步會變多少？接著想想從 12 出發，要走幾步才會低於 0。',
    solution: '設相鄰兩項的固定變化量為 d。從第 3 項到第 7 項走 7 − 3 = 4 步，因此 4d = 12 − 24 = −12，唯一的公差是 d = −3。從第 3 項的 24 減四次 3，會到第 7 項的 12，符合已知條件。從第 7 項再走四步，第 11 項是 12 − 4 × 3 = 0。再走一步，第 12 項是 −3。因公差為負，數列嚴格遞減，第 11 項以前的各項都大於 0。因此第 12 項是第一個小於 0 的項。',
    reflection: '遇到不相鄰的已知項，先數項次之間的步數，再把總變化換算成每一步的變化量。固定公差一旦確定，就能補出中間項、往回推，或判斷數列何時跨過某個值。若題目還沒說是哪一類數列，也可以比較幾段資料算出的每步變化量，檢查它們是否符合等差規律。',
    check: { question: '另一個等差數列從第 2 項到第 5 項共下降 12。從第 5 項回推到第 4 項，數值會怎麼變？', answer: '從第 2 項到第 5 項共走三步，每步的變化是 −12 ÷ 3 = −4。從第 5 項往回走一步，就增加 4。' }
  }
];
