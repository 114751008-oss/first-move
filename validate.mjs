import { lessons } from '../data/lessons.js';
import { existsSync, readFileSync } from 'node:fs';
const errors = [];
const required = ['id','number','category','difficulty','minutes','title','subtitle','question','focus','choices','hint','solution','reflection','check'];
const ids = new Set(); const numbers = new Set();
for (const [index,lesson] of lessons.entries()) {
  const name = `lesson[${index}]`;
  for (const key of required) if (!(key in lesson)) errors.push(`${name}: missing ${key}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lesson.id ?? '')) errors.push(`${name}: invalid id`);
  if (ids.has(lesson.id)) errors.push(`${name}: duplicate id`); ids.add(lesson.id);
  if (!/^\d{2}$/.test(lesson.number ?? '')) errors.push(`${name}: number must be two digits`);
  if (numbers.has(lesson.number)) errors.push(`${name}: duplicate number`); numbers.add(lesson.number);
  for (const key of ['category','title','subtitle','question','focus','hint','solution','reflection']) if (typeof lesson[key] !== 'string' || !lesson[key].trim()) errors.push(`${name}: ${key} must be nonempty text`);
  if (!Number.isInteger(lesson.difficulty) || lesson.difficulty < 1 || lesson.difficulty > 5) errors.push(`${name}: difficulty must be 1-5`);
  if (!Number.isInteger(lesson.minutes) || lesson.minutes < 1) errors.push(`${name}: minutes must be positive`);
  if (!Array.isArray(lesson.choices) || lesson.choices.length < 2) errors.push(`${name}: at least 2 choices required`);
  else {for (const [i,c] of lesson.choices.entries()) if (typeof c.text !== 'string' || !c.text.trim() || typeof c.feedback !== 'string' || !c.feedback.trim() || typeof c.correct !== 'boolean') errors.push(`${name}: choice[${i}] needs text, feedback, correct`);if(lesson.choices.filter(c=>c.correct).length!==1)errors.push(`${name}: exactly one correct choice required`);}
  if (typeof lesson.check?.question !== 'string' || !lesson.check.question.trim() || typeof lesson.check.answer !== 'string' || !lesson.check.answer.trim()) errors.push(`${name}: check must have question and answer`);
}
for (const path of ['index.html','css/style.css','js/app.js','js/lesson.js','AGENTS.md','README.md']) if(!existsSync(new URL(`../${path}`,import.meta.url)))errors.push(`missing file: ${path}`);
const html = readFileSync(new URL('../index.html',import.meta.url),'utf8');
for(const path of ['./css/style.css','./js/app.js'])if(!html.includes(path))errors.push(`index.html missing relative path ${path}`);
if(/(?:src|href)=["']\/(?!\/)/.test(html))errors.push('index.html contains root-absolute resource/link path');
if(errors.length){console.error(`FAIL: ${errors.length} issue(s)\n${errors.map(e=>' - '+e).join('\n')}`);process.exitCode=1;}else console.log(`PASS: ${lessons.length} lessons; schema, unique IDs, entrypoints and GitHub Pages paths validated.`);
