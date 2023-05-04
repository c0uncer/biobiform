const baslikBb = document.getElementById("baslik");
const aciklamaBb = document.getElementById("aciklama");
const firmaBb = document.getElementById("firma");
const yerBb = document.getElementById("yer");
const tarihBb = document.getElementById("tarih");
const ilposta = document.getElementById("eposta");
const firmay = document.getElementById("firmay");
const epostay = document.getElementById("epostay");
const deneyler = document.getElementById("London");
const deneyler2 = document.getElementById("Gecmis");

let resim;

function dlgHide(){
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");
    whitebg.style.display = "none";
    dlg.style.display = "none";
}

function showDialog(){
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");
    whitebg.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;

    dlg.style.left = (winWidth/2) - 480/2 + "px";
    dlg.style.top = "150px";
}

async function dlgOK(){
  dlgHide();
  let date = new Date(tarihBb.value);
  let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/veritabani", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${baslikBb.value}", "aciklama": "${aciklamaBb.value}", "firma": "${firmaBb.value}", "tarih": "${date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()}", "saat": "${date.getHours().toString() + ":" + date.getMinutes().toString()}", "yer": "${yerBb.value}", "resim": "${resim}", "times": "${date.getTime().toString()}", "iletisim": "${epostay.innerText}"}`,
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
    body: `{"baslik": "${baslikBb.value}", "aciklama": "${aciklamaBb.value}", "firma": "${firmaBb.value}", "tarih": "${date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()}", "saat": "${date.getHours().toString() + ":" + date.getMinutes().toString()}", "yer": "${yerBb.value}", "resim": "${link}", "times": "${date.getTime().toString()}", "iletisim": "${epostay.innerText}"}`,
});
        }
    }
  window.location.reload();

}

document.querySelector("#resim").addEventListener("change", function(){
  const reader = new FileReader();
  
  reader.addEventListener("load", function(){
    resim = reader.result;
  });
  
  reader.readAsDataURL(this.files[0]);
});

let jsonVeri;
let posta = localStorage.getItem("sirketmail")
async function Load(){
  await fetch("https://turk-biyologlar-dernegi.glitch.me/kartlar")
            .then((response) => response.json())
            .then((json) => jsonVeri = json);
          
          
            let htmlCode =
    `
<table class="w3-table w3-bordered w3-border">
<tbody><tr>
<th >Deney</th>
<th >Yer</th>
<th >Zaman</th>
</tr>
            
  `;
          jsonVeri.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeri.aciklamalar.indexOf(singleElephantObjects)
            if(jsonVeri.iletisimler[index] != posta)
             {
               return;
             }
    htmlCode =
    htmlCode +
    `   
<tr><td>${jsonVeri.basliklar[index]}</td><td>asdasdasasdasdasdasd</td><td>${jsonVeri.tarihler[index]} - ${jsonVeri.saatler[index]}</td><td><a id="${index}" class="w3-btn btnsmall w3-red w3-round-large w3-right silici" style="margin: 4px;">Sil</a></td></tr>

  `;

            
});

 htmlCode = htmlCode + "</tbody></table> ";

  deneyler.innerHTML = htmlCode;
  
              let htmlCode2 =
    `
<table class="w3-table w3-bordered w3-border">
<tbody><tr>
<th >Deney</th>
<th >Yer</th>
<th >Zaman</th>
</tr>
            
  `;
          jsonVeri.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeri.aciklamalar.indexOf(singleElephantObjects)
            if(jsonVeri.iletisimler[index] != posta)
             {
               return;
             }
            if(jsonVeri.tsler[index] > Date.now())
						{
  						return;
						}

    htmlCode2 =
    htmlCode2 +
    `   
<tr><td>${jsonVeri.basliklar[index]}</td><td>asdasdasasdasdasdasd</td><td>${jsonVeri.tarihler[index]} - ${jsonVeri.saatler[index]}</td><td><a id="${index}" class="w3-btn btnsmall w3-red w3-round-large w3-right silici" style="margin: 4px;">Sil</a></td></tr>

  `;

            
});

 htmlCode2 = htmlCode2 + "</tbody></table> ";

  deneyler2.innerHTML = htmlCode2;
  
  var coll = document.getElementsByClassName("silici");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var indexx = this.id;
    silsil(indexx);
  });
}
}

Load();


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