const yonetEkran = document.getElementById("asdasd");
const etkinlikEkran = document.getElementById("asdasdasd");
const mailV = document.getElementById("eposta");
const baslikV = document.getElementById("konu");
const icerikV = document.getElementById("icerik");
const isimV = document.getElementById("isim");
const bvrMail = document.getElementById("bvr_eposta");
const bvrIsim = document.getElementById("bvr_isim");
const bvrOkul = document.getElementById("bvr_okul");
const bvrBolum = document.getElementById("bvr_bolum");
const bvrSinif = document.getElementById("bvr_sinif");
const gonderbtn = document.getElementById("gonderbtn");
const basliktxt = document.getElementById("bvr-header");
const alttxt = document.getElementById("bvr-alt");
const bvrBilgi = document.getElementById("bvr_bilgi");
const bvrBilgiCon = document.getElementById("bvr_bilgicon");

var mailci;
var deneyb;
var mailci_bvr;
var deneyb_bvr;

let jsonVeri;

async function GirisKontrol(){
await fetch("https://turk-biyologlar-dernegi.glitch.me/kartlar")
            .then((response) => response.json())
            .then((json) => jsonVeri = json);
          
          
            let htmlCode =
    `
     <h3 class="w3-border-bottom w3-border-white pad10 ortaiki cardbaslik" style="margin-top: 50px; max-width: 100%;">
          Deneyler
        </h3>
        <p class="cardbaslik ortaiki ortadort">Deneyleri aşağıda görüntüleyebilirsiniz.</p>
        
                          <section class="cards ortala">
            
  `;
          jsonVeri.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeri.aciklamalar.indexOf(singleElephantObjects)
    htmlCode =
    htmlCode +
    `   

<div class="card">
          <div class="card__image-container">
            <img
              src="${jsonVeri.resimler[index]}"
            />
          </div>
          <div class="card__content">
            <p class="card__title text--medium">
         <b>${jsonVeri.basliklar[index]}</b>
          </p>
            <div id="altacik${index}" style="display: none">
              <b>Açıklama</b><br>
              ${jsonVeri.aciklamalar[index]}
              <div class="card__info">
              <div>
              <p class="card__altbasliklar"><b>Firma</b></p>
              <p class= card__altbasliklar" style="margin-top: -15px">${jsonVeri.firmalar[index]}</p>
              </div><div style="margin-left: auto">
              <p class="card__altbasliklar"><b>Yer</b></p>
              <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.yerler[index]}</p>
              </div><div style="margin-left: auto">
              <p class="card__altbasliklar"><b>Tarih</b></p>
              <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.tarihler[index]}</p>
              </div><div style="margin-left: auto">
              <p class="card__altbasliklar"><b>Saat</b></p>
              <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.saatler[index]}</p>
              </div>
              </div>
            </div>
            <div class="card__info">
              <p class="text--medium" style="margin-left: auto"></p>
              <div id="${jsonVeri.iletisimler[index]}"> </div>
              <p class="card__iletisim text--medium iletisimm" id="iletisim${index}">İletişim</p>
              <div id="${jsonVeri.iletisimler[index]}"> </div>
              <p class="card__iletisim text--medium basvurr" id="iletisim${index}">Başvur</p>
              <p class="card__price text--medium detayy" id="detay${index}">Detaylar</p>
            </div>
          </div>
        </div>
  `;

            
});
                     htmlCode = htmlCode + "</section>";

  yonetEkran.innerHTML = htmlCode;
  
var coll = document.getElementsByClassName("detayy");
var i;
var content;
var concard;
var iletisim;
var basvur;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    content = this.parentElement.previousElementSibling;
    basvur = this.previousElementSibling;
    iletisim = basvur.previousElementSibling.previousElementSibling;


    if (content.style.display === "block") {
      content.style.display = "none";
      iletisim.style.display = "none";
      basvur.style.display = "none";
      concard = this.parentElement.previousElementSibling.parentElement.parentElement;
      concard.style.maxHeight = "370px";
      concard.style.transition = "all 0.3s ease 0s;";
    } else {
      content.style.display = "block";
      iletisim.style.display = "block";
      basvur.style.display = "block";
      concard = this.parentElement.previousElementSibling.parentElement.parentElement;
      concard.style.maxHeight = "1500px";
      concard.style.transition = "all 0.9s ease 0s;";
    }
  });
}

var colll = document.getElementsByClassName("iletisimm");
var ii;

