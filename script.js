// وظيفة المشاهدة الحية
function updateLive() {
    const nameInput = document.getElementById('inName').value;
    const phoneInput = document.getElementById('inPhone').value;
    const msgInput = document.getElementById('inMsg').value;

    if(nameInput) document.getElementById('outName').innerText = nameInput;
    if(phoneInput) document.getElementById('outPhone').innerText = phoneInput;
    if(msgInput) document.getElementById('outMsg').innerText = msgInput;
}

// وظيفة تبديل القوالب (الأزرار)
function setTpl(style, element) {
    const card = document.getElementById('cardBox');
    card.className = 'main-card tpl-' + style;

    // تحديث شكل الزر النشط
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

// وظيفة حفظ الصورة
function takeShot() {
    const card = document.getElementById('cardBox');
    const btn = document.querySelector('.btn-save');
    btn.innerText = "جاري الحفظ...";

    html2canvas(card, {
        scale: 3,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `CarLink-Pro.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        btn.innerText = "💾 حفظ الصورة";
    });
}
