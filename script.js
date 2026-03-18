function updateLive() {
    const name = document.getElementById('inName').value || "صاحب السيارة";
    const phone = document.getElementById('inPhone').value || "07XXXXXXXXX";
    const msg = document.getElementById('inMsg').value || "أعتذر عن الوقوف الخاطئ، يرجى الاتصال بي";

    document.getElementById('outName').innerText = name;
    document.getElementById('outPhone').innerText = phone;
    document.getElementById('outMsg').innerText = msg;
}

function setTpl(style) {
    const card = document.getElementById('cardBox');
    const btns = document.querySelectorAll('.tab-btn');
    card.className = 'main-card tpl-' + style;
    btns.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

function takeShot() {
    const card = document.getElementById('cardBox');
    const btn = document.querySelector('.btn-save');
    btn.innerText = "جاري الحفظ...";

    html2canvas(card, {
        scale: 3, 
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `CarLink-Pro.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        btn.innerText = "💾 حفظ كصورة";
    });
}
