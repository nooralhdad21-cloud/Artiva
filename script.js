import { useState, useEffect, useRef } from "react";

// ============================================================
// 🎨 الألوان والثيم الثابت (C)
// ============================================================
const C = {
  bg:       "#07060F",
  surface:  "#100F1E",
  surface2: "#16152A",
  border:   "rgba(255,255,255,0.07)",
  accent:   "#7C5CFC",
  accent2:  "#E040FB",
  accent3:  "#00D4FF",
  gold:     "#FFD166",
  text:     "#F0EEF8",
  muted:    "#8B88A8",
};

// ============================================================
// 🏗️ المكونات الصغيرة (UI Components)
// ============================================================

const Btn = ({ children, variant = "primary", ...props }) => {
  const styles = {
    primary: { background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`, color: "#fff" },
    ghost: { background: "transparent", border: `1px solid ${C.border}`, color: C.text },
    admin: { background: `linear-gradient(135deg, ${C.gold}, #ff9800)`, color: "#000", fontWeight: "bold" }
  };
  return (
    <button style={{
      padding: "10px 22px", borderRadius: "12px", border: "none", cursor: "pointer",
      fontSize: "0.95rem", transition: "all 0.3s", ...styles[variant]
    }} {...props}>
      {children}
    </button>
  );
};

// ============================================================
// 🏗️ المكوّن الرئيسي — يجمع كل شيء معاً
// ============================================================
export default function App() {
  // 1. حالات النظام
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // 2. إدارة الحالة والتخزين (Cache Logic)
  useEffect(() => {
    // التحقق من الكاش عند فتح الموقع
    const savedStatus = localStorage.getItem("artiva_admin_auth");
    if (savedStatus === "true") setIsAdmin(true);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. دالة تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin123") {
      setIsAdmin(true);
      setShowLogin(false);
      localStorage.setItem("artiva_admin_auth", "true");
    } else {
      alert("البيانات غير صحيحة!");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("artiva_admin_auth");
  };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "sans-serif" }}>
      <style>{globalStyles}</style>

      {/* --- Navbar --- */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 1000,
        padding: scrolled ? "15px 50px" : "25px 50px",
        background: scrolled ? "rgba(7, 6, 15, 0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(15px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        display: "flex", justifyContent: "space-between", alignItems: "center", transition: "0.4s"
      }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", letterSpacing: "-1px" }}>Artiva.</div>
        
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {isAdmin ? (
            <>
              <span style={{ color: C.gold, fontSize: "0.8rem" }}>⚡ وضع المدير مفعل</span>
              <Btn variant="admin" onClick={() => alert("سيتم الربط مع Google Drive قريباً")}>حفظ سحابي</Btn>
              <button onClick={handleLogout} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer" }}>خروج</button>
            </>
          ) : (
            <Btn variant="ghost" onClick={() => setShowLogin(true)}>دخول المدير</Btn>
          )}
          <Btn>ابدأ التصميم مجاناً</Btn>
        </div>
      </nav>

      {/* --- Login Modal --- */}
      {showLogin && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2 style={{ marginBottom: "20px" }}>تسجيل دخول الإدارة</h2>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input 
                type="text" placeholder="اسم المستخدم" 
                style={inputStyle} onChange={e => setUser(e.target.value)} 
              />
              <input 
                type="password" placeholder="كلمة المرور" 
                style={inputStyle} onChange={e => setPass(e.target.value)} 
              />
              <Btn variant="primary" type="submit">تفعيل ميزات البرو</Btn>
              <button type="button" onClick={() => setShowLogin(false)} style={{ color: C.muted, background: "none", border: "none", cursor: "pointer" }}>إلغاء</button>
            </form>
          </div>
        </div>
      )}

      {/* --- Hero Section --- */}
      <header style={{ paddingTop: "180px", textAlign: "center", paddingBottom: "100px" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: "800", marginBottom: "20px" }}>
          صمم بمستوى <span style={{ color: C.accent }}>المحترفين</span> <br /> مجاناً بالكامل
        </h1>
        <p style={{ color: C.muted, maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.6" }}>
          استخدم أدوات الذكاء الاصطناعي، مسح الخلفية، والتصدير بجودة عالية بدون أي اشتراكات مدفوعة.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Btn style={{ padding: "15px 40px", fontSize: "1.1rem" }}>ابدأ الآن</Btn>
          <Btn variant="ghost" style={{ padding: "15px 40px", fontSize: "1.1rem" }}>مشاهدة النماذج</Btn>
        </div>
      </header>

    </div>
  );
}

// ============================================================
// 🖌️ Styles
// ============================================================

const modalOverlay = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center',
  alignItems: 'center', zIndex: 2000, backdropFilter: 'blur(5px)'
};

const modalContent = {
  background: C.surface, padding: '50px', borderRadius: '24px',
  border: `1px solid ${C.border}`, width: '100%', maxWidth: '400px', textAlign: 'center'
};

const inputStyle = {
  background: C.bg, border: `1px solid ${C.border}`, padding: '15px',
  borderRadius: '12px', color: '#fff', outline: 'none', fontSize: '1rem'
};

const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { overflow-x: hidden; }
  button:hover { opacity: 0.9; transform: translateY(-2px); }
`;
