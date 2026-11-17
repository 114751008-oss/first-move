import { lessons } from './lessons.js';
import { openLesson } from './lesson.js';
const grid = document.querySelector('#lesson-grid');
const filters = document.querySelector('#filters');
const count = document.querySelector('#lesson-count');
const categories = ['全部', ...new Set(lessons.map(item => item.category))];
let currentCategory = '全部';
const storageKey = 'first-move-completed-v1';
function getCompleted(){try{return new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));}catch{return new Set();}}
function markCompleted(id){try{const set=getCompleted();set.add(id);localStorage.setItem(storageKey, JSON.stringify([...set]));}catch{ /* page still functions with storage blocked */ } renderLessons();}
function node(tag, className, text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
function renderFilters(){filters.replaceChildren();for(const category of categories){const button=node('button',`filter-btn ${currentCategory===category?'active':''}`,category);button.type='button';button.setAttribute('aria-pressed',String(currentCategory===category));button.addEventListener('click',()=>{currentCategory=category;renderFilters();renderLessons();});filters.append(button);}}
function renderLessons(){grid.replaceChildren();count.textContent=String(lessons.length).padStart(2,'0');const completed=getCompleted();const visible=lessons.filter(item=>currentCategory==='全部'||item.category===currentCategory);for(const lesson of visible){const card=node('article','lesson-card');const top=node('div','card-top');top.append(node('span','',`EXPERIMENT / ${lesson.number}`),node('span','card-tag',lesson.category));const title=node('h3','',lesson.title);const sub=node('p','',lesson.subtitle);const bottom=node('div','card-bottom');bottom.append(node('span','',`難度 ${'●'.repeat(lesson.difficulty)}${'○'.repeat(5-lesson.difficulty)} · 約 ${lesson.minutes} 分鐘`));const button=node('button','card-open',completed.has(lesson.id)?'已完成 · 再挑戰 ↗':'開始實驗 ↗');button.type='button';button.setAttribute('aria-label',`開始 ${lesson.title}`);button.addEventListener('click',()=>openLesson(lesson,markCompleted));bottom.append(button);card.append(top,title,sub,bottom);grid.append(card);}if(!visible.length)grid.append(node('p','empty','這個分類尚無內容。'));}
renderFilters();renderLessons();
