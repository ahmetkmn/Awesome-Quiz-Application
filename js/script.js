//gerekli tüm öğelerin seçilmesi
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// startQuiz düğmesi tıklanırsa
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //bilgi kutusunu göster

    //kullanıcı "Start" düğmesine tıkladığında, bilgi kutusu ekranda belirecek.
}

// çıkış düğmesi tıklanırsa
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //bilgi kutusunu gizle

    //kullanıcı "Exit Quiz" düğmesine tıkladığında, bilgi kutusu ekrandan kaybolur.
}

// continueQuiz continue düğmesi tıklanırsa
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //bilgi kutusunu gizle
    quiz_box.classList.add("activeQuiz"); //test kutusunu göster
    showQuetions(0); //showQestions işlevinin çağrılması
    queCounter(1); //queCounter'a 1 parametre geçirme
    startTimer(15); //startTimer işlevini çağırma
    startTimerLine(0); //startTimerLine işlevinin çağrılması

}

let timeValue = 15;//başlangıç 15 saniye
let que_count = 0;//Şu anda hangi sorunun gösterildiğini tutar.
let que_numb = 1; //gösterilen soru numarasını temsil eder
let userScore = 0;//Kullanıcının elde ettiği puanı temsil eder.
let counter;//Zamanlayıcıyı tutmak için kullanılan bir değişken
let counterLine;//Zaman çizgisini yönetmek için kullanılan bir değişken
let widthValue = 0;//Zaman çizgisinin başlangıç genişliğini temsil eder.

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// restartQuiz replay quiz Sınavı düğmesi tıklanırsa bu işlemleri gerçekleştir.
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); //test kutusunu görünür hale getirir.
    result_box.classList.remove("activeResult"); //sonuç kutusunu gizlemeyi sağlar.
    timeValue = 15;
    que_count = 0;
    que_numb = 1;    //Değişkenlerinin hepsini başlangıç değerlerine geri döndürür
    userScore = 0;
    widthValue = 0; 
    showQuetions(que_count); //showQestions işlevinin çağrırak testteki soruların ilkini gösterir
    queCounter(que_numb); //işlevini çağırarak, soru sayacını başlatır ve ilk soru için "1/xx Sorular" biçiminde gösterir.
    clearInterval(counter); //Eski zamanlayıcıları (counter ve counterLine) temizler.
    clearInterval(counterLine);
    startTimer(timeValue); //Yeni bir zamanlayıcı başlatır (startTimer ve startTimerLine fonksiyonlarını çağırarak).
    startTimerLine(widthValue);
    timeText.textContent = "Time Left"; //Zamanı göstermek için timeText öğesinin metnini "Time Left" olarak değiştirir.
    next_btn.classList.remove("show"); //next Que butonunu gizler
}

// quitQuiz çık butonu tıklandığında çalışır.
quit_quiz.onclick = () => {
    window.location.reload(); //kullanıcı çık düğmesine tıkladığında, mevcut sayfayı yeniden yükleyerek kullanıcıyı testten veya sınavdan çıkarır.
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Next Que butonu tıklandığında çalışır
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { //(şu anda gösterilen sorunun indeksi) toplam soru sayısının bir eksiğinden küçükse, yani daha fazla soru varsa:
        que_count++; //değerlerini bir artırır. Bu, bir sonraki soruya geçmek için kullanılır.
        que_numb++; //değerlerini bir artırır. Bu, bir sonraki soruya geçmek için kullanılır.
        showQuetions(que_count); //showQestions işlevini çağırarak, bir sonraki soruyu gösterir.
        queCounter(que_numb); //işlevini çağırarak, soru sayacını günceller.
        clearInterval(counter); //Eski zamanlayıcıları durdurur
        clearInterval(counterLine); 
        startTimer(timeValue); //Yeni bir zamanlayıcı başlatır
        startTimerLine(widthValue);
        timeText.textContent = "Time Left"; // timeText metnini "Time Left" olarak değiştirir.
        next_btn.classList.remove("show"); //"Next Que" butonunu gizler
    } else { //toplam soru sayısının bir eksiğine eşit veya daha büyükse, yani son soru ise:
        clearInterval(counter); //sayacı temizle
        clearInterval(counterLine); //CounterLine'ı temizle
        showResult(); //işlevini çağırarak sonucu gösterir.
    }
}

