/* === designer.js | محرك منصة CarLink Designer === */

// دوال التحكم في النماذج (القوالب)
function changeTemplate(tplName) {
    const card = document.getElementById("captureTarget");
    // إزالة القالب الحالي وإضافة الجديد
    card.className = "card-premium tpl-" + tplName;
}

// دالة التحديث المباشر للمعاينة (المحاكاة)
function updatePreview() {
    const name = document.getElementById("nameInput").value || "صاحب السيارة";
    const phone = document.getElementById("phoneInput").value || "07XXXXXXXXX";
    const insta = document.getElementById("instaInput").value;

    document.getElementById("displayName").innerText = name;
    document.getElementById("displayPhone").innerText = phone;
    document.getElementById("instaLabel").innerText = insta ? "IG: @" + insta : "";
}

// دالة حفظ التصميم النهائي كصورة عالية الدقة
function downloadCard() {
    const target = document.getElementById("captureTarget");
    // scale 3 لضمان جودة عالية للطباعة
    html2canvas(target, { scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'CarLink-Design.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
