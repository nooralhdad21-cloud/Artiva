// تثبيت الدوال في Window لضمان عملها على GitHub Pages
window.login = function() {
    const p = document.getElementById("loginPhone").value;
    if(p.length < 10) {
        alert("يرجى إدخال رقم هاتف صحيح (10 أرقام)");
        return;
    }
    window.fullPhone = p; // حفظ الرقم المدخل
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    updatePreview();
}

window.updatePreview = function() {
    const name = document.getElementById("nameInput").value || "نورالدين صباح";
    const insta = document.getElementById("instaUser").value;
    
    // تحديث الاسم
    document.getElementById("displayName").innerText = name;
    
    // تحديث الرقم ليظهر بالكامل كما هو
    document.getElementById("displayPhone").innerText = window.fullPhone;
    
    // تحديث اليوزر (انستجرام)
    document.getElementById("instaLabel").innerText = insta ? "Instagram: @" + insta : "";
}

window.downloadCard = function() {
    const target = document.getElementById("captureTarget");
    html2canvas(target, { scale: 3 }).then(canvas => { // scale 3 لجودة عالية
        const link = document.createElement('a');
        link.download = 'CarLink-Emergency-Card.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