// Bu fonksiyon, belirli bir soruyu ve seçenekleri göstermek için kullanılır. 
function showQuetions(index) { //parametresi aracılığıyla hangi sorunun gösterileceğini belirler.
    const que_text = document.querySelector(".que_text");

    //soru ve seçenek için yeni bir span ve div etiketi oluşturma ve dizi indeksini kullanarak değer aktarır
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; //sınıfına sahip HTML öğesini seçer ve bu öğenin içeriğini, sorunun metniyle birlikte HTML biçiminde günceller.
    option_list.innerHTML = option_tag; // sınıfına sahip HTML öğesini seçer ve bu öğenin içeriğini, seçeneklerin metniyle birlikte HTML biçiminde günceller.

    const option = option_list.querySelectorAll(".option");

    // doğru ve yanlış cevapları görsel olarak temsil etmek için kullanılan HTML etiketlerini tanımlar.
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// iconlar için yeni div etiketlerinin oluşturulması
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';//Bu etiket, doğru cevabı içeren bir <div> öğesi içerir yeşil renk gösterir ve onay iconu verir.
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';//Bu etiket, yanlış cevabı içeren bir <div> öğesi içerir kırmızı renk gösterir ve çarpı iconu verir.

//kullanıcı seçeneğe tıkladıysa
function optionSelected(answer) {
    clearInterval(counter); //sayacı temizle
    clearInterval(counterLine); //CounterLine'ı temizle
    let userAns = answer.textContent; //kullanıcının seçtiği seçeneği alır
    let correcAns = questions[que_count].answer; //diziden doğru cevabı alır
    const allOptions = option_list.children.length; //tüm seçenek öğelerini alma

    if (userAns == correcAns) { //Kullanıcının cevabını konntrol eder
        userScore += 1; //doğru cevap ise puan 1 artar
        answer.classList.add("correct"); //doğru olduğunu belirten sınıfı "correct" ekler.
        answer.insertAdjacentHTML("beforeend", tickIconTag); //Seçilen seçeneği yanına onay simgesi ekler
        console.log("Correct Answer");//doğru cevabı consola yazdırır.
        console.log("Your correct answers = " + userScore);
    } else {//Kullanıcının cevabı yanlış ise
        answer.classList.add("incorrect"); //Seçilen seçeneğe yanlış olduğunu belirten bir sınıf "incorrect" ekler.
        answer.insertAdjacentHTML("beforeend", crossIconTag); //Seçilen seçenek yanlış ise çarpı simgesi ekleme
        console.log("Wrong Answer");//consola yanlış cevabı yazdırır.

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //bir dizi yanıtıyla eşleşen bir seçenek varsa
                option_list.children[i].setAttribute("class", "option correct"); //eşleşen seçeneğe yeşil renk ekleme
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //eşleşen seçeneğe onay simgesi ekleme
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //kullanıcı bir seçeneği seçtikten sonra tüm seçenekleri devre dışı bırakır
    }
    next_btn.classList.add("show"); //kullanıcı herhangi bir seçeneği seçtiyse sonraki butonu göster
}

//bu fonksiyon kullanıcının test sonuçlarını gösterir
function showResult() {
    info_box.classList.remove("activeInfo"); //bilgi kutusunu gizle
    quiz_box.classList.remove("activeQuiz"); //sınav kutusunu gizle
    result_box.classList.add("activeResult"); //sonuç kutusunu gösterir
    const scoreText = result_box.querySelector(".score_text");//kullanıcının aldığı puanı ve soru sayısını gösteren bir text oluşturur.
    if (userScore > 3) { // kullanıcı 3'ten fazla puan aldıysa
        //yeni bir span etiketi oluşturup kullanıcı puan numarasını ve toplam soru sayısını gösterir tebrik mesajı gelir
        let scoreTag = '<span>and congrats! , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;  //Score_Text içine yeni span etiketi ekleme
    }
    else if (userScore > 1) { // kullanıcı 1'den fazla puan aldıysa
        let scoreTag = '<span>and nice , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;//kullanıcın puanını ve güzel mesajı gösterirç
    }
    else { // kullanıcı 1'den az puan aldıysa
        let scoreTag = '<span>and sorry , You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;//kullanıcının puanını ve üzgün mesajı ekler.
    }
}
//Bu fonksiyon bir zamanlayıcı oluşturarak test süresini geri sayar.
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //timeCount'un text'ini belirtilen süre "time" ile günceller.
        time--; //zaman değerini azaltır geri sayım yapar
        if (time < 9) { //Eğer kalan süre 9 saniyeden azsa, başına "0" ekleyerek zaman gösterimini düzgünleştirir.
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //zaman değerinin önüne 0 ekleyin
        }
        if (time < 0) { //Eğer zaman sıfıra düşerse, yani süre dolduysa
            clearInterval(counter); //yöntemiyle zamanlayıcıyı durdurur
            timeText.textContent = "Time Off"; //timeText Time Off olarak değiştir
            const allOptions = option_list.children.length; //tüm seçenek öğelerini alma
            let correcAns = questions[que_count].answer; //diziden doğru cevabı almak
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { //bir dizi yanıtıyla eşleşen bir seçenek varsa
                    option_list.children[i].setAttribute("class", "option correct"); //eşleşen seçeneğe yeşil renk ekleme
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //eşleşen seçeneğe onay iconu ekleme
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //kullanıcı cevapladıysa tüm seçenekleri devre dışı bırakır
            }
            next_btn.classList.add("show"); //Sonraki butonu gösterir böylece kullanıcı bir sonraki soruya geçebilir.
        }
    }
}
//Bu fonksiyon, zaman çizgisini "time_line" animasyonlu bir şekilde göstermek için kullanılır.
function startTimerLine(time) {//bu iç fonksiyon her 29 milisaniyede bir çağrılır.
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; //zaman değeri 1'e artırılır böylece zaman sürekli artar
        time_line.style.width = time + "px"; //değişkeninin değerine bağlı olarak piksel cinsinden ayarlanır.
        if (time > 549) { //zaman değeri 549'dan büyükse zamanlayıcıyı durdurur.
            clearInterval(counterLine);
        }
    }
}
//kullanıcının şu anda kaçıncı soruda olduğunu ve toplam kaç soru olduğunu göstermek için kullanılır.
function queCounter(index) {
    //yeni bir span etiketi oluşturma ve soru numarasını ve toplam soruyu aktarma
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //Bottom_ques_counter içine yeni span etiketi ekleme
}