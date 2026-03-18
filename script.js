// قائمة رسائل الاعتذار العشوائية
const sorryMessages = [
    "عذراً.. لقد سددت طريقك، أتأسف جداً.",
    "دقائق قليلة وسأعود.. شكراً لصبرك.",
    "أتأسف إذا ضايقتك وقفتي، اتصل بي فوراً.",
    "أعتذر عن الإزعاج، سأحرك السيارة الآن.",
    "في حال الوقوف الخاطئ، يرجى الاتصال بي.",
    "سأعود سريعاً.. شكراً لتفهمك."
];

window.login = function() {
    const p = document.getElementById("loginPhone").value;
    if(p.length < 10) {
        alert("يرجى إدخال رقم هاتف صحيح");
        return;
    }
    window.fullPhone = p;
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    updatePreview();
}

window.updatePreview = function() {
    const name = document.getElementById("nameInput").value || "صاحب السيارة";
    const insta = document.getElementById("instaUser").value;
    
    // إظهار الرقم بالكامل وضخماً (بدون باركود)
    document.getElementById("displayPhone").innerText = window.fullPhone;
    document.getElementById("displayName").innerText = name;
    
    // تحديث اليوزرات
    document.getElementById("instaLabel").innerText = insta ? "IG: " + insta : "";

    // اختيار رسالة اعتذار عشوائية جديدة عند كل تحديث
    const randomMessage = sorryMessages[Math.floor(Math.random() * sorryMessages.length)];
    document.getElementById("sorryMessage").innerText = randomMessage;
}

window.downloadCard = function() {
    const target = document.getElementById("captureTarget");
    html2canvas(target, { scale: 3 }).then(canvas => { // scale 3 لجودة عالية جداً
        const link = document.createElement('a');
        link.download = 'CarLink-Apology.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
