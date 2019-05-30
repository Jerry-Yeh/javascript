//指定DOM
var sendData = document.querySelector('.send');
var list = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem('listData')) || [] ;


//監聽與更新
sendData.addEventListener('click',addData);
list.addEventListener('click',toggleDone);

//預設顯示儲存的值
updateList(data);

//加入列表，並徒步更新網頁與localStorage
function addData(e){
    e.preventDefault();
    var height = (document.querySelector('#height').value)/100;
    var weight = document.querySelector('#weight').value;
    var bmi = weight/(height*height);
    bmi = bmi.toFixed(2);
    
    if (weight == '' || height == ''){return};

    var todo = {
        bmi:bmi,
        height:height,
        weight:weight,
    }
    data.push(todo);
    localStorage.setItem('listData',JSON.stringify(data));
    updateList(data);
};

//更新網頁內容
function updateList(item){
    var str = '';
    var result = '';
    var len = item.length;
    var height = document.querySelector('#height');
    var weight = document.querySelector('#weight');
    // date
    var dt = new Date();
    var month = dt.getMonth();
    var date = dt.getDate();
    var year = dt.getFullYear();
    
    for (var i=0 ; i<len ; i++){
        if (item[i].bmi <= 18.5){
            str += '<li class="line-l"><span class="lv">過輕</span>BMI <span class="bmi">'+ item[i].bmi +'</span>weight<span class="weight">'+ item[i].weight +'kg</span>height<span class="height">'+ (item[i].height)*100 +'cm</span>'+ month + '-' + date + '-' + year +'<a href="#" item-index="'+ i +'">刪除</a></li>'
            result = '<span class="data">'+ item[i].bmi +'</span><br><span class="BMI">BMI</span><div class="loop loop-l"><img src="../img/icons_loop.png" alt=""></div><p class="lv lv-l">過輕</p>';
            sendData.setAttribute('class','result result-l');
        }else if (item[i].bmi > 18.5 && item[i].bmi <=25){
            str += '<li class="line-n"><span class="lv">理想</span>BMI <span class="bmi">'+ item[i].bmi +'</span>weight<span class="weight">'+ item[i].weight +'kg</span>height<span class="height">'+ (item[i].height)*100 +'cm</span>'+ month + '-' + date + '-' + year +'<a href="#" item-index="'+ i +'">刪除</a></li>'
            result = '<span class="data">'+ item[i].bmi +'</span><br><span class="BMI">BMI</span><div class="loop loop-n"><img src="../img/icons_loop.png" alt=""></div><p class="lv lv-n">理想</p>';
            sendData.setAttribute('class','result result-n');
        }else if (item[i].bmi > 25 && item[i].bmi <=30){
            str += '<li class="line-o"><span class="lv">過重</span>BMI <span class="bmi">'+ item[i].bmi +'</span>weight<span class="weight">'+ item[i].weight +'kg</span>height<span class="height">'+ (item[i].height)*100 +'cm</span>'+ month + '-' + date + '-' + year +'<a href="#" item-index="'+ i +'">刪除</a></li>'
            result = '<span class="data">'+ item[i].bmi +'</span><br><span class="BMI">BMI</span><div class="loop loop-o"><img src="../img/icons_loop.png" alt=""></div><p class="lv lv-o">過重</p>';
            sendData.setAttribute('class','result result-o');
        }else if (item[i].bmi > 30 && item[i].bmi <= 35){
            str += '<li class="line-oo"><span class="lv-o">輕度肥胖</span>BMI <span class="bmi">'+ item[i].bmi +'</span>weight<span class="weight">'+ item[i].weight +'kg</span>height<span class="height">'+ (item[i].height)*100 +'cm</span>'+ month + '-' + date + '-' + year +'<a href="#" item-index="'+ i +'">刪除</a></li>'
            result = '<span class="data">'+ item[i].bmi +'</span><br><span class="BMI">BMI</span><div class="loop loop-oo"><img src="../img/icons_loop.png" alt=""></div><p class="lv lv-oo">輕度肥胖</p>';
            sendData.setAttribute('class','result result-oo');
        }else if (item[i].bmi > 35 && item[i].bmi <=40){
            str += '<li class="line-ooo"><span class="lv-o">中度肥胖</span>BMI <span class="bmi">'+ item[i].bmi +'</span>weight<span class="weight">'+ item[i].weight +'kg</span>height<span class="height">'+ (item[i].height)*100 +'cm</span>'+ month + '-' + date + '-' + year +'<a href="#" item-index="'+ i +'">刪除</a></li>'
            result = '<span class="data">'+ item[i].bmi +'</span><br><span class="BMI">BMI</span><div class="loop loop-ooo"><img src="../img/icons_loop.png" alt=""></div><p class="lv lv-ooo">中度肥胖</p>';
            sendData.setAttribute('class','result result-ooo');
        }else if (item[i].bmi > 40){
            str += '<li class="line-oooo"><span class="lv-o">重度肥胖</span>BMI <span class="bmi">'+ item[i].bmi +'</span>weight<span class="weight">'+ item[i].weight +'kg</span>height<span class="height">'+ (item[i].height)*100 +'cm</span>'+ month + '-' + date + '-' + year +'<a href="#" item-index="'+ i +'">刪除</a></li>'
            result = '<span class="data">'+ data[i].bmi +'</span><br><span class="BMI">BMI</span><div class="loop loop-oooo"><img src="../img/icons_loop.png" alt=""></div><p class="lv lv-oooo">重度肥胖</p>';
            sendData.setAttribute('class','result result-oooo');
        }

        height.value = (item[i].height)*100;
        weight.value = item[i].weight;
    };
    
    list.innerHTML = str;
    sendData.innerHTML = result;

    

    // 在刪除所有紀錄後，將'看結果'放回按鈕中
    if (item.length == 0){
        sendData.innerHTML = '<span>看結果</span>'; 
        height.value = '';
        weight.value = '';
    };

    //預設顯示儲存的值
   
};

//刪除 BMI
function toggleDone(e){
    e.preventDefault();
    if (e.target.nodeName !== 'A'){return};

    var index = e.target.dataset.index;
    data.splice(index,1);
    sendData.setAttribute('class','send');

    localStorage.setItem('listData',JSON.stringify(data));
    updateList(data);
};

