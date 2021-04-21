var item_text = document.getElementsByClassName('item-txt');
var item_img = document.getElementsByClassName('item-img');
var works_btn = document.getElementsByClassName('works-btn');
item_img[0].style.display = "block"; 
for (let i=0;i<item_text.length;i++){
    item_text[i].addEventListener('click', function(e) {
        for (let j = 0; j < item_text.length; j++) {
            item_img[j].style.display = "none";  
        }
        for (let k = 0; k < works_btn.length; k++) { 
            works_btn[k].className = works_btn[k].className.replace(" item-active", "");
        }
        item_img[i].style.display = "block"; 
        works_btn[i].className += " item-active";
    });
}