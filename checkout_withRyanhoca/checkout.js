const taxRate=0.18;
const shippingPrice=15.0; //bu degerler herryerde ayni kullanilacagi icin const ile tanimladik


// sayfamiz yukledeiginde bazi islemler gerceklesmesi icin
window.onload=()=>{
    //gerceginde veri tabaninda olan textrate degisir. setting confifuration olacak bu sayfalarin veri tabanuinada guncel veriyi ceker burada onun bir ornegi sayilir.
    window.localStorage.setItem("taxRate",taxRate);// string olarak tutuluor veriler
    localStorage.setItem("shippingPrice",shippingPrice);//yukarda tanimladigimi burda almasini istedimdherseyde window var aslinda ama yazmaya gerek lkalmiyor o porgramin atasiyazilmasda aligilar.
//bu kismi cosolun application kisminda verileri nasil tutuldugunu gorebilirsin. section storage da live server i true olarak calistiran ksiimdir. veri de tutmak istedigini oraya da tanitmali.browseri kapatinca section storage da veriler silinir. local storage da silinmez
window.sessionStorage.setItem("taxRate",taxRate);
sessionStorage.setItem("shippingPrice",shippingPrice);//passwordler burada sifreli olarak tutulur.//**TOKEN ALMA API YE ISTEK GONDERME DE AYNI MANTIK, COOKIES ETC 

calculateCartTotal();


};

//****** ARTTIRMA -AZALLTMA BUTONLARI */
    // ortak kullnilack butonlara product ile ulasmali. dinamik olarak product icindeki elemnetlere ulasiyoruz
    let quantityControllerDivs=document.getElementsByClassName("quantity-controller");// html collectiopn olusturduk. for each kullanmak icin arraye ihtiyacimiz var
[...quantityControllerDivs].forEach((quantityControllerDiv) => {              // array olusturma isllemi for each ile her bir productin quantitiy sine ulasmis olacagiz//
      let quantityP=quantityControllerDiv.querySelector("#product-quantity");
    
    quantityControllerDiv.firstElementChild.addEventListener("click",()=>{
        // if(quantityP.innerText!="1"){// quantity en son 1 olma sarti loyduk
        //     quantityP.innerText=parseInt(quantityP.innerText) - 1;}                                                                //minus buton ilk element oldugu icinfirstelementchild kullandik.
                                                                        
        if (quantityP.innerText=="0"){ // 1 sarti olmasa 0 olunca product listeden kalkacAk
            alert("product will be removed!");
quantityControllerDiv.parentElement.parentElement.remove();
        }

calculateProductTotal(quantityP);// degisen deger parametre olarak gonderilmeli
    });


    quantityControllerDiv.lastElementChild.addEventListener("click",()=>{//plus butona ulasir
        console.log(quantityP);
        quantityP.innerText=parseInt(quantityP.innerText) + 1;
        calculateProductTotal(quantityP);
    });
   
}); 

//once productlari kendi icinde guncelleme yapiyoruz,sonra da sepetin pricelarini guncelleyecegiz. 

const calculateProductTotal=(quantityP)=>{ // bu fonksiyonu herbir eventte guncellenmeli o yuzden butun eventlerin altinda cagiriyous 
    let productInfoDiv=quantityP.parentElement.parentElement;
    const productPrice=parseFloat(productInfoDiv.querySelector('strong').innerText);
    console.log(productPrice);
    console.log(quantityP.innerText);
    let productTotalPrice=productPrice*parseInt(quantityP.innerText);    //parse int noktali gelme ihtimali olamadigi icin kullanir
    let productTotalDiv=productInfoDiv.querySelector(".product-line-price");  //productifodiv ile en dis diviinden elemete ulstik
    productTotalDiv.innerText=productTotalPrice.toFixed(2);

    calculateCartTotal();
}


const calculateCartTotal=()=>{
    //nodeList.forEach or array.forEach
    let productTotalPrices=document.querySelectorAll(".products-line-price");

    // HTMl coleection[...].forEach
    // let productTotalPrices=document.getElementsByClassName("products-line-price");

let subtotal=0;
    productTotalPrices.forEach((productPrice)=>{
        subtotal+=parseFloat(productPrice.innerText);        
    });
    // let taxPrice=subtotal*taxRate;
    let taxPrice=subtotal*(localStorage.getItem("taxRate"));
    let  shipping=(subtotal> 0 ? shippingPrice :  0); //if sartinin kisa yolu ? ise : degilse = if
    let  cartTotal=subtotal+taxPrice+shipping;

document.querySelector("#cart-subtotal p:nth-child(2)").innerText=subtotal.toFixed(2);//css manitgiyla 2. taga ulastik bunu yappmak icin queryselctor kullanmali
// console.log(subtotal);
document.querySelector("#cart-tax p:nth-child(2)").innerText=taxPrice.toFixed(2);
document.querySelector("#cart-shipping p:nth-child(2)").innerText=shipping.toFixed(2);
document.getElementById("cart-total").lastElementChild.innerText=cartTotal.toFixed(2); //dom mantigiyla elemntChild kullanildi bunun icin degetelement by id kullaanilmasi daha uygun 
};

document.querySelectorAll(".remove-product").forEach((removeButton)=>{
    removeButton.addEventListener("click",()=>{
        removeProduct(removeButton);
    });
    const removeProduct=(removeButton)=>{
        let productDiv=removeButton.parentElement.parentElement.parentElement;
        productDiv.remove();
        calculateCartTotal();
    };
}
);