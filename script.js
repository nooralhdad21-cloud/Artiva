/* === ملاحظات المهندس نورالدين === */

// 1. وظيفة مزامنة البيانات (Live Update)
function syncData() {
    // جلب القيم من المدخلات
    const name = document.getElementById('inName').value || "صاحب السيارة";
    const phone = document.getElementById('inPhone').value || "07XXXXXXXXX";
    const insta = document.getElementById('inInsta').value;
    const msg = document.getElementById('inMsg').value || "أعتذر عن الوقوف الخاطئ";

    // وضع القيم في البطاقة
    document.getElementById('outName').innerText = name;
    document.getElementById('outPhone').innerText = phone;
    document.getElementById('outMsg').innerText = msg;
    document.getElementById('outInsta').innerText = insta ? "IG: @" + insta : "";
}

// 2. تغيير القوالب (Templates Switcher)
function setTemplate(style) {
    const card = document.getElementById('cardCanvas');
    // إزالة كل الكلاسات القديمة وإضافة الجديد
    card.className = 'card tpl-' + style;
}

// 3. حفظ كصورة بجودة عالية
function saveAsImage() {
    const card = document.getElementById('cardCanvas');
    html2canvas(card, {
        scale: 3, // تكبير الجودة 3 مرات للطباعة
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'CarLink-Design.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