for (ii = 0; ii < coll.length; ii++) {
  colll[ii].addEventListener("click", function() {
    mailci = this.previousElementSibling.id;
    deneyb = this.parentElement.previousElementSibling.previousElementSibling.innerText;
    showDialog();
  });
}
  
var collll = document.getElementsByClassName("basvurr");
var iii;

for (iii = 0; iii < collll.length; iii++) {
  collll[iii].addEventListener("click", function() {
    mailci = this.previousElementSibling.id;
    deneyb = this.parentElement.previousElementSibling.previousElementSibling.innerText;
    bvrBilgiCon.style.display = 'block';
    bvrMail.style.display = 'block';
    gonderbtn.innerHTML = 'Gönder';
    basliktxt.innerHTML = 'Başvuru Yap';
    alttxt.innerHTML = 'Aşağıdaki bilgileri doldurun.';
    
    BasvuruyuYap()
  });
}
}

EtkinlikKontrol();
GirisKontrol();

async function BasvuruyuYap(){
if(!localStorage.getItem("girisb").includes("@") || !localStorage.getItem("girisb").includes(".")  || localStorage.getItem("girisb").includes("--sirket--"))
  {
  return;
  }    
  
    let index = jsonVeri.basliklar.indexOf(deneyb)
    let res = await fetch("/basvurularapi", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"veri": {
    "deney": "${deneyb}",
    "firma": "${jsonVeri.firmalar[index]}",
    "yer": "${jsonVeri.yerler[index]}",
    "zaman": "${jsonVeri.tarihler[index]} -- ${jsonVeri.saatler[index]}",
    "durum": "Onay Bekliyor",
    "times": "${jsonVeri.tsler[index]}",
    "girisb": "${localStorage.getItem("girisb")}"
    }}`,
});
    window.location.reload();
}

async function EtkinlikKontrol(){
await fetch("https://turk-biyologlar-dernegi.glitch.me/etkinlikkartlari")
            .then((response) => response.json())
            .then((json) => jsonVeri = json);
          
          
            let htmlCode =
    `
     <h3 class="w3-border-bottom w3-border-white pad10 ortaiki cardbaslik" style="margin-top: 50px; max-width: 100%;">
          Online Etkinlikler
        </h3>
        <p class="cardbaslik ortaiki ortadort">Online etkinlikleri aşağıda görüntüleyebilirsiniz.</p>
        
                          <section class="cards ortala">
            
  `;
          jsonVeri.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeri.aciklamalar.indexOf(singleElephantObjects)
    htmlCode =
    htmlCode +
    `   
<div class="card">
          <div class="card__image-container">
            <img
              src="${jsonVeri.resimler[index]}"
            />
          </div>
          <div class="card__content">
            <p class="card__title text--medium">
         <b>${jsonVeri.basliklar[index]}</b>
          </p>
            <div id="altacik${index}" style="display: none">
              <b>Açıklama</b><br>
              ${jsonVeri.aciklamalar[index]}
              <div class="card__info">
              <div>
              <p class="card__altbasliklar"><b>Firma</b></p>
              <p class= card__altbasliklar" style="margin-top: -15px">${jsonVeri.firmalar[index]}</p>
              </div><div style="margin-left: auto">
              <p class="card__altbasliklar"><b>Tarih</b></p>
              <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.tarihler[index]}</p>
              </div><div style="margin-left: auto">
              <p class="card__altbasliklar"><b>Saat</b></p>
              <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.saatler[index]}</p>
              </div>
              </div><div style="margin-left: auto">
              <p class="card__altbasliklar"><b>Zoom Linki</b></p>
              <p class="card__altbasliklar" style="margin-top: -15px"><a href="${jsonVeri.linkler[index]}">Toplantıya Katıl</a></p>
              </div>
            </div>
            <div class="card__info">
              <p class="text--medium" style="margin-left: auto"></p>
              <div id="${jsonVeri.iletisimler[index]}"> </div>
              <p class="card__iletisim text--medium eiletisimm" id="iletisim${index}">İletişim</p>
              <p class="card__price text--medium edetayy" id="detay${index}">Detaylar</p>
            </div>
          </div>
        </div>
  `;

            
});
                     htmlCode = htmlCode + "</section>";

  etkinlikEkran.innerHTML = htmlCode;
  
var coll = document.getElementsByClassName("edetayy");
var i;
var content;
var concard;
var iletisim;
var basvur;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    content = this.parentElement.previousElementSibling;
    basvur = this.previousElementSibling;
    iletisim = basvur.previousElementSibling.previousElementSibling;


    if (content.style.display === "block") {
      content.style.display = "none";
      iletisim.style.display = "none";
      basvur.style.display = "none";
      concard = this.parentElement.previousElementSibling.parentElement.parentElement;
      concard.style.maxHeight = "370px";
      concard.style.transition = "all 0.3s ease 0s;";
    } else {
      content.style.display = "block";
      iletisim.style.display = "block";
      basvur.style.display = "block";
      concard = this.parentElement.previousElementSibling.parentElement.parentElement;
      concard.style.maxHeight = "1500px";
      concard.style.transition = "all 0.9s ease 0s;";
    }
  });
}

var colll = document.getElementsByClassName("eiletisimm");
var ii;

for (ii = 0; ii < coll.length; ii++) {
  colll[ii].addEventListener("click", function() {
    mailci = this.previousElementSibling.id;
    deneyb = this.parentElement.previousElementSibling.previousElementSibling.innerText;
    showDialog();
  });
}
}

function dlgHide(){
    enableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");
    whitebg.style.display = "none";
    dlg.style.display = "none";
}

function showDialog(){
    disableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");
    whitebg.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;

    dlg.style.left = (winWidth/2) - 480/2 + "px";
    dlg.style.top = "150px";
}

function bvrHide(){
    enableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("basvurdialog");
    whitebg.style.display = "none";
    dlg.style.display = "none";
}

function showBasvur(){
    disableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("basvurdialog");
    whitebg.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;

    dlg.style.left = (winWidth/2) - 480/2 + "px";
    dlg.style.top = "150px";
  
    if (typeof(Storage) !== "undefined") {
  		bvrIsim.value = localStorage.getItem("isim");
      bvrMail.value = localStorage.getItem("eposta");
  		bvrOkul.value = localStorage.getItem("okul");
  		bvrBolum.value = localStorage.getItem("bolum");
  		bvrSinif.value = localStorage.getItem("sinif");
		}
}

function dlgCancel(){
    dlgHide();
}

async function dlgOK(){

  dlgHide();
  let date = new Date();
  let icicerik = icerikV.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/mailat", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${baslikV.value}", "aciklama": "${icicerik}", "mail": "${mailci}", "isim": "${isimV.value}", "kmail": "${mailV.value}", "deneyb": "${deneyb}"}`,
});
}

