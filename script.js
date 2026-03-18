// 1. مزامنة البيانات فور الكتابة (المعاينة الحية)
function syncData() {
    const name = document.getElementById('inName').value || "صاحب السيارة";
    const phone = document.getElementById('inPhone').value || "07XXXXXXXXX";
    const msg = document.getElementById('inMsg').value || "أعتذر عن الوقوف الخاطئ";

    document.getElementById('outName').innerText = name;
    document.getElementById('outPhone').innerText = phone;
    document.getElementById('outMsg').innerText = msg;
}

// 2. تغيير القوالب
function setTemplate(style) {
    const card = document.getElementById('cardCanvas');
    // إزالة كل كلاسات القوالب السابقة
    card.classList.remove('tpl-gold', 'tpl-red', 'tpl-blue');
    // إضافة القالب الجديد
    card.classList.add('tpl-' + style);
}

// 3. حفظ كصورة (حل مشكلة عدم الحفظ)
function saveAsImage() {
    const card = document.getElementById('cardCanvas');
    
    // التأكد من أن المكتبة محملة
    if (typeof html2canvas === 'undefined') {
        alert("المكتبة قيد التحميل، يرجى الانتظار ثانية.");
        return;
    }

    html2canvas(card, {
        scale: 3, // دقة عالية جداً
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'CarLink-Design.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
