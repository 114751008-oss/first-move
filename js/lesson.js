const stages = ['觀察', '選擇', '提示', '解答', '反思'];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let lesson = null;
let stage = 0;
let selected = -1;
let onFinish = null;
const dialog = document.querySelector('#lesson-dialog');
const content = document.querySelector('#dialog-content');
const closeButton = document.querySelector('#close-dialog');

export function openLesson(nextLesson, finishedCallback) {
  lesson = nextLesson;
  stage = 0;
  selected = -1;
  onFinish = finishedCallback;
  render();
  dialog.showModal();
}
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

function render() {
  if (!lesson) return;
  const base = `<div class="dialog-kicker">THOUGHT EXPERIMENT / ${escapeHTML(lesson.number)}</div><h2 id="dialog-title">${escapeHTML(lesson.title)}</h2><p class="dialog-subtitle">${escapeHTML(lesson.subtitle)}</p><div class="stage-line" aria-label="進度：第 ${stage+1} 階段，共 5 階段">${stages.map((_, i) => `<span class="${i<=stage?'done':''}"></span>`).join('')}</div><span class="stage-label">STEP ${String(stage+1).padStart(2,'0')} / ${stages[stage]}</span>`;
  let body = '';
  if (stage === 0) body = `<h3 class="stage-title">先讀題目，觀察條件。</h3><div class="problem">${escapeHTML(lesson.question)}</div><p class="stage-description">思考一下：你會從哪裡開始？不需要急著算出答案。</p>${actions([{text:'下一步：選擇方向 →',action:'next',primary:true}])}`;
  if (stage === 1) body = `<h3 class="stage-title">哪一個是比較好的第一步？</h3><div class="problem">${escapeHTML(lesson.question)}</div><div class="choice-list">${lesson.choices.map((choice,i) => `<button type="button" class="choice ${selected === i?'selected':''}" data-choice="${i}" ${selected>=0?'disabled':''}>${String.fromCharCode(65+i)}. ${escapeHTML(choice.text)}</button>`).join('')}</div>${selected>=0?`<div class="feedback" role="status"><strong>${lesson.choices[selected].correct?'找到突破口！':'這個方向可以再想一想'}</strong>${escapeHTML(lesson.choices[selected].feedback)}</div>`:''}${actions([{text:'返回觀察',action:'back'},...(selected>=0?[{text:'下一步：提示 →',action:'next',primary:true}]:[])])}`;
  if (stage === 2) body = `<h3 class="stage-title">一個提示，讓思路往前。</h3><p class="stage-description">${escapeHTML(lesson.focus)}</p><div class="feedback">${escapeHTML(lesson.hint)}</div>${actions([{text:'返回選擇',action:'back'},{text:'查看完整解答 →',action:'next',primary:true}])}`;
  if (stage === 3) body = `<h3 class="stage-title">驗證你的想法。</h3><div class="problem">${escapeHTML(lesson.question)}</div><p class="stage-description">${escapeHTML(lesson.solution)}</p>${actions([{text:'返回提示',action:'back'},{text:'最後一步：反思 →',action:'next',primary:true}])}`;
  if (stage === 4) body = `<h3 class="stage-title">今天帶走哪一個方法？</h3><div class="reflection">${escapeHTML(lesson.reflection)}</div><p class="check-question">思考延伸：${escapeHTML(lesson.check.question)}</p><details><summary>查看延伸問題參考答案</summary><p>${escapeHTML(lesson.check.answer)}</p></details>${actions([{text:'重新挑戰',action:'restart'},{text:'完成實驗 ✓',action:'finish',primary:true}])}`;
  content.innerHTML = base + body;
  content.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'next' && stage < 4) stage += 1;
    if (action === 'back' && stage > 0) { stage -= 1; if (stage === 1) selected = -1; }
    if (action === 'restart') { stage = 0; selected = -1; }
    if (action === 'finish') { onFinish?.(lesson.id); dialog.close(); return; }
    render();
    content.querySelector('.stage-title')?.scrollIntoView({block:'nearest'});
  }));
  content.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
    selected = Number(button.dataset.choice);
    render();
  }));
}
function actions(buttons) {return `<div class="dialog-actions">${buttons.map(b=>`<button type="button" data-action="${b.action}" class="${b.primary?'primary':''}">${b.text}</button>`).join('')}</div>`;}