function bvrCancel(){
    bvrHide();
}

async function bvrOK(){
    if(gonderbtn.innerText == "Kaydet" || bvrBilgi.checked)
    {
      if (typeof(Storage) !== "undefined") {
        let eposta = localStorage.getItem("girisb");
  			let isim = bvrIsim.value;
  			let okul = bvrOkul.value;
  			let bolum = bvrBolum.value;
  			let sinif = bvrSinif.value;
          await fetch('/bilgiguncelle', {
 						method: 'POST',
  					headers: {
   				 'Content-Type': 'application/json'
  					},
  					body: `{"eposta": "${eposta}", "isim": "${isim}", "okul": "${okul}", "bolum": "${bolum}", "sinif": "${sinif}"}`
						})
        bvrHide();
        window.location.reload();			
      }
    }
  else
    {
  bvrHide();
  let date = new Date();
  let icicerik = icerikV.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/basvuruat", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"sinif": "${bvrSinif.value}", "okul": "${bvrOkul.value}", "bolum": "${bvrBolum.value}", "mail": "${mailci}", "isim": "${bvrIsim.value}", "kmail": "${bvrMail.value}", "deneyb": "${deneyb}"}`,
});
}
}

function disableScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
   }
   
function enableScroll() {
    window.onscroll = function() {};
}

function BasvuruBilgisi(){
  bvrBilgiCon.style.display = 'none';
  bvrMail.style.display = 'none';
  gonderbtn.innerHTML = 'Kaydet';
  basliktxt.innerHTML = 'Başvuru Bilgileri';
  alttxt.innerHTML = 'Başvuru bilgilerinizi düzenleyin.';
  if(localStorage.getItem("girisb") && localStorage.getItem("girisb").includes("@") && localStorage.getItem("girisb").includes(".") && localStorage.getItem("girisb").includes("--sirket--"))
    {
        window.location.href = "/profil"
    }
  else{
      window.location.href = "/giris"
  }
}

function BasvuruBilgisi2(){
  bvrBilgiCon.style.display = 'none';
  bvrMail.style.display = 'none';
  gonderbtn.innerHTML = 'Kaydet';
  basliktxt.innerHTML = 'Başvuru Bilgileri';
  alttxt.innerHTML = 'Başvuru bilgilerinizi düzenleyin.';
  showBasvur();
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
