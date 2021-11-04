//subtotal






//***remove Butonu her buton icin ayri calisiyor */

var removeCarItemButtons=document.getElementsByClassName('btn-danger');
for(var i=0; i<removeCarItemButtons.length;i++){
    var button=removeCarItemButtons[i];
    button.addEventListener('click',function(event){
        var buttonClicked=event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    });
}

 function updateCartTotal(){
   let cartItemContainer=document.getElementsByClassName('cart-item')[0];
    // console.log(cartItemContainer);
   let cartRows= cartItemContainer.getElementsByClassName('cart-row');
//    console.log(cartRows);
  
         var total=0;
     for(var i=0; i < cartRows.length; i++){
         var cartRow=cartRows[i];
      
     let priceElement=cartRow.getElementsByClassName('cart-price')[0];

     
        let siblings = getSiblings(document.getElementsByClassName('btn-plus')[0]);
console.log(typeof siblings[1].value);


         var price= parseFloat(priceElement.innerText.replace('$',''));
         console.log(price);
         var quantity=parseFloat(siblings[1].value);
      console.log(quantity);
        
         console.log(price*quantity);
         total=total+(price*quantity);
        

     }
     document.getElementsByClassName('product-total')[0].innerHTML='$'+total;
     const subTotal=document.getElementsByClassName('subtotal-price')[0];
        subTotal.innerHTML='$'+total;
    const taxPrice=document.getElementsByClassName('tax')[0];
        taxPrice.innerHTML='$'+ (total*18)/100;
    const shipPrice=parseFloat(document.getElementsByClassName('shipping-price')[0].innerText.replace('$',''));
    const allPrice=document.getElementsByClassName('cart-total-price')[0];
allPrice.innerHTML=total+(total*18)/100+shipPrice;
    

}

let getSiblings = function (e) {
    // for collecting siblings
    let siblings = []; 
    // if no parent, return no sibling
    if(!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling  = e.parentNode.firstChild;
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

let siblings = getSiblings(document.getElementsByClassName('btn-plus')[0]);
// console.log(siblings[1].value);
function inc(){
    siblings[1].value=parseInt(siblings[1].value)+1;
      updateCartTotal();
  }


// siblingText = siblings.map(e => e.innerHTML);
// console.log(siblingText);



var addCarItemButtons=document.getElementsByClassName('btn-plus');
for(var i=0; i<addCarItemButtons.length;i++){
    var button=addCarItemButtons[i];
    button.addEventListener('click',function(event){
        var buttonClicked=event.target;
// let siblings = getSiblings(document.querySelector('.btn-plus'));

       if(buttonClicked){
        siblings[1].value=parseInt(siblings[1].value)+1;
        // console.log(siblings[1].value);
       }
        
        console.log('clicked');
    

        updateCartTotal();
    }
    
    );
}

var subCarItemButtons=document.getElementsByClassName('btn-minus');
for(var i=0; i<subCarItemButtons.length;i++){
    var button=subCarItemButtons[i];
    button.addEventListener('click',function(event){
        siblings[1].value=parseInt(siblings[1].value)-1;
       
        console.log('clicked');
      
        updateCartTotal();
    });
}
    
