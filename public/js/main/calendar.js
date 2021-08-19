"use strict";

class Calendar{
    constructor(date,target,language,id,name){
        this.date = date ?? new Date();
        this.target = target ?? `#calendar_wrapper`;
        this.wrapper = document.querySelector(this.target) ?? this.wrapperSetting();
        this.language = language ?? `kr`;
        this.id = id ?? 'guest';
        this.name = name ?? 'guest';
        this.render();
    }
    render(){
        const pastMonthLastDate = new Date(`${this.date.getFullYear()}`,`${this.date.getMonth()-2}`,`0`).getDate();
        const thisMonthFirstDay = new Date(`${this.date.getFullYear()}`,`${this.date.getMonth()}`,`1`).getDay();
        const thisMonthLastDate = new Date(`${this.date.getFullYear()}`,`${this.date.getMonth()+1}`,`0`).getDate();
        const today = new Date();
        let html = `<div class="calendar-container">`;
        html+=`<header class="calendar-header">`;
        html+=`<h1>${this.date.getFullYear()}년 ${this.date.getMonth()+1}월</h1>`
        html+=`<div class="calendar-button-container"></div>`;
        html+=`</header>`;
        html+=`<main class="calendar-content">`;
        html+=`<div class="day-header-container">`;
        for(let index = 0; index < 7; index++){
            html+=`<div class="day-header">${this.intDayToStringDay(index)}</div>`;
        }
        html+=`</div>`;
        html+=`<div class="day-container">`;
        for (let index = 0; index <= 42; index++) {
            if(index<thisMonthFirstDay){
                html+=`<div class="past-month day">${pastMonthLastDate - thisMonthFirstDay + index+1}</div>`;
            }
            else if(index>thisMonthFirstDay && index<= thisMonthLastDate){
                if(this.date.getFullYear()===today.getFullYear() && this.date.getMonth()===today.getMonth() && index === today.getDate()){
                    html+=`<div class="this-month day active"><span class="today">${index-thisMonthFirstDay}</span></div>`;
                }else{
                    html+=`<div class="this-month day">${index-thisMonthFirstDay}</div>`;
                }
            }
            else if(index>thisMonthLastDate){
                html+=`<div class="next-month day">${index-thisMonthLastDate}</div>`
            }
        }
        html+=`</div>`;
        html+=`</main>`;

        html+=`<div class="todolist-container">
            <div class="todolist-header"> `
            if(this.id !== ''){
                html+=`<span class="todolist-title">\`${this.name}\` 의 오늘 할 일(${this.date.getFullYear()} - ${this.date.getMonth()+1}  - ${this.date.getDate()})</span> </div>`;
                    for (let i = 0; i < 3; i++) {
                        html+=`<div class="todolist-item">멋지게 숨쉬기! ${i}</div>`;
                    }
            }else{
                html+=`<span class="todolist-title"> 로그인 후 사용가능합니다. </span> </div>`
            }
        html+=`</div>`; // </-- .todolist-container
        html+=`</div>`; // </-- .calendar-cotainer


        const nextMonthBtn = document.createElement(`button`);
        nextMonthBtn.classList.add("calendar-button");
        nextMonthBtn.innerText=`다음달`;
        nextMonthBtn.addEventListener(`click`,()=>{
            this.date.setMonth(this.date.getMonth()+1);
            this.render();
        });
        const prevMonthBtn = document.createElement(`button`);
        prevMonthBtn.classList.add("calendar-button");
        prevMonthBtn.innerText=`이전달`;
        prevMonthBtn.addEventListener(`click`,()=>{
            this.date.setMonth(this.date.getMonth()-1);
            this.render();
        });
        
        this.wrapper.innerHTML= html;
        this.wrapper.querySelector(`.calendar-button-container`).appendChild(prevMonthBtn);
        this.wrapper.querySelector(`.calendar-button-container`).appendChild(nextMonthBtn);
        
        document.querySelector(this.target).querySelectorAll('.this-month').forEach(item => {
            item.addEventListener('click', e => {
                document.querySelector(this.target).querySelectorAll('.active').forEach(active=>active.classList.remove('active'));
                item.classList.add('active');
                this.date.setDate(item.innerText);
                document.querySelector(this.target).querySelector('.todolist-title').innerText=`오늘 할 일(${this.date.getFullYear()} - ${this.date.getMonth()+1}  - ${this.date.getDate()})`;
            });
        })
    }

    nextMonth(){
        this.render();
    }

    wrapperSetting(){
        const wrapper = document.createElement("section");
        wrapper.id="calendar_wrapper";
        document.body.appendChild(wrapper);
       return wrapper;
    }

    intDayToStringDay(day){
        let dayArray;
        switch (this.language) {
            case `kr`:
                dayArray  = [`일`,`월`,`화`,`수`,`목`,`금`,`토`];
                break;
                case `eg`:
                dayArray = [`SUN`,`MON`,`TUE`,`WED`,`THU`,`FRI`,`SAT`];
                break;
            default:
                dayArray = [`일`,`월`,`화`,`수`,`목`,`금`,`토`];
                break;
        }
        return dayArray[day%7];
    }
}