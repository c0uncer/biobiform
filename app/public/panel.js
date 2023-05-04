const kullaniciAdi = document.getElementById("kullaniciadi");
const sifre = document.getElementById("sifre");
const girisEkran = document.getElementById("girisekran");
const yonetEkran = document.getElementById("yonetekran");
const etkinlikEkran = document.getElementById("etkinlikekran");
const baslikB = document.getElementById("baslik");
const aciklamaB = document.getElementById("aciklama");
const firmaB = document.getElementById("firma");
const yerB = document.getElementById("yer");
const tarihB = document.getElementById("tarih");
const ilposta = document.getElementById("eposta");
const ebaslikB = document.getElementById("ebaslik");
const eaciklamaB = document.getElementById("eaciklama");
const efirmaB = document.getElementById("efirma");
const linkB = document.getElementById("link");
const etarihB = document.getElementById("etarih");
const eilposta = document.getElementById("eeposta");
const firmay = document.getElementById("firmay");
const epostay = document.getElementById("epostay");

let resim;
let eresim;
let jsonVeri;
let giris;

async function GirisKontrol(){
  
  if(kullaniciAdi.value != "" && sifre.value != "")
    {
      if(kullaniciAdi.value == "kullanıcı" && sifre.value == "şifre123")
        {
          giris = true;
          girisEkran.style.display = "none";
          
         await fetch("https://turk-biyologlar-dernegi.glitch.me/kartlar")
            .then((response) => response.json())
            .then((json) => jsonVeri = json);
          
          
            let htmlCode =
    `   
        <h3 class="w3-border-bottom w3-border-white w3-padding-16 ortaiki cardbaslik">
          Tüm İlanlar
        </h3>
        <p class="cardbaslik ortaiki">İlan ekleyebilir veya silebilirsiniz.</p>
        
                          <section class="cards ortala">
            <div class="card" onclick="showDialog()">
          <div class="card_ekle_image-container ortauc">
            <img
              style="margin-top: 0px; margin-left: 0px; max-width: 300px" src="https://cdn.glitch.global/440e545c-6bcc-4068-885f-5804db0f28d2/eklebtn.png?v=1676390069163"
            />
          </div>
        </div>
            
  `;
          jsonVeri.basliklar.forEach(function(singleElephantObjects) {
            let index = jsonVeri.basliklar.indexOf(singleElephantObjects)
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
              </div><br><div style="margin-left: auto">
              <p class="card__altbasliklar"><b>Tarih</b></p>
              <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.tarihler[index]}</p>
              </div><div style="margin-left: auto">
              <p class="card__altbasliklar"><b>Saat</b></p>
              <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.saatler[index]}</p>
              </div>
              </div>
            </div>
            <div class="card__info">
              <p class="text--medium" style="padding-right: 135px"></p>
              <p class="card__sil text--medium sill" id="sil${index}">Sil</p>
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

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    content = this.parentElement.previousElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
      concard = this.parentElement.previousElementSibling.parentElement.parentElement;
      concard.style.maxHeight = "370px";
      concard.style.transition = "all 0.3s ease 0s;";
    } else {
      content.style.display = "block";
      concard = this.parentElement.previousElementSibling.parentElement.parentElement;
      concard.style.maxHeight = "1500px";
      concard.style.transition = "all 0.9s ease 0s;";
    }
  });
}
          
var colll = document.getElementsByClassName("sill");
var ii;

for (ii = 0; ii < coll.length; ii++) {
  colll[ii].addEventListener("click", function() {
    var indexx = this.id.replace("sil", "");
    silsil(indexx);
  });
}
          
EtkinlikKontrol()
          
        }
      else{
        alert("Kullanıcı adınızı ve şifrenizi kontrol edin.")
      }
    }
}


async function EtkinlikKontrol(){   
         await fetch("https://turk-biyologlar-dernegi.glitch.me/etkinlikkartlari")
            .then((response) => response.json())
            .then((json) => jsonVeri = json);
          
          
            let htmlCode =
    `   
        <h3 class="w3-border-bottom w3-border-white w3-padding-16 ortaiki cardbaslik">
          Online Etkinlikler
        </h3>
        <p class="cardbaslik ortaiki">Etkinlik ekleyebilir veya silebilirsiniz.</p>
        
                          <section class="cards ortala">
            <div class="card" onclick="eshowDialog()">
          <div class="card_ekle_image-container ortauc">
            <img
              style="margin-top: 0px; margin-left: 0px; max-width: 300px" src="https://cdn.glitch.global/440e545c-6bcc-4068-885f-5804db0f28d2/eklebtn.png?v=1676390069163"
            />
          </div>
        </div>
            
  `;
          jsonVeri.basliklar.forEach(function(singleElephantObjects) {
            let index = jsonVeri.basliklar.indexOf(singleElephantObjects)
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
              </div><div style="margin-top: -15px">
              <p class="card__altbasliklar"><b>Zoom Linki</b></p>
              <p class="card__altbasliklar" style="margin-top: -15px"><a href="${jsonVeri.linkler[index]}">Etkinliğe Katıl</a></p>
              </div>
            </div>
            <div class="card__info">
              <p class="text--medium" style="padding-right: 135px"></p>
              <p class="card__sil text--medium esill" id="sil${index}">Sil</p>
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

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    content = this.parentElement.previousElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
      concard = this.parentElement.previousElementSibling.parentElement.parentElement;
      concard.style.maxHeight = "370px";
      concard.style.transition = "all 0.3s ease 0s;";
    } else {
      content.style.display = "block";
      concard = this.parentElement.previousElementSibling.parentElement.parentElement;
      concard.style.maxHeight = "1500px";
      concard.style.transition = "all 0.9s ease 0s;";
    }
  });
}
          
var colll = document.getElementsByClassName("esill");
var ii;

for (ii = 0; ii < coll.length; ii++) {
  colll[ii].addEventListener("click", function() {
    var indexx = this.id.replace("sil", "");
    onsilsil(indexx);
  });
}
}


async function silsil(ind){
    let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/silsilsil", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"index": "${ind}"}`,
});
    window.location.reload();
}

async function onsilsil(ind){
    let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/onsilsilsil", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"index": "${ind}"}`,
});
    window.location.reload();
}

                       /*  <div class="card">
          <div class="card__image-container">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
            />
          </div>
          <div class="card__content">
            <p class="card__title text--medium">
             Çok iyi bir deney başlığı
            </p>
            <div class="card__info">
              <p class="text--medium" style="padding-right: 100px">30 Min</p>
              <p class="card__sil text--medium">Sil</p>
              <p class="card__price text--medium">Detaylar</p>
            </div>
          </div>
        </div>*/

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

function edlgHide(){
    enableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("edlgbox");
    whitebg.style.display = "none";
    dlg.style.display = "none";
}

function eshowDialog(){
    disableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("edlgbox");
    whitebg.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;

    dlg.style.left = (winWidth/2) - 480/2 + "px";
    dlg.style.top = "150px";
}

function dlgCancel(){
    dlgHide();
}

function edlgCancel(){
    edlgHide();
}

async function dlgOK(){
  dlgHide();
  if(giris){
  let date = new Date(tarihB.value);
  let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/veritabani", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${baslikB.value}", "aciklama": "${aciklamaB.value}", "firma": "${firmaB.value}", "tarih": "${date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()}", "saat": "${date.getHours().toString() + ":" + date.getMinutes().toString()}", "yer": "${yerB.value}", "resim": "${resim}", "times": "${date.getTime().toString()}", "iletisim": "${ilposta.value}"}`,
});
  if(res.status != 200)
    {
      var link = prompt("Yüklediğiniz resim ile ilgili bir hata oluştu. Resim çok büyük. İsterseniz resmi url olarak yazabilirsiniz.");
      if(link.length > 1)
        {
      let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/veritabani", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${baslikB.value}", "aciklama": "${aciklamaB.value}", "firma": "${firmaB.value}", "tarih": "${date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()}", "saat": "${date.getHours().toString() + ":" + date.getMinutes().toString()}", "yer": "${yerB.value}", "resim": "${link}", "times": "${date.getTime().toString()}", "iletisim": "${ilposta.value}"}`,
});
        }
    }
  window.location.reload();
}
}

async function edlgOK(){
  edlgHide();
  if(giris){
  let date = new Date(etarihB.value);
  let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/onetkinlikekle", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${ebaslikB.value}", "aciklama": "${eaciklamaB.value}", "firma": "${efirmaB.value}", "tarih": "${date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()}", "saat": "${date.getHours().toString() + ":" + date.getMinutes().toString()}", "link": "${linkB.value}", "resim": "${eresim}", "times": "${date.getTime().toString()}", "iletisim": "${eilposta.value}"}`,
});
  if(res.status != 200)
    {
      var link = prompt("Yüklediğiniz resim ile ilgili bir hata oluştu. Resim çok büyük. İsterseniz resmi url olarak yazabilirsiniz.");
      if(link.length > 1)
        {
      let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/onetkinlikekle", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${ebaslikB.value}", "aciklama": "${eaciklamaB.value}", "firma": "${efirmaB.value}", "tarih": "${date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()}", "saat": "${date.getHours().toString() + ":" + date.getMinutes().toString()}", "link": "${linkB.value}", "resim": "${link}", "times": "${date.getTime().toString()}", "iletisim": "${eilposta.value}"}`,
});
        }
    }
  window.location.reload();
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

document.querySelector("#resim").addEventListener("change", function(){
  const reader = new FileReader();
  
  reader.addEventListener("load", function(){
    resim = reader.result;
  });
  
  reader.readAsDataURL(this.files[0]);
});

document.querySelector("#eresim").addEventListener("change", function(){
  const reader = new FileReader();
  
  reader.addEventListener("load", function(){
    eresim = reader.result;
  });
  
  reader.readAsDataURL(this.files[0]);
});