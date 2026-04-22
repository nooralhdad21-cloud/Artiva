// ============================================================
// 📦 استيراد الأدوات من مكتبة React
// ------------------------------------------------------------
// useState  → يخزّن قيمة تتغيّر (مثل: هل الـ navbar تحرّك؟)
// useEffect → ينفّذ كود بعد ما الصفحة تُرسم
// useRef    → يمسك عنصر HTML مباشرة بدون إعادة رسم
// ------------------------------------------------------------
import { useState, useEffect, useRef } from "react";

// ============================================================
// 🎨 الألوان الثابتة — بدل ما نكررها في كل مكان نضعها هنا
// ============================================================
const C = {
  bg:       "#07060F",   // خلفية الصفحة الرئيسية
  surface:  "#100F1E",   // خلفية البطاقات
  surface2: "#16152A",   // خلفية أعمق للبطاقات
  border:   "rgba(255,255,255,0.07)",
  accent:   "#7C5CFC",   // البنفسجي الرئيسي
  accent2:  "#E040FB",   // الوردي
  accent3:  "#00D4FF",   // الأزرق الفاتح
  gold:     "#FFD166",   // الذهبي
  text:     "#F0EEF8",   // لون النص
  muted:    "#8B88A8",   // رمادي للنصوص الثانوية
};

// ============================================================
// 🖌️ ثيم الـ CSS المضمّن (Global Styles)
// ------------------------------------------------------------
// نضع هذا في <style> داخل الصفحة عشان يطبق على الكل
// ============================================================
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Tajawal:wght@200;400;500;700;800&display=swap');

  /* إعادة تعيين الهوامش لكل العناصر */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Cairo', sans-serif;
    background: ${C.bg};
    color: ${C.text};
    overflow-x: hidden; /* يخفي أي محتوى يخرج من الجانبين */
    direction: rtl;      /* اتجاه النص من اليمين لليسار */
  }

  /* شريط التمرير المخصص */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.accent}; border-radius: 3px; }

  /* ─── Animation: طفو للكرات الضوئية ─── */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-30px); }
  }

  /* ─── Animation: نبض للنقطة ─── */
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.4); }
  }

  /* ─── Animation: ظهور من الأسفل ─── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── Animation: ظهور من الأعلى ─── */
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── Animation: وميض المؤشر ─── */
  @keyframes blink {
    0%, 100% { border-color: ${C.accent}; }
    50%       { border-color: transparent; }
  }

  /* ─── Animation: تمرير الجاليري ─── */
  @keyframes scrollLeft {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ─── كلاسات الظهور عند التمرير ─── */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-d1 { transition-delay: 0.1s; }
  .reveal-d2 { transition-delay: 0.2s; }
  .reveal-d3 { transition-delay: 0.3s; }
  .reveal-d4 { transition-delay: 0.4s; }

  /* ─── بطاقات المميزات ─── */
  .feat-card {
    background: ${C.surface2};
    border: 1px solid ${C.border};
    border-radius: 20px;
    padding: 36px 32px;
    transition: all 0.4s;
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  .feat-card:hover {
    border-color: rgba(124,92,252,0.4);
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    background: rgba(124,92,252,0.04);
  }

  /* ─── بطاقات الشهادات ─── */
  .testi-card {
    background: ${C.surface2};
    border: 1px solid ${C.border};
    border-radius: 20px;
    padding: 32px;
    transition: all 0.3s;
  }
  .testi-card:hover {
    border-color: rgba(124,92,252,0.3);
    transform: translateY(-4px);
  }

  /* ─── أدوات AI ─── */
  .ai-tool {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 24px;
    border-radius: 18px;
    border: 1px solid ${C.border};
    background: ${C.surface2};
    transition: all 0.3s;
    margin-bottom: 16px;
  }
  .ai-tool:hover {
    border-color: rgba(124,92,252,0.35);
    transform: translateX(-6px);
  }

  /* ─── أزرار التسعير ─── */
  .price-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    font-family: 'Cairo', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  .price-btn:hover { transform: translateY(-2px); }

  /* ─── جدول المقارنة ─── */
  table { width: 100%; border-collapse: collapse; }
  thead { background: rgba(124,92,252,0.1); }
  th {
    padding: 20px 28px;
    text-align: right;
    font-size: 0.95rem;
    font-weight: 700;
    color: ${C.text};
    border-bottom: 1px solid ${C.border};
    font-family: 'Cairo', sans-serif;
  }
  th:not(:first-child) { text-align: center; }
  td {
    padding: 18px 28px;
    border-bottom: 1px solid ${C.border};
    font-size: 0.9rem;
    color: ${C.muted};
    font-family: 'Cairo', sans-serif;
  }
  td:not(:first-child) { text-align: center; font-weight: 600; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(124,92,252,0.04); }

  /* ─── معرض القوالب ─── */
  .gallery-track {
    display: flex;
    gap: 20px;
    width: max-content;
    animation: scrollLeft 30s linear infinite;
  }
  .gallery-track:hover { animation-play-state: paused; }

  .gallery-card {
    width: 200px;
    height: 260px;
    border-radius: 18px;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
    border: 1px solid ${C.border};
    transition: transform 0.3s;
    cursor: pointer;
  }
  .gallery-card:hover { transform: scale(1.05) rotate(1deg); }

  /* ─── روابط الـ nav ─── */
  .nav-link {
    color: ${C.muted};
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 600;
    transition: color 0.3s;
    position: relative;
    cursor: pointer;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    right: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #7C5CFC, #E040FB);
    transition: width 0.3s;
    border-radius: 2px;
  }
  .nav-link:hover { color: ${C.text}; }
  .nav-link:hover::after { width: 100%; }

  /* ─── روابط الفوتر ─── */
  .footer-link {
    text-decoration: none;
    color: ${C.muted};
    font-size: 0.875rem;
    transition: color 0.3s;
  }
  .footer-link:hover { color: ${C.accent}; }

  /* ─── بطاقات الأدوات ─── */
  .tool-card {
    border-radius: 18px;
    padding: 32px 28px;
    border: 1px solid ${C.border};
    background: ${C.surface2};
    transition: all 0.35s;
    position: relative;
    overflow: hidden;
  }
  .tool-card:hover {
    transform: translateY(-6px);
    border-color: rgba(124,92,252,0.3);
  }
`;

// ============================================================
// 🧩 مكوّن صغير: وسم القسم (Tag)
// ------------------------------------------------------------
// هذا "Component" صغير يأخذ نصاً ويعرضه كـ badge
// children = النص الذي بين الـ tags مثل <SectionTag>نص</SectionTag>
// ============================================================
const SectionTag = ({ children }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "5px 16px", borderRadius: 50,
    border: "1px solid rgba(124,92,252,0.3)",
    background: "rgba(124,92,252,0.06)",
    fontSize: "0.8rem", fontWeight: 700,
    color: C.accent, letterSpacing: 1,
    marginBottom: 20,
  }}>
    {children}
  </div>
);

// ============================================================
// 🧩 مكوّن: عنوان القسم
// ============================================================
const SectionTitle = ({ children, center = false }) => (
  <h2 style={{
    fontFamily: "'Tajawal', sans-serif",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 900, lineHeight: 1.2,
    marginBottom: 16,
    textAlign: center ? "center" : "right",
  }}>
    {children}
  </h2>
);

// ============================================================
// 🧩 مكوّن: زر رئيسي
// ------------------------------------------------------------
// variant = "primary" أو "outline" أو "ghost"
// ============================================================
const Btn = ({ children, variant = "primary", size = "md", onClick }) => {
  // نختار الستايل حسب النوع
  const styles = {
    primary: {
      background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
      border: "none", color: "#fff",
      boxShadow: "0 8px 40px rgba(124,92,252,0.4)",
    },
    outline: {
      background: "transparent",
      border: `1px solid ${C.border}`,
      color: C.text,
    },
    ghost: {
      background: "transparent",
      border: `1px solid ${C.border}`,
      color: C.text,
    },
  };

  const sizes = {
    sm: { padding: "9px 22px", fontSize: "0.9rem" },
    md: { padding: "16px 36px", fontSize: "1.05rem" },
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        ...sizes[size],
        borderRadius: 14,
        fontFamily: "'Cairo', sans-serif",
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.3s",
      }}
      // عند التحويم نضيف تأثير رفع بسيط
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      {children}
    </button>
  );
};

// ============================================================
// 🧩 مكوّن: Hook مخصص لمراقبة الظهور عند التمرير
// ------------------------------------------------------------
// "Hook" = دالة خاصة تبدأ بـ "use" وتستخدم ميزات React
// هذا الـ hook يراقب إذا العنصر ظهر في الشاشة
// ============================================================
const useReveal = () => {
  // useEffect ينفّذ الكود بعد ما React يرسم الصفحة
  useEffect(() => {
    // نأخذ كل العناصر التي لها كلاس "reveal"
    const elements = document.querySelectorAll(".reveal");

    // IntersectionObserver = مراقب يخبرك متى العنصر يدخل الشاشة
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // entry.isIntersecting = true لما العنصر يظهر على الشاشة
          if (entry.isIntersecting) {
            // نضيف كلاس "visible" عشان يظهر
            entry.target.classList.add("visible");
            // نوقف المراقبة بعد الظهور (ما نحتاجها مرة ثانية)
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 } // يظهر لما 12% من العنصر يكون مرئياً
    );

    // نبدأ مراقبة كل عنصر
    elements.forEach((el) => observer.observe(el));

    // دالة التنظيف: تُنفَّذ لما الـ component يُحذف من الصفحة
    return () => observer.disconnect();
  }, []); // [] = تنفّذ مرة واحدة فقط عند أول رسم
};

// ============================================================
// 🔝 مكوّن: شريط التنقل (Navbar)
// ============================================================
const Navbar = () => {
  // useState لتخزين حالة: هل تمرّر المستخدم للأسفل؟
  // scrolled = القيمة الحالية (false في البداية)
  // setScrolled = الدالة التي تغيّر القيمة
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // دالة تتحقق من موقع التمرير
    const handleScroll = () => {
      // إذا تجاوز 40 بكسل → scrolled = true
      setScrolled(window.scrollY > 40);
    };

    // نضيف مستمع لحدث التمرير
    window.addEventListener("scroll", handleScroll);

    // تنظيف: نحذف المستمع لما الـ component يُحذف
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // [] = يُنفَّذ مرة واحدة

  const scrollTo = (id) => {
    // نأخذ العنصر بالـ ID ونتمرر إليه بسلاسة
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, width: "100%", zIndex: 1000,
      padding: "18px 5%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(7,6,15,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${C.border}`,
      // نغيّر الظل حسب حالة التمرير
      boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
      transition: "all 0.3s",
    }}>
      {/* الشعار */}
      <div style={{
        fontFamily: "'Tajawal', sans-serif",
        fontWeight: 800, fontSize: "1.8rem",
        background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        letterSpacing: -1,
      }}>
        Artiva<span style={{ WebkitTextFillColor: C.gold }}>.</span>
      </div>

      {/* روابط التنقل */}
      <ul style={{ display: "flex", gap: 32, listStyle: "none" }}>
        {[
          { label: "المميزات",         id: "features" },
          { label: "الذكاء الاصطناعي", id: "ai"       },
          { label: "القوالب",           id: "gallery"  },
          { label: "الأسعار",           id: "pricing"  },
        ].map((item) => (
          // نستخدم .map() لإنشاء قائمة عناصر بدلاً من تكرار الكود
          <li key={item.id}>
            <span className="nav-link" onClick={() => scrollTo(item.id)}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      {/* الأزرار */}
      <div style={{ display: "flex", gap: 12 }}>
        <Btn variant="ghost" size="sm">تسجيل الدخول</Btn>
        <Btn variant="primary" size="sm">ابدأ مجاناً</Btn>
      </div>
    </nav>
  );
};

// ============================================================
// 🏠 مكوّن: قسم البطل (Hero)
// ============================================================
const Hero = () => {
  // حالة للعداد — نبدأ بـ 0 ونحرّكه لأعلى
  const [counts, setCounts] = useState({ templates: 0, users: 0, countries: 0 });

  useEffect(() => {
    // دالة الرسوم المتحركة للعداد
    const animateNum = (key, target, duration = 1800) => {
      let start = null;

      // requestAnimationFrame = يطلب من المتصفح رسم الإطار التالي
      // هذا يجعل الحركة ناعمة (60 إطار/ثانية)
      const step = (timestamp) => {
        if (!start) start = timestamp;

        // نحسب نسبة التقدم من 0 إلى 1
        const progress = Math.min((timestamp - start) / duration, 1);

        // دالة easing: تبدأ سريعة ثم تبطئ عند النهاية
        const ease = 1 - Math.pow(1 - progress, 3);

        // نحدّث الحالة بالقيمة الحالية
        setCounts((prev) => ({
          ...prev,                           // نحتفظ بباقي القيم كما هي
          [key]: Math.floor(ease * target),  // نحدّث هذا المفتاح فقط
        }));

        // إذا لم ننتهِ، نطلب إطاراً آخر
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    // تأخير 500ms ثم نبدأ العدادات
    const timer = setTimeout(() => {
      animateNum("templates", 800);
      animateNum("users", 50);
      animateNum("countries", 180);
    }, 500);

    // تنظيف: نلغي المؤقت لو الـ component اتحذف قبل ما ينتهي
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "120px 5% 80px",
      textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* الكرات الضوئية الخلفية */}
      {[
        { w: 600, h: 600, color: "rgba(124,92,252,0.18)", top: -100, right: -100, duration: "8s" },
        { w: 400, h: 400, color: "rgba(224,64,251,0.12)", bottom: -80, left: -80,   duration: "10s", reverse: true },
        { w: 300, h: 300, color: "rgba(0,212,255,0.10)",  top: "40%", left: "40%",  duration: "7s",  delay: "2s" },
      ].map((orb, i) => (
        <div key={i} style={{
          position: "absolute",
          width: orb.w, height: orb.h,
          borderRadius: "50%",
          background: orb.color,
          filter: "blur(80px)",
          // نستخدم spread لإضافة الخصائص المتغيرة (top/right/bottom/left)
          ...(orb.top    !== undefined && { top:    orb.top    }),
          ...(orb.right  !== undefined && { right:  orb.right  }),
          ...(orb.bottom !== undefined && { bottom: orb.bottom }),
          ...(orb.left   !== undefined && { left:   orb.left   }),
          animation: `float ${orb.duration} ease-in-out infinite ${orb.delay || ""} ${orb.reverse ? "reverse" : ""}`,
          pointerEvents: "none", // لا يتأثر بالنقر
        }} />
      ))}

      {/* Badge الإعلان */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 18px", borderRadius: 50,
        border: "1px solid rgba(124,92,252,0.4)",
        background: "rgba(124,92,252,0.08)",
        fontSize: "0.85rem", fontWeight: 600, color: C.accent,
        marginBottom: 28,
        animation: "fadeDown 0.8s ease forwards",
      }}>
        {/* النقطة النابضة */}
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: C.accent,
          animation: "pulse 2s infinite",
        }} />
        جديد: Artiva AI 2.0 متوفر الآن
      </div>

      {/* العنوان الرئيسي */}
      <h1 style={{
        fontFamily: "'Tajawal', sans-serif",
        fontSize: "clamp(2.8rem, 7vw, 5.5rem)", // clamp = حجم مرن بين حد أدنى وأعلى
        fontWeight: 900, lineHeight: 1.1,
        marginBottom: 24,
        animation: "fadeUp 0.9s 0.2s ease both",
      }}>
        صمّم بذكاء،{" "}
        <span style={{
          display: "block",
          background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          أبهر الجميع.
        </span>
      </h1>

      <p style={{
        fontSize: "clamp(1rem, 2vw, 1.25rem)",
        color: C.muted, maxWidth: 600,
        marginBottom: 40,
        animation: "fadeUp 0.9s 0.4s ease both",
      }}>
        منصة التصميم الإبداعي الأكثر ذكاءً — من الصور إلى الفيديو إلى المواقع، كل شيء في مكان واحد.
      </p>

      {/* أزرار الـ CTA */}
      <div style={{
        display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
        animation: "fadeUp 0.9s 0.6s ease both",
      }}>
        <Btn variant="primary">🚀 ابدأ التصميم مجاناً</Btn>
        <Btn variant="outline">🎬 شاهد كيف يعمل</Btn>
      </div>

      {/* الإحصائيات */}
      <div style={{
        display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap",
        marginTop: 72,
        animation: "fadeUp 0.9s 0.8s ease both",
      }}>
        {/* نعرض الأعداد المتحركة */}
        {[
          { num: `${counts.templates}K+`, label: "قالب جاهز"       },
          { num: `${counts.users}M+`,     label: "مستخدم نشط"      },
          { num: `${counts.countries}+`,  label: "دولة حول العالم"  },
          { num: "4.9★",                  label: "تقييم المستخدمين" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: "2.4rem", fontWeight: 900,
              background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {stat.num}
            </div>
            <div style={{ fontSize: "0.85rem", color: C.muted, fontWeight: 600, marginTop: 2 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================================
// 🎯 مكوّن: قسم المميزات
// ============================================================
const Features = () => {
  // بيانات البطاقات — نضعها في array بدلاً من تكرار الكود
  const cards = [
    { icon: "🎨", color: "rgba(124,92,252,0.15)", title: "محرر سحب وإفلات",    desc: "واجهة بسيطة تمكّنك من تصميم أي شيء دون خبرة تقنية." },
    { icon: "🎬", color: "rgba(0,212,255,0.15)",   title: "محرر الفيديو",        desc: "أنتج فيديوهات احترافية لـ TikTok وYouTube مع جدولة تلقائية." },
    { icon: "📄", color: "rgba(255,209,102,0.15)", title: "Artiva Docs",          desc: "مستندات بصرية جذابة تتحول إلى عرض تقديمي بضغطة زر." },
    { icon: "🖼️", color: "rgba(224,64,251,0.15)", title: "السبورات البيضاء",     desc: "تعاون وعصف ذهني في الوقت الحقيقي مع فريقك." },
    { icon: "🌐", color: "rgba(74,222,128,0.15)",  title: "مواقع الويب الفورية", desc: "صمّم وانشر موقعك خلال دقائق — لا حاجة لمبرمج." },
    { icon: "🖨️", color: "rgba(255,107,53,0.15)",  title: "Artiva Print",         desc: "اطبع تصاميمك (تيشرتات، بطاقات، لوحات) وتوصيل لبابك." },
  ];

  return (
    <section id="features" style={{ padding: "100px 5%", background: C.surface }}>
      {/* رأس القسم */}
      <div style={{ textAlign: "center" }}>
        <div className="reveal"><SectionTag>✦ الأدوات الإبداعية</SectionTag></div>
        <div className="reveal reveal-d1">
          <SectionTitle center>
            كل ما تحتاجه{" "}
            <em style={{
              fontStyle: "normal",
              background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              في مكان واحد
            </em>
          </SectionTitle>
        </div>
        <p className="reveal reveal-d2" style={{
          fontSize: "1.05rem", color: C.muted,
          maxWidth: 560, margin: "0 auto",
        }}>
          مجموعة متكاملة من أدوات التصميم — بسيطة للمبتدئين، قوية للمحترفين.
        </p>
      </div>

      {/* شبكة البطاقات */}
      <div style={{
        display: "grid",
        // auto-fit = يملأ الصفوف تلقائياً، minmax = الحد الأدنى 290px
        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        gap: 24, marginTop: 60,
      }}>
        {cards.map((card, i) => (
          // i % 3 يعطينا 0,1,2,0,1,2 — نستخدمه للتأخير
          <div key={i} className={`feat-card reveal reveal-d${(i % 3) + 1}`}>
            {/* أيقونة البطاقة */}
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: card.color, fontSize: "1.6rem", marginBottom: 20,
            }}>
              {card.icon}
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 10 }}>
              {card.title}
            </h3>
            <p style={{ fontSize: "0.92rem", color: C.muted, lineHeight: 1.8 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================================
// 🤖 مكوّن: قسم الذكاء الاصطناعي
// ============================================================
const AISection = () => {
  // حالة لتتبع نص الـ prompt الذي يظهر في الشاشة
  const [typedText, setTypedText] = useState("");

  // النص الكامل الذي سيُكتب تدريجياً
  const fullText = "صمّم بوستر لمقهى عصري بألوان داكنة ولمسة عربية...";

  useEffect(() => {
    let index = 0; // موقع الحرف الحالي

    // setInterval = ينفّذ كود كل X milliseconds
    const interval = setInterval(() => {
      if (index < fullText.length) {
        // نضيف حرفاً واحداً في كل مرة
        // slice(0, index + 1) = نأخذ النص من البداية حتى index
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        // وصلنا للنهاية → نوقف الـ interval
        clearInterval(interval);
      }
    }, 60); // كل 60ms يُضاف حرف

    return () => clearInterval(interval); // تنظيف
  }, []);

  const aiTools = [
    { icon: "✨", color: "rgba(124,92,252,0.2)", title: "Magic Design",        desc: "ارفع صورة أو نصاً، ويولّد AI تصاميم كاملة فوراً." },
    { icon: "🎨", color: "rgba(0,212,255,0.2)",  title: "Dream Lab",           desc: "اكتب وصفاً ويرسم AI صورة احترافية من الصفر." },
    { icon: "✍️", color: "rgba(255,209,102,0.2)", title: "Magic Write",         desc: "مساعد كتابة ذكي للمحتوى والعناوين والسير الذاتية." },
    { icon: "🧹", color: "rgba(224,64,251,0.2)", title: "Magic Eraser",        desc: "امسح عناصر غير مرغوبة من صورك بضغطة واحدة." },
    { icon: "🎞️", color: "rgba(74,222,128,0.2)", title: "Magic Animate",       desc: "حرّك تصميمك بأسلوب سينمائي بضغطة زر." },
  ];

  return (
    <section id="ai" style={{ padding: "100px 5%", background: C.bg }}>
      <div className="reveal"><SectionTag>🤖 الذكاء الاصطناعي</SectionTag></div>
      <div className="reveal reveal-d1">
        <SectionTitle>
          Artiva AI 2.0 —{" "}
          <em style={{
            fontStyle: "normal",
            background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            المستقبل في يدك
          </em>
        </SectionTitle>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60, alignItems: "center", marginTop: 60,
      }}>
        {/* الجانب المرئي — الشاشة التجريبية */}
        <div className="reveal reveal-d2" style={{
          background: C.surface2,
          border: `1px solid ${C.border}`,
          borderRadius: 24, padding: 40,
          position: "relative", overflow: "hidden",
          minHeight: 420,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
        }}>
          {/* خلفية التدرج */}
          <div style={{
            position: "absolute", inset: 0,
            background: `
              radial-gradient(ellipse at 60% 20%, rgba(124,92,252,0.2), transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(0,212,255,0.15), transparent 60%)
            `,
            pointerEvents: "none",
          }} />

          {/* Chips */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 10,
            position: "relative", zIndex: 2, marginBottom: 20,
          }}>
            {["✨ Magic Design","🎨 Dream Lab","✍️ Magic Write","🧹 Magic Eraser","🎞️ Magic Animate"]
              .map((chip, i) => (
              <div key={i} style={{
                padding: "8px 16px", borderRadius: 50,
                background: "rgba(124,92,252,0.12)",
                border: "1px solid rgba(124,92,252,0.25)",
                fontSize: "0.82rem", fontWeight: 600, color: C.accent,
              }}>
                {chip}
              </div>
            ))}
          </div>

          {/* محاكاة الـ Prompt */}
          <div style={{
            position: "relative", zIndex: 2,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16, padding: "20px 24px",
          }}>
            <div style={{ fontSize: "0.8rem", color: C.muted, marginBottom: 10 }}>
              💬 اكتب وصف تصميمك...
            </div>
            {/* النص المتحرك مع مؤشر وميض */}
            <div style={{
              color: C.text, fontSize: "1rem", fontWeight: 600,
              borderRight: `2px solid ${C.accent}`, paddingRight: 10,
              animation: "blink 1.2s step-end infinite",
            }}>
              {typedText}
            </div>
          </div>
        </div>

        {/* قائمة أدوات AI */}
        <div>
          {aiTools.map((tool, i) => (
            <div key={i} className={`ai-tool reveal reveal-d${(i % 3) + 1}`}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: tool.color, fontSize: "1.4rem",
              }}>
                {tool.icon}
              </div>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>
                  {tool.title}
                </h4>
                <p style={{ fontSize: "0.875rem", color: C.muted }}>
                  {tool.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// 🖼️ مكوّن: معرض القوالب (Gallery)
// ============================================================
const Gallery = () => {
  // بيانات القوالب
  const templates = [
    { emoji: "📱", gradient: "linear-gradient(135deg,#1a0533,#7c5cfc)", label: "بوست انستقرام" },
    { emoji: "💼", gradient: "linear-gradient(135deg,#041a2e,#00d4ff)", label: "سيرة ذاتية"     },
    { emoji: "🎂", gradient: "linear-gradient(135deg,#1e0a00,#ff6b35)", label: "دعوة عيد ميلاد" },
    { emoji: "📊", gradient: "linear-gradient(135deg,#001a0e,#00e676)", label: "عرض تقديمي"     },
    { emoji: "🎨", gradient: "linear-gradient(135deg,#1a001a,#e040fb)", label: "شعار تجاري"     },
    { emoji: "☕", gradient: "linear-gradient(135deg,#1a1500,#ffd166)", label: "منيو مقهى"      },
    { emoji: "🎯", gradient: "linear-gradient(135deg,#00131a,#0fc7c7)", label: "إعلان تسويقي"  },
    { emoji: "💌", gradient: "linear-gradient(135deg,#1a0a0a,#ff4081)", label: "بطاقة دعوة"    },
    { emoji: "🏆", gradient: "linear-gradient(135deg,#0d001a,#7c5cfc)", label: "شهادة تقدير"   },
    { emoji: "📰", gradient: "linear-gradient(135deg,#001520,#00b0ff)", label: "نشرة إخبارية"  },
  ];

  // نضاعف القوالب لإنشاء تمرير لا نهائي سلس
  const doubled = [...templates, ...templates];

  return (
    <section id="gallery" style={{
      padding: "100px 0",
      background: C.surface, overflow: "hidden",
    }}>
      <div style={{ padding: "0 5%", textAlign: "center" }}>
        <div className="reveal"><SectionTag>🖼️ مكتبة القوالب</SectionTag></div>
        <div className="reveal reveal-d1">
          <SectionTitle center>
            أكثر من{" "}
            <em style={{
              fontStyle: "normal",
              background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              800,000 قالب
            </em>
          </SectionTitle>
        </div>
        <p className="reveal reveal-d2" style={{
          fontSize: "1.05rem", color: C.muted, maxWidth: 560, margin: "0 auto",
        }}>
          تصاميم لكل مناسبة — سير ذاتية، منشورات، شعارات، دعوات وأكثر.
        </p>
      </div>

      {/* مغلّف التمرير مع تلاشٍ على الجانبين */}
      <div style={{
        marginTop: 60, position: "relative", overflow: "hidden",
      }}>
        {/* تلاشٍ يمين */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, right: 0, width: 120, zIndex: 2,
          background: `linear-gradient(to left, ${C.surface}, transparent)`,
          pointerEvents: "none",
        }} />
        {/* تلاشٍ يسار */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0, width: 120, zIndex: 2,
          background: `linear-gradient(to right, ${C.surface}, transparent)`,
          pointerEvents: "none",
        }} />

        <div className="gallery-track" style={{ padding: "20px 0" }}>
          {doubled.map((tpl, i) => (
            <div key={i} className="gallery-card">
              <div style={{
                width: "100%", height: "100%",
                background: tpl.gradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "3rem",
              }}>
                {tpl.emoji}
              </div>
              <div style={{
                position: "absolute", bottom: 12, right: 12, left: 12,
                background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)",
                borderRadius: 8, padding: "6px 10px",
                fontSize: "0.75rem", fontWeight: 600, color: C.text,
                textAlign: "center",
              }}>
                {tpl.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// 🏢 مكوّن: أدوات الأعمال
// ============================================================
const BusinessTools = () => {
  const tools = [
    { num: "01", title: "Brand Kit",          desc: "احفظ شعارك وألوانك وخطوطك لتوحيد كل تصاميمك.",             accent: "#7c5cfc" },
    { num: "02", title: "Content Planner",    desc: "جدول منشوراتك ودع Artiva ينشرها تلقائياً.",                accent: "#00d4ff" },
    { num: "03", title: "Background Remover", desc: "إزالة فورية لخلفية أي صورة أو فيديو بضغطة واحدة.",        accent: "#ffd166" },
    { num: "04", title: "PDF Editor",         desc: "عدّل وأعد تصميم ملفات PDF مباشرة دون برامج خارجية.",       accent: "#e040fb" },
    { num: "05", title: "Charts & Graphs",    desc: "حوّل بياناتك إلى رسوم بيانية تفاعلية في ثوانٍ.",           accent: "#4ade80" },
    { num: "06", title: "Magic Resize",       desc: "غيّر حجم تصميمك لأي منصة تلقائياً — من انستقرام لتويتر.", accent: "#ff6b35" },
  ];

  return (
    <section style={{ padding: "100px 5%", background: C.bg }}>
      <div style={{ textAlign: "center" }}>
        <div className="reveal"><SectionTag>🏢 أدوات الأعمال</SectionTag></div>
        <div className="reveal reveal-d1">
          <SectionTitle center>
            بنِ{" "}
            <em style={{
              fontStyle: "normal",
              background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              هوية علامتك
            </em>{" "}
            التجارية
          </SectionTitle>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 20, marginTop: 60,
      }}>
        {tools.map((tool, i) => (
          <div key={i} className={`tool-card reveal reveal-d${(i % 3) + 1}`}>
            {/* الرقم المتدرج */}
            <div style={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: "3rem", fontWeight: 900,
              background: `linear-gradient(135deg, ${tool.accent}, ${C.accent2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1, marginBottom: 14,
            }}>
              {tool.num}
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8 }}>
              {tool.title}
            </h3>
            <p style={{ fontSize: "0.875rem", color: C.muted }}>
              {tool.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================================
// 💎 مكوّن: الأسعار
// ============================================================
const Pricing = () => {
  // حالة للتبديل بين شهري وسنوي
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "المجاني",
      // yearly ? السعر السنوي : الشهري
      price: yearly ? "0" : "0",
      period: "للأفراد والمبتدئين",
      features: [
        { ok: true,  text: "+250,000 قالب"                  },
        { ok: true,  text: "5 GB تخزين سحابي"               },
        { ok: true,  text: "ذكاء اصطناعي محدود"             },
        { ok: false, text: "إزالة الخلفية"                  },
        { ok: false, text: "تغيير الحجم التلقائي"           },
        { ok: false, text: "Brand Kit"                      },
      ],
      featured: false,
    },
    {
      name: "Pro",
      price: yearly ? "9" : "13",
      period: yearly ? "/ شهر (مدفوع سنوياً)" : "/ شهر",
      features: [
        { ok: true, text: "+600,000 قالب"                   },
        { ok: true, text: "1 TB تخزين سحابي"                },
        { ok: true, text: "ذكاء اصطناعي غير محدود"          },
        { ok: true, text: "إزالة الخلفية (صور + فيديو)"     },
        { ok: true, text: "تغيير الحجم التلقائي"            },
        { ok: true, text: "Brand Kit + جدولة المحتوى"       },
      ],
      featured: true,
      badge: "الأكثر شعبية ⚡",
    },
  ];

  return (
    <section id="pricing" style={{ padding: "100px 5%", background: C.bg }}>
      <div style={{ textAlign: "center" }}>
        <div className="reveal"><SectionTag>💎 الأسعار</SectionTag></div>
        <div className="reveal reveal-d1">
          <SectionTitle center>
            اختر{" "}
            <em style={{
              fontStyle: "normal",
              background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              الخطة المناسبة
            </em>
          </SectionTitle>
        </div>

        {/* مبدّل شهري/سنوي */}
        <div className="reveal reveal-d2" style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          marginTop: 24, padding: "8px 16px",
          background: C.surface2, borderRadius: 50,
          border: `1px solid ${C.border}`,
        }}>
          <span style={{
            fontSize: "0.9rem", fontWeight: 600,
            color: !yearly ? C.text : C.muted,
          }}>
            شهري
          </span>
          {/* زر التبديل */}
          <div
            onClick={() => setYearly(!yearly)} // عند النقر نعكس الحالة
            style={{
              width: 48, height: 26, borderRadius: 13,
              background: yearly ? "linear-gradient(135deg,#7C5CFC,#E040FB)" : C.border,
              cursor: "pointer", position: "relative", transition: "all 0.3s",
            }}
          >
            <div style={{
              position: "absolute", top: 3,
              // yearly ? يمين : يسار — نحرّك الدائرة
              right: yearly ? 3 : undefined,
              left: yearly ? undefined : 3,
              width: 20, height: 20, borderRadius: "50%",
              background: "#fff", transition: "all 0.3s",
            }} />
          </div>
          <span style={{
            fontSize: "0.9rem", fontWeight: 600,
            color: yearly ? C.text : C.muted,
          }}>
            سنوي{" "}
            <span style={{
              color: "#4ade80", fontSize: "0.8rem",
              background: "rgba(74,222,128,0.1)",
              padding: "2px 8px", borderRadius: 50,
            }}>
              وفّر 30%
            </span>
          </span>
        </div>
      </div>

      {/* بطاقات التسعير */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 28, marginTop: 52, maxWidth: 900,
        marginLeft: "auto", marginRight: "auto",
      }}>
        {plans.map((plan, i) => (
          <div key={i} className={`reveal reveal-d${i + 1}`} style={{
            borderRadius: 24, padding: "44px 40px",
            border: plan.featured
              ? "1px solid rgba(124,92,252,0.5)"
              : `1px solid ${C.border}`,
            background: plan.featured
              ? "linear-gradient(160deg, rgba(124,92,252,0.1), #16152A)"
              : C.surface2,
            boxShadow: plan.featured ? "0 0 60px rgba(124,92,252,0.15)" : "none",
            position: "relative",
          }}>
            {/* شارة "الأكثر شعبية" */}
            {plan.badge && (
              <div style={{
                position: "absolute", top: 20, left: 20,
                background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
                padding: "4px 14px", borderRadius: 50,
                fontSize: "0.75rem", fontWeight: 700, color: "#fff",
              }}>
                {plan.badge}
              </div>
            )}

            <div style={{
              fontSize: "1.1rem", fontWeight: 700, color: C.muted, marginBottom: 16,
            }}>
              {plan.name}
            </div>

            <div style={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: "3.5rem", fontWeight: 900, lineHeight: 1,
              marginBottom: 6,
              background: plan.featured ? "linear-gradient(135deg,#7C5CFC,#E040FB)" : "none",
              WebkitBackgroundClip: plan.featured ? "text" : "unset",
              WebkitTextFillColor: plan.featured ? "transparent" : C.text,
            }}>
              ${plan.price}
              <span style={{
                fontSize: "1rem", fontWeight: 600,
                WebkitTextFillColor: C.muted,
                background: "none",
              }}>
                {" "}{plan.period}
              </span>
            </div>

            <ul style={{
              listStyle: "none", marginBottom: 36, marginTop: 28,
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              {plan.features.map((f, j) => (
                <li key={j} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  fontSize: "0.92rem",
                  color: f.ok ? C.text : C.muted,
                  textDecoration: f.ok ? "none" : "line-through",
                }}>
                  <span>{f.ok ? "✅" : "❌"}</span>
                  {f.text}
                </li>
              ))}
            </ul>

            <button className="price-btn" style={{
              background: plan.featured
                ? "linear-gradient(135deg,#7C5CFC,#E040FB)"
                : "transparent",
              border: plan.featured ? "none" : `1px solid ${C.border}`,
              color: plan.featured ? "#fff" : C.text,
              boxShadow: plan.featured ? "0 6px 30px rgba(124,92,252,0.35)" : "none",
            }}>
              {plan.featured ? "ابدأ Pro مجاناً 30 يوم" : "ابدأ مجاناً"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================================
// 📊 مكوّن: جدول المقارنة
// ============================================================
const CompareTable = () => {
  const rows = [
    { feature: "عدد القوالب",          free: "+250,000",    pro: "+600,000",           proStyle: true  },
    { feature: "التخزين السحابي",      free: "5 GB",        pro: "1 TB",               proStyle: true  },
    { feature: "إزالة الخلفية",        free: "❌",          pro: "✓ صور وفيديو",       proStyle: false },
    { feature: "تغيير الحجم التلقائي", free: "يدوي",        pro: "✓ تلقائي بضغطة",    proStyle: false },
    { feature: "الذكاء الاصطناعي",     free: "محدود",       pro: "غير محدود",          proStyle: true  },
    { feature: "Brand Kit",            free: "❌",          pro: "✓ كامل",             proStyle: false },
    { feature: "جدولة المحتوى",        free: "❌",          pro: "✓ على كل المنصات",   proStyle: false },
    { feature: "الدعم المتخصص",        free: "مجتمع",       pro: "دعم أولوية 24/7",    proStyle: true  },
  ];

  return (
    <section style={{ padding: "100px 5%", background: C.surface }}>
      <div style={{ textAlign: "center" }}>
        <div className="reveal"><SectionTag>📊 المقارنة التفصيلية</SectionTag></div>
        <div className="reveal reveal-d1">
          <SectionTitle center>
            مجاني{" "}
            <em style={{
              fontStyle: "normal",
              background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              مقابل Pro
            </em>
          </SectionTitle>
        </div>
      </div>

      <div className="reveal reveal-d2" style={{
        overflowX: "auto", marginTop: 60,
        borderRadius: 20, border: `1px solid ${C.border}`,
        maxWidth: 800, marginLeft: "auto", marginRight: "auto",
      }}>
        <table>
          <thead>
            <tr>
              <th>الميزة</th>
              <th>المجاني</th>
              <th style={{ background: "rgba(124,92,252,0.08)" }}>Pro ⭐</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td style={{ color: C.text, fontWeight: 600 }}>{row.feature}</td>
                <td style={{
                  color: row.free.startsWith("❌") ? C.muted : C.muted,
                  textDecoration: row.free.startsWith("❌") ? "line-through" : "none",
                  opacity: row.free.startsWith("❌") ? 0.6 : 1,
                }}>
                  {row.free}
                </td>
                <td style={{
                  background: "rgba(124,92,252,0.05)",
                  color: row.proStyle ? C.accent : "#4ade80",
                }}>
                  {row.pro}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// ============================================================
// ⭐ مكوّن: آراء المستخدمين
// ============================================================
const Testimonials = () => {
  const reviews = [
    {
      text: "Artiva غيّر حياتي المهنية تماماً. صمّمت متجري كاملاً من الشعار حتى منشورات التواصل في مكان واحد!",
      name: "ريم الشمري", role: "صاحبة متجر إلكتروني",
      initial: "ر", gradient: "linear-gradient(135deg,#7c5cfc,#e040fb)",
    },
    {
      text: "كنت أدفع مئات الدولارات للمصممين، الآن أصمم بنفسي بشكل احترافي. Dream Lab خرافي!",
      name: "محمد الزهراني", role: "مدير تسويق رقمي",
      initial: "م", gradient: "linear-gradient(135deg,#00d4ff,#7c5cfc)",
    },
    {
      text: "استخدمته لعروضي التقديمية في الجامعة، الأساتذة بهروا من الجودة. بسيط ونتائجه لا تصدق!",
      name: "نورة العتيبي", role: "طالبة جامعية",
      initial: "ن", gradient: "linear-gradient(135deg,#ffd166,#e040fb)",
    },
  ];

  return (
    <section style={{ padding: "100px 5%", background: C.bg }}>
      <div style={{ textAlign: "center" }}>
        <div className="reveal"><SectionTag>❤️ آراء المستخدمين</SectionTag></div>
        <div className="reveal reveal-d1">
          <SectionTitle center>
            50 مليون مبدع{" "}
            <em style={{
              fontStyle: "normal",
              background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              يثقون بنا
            </em>
          </SectionTitle>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 24, marginTop: 60,
      }}>
        {reviews.map((r, i) => (
          <div key={i} className={`testi-card reveal reveal-d${i + 1}`}>
            {/* النجوم */}
            <div style={{ color: C.gold, fontSize: "1rem", letterSpacing: 3, marginBottom: 16 }}>
              ★★★★★
            </div>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 24 }}>
              "{r.text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: r.gradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Tajawal', sans-serif",
                fontSize: "1.2rem", fontWeight: 900, color: "#fff",
                flexShrink: 0,
              }}>
                {r.initial}
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: "0.8rem", color: C.muted }}>{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================================
// 🚀 مكوّن: قسم الدعوة للعمل (CTA)
// ============================================================
const CTA = () => (
  <section style={{ padding: "100px 5%", background: C.surface }}>
    <div className="reveal" style={{
      background: "linear-gradient(135deg, rgba(124,92,252,0.15), rgba(224,64,251,0.1), rgba(0,212,255,0.08))",
      border: "1px solid rgba(124,92,252,0.3)",
      borderRadius: 32, padding: "80px 60px",
      textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* تأثير الضوء العلوي */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center top, rgba(124,92,252,0.2), transparent 70%)",
        pointerEvents: "none",
      }} />

      <h2 style={{
        fontFamily: "'Tajawal', sans-serif",
        fontSize: "clamp(2rem, 4vw, 3.5rem)",
        fontWeight: 900, lineHeight: 1.2, marginBottom: 20,
        position: "relative",
      }}>
        ابدأ إبداعك{" "}
        <span style={{
          background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          اليوم مجاناً
        </span>
      </h2>

      <p style={{
        fontSize: "1.1rem", color: C.muted,
        maxWidth: 520, margin: "0 auto 40px",
        position: "relative",
      }}>
        انضم لأكثر من 50 مليون مبدع — لا بطاقة ائتمانية، لا خبرة مطلوبة.
      </p>

      <div style={{
        display: "flex", gap: 16, justifyContent: "center",
        flexWrap: "wrap", position: "relative",
      }}>
        <Btn variant="primary">🚀 ابدأ التصميم الآن</Btn>
        <Btn variant="outline">جرّب Artiva Pro مجاناً</Btn>
      </div>
    </div>
  </section>
);

// ============================================================
// 🦶 مكوّن: تذييل الصفحة (Footer)
// ============================================================
const Footer = () => {
  const cols = [
    {
      title: "المنتج",
      links: ["المحرر", "الذكاء الاصطناعي", "القوالب", "Artiva Print"],
    },
    {
      title: "الشركة",
      links: ["من نحن", "المدونة", "الوظائف", "اتصل بنا"],
    },
    {
      title: "الدعم",
      links: ["مركز المساعدة", "الخصوصية", "الشروط والأحكام", "الأمان"],
    },
  ];

  return (
    <footer style={{
      background: C.bg,
      borderTop: `1px solid ${C.border}`,
      padding: "70px 5% 40px",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
        gap: 48, marginBottom: 56,
      }}>
        {/* العمود الأول: الشعار */}
        <div>
          <div style={{
            fontFamily: "'Tajawal', sans-serif",
            fontWeight: 800, fontSize: "1.8rem",
            background: "linear-gradient(135deg,#7C5CFC,#E040FB)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: -1, marginBottom: 16,
          }}>
            Artiva<span style={{ WebkitTextFillColor: C.gold }}>.</span>
          </div>
          <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.8, maxWidth: 280 }}>
            منصة التصميم الإبداعي الأكثر ذكاءً في العالم العربي.
          </p>
        </div>

        {/* الأعمدة الأخرى */}
        {cols.map((col, i) => (
          <div key={i}>
            <h5 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 20 }}>
              {col.title}
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href="#" className="footer-link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* الشريط السفلي */}
      <div style={{
        borderTop: `1px solid ${C.border}`,
        paddingTop: 28,
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <p style={{ fontSize: "0.85rem", color: C.muted }}>
          © 2026 Artiva. جميع الحقوق محفوظة.
        </p>

        {/* روابط التواصل الاجتماعي */}
        <div style={{ display: "flex", gap: 12 }}>
          {["𝕏", "in", "📘", "📸"].map((icon, i) => (
            <a key={i} href="#" style={{
              width: 38, height: 38, borderRadius: 10,
              background: C.surface2, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", fontSize: "1rem", color: C.muted,
              transition: "all 0.3s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = C.accent;
                e.currentTarget.style.color = C.accent;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.color = C.muted;
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

// ============================================================
// 🏗️ المكوّن الرئيسي — يجمع كل شيء معاً
// ============================================================
export default function App() {
  // نستدعي الـ hook عشان يشتغل الـ reveal على الصفحة كلها
  useReveal();

  return (
    <>
      {/* حقن الـ CSS العام في الصفحة */}
      <style>{globalStyles}</style>

      {/* ترتيب المكوّنات من أعلى لأسفل */}
      <Navbar />
      <Hero />
      <Features />
      <AISection />
      <Gallery />
      <BusinessTools />
      <Pricing />
      <CompareTable />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
