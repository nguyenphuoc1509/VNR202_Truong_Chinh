import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Calendar,
  Image as ImgIcon,
  Info,
  Mic2,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Quote,
  Users,
  BarChart3,
  BookOpen,
  Search,
  X,
} from "lucide-react";
import narrationMp3 from "./assets/truong_chinh_ten_that_dang_xuan_khu_19071988_5d5601d2-863f-41e1-bbd0-dbe3911644c1.mp3";

// ==========================
// MOCK DATA (from provided JSON)
// ==========================
const DATA = {
  metadata: {
    source: "vi.wikipedia.org",
    article: "Trường Chinh",
    last_edit: "2025-10-27T01:29:00+07:00",
    license: "CC BY-SA 4.0",
  },
  tieu_de: "Trường Chinh",
  chuc_vu_chinh: {
    tong_bi_thu: [
      {
        nhiem_ky: "1940-11-09 — 1956-10-05",
        tien_nhiem: "Nguyễn Văn Cừ (Tổng Bí thư ĐCS Đông Dương)",
        ke_nhiem: "Hồ Chí Minh (Tổng Bí thư Đảng Lao động Việt Nam)",
      },
      {
        nhiem_ky: "1986-07-14 — 1986-12-18",
        tien_nhiem: "Lê Duẩn (mất)",
        ke_nhiem: "Nguyễn Văn Linh",
      },
    ],
    chu_tich_hoi_dong_nha_nuoc: {
      nhiem_ky: "1981-07-04 — 1987-06-18",
      tien_nhiem: "Tôn Đức Thắng",
      ke_nhiem: "Võ Chí Công",
    },
    chu_tich_quoc_hoi: {
      nhiem_ky: "1960-07-06 — 1981-07-04",
      tien_nhiem: "Tôn Đức Thắng",
      ke_nhiem: "Nguyễn Hữu Thọ",
    },
  },
  thong_tin_ca_nhan: {
    ten_that: "Đặng Xuân Khu",
    sinh: "1907-02-09, Hành Thiện, Xuân Hồng, Xuân Trường, Nam Định (nay thuộc Ninh Bình)",
    mat: "1988-09-30, Hà Nội, Việt Nam",
    an_tang: "Nghĩa trang Mai Dịch, Hà Nội",
    quoc_tich: "Việt Nam",
    dang_chinh_tri: [
      "Đông Dương Cộng sản Đảng (1929–1930)",
      "Đảng Cộng sản Đông Dương (1931–1945)",
      "Việt Minh (1941–1951)",
      "Đảng Lao động Việt Nam (1951–1976)",
      "Đảng Cộng sản Việt Nam (1976–1988)",
    ],
    phoi_ngau: "Nguyễn Thị Minh (cưới 1929)",
    con: "4 (ba trai, một gái)",
    cha_me: { cha: "Đặng Xuân Viện (1880–1958)", me: "Nguyễn Thị Từ" },
    but_danh: ["Sóng Hồng"],
  },
  than_the:
    "Sinh trong gia đình có truyền thống Nho học ở làng Hành Thiện. Ông nội là Tiến sĩ Đặng Xuân Bảng. Cha là học giả Đặng Xuân Viện, từng viết cho Nam Phong, Trung Bắc Tân Văn, Ngọ Báo. Từ nhỏ học Tứ thư, Ngũ kinh, sau chuyển sang Tây học; học Thành chung Nam Định rồi lên Hà Nội nộp hồ sơ vào Trường Cao đẳng Thương mại (Đại học Đông Dương).",
  tham_gia_hoat_dong_cach_mang:
    "Từ 1923 học Thành Chung Nam Định, chịu ảnh hưởng tư tưởng Rousseau, Montesquieu, Cách mạng Pháp 1789 và Cách mạng Tân Hợi 1911; tham gia vận động học sinh, xuất bản báo phản đối thực dân. Năm 1925 tham gia phong trào đòi ân xá Phan Bội Châu, truy điệu Phan Chu Trinh; 1926 bị đuổi học. Năm 1927 ra Hà Nội, vào Việt Nam Thanh niên Cách mạng Đồng chí Hội; 1929 tham gia thành lập Đông Dương Cộng sản Đảng. Năm 1930 vào Ban tuyên truyền cổ động TƯ ĐCS Đông Dương; cuối năm bị bắt, kết án 12 năm đày Sơn La; 1936 được thả. 1936–1939 là Xứ ủy viên Bắc Kỳ, hoạt động Mặt trận Dân chủ; 1940 làm chủ bút Cờ Giải phóng và phụ trách báo tiếng Pháp.",
  tro_thanh_lanh_dao_chu_chot:
    "Tại Trung ương 7 (11/1940) được bầu vào BCH TƯ và làm Quyền Tổng Bí thư thay Nguyễn Văn Cừ. Tháng 5/1941 tại Trung ương 8 (Cao Bằng) được bầu làm Tổng Bí thư, kiêm Trưởng ban Tuyên huấn, Chủ bút Cờ Giải phóng và Tạp chí Cộng sản; bút danh 'Trường Chinh' xuất hiện 10/10/1942. Năm 1943 bị kết án tử hình vắng mặt. Tháng 3/1945 chủ trì ra Chỉ thị 'Nhật–Pháp bắn nhau và hành động của chúng ta', xác định thời cơ Tổng khởi nghĩa; phụ trách Ủy ban Khởi nghĩa toàn quốc. Cuối 1945, ĐCS Đông Dương rút bí mật, tuyên bố tự giải tán, chuyển thành Hội Nghiên cứu Chủ nghĩa Mác ở Đông Dương do ông làm Hội trưởng. 1947 viết loạt bài 'Kháng chiến nhất định thắng lợi' nêu đường lối kháng chiến; 1951 tái cử Tổng Bí thư Đảng Lao động Việt Nam.",
  vai_tro_trong_cai_cach_ruong_dat:
    "Từ 1938 (cùng Võ Nguyên Giáp) nêu vấn đề 'Vấn đề dân cày'; 1951 trình bày trong Báo cáo chính trị tại Đại hội II. Năm 1953 làm Trưởng ban Cải cách ruộng đất TƯ. Giai đoạn đầu tịch thu tài sản của phần tử 'phản quốc, phản động' chia cho bần cố nông. Từ cuối 1954, dưới áp lực cố vấn Trung Quốc, triển khai quy mô lớn; ở một số nơi xuất hiện đấu tố, lạm quyền, bạo lực. Là lãnh đạo cao nhất của chương trình, ông chịu trách nhiệm chính trị; tại Trung ương 10 (8–10/1956) về sửa sai, ông từ chức Tổng Bí thư và đứng đầu Ban chỉ đạo sửa sai đến 1958.",
  nhung_nam_tiep_theo:
    "1958 làm Phó Thủ tướng kiêm Chủ nhiệm Ủy ban Khoa học Nhà nước. 1960 trở lại BCH TƯ, Ủy viên Bộ Chính trị; được bầu làm Chủ tịch Quốc hội (1960–1981). 1981 làm Chủ tịch Hội đồng Nhà nước. Trong bối cảnh khó khăn kinh tế đầu thập niên 1980, ông tổ chức các nhóm nghiên cứu thực địa, dần ủng hộ cải cách; năm 1985 thúc đẩy cải cách Giá–Lương–Tiền nhưng thất bại.",
  hoat_dong_cuoi_doi:
    "Tháng 5/1986 làm quyền Tổng Bí thư; 14/7/1986 được bầu làm Tổng Bí thư đến Đại hội VI (18/12/1986). Trước khủng hoảng và lạm phát rất cao, ông chỉ đạo chuẩn bị Đại hội VI theo hướng đổi mới, đưa Nguyễn Văn Linh vào vị trí Thường trực Ban Bí thư để kế nhiệm. Sau Đại hội VI, ông làm Cố vấn BCH TƯ, Phó Trưởng ban soạn thảo Cương lĩnh, Trưởng Tiểu ban Cương lĩnh chính trị. Ông mất ngày 30/9/1988 tại Hà Nội, quốc tang 02–05/10/1988, an táng tại Mai Dịch.",
  danh_gia:
    "Bên cạnh công lao tổ chức lực lượng cho Cách mạng Tháng Tám và hoạch định đường lối kháng chiến, ông bị phê phán bảo thủ ở một số giai đoạn (như phản đối 'khoán hộ' tại Vĩnh Phú). Tuy nhiên, ở thời điểm quyết định năm 1986, ông đóng vai trò then chốt mở đường cho Đổi mới; được một số lãnh đạo gọi là 'Tổng Bí thư của Đổi mới'. Ông chủ trì viết lại văn kiện, nêu ba quan điểm lớn: phát triển kinh tế nhiều thành phần; chuyển đổi cơ cấu kinh tế–đầu tư; đổi mới quản lý theo cơ chế tự chủ, mở.",
  sang_tac_van_tho: [
    "Chống chủ nghĩa cải lương (1935)",
    "Vấn đề dân cày (cùng Võ Nguyên Giáp, 1938)",
    "Chính sách mới của Đảng (1941)",
    "Đề cương văn hóa Việt Nam (1943)",

    "Kháng chiến nhất định thắng lợi (1947)",
    "Chủ nghĩa Mác và vấn đề văn hóa Việt Nam (1948)",
    "Bàn về cách mạng Việt Nam (1951)",
  ],
  gia_dinh: {
    vo: "Nguyễn Thị Minh (1912–2001), người cùng làng Hành Thiện",
    con: [
      "Đặng Xuân Kỳ (1931–2010) – Ủy viên BCH TƯ khóa VI, VII; nguyên Giám đốc Học viện Chính trị Quốc gia Hồ Chí Minh",
      "Đặng Việt Nga – Tiến sĩ, Kiến trúc sư (Biệt thự Hằng Nga, Đà Lạt)",
      "Đặng Việt Bích (1946–2019) – PGS.TS",
      "Đặng Việt Bắc (sinh 1950)",
    ],
  },
  vinh_danh: {
    huan_chuong_viet_nam: ["Huân chương Sao Vàng"],
    huan_chuong_quoc_te: [
      "Huân chương Lenin; Cách mạng Tháng Mười (Liên Xô)",
      "Huân chương Vàng Quốc gia (Lào)",
      "Huân chương Angkor (Campuchia)",
      "Huân chương José Martí (Cuba)",
      "Huân chương Karl Marx (CHDC Đức)",
      "Huân chương Xukhê Bato (Mông Cổ)",
      "Huân chương Dimitrov (Bulgaria)",
      "Huân chương Lá cờ đính kim cương (Hungary)",
      "Huân chương Clemen Gotvan (Tiệp Khắc)",
    ],
    khac: [
      "Khu nhà lưu niệm Trường Chinh ở Nam Định",
      "Tên đường tại nhiều thành phố: Hà Nội, TP.HCM, Nam Định, Đà Nẵng, Hải Phòng, Đồng Hới, Huế, Tuy Hòa, Vinh, Pleiku, Bắc Kạn, Nhơn Trạch (Đồng Nai)",
    ],
  },
  chu_thich_chinh: [
    "Bút danh 'Trường Chinh' xuất hiện công khai trên Cờ Giải Phóng số 10-10-1942.",
    "Từ chức Tổng Bí thư sau Hội nghị TƯ 10 (1956) về sửa sai Cải cách ruộng đất; sau đó chỉ đạo sửa sai.",
    "Đóng vai trò quan trọng trong chuẩn bị và định hướng đường lối Đổi mới tại Đại hội VI (1986).",
  ],
};

// Build a structured timeline from DATA
const TIMELINE = [
  { year: 1907, title: "Sinh ra", text: DATA.thong_tin_ca_nhan.sinh },
  {
    year: 1925,
    title: "Phong trào yêu nước",
    text: "Tham gia đòi ân xá Phan Bội Châu, truy điệu Phan Chu Trinh.",
  },
  {
    year: 1929,
    title: "Đông Dương Cộng sản Đảng",
    text: "Tham gia thành lập Đông Dương Cộng sản Đảng.",
  },
  {
    year: 1930,
    title: "Bị bắt – đày Sơn La",
    text: "Kết án 12 năm, 1936 được thả.",
  },
  {
    year: 1941,
    title: "Tổng Bí thư",
    text: "Được bầu Tổng Bí thư tại Hội nghị TƯ 8 ở Cao Bằng.",
  },
  {
    year: 1953,
    title: "Trưởng ban CCRĐ",
    text: "Phụ trách Cải cách ruộng đất toàn quốc.",
  },
  {
    year: 1956,
    title: "Sửa sai & từ chức",
    text: "Từ chức Tổng Bí thư, chỉ đạo sửa sai đến 1958.",
  },
  { year: 1960, title: "Chủ tịch Quốc hội", text: "Giữ chức đến 1981." },
  { year: 1981, title: "Chủ tịch HĐNN", text: "Giữ chức đến 1987." },
  {
    year: 1986,
    title: "Tổng Bí thư Đổi mới",
    text: "Chỉ đạo chuẩn bị Đại hội VI theo hướng đổi mới.",
  },
  { year: 1988, title: "Qua đời", text: DATA.thong_tin_ca_nhan.mat },
];

// ==========================
// UTILS
// ==========================
function useParallax(speed = 0.2) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const o = (window.innerHeight - rect.top) * speed;
      setOffset(o);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return { ref, offset };
}

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

// ==========================
// THEME STYLES (CSS Variables)
// ==========================
function ThemeStyles() {
  return (
    <style>{`/* theme */
      :root {
        --bg-start: #0b0c10; /* deep slate */
        --bg-mid: #0b0a0a;   /* warm charcoal */
        --bg-end: #050507;   /* near-black */
        --panel: rgba(255,255,255,0.05);
        --border: rgba(255,255,255,0.08);
        --muted: rgba(255,255,255,0.78);
        --muted-2: rgba(255,255,255,0.64);
        --accent: #f59e0b;    /* amber-500 */
        --accent-2: #ef4444;  /* rose-500 */
        --accent-3: #facc15;  /* yellow-400 */
      }
    `}</style>
  );
}

// ==========================
// TTS HOOK (Web Speech API)
// ==========================
function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const utteranceRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const audioRef = useRef(null); // for cloud playback
  const [azureKey, setAzureKey] = useState(
    () => localStorage.getItem("azure_tts_key") || ""
  );
  const [azureRegion, setAzureRegion] = useState(
    () => localStorage.getItem("azure_tts_region") || ""
  );

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => setVoices(synth.getVoices());
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, []);

  // Prefer a Vietnamese voice by default if available
  useEffect(() => {
    if (!voices || voices.length === 0) return;
    const preferredNameRegex = /(hoaimy|namminh|vietnamese|vi(?:et)?\b)/i;
    let idx = voices.findIndex((v) => preferredNameRegex.test(v.name || ""));
    if (idx < 0)
      idx = voices.findIndex((v) =>
        (v.lang || "").toLowerCase().startsWith("vi")
      );
    if (idx >= 0) setVoiceIndex(idx);
  }, [voices]);

  const hasVietnameseLocal = useMemo(
    () =>
      voices.some(
        (v) =>
          (v.lang || "").toLowerCase().startsWith("vi") ||
          /viet|vietnam/i.test(v.name || "")
      ),
    [voices]
  );

  const speak = async (text, onBoundary) => {
    const synth = window.speechSynthesis;
    if (!text || !("speechSynthesis" in window)) return;
    // Use local voice if Vietnamese is available; otherwise try Azure if configured
    if (hasVietnameseLocal || !azureKey || !azureRegion) {
      if (synth.speaking) synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      utteranceRef.current = u;
      if (voices[voiceIndex]) u.voice = voices[voiceIndex];
      u.rate = 1.02;
      u.pitch = 1;
      u.lang = voices[voiceIndex]?.lang || "vi-VN";
      u.onstart = () => {
        setSpeaking(true);
        setPaused(false);
      };
      u.onend = () => {
        setSpeaking(false);
        setPaused(false);
      };
      u.onpause = () => setPaused(true);
      u.onresume = () => setPaused(false);
      if (onBoundary) u.onboundary = onBoundary;
      synth.speak(u);
      return;
    }

    // Azure fallback
    try {
      setSpeaking(true);
      setPaused(false);
      const ssml = `<?xml version="1.0"?>
        <speak version="1.0" xml:lang="vi-VN">
          <voice name="vi-VN-HoaiMyNeural">
            <prosody rate="1.02" pitch="0%">${text.replace(
        /&/g,
        "&amp;"
      )}</prosody>
          </voice>
        </speak>`;
      const resp = await fetch(
        `https://${azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`,
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": azureKey,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
            "User-Agent": "e-learning-tts",
          },
          body: ssml,
        }
      );
      if (!resp.ok) throw new Error("Azure TTS failed");
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      if (!audioRef.current) audioRef.current = new Audio();
      const audio = audioRef.current;
      audio.src = url;
      audio.onended = () => {
        setSpeaking(false);
        setPaused(false);
        URL.revokeObjectURL(url);
      };
      await audio.play();
    } catch (e) {
      console.error(e);
      setSpeaking(false);
      setPaused(false);
    }
  };

  const pause = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setPaused(true);
      return;
    }
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setPaused(true);
    }
  };
  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      return;
    }
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
      setPaused(false);
    }
  };
  const stop = () => {
    window.speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSpeaking(false);
    setPaused(false);
  };

  const playMp3Url = async (url) => {
    try {
      if (!audioRef.current) audioRef.current = new Audio();
      const audio = audioRef.current;
      audio.src = url;
      setSpeaking(true);
      setPaused(false);
      audio.onended = () => {
        setSpeaking(false);
        setPaused(false);
      };
      await audio.play();
    } catch (e) {
      console.error(e);
      setSpeaking(false);
      setPaused(false);
    }
  };

  return {
    voices,
    voiceIndex,
    setVoiceIndex,
    speak,
    pause,
    resume,
    stop,
    speaking,
    paused,
    hasVietnameseLocal,
    azureKey,
    azureRegion,
    setAzureKey: (k) => {
      setAzureKey(k);
      localStorage.setItem("azure_tts_key", k);
    },
    setAzureRegion: (r) => {
      setAzureRegion(r);
      localStorage.setItem("azure_tts_region", r);
    },
    playMp3Url,
  };
}

// ==========================
// PARTICLE BACKGROUND
// ==========================
function ParticleBG() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, raf;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0005,
    }));
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const draw = (t = 0) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const gx = p.x * w,
          gy = p.y * h;
        const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, 50);
        grd.addColorStop(0, "rgba(255,215,0,0.6)");
        grd.addColorStop(1, "rgba(255,0,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(gx, gy, 50, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-70 pointer-events-none"
      aria-hidden="true"
    />
  );
}

// ==========================
// NAVBAR
// ==========================
function Navbar() {
  const items = [
    { id: "home", label: "Trang chủ" },
    { id: "bio", label: "Cuộc đời" },
    { id: "contributions", label: "Cống hiến" },
    { id: "gallery", label: "Hình ảnh" },
    { id: "events", label: "Sự kiện" },
    { id: "thought", label: "Tư tưởng" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur border-b border-white/10 bg-[rgba(10,10,10,0.4)]">
      <nav className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded-xl"
          >
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-3)] shadow-lg" />
            <span className="text-white font-bold tracking-wide">
              Trường Chinh
            </span>
          </Link>
          <button
            className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Mở menu"
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </button>
          <ul className={classNames("md:flex gap-4 hidden", open && "block")}>
            {items.map((it) => (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  className="text-white/80 hover:text-white px-3 py-2 rounded-xl hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                >
                  {it.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/team"
                className="text-white/80 hover:text-white px-3 py-2 rounded-xl hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                Thành viên
              </Link>
            </li>
            <li>
              <Link
                to="/quiz"
                className="text-white/80 hover:text-white px-3 py-2 rounded-xl hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                Trắc nghiệm
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

// ==========================
// AI NARRATOR AVATAR
// ==========================
function NarratorAvatar({ speaking }) {
  return (
    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-3)] shadow-2xl ring-4 ring-white/20 overflow-hidden">
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        animate={{ opacity: speaking ? [0.3, 0.9, 0.3] : 0.2 }}
        transition={{ duration: 1.2, repeat: speaking ? Infinity : 0 }}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {[...Array(6)].map((_, i) => (
            <motion.rect
              key={i}
              x={i * 20 + 10}
              y={30}
              width={10}
              height={60}
              rx={4}
              animate={{ height: speaking ? [20, 90, 20] : 30 }}
              transition={{
                duration: 0.8 + i * 0.05,
                repeat: speaking ? Infinity : 0,
                repeatType: "reverse",
              }}
              fill="white"
              opacity={0.8}
            />
          ))}
        </svg>
      </motion.div>
      <div className="absolute inset-0 grid place-items-center text-black/80 font-bold">
        AI
      </div>
    </div>
  );
}

// ==========================
// HERO SECTION
// ==========================
function Hero({ onTogglePlay, playing }) {
  const { ref, offset } = useParallax(0.15);
  return (
    <section id="home" ref={ref} className="relative pt-24 pb-24 md:pb-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_400px_at_50%_-10%,rgba(255,0,0,0.25),transparent)]" />
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            style={{ transform: `translateY(${offset * 0.05}px)` }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
              Trường Chinh
              <span className="block mt-2 text-2xl md:text-3xl text-[var(--accent-3)]">
                Nhà lãnh đạo kiệt xuất của cách mạng Việt Nam
              </span>
            </h1>
            <p className="mt-4 text-white/80 max-w-prose">
              Từ một học giả trẻ tuổi đến người hoạch định đường lối Đổi mới –
              hành trình của trí tuệ, bản lĩnh và trách nhiệm lịch sử.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={onTogglePlay}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-black font-semibold hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}{" "}
                {playing ? "Tạm dừng" : "Nghe kể chuyện"}
              </button>
              <a
                href="#events"
                className="text-white/80 hover:text-white underline decoration-[var(--accent-3)]/70 underline-offset-4"
              >
                Khám phá mốc sự kiện
              </a>
            </div>
            {/* <div className="mt-6 flex items-center gap-3 text-xs text-white/70">
              <Info size={16} /> Nguồn: Wikipedia ({DATA.metadata.article}) –{" "}
              {DATA.metadata.license}
            </div> */}
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-black via-neutral-900 to-black border border-white/10 shadow-2xl overflow-hidden">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6a/TruongChinh1955.jpg"
                alt="Trường Chinh (1955)"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent),radial-gradient(circle_at_80%_60%,rgba(255,0,0,0.15),transparent)]" />
              <div className="absolute left-6 top-6 flex items-center gap-3">
                <NarratorAvatar speaking={playing} />
                <div className="text-white/90">
                  <div className="font-semibold text-black">
                    Nhân vật Trường Chinh
                  </div>
                </div>
              </div>
              <svg
                className="absolute bottom-0 right-0 w-4/5"
                viewBox="0 0 600 300"
                aria-hidden
              >
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="var(--accent-3)" />
                    <stop offset="100%" stopColor="var(--accent-2)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,220 C120,260 180,120 300,180 C420,240 480,160 600,210 L600,300 L0,300 Z"
                  fill="url(#g)"
                  opacity="0.25"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==========================
// BIOGRAPHY SECTION (alternating cards)
// ==========================
function BioCard({ title, content, side = "left", id, active, imageUrl }) {
  return (
    <motion.article
      id={id}
      className={classNames(
        "grid md:grid-cols-2 gap-6 items-center my-10",
        side === "left" ? "" : "md:grid-flow-dense"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={classNames(
          "p-6 rounded-3xl bg-white/5 backdrop-blur border border-white/10",
          active && "ring-4 ring-[var(--accent)]/60"
        )}
        aria-live={active ? "polite" : "off"}
      >
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-white/80 leading-relaxed">{content}</p>
      </div>
      <div className="p-6">
        {imageUrl ? (
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[color-mix(in_oklab,var(--accent-2)_60%,transparent)] to-[color-mix(in_oklab,var(--accent-3)_35%,transparent)] border border-white/10 grid place-items-center">
            <ImgIcon className="w-12 h-12 text-white/80" />
          </div>
        )}
      </div>
    </motion.article>
  );
}

function BiographySection({ highlightId }) {
  const blocks = [
    {
      id: "than-the",
      title: "Thân thế & Quê quán",
      content: DATA.than_the,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/THPT_chuy%C3%AAn_L%C3%AA_H%E1%BB%93ng_Phong_%281923-1926%29.jpg/250px-THPT_chuy%C3%AAn_L%C3%AA_H%E1%BB%93ng_Phong_%281923-1926%29.jpg",
    },
    {
      id: "cach-mang",
      title: "Con đường hoạt động cách mạng",
      content: DATA.tham_gia_hoat_dong_cach_mang,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9v0M6PC0opRSyzkMHHU_94FMO-QmQE6r62w&s",
    },
    {
      id: "lanh-dao",
      title: "Trở thành lãnh đạo chủ chốt",
      content: DATA.tro_thanh_lanh_dao_chu_chot,
      imageUrl: "https://tuyenquang.dcs.vn/Image/Large/202442695950_146301.JPG",
    },
    {
      id: "ccrd",
      title: "Vai trò trong Cải cách ruộng đất",
      content: DATA.vai_tro_trong_cai_cach_ruong_dat,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/C%E1%BA%A3i_c%C3%A1ch_ru%E1%BB%99ng_%C4%91%E1%BA%A5t_th%E1%BA%AFng_l%E1%BB%A3i%2C_n%C3%B4ng_d%C3%A2n_vui_s%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91t_v%C4%83n_t%E1%BB%B1_c%C5%A9.jpg/250px-C%E1%BA%A3i_c%C3%A1ch_ru%E1%BB%99ng_%C4%91%E1%BA%A5t_th%E1%BA%AFng_l%E1%BB%A3i%2C_n%C3%B4ng_d%C3%A2n_vui_s%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91t_v%C4%83n_t%E1%BB%B1_c%C5%A9.jpg",
    },
    {
      id: "nhung-nam",
      title: "Những năm tiếp theo",
      content: DATA.nhung_nam_tiep_theo,
      imageUrl:
        "https://nguonluc.com.vn/uploads/images/blog/huongtra/2024/11/12/truong-chinh-1-1731403946.jpg",
    },
    {
      id: "cuoi-doi",
      title: "Hoạt động cuối đời & Đổi mới",
      content: DATA.hoat_dong_cuoi_doi,
      imageUrl:
        "https://static.mattran.org.vn/zoom/540/uploaded/dieptmh/2022_02_09/dc-truong-chinh_uxly.jpg",
    },
  ];
  return (
    <section id="bio" className="py-16 md:py-24 max-w-6xl mx-auto px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">
        Cuộc đời
      </h2>
      {blocks.map((b, i) => (
        <BioCard
          key={b.id}
          id={b.id}
          title={b.title}
          content={b.content}
          side={i % 2 ? "right" : "left"}
          active={highlightId === b.id}
          imageUrl={b.imageUrl}
        />
      ))}
    </section>
  );
}

// ==========================
// TIMELINE with modal
// ==========================
function Timeline({ onSelect }) {
  return (
    <section
      id="events"
      className="py-16 md:py-24 bg-white/5 border-y border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 flex items-center gap-2">
          <Calendar /> Sự kiện
        </h2>
        <p className="text-white/70 mb-8">
          Chạm vào mốc để xem chi tiết và nghe thuyết minh.
        </p>
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[color-mix(in_oklab,var(--accent-3)_70%,transparent)] to-[color-mix(in_oklab,var(--accent-2)_70%,transparent)] rounded-full" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative">
            {TIMELINE.map((m, idx) => (
              <motion.button
                key={idx}
                onClick={() => onSelect(m)}
                className="group relative p-4 rounded-2xl bg-black/40 backdrop-blur border border-white/10 hover:border-[var(--accent)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.02 }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-3)] shadow" />
                <div className="text-[var(--accent-3)] font-bold text-lg">
                  {m.year}
                </div>
                <div className="text-white mt-1 font-semibold">{m.title}</div>
                <p className="text-white/70 text-sm mt-1 line-clamp-3">
                  {m.text}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Modal({ open, onClose, children, title }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-2xl rounded-3xl bg-neutral-900 border border-white/10 p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                Đóng
              </button>
            </div>
            <div className="mt-4 text-white/80">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ==========================
// CONTRIBUTIONS & THOUGHT
// ==========================
function Contributions() {
  const items = [
    {
      title: "Đường lối kháng chiến",
      text: "Tổng kết trong 'Kháng chiến nhất định thắng lợi' (1947) – định hướng chiến tranh nhân dân.",
    },
    {
      title: "Văn hóa & tư tưởng",
      text: "'Đề cương văn hóa Việt Nam' (1943) – đặt nền cho văn hóa mới.",
    },
    {
      title: "Kinh tế & Đổi mới",
      text: "Vai trò định hướng tại Đại hội VI (1986): kinh tế nhiều thành phần, đổi mới quản lý.",
    },
    {
      title: "Lý luận chính trị",
      text: "Hệ thống hóa quan điểm phát triển và xây dựng nhà nước XHCN.",
    },
  ];
  return (
    <section
      id="contributions"
      className="py-16 md:py-24 max-w-6xl mx-auto px-4 md:px-6"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
        Cống hiến
      </h2>
      <p className="text-white/70 mb-6">
        Tác phẩm tiêu biểu và đóng góp về đường lối, lý luận, văn hóa.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-3xl bg-white/5 border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold text-xl">{it.title}</h3>
            <p className="text-white/80 mt-2">{it.text}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8">
        <h3 id="thought" className="text-2xl font-bold text-white mb-3">
          Tư tưởng nổi bật
        </h3>
        <ul className="list-disc pl-6 text-white/80 space-y-2">
          <li>
            Phát triển kinh tế nhiều thành phần, chuyển đổi cơ cấu đầu tư.
          </li>
          <li>Đổi mới quản lý theo cơ chế tự chủ, mở.</li>
          <li>Chiến tranh nhân dân, toàn dân – toàn diện – lâu dài.</li>
        </ul>
      </div>
    </section>
  );
}

// ==========================
// GALLERY & QUOTES
// ==========================
function Gallery({ onOpenModal }) {
  const works = DATA.sang_tac_van_tho;
  const imageMap = {
    "Chống chủ nghĩa cải lương (1935)":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/1935_Events_Collage_V_1.0.jpg/480px-1935_Events_Collage_V_1.0.jpg",
    "Vấn đề dân cày (cùng Võ Nguyên Giáp, 1938)":
      "https://hoinhap.vanhoavaphattrien.vn/uploads/images/2021/08/21/dan-cay-1629565176.jpg",
    "Chính sách mới của Đảng (1941)":
      "https://baonamdinh.vn/file/e7837c02816d130b0181a995d7ad7e96/dataimages//202101/original/images1329492___ng_ch__Tr__ng_Chinh_t_i___i_h_i_IV__o_n_Thanh_ni_n_C_ng_s_n_H__Ch__Minh__ng_y_20_10_1980_.jpg",
    "Đề cương văn hóa Việt Nam (1943)":
      "https://vhnt.daklak.gov.vn/CMS/Content/tacgiatacpham/%C4%91%E1%BB%81%20c%C6%B0%C6%A1ng%20vh%20vn%201943.jpg",
    "Kháng chiến nhất định thắng lợi (1947)":
      "https://file-dangcongsan.nhandan.vn/data/0/images/2020/04/20/huyennt/khang-chien-nhat-dinh-thang-loi.gif",
    "Chủ nghĩa Mác và vấn đề văn hóa Việt Nam (1948)":
      "https://hnm.1cdn.vn/2023/02/23/hanoimoi.com.vn-uploads-images-buivietnga-2023-02-23-_img_8704-1-.jpg",
    "Bàn về cách mạng Việt Nam (1951)":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr2shZoOOQ_0rJZ7gyO5QnwMTGQqudumOpA&s",
  };
  const detailMap = {
    "Chống chủ nghĩa cải lương (1935)":
      '"Chống chủ nghĩa cải lương (1935)" ám chỉ sự phản đối đối với tư tưởng cải cách chính trị, đặc biệt là trong phong trào công nhân, được các nhà tư tưởng cách mạng phản bác vào khoảng thời gian này. Thay vì tập trung vào đấu tranh giai cấp để lật đổ chế độ tư bản, chủ nghĩa cải lương ủng hộ những cải cách nhỏ lẻ, không động chạm đến gốc rễ của hệ thống bóc lột.',
    "Vấn đề dân cày (cùng Võ Nguyên Giáp, 1938)":
      '"Vấn đề dân cày" (1938), được Trường Chinh (Qua Ninh) và Võ Nguyên Giáp (Vân Đình) đồng sáng tác, là một tác phẩm lý luận quan trọng của Đảng Cộng sản Đông Dương. Nội dung phân tích sâu thực trạng bóc lột ở nông thôn dưới thời Pháp thuộc, khẳng định vai trò to lớn của giai cấp nông dân trong cách mạng giải phóng dân tộc; phê phán quan điểm coi thường dân cày và nhấn mạnh nhiệm vụ phản đế, trong đó vấn đề ruộng đất và giải phóng dân cày giữ vai trò cốt yếu, định hướng cho đường lối cách mạng của Đảng.',
    "Chính sách mới của Đảng (1941)":
      '"Chính sách mới của Đảng" (1941), do Tổng Bí thư Trường Chinh chấp bút, nhằm phổ biến Nghị quyết Hội nghị Trung ương 8, đánh dấu sự chuyển hướng chiến lược cách mạng triệt để: đặt nhiệm vụ giải phóng dân tộc lên hàng đầu; chủ trương thành lập Mặt trận Việt Minh để đoàn kết toàn dân; xây dựng lực lượng chính trị và vũ trang, chuẩn bị mọi mặt cho tổng khởi nghĩa khi thời cơ đến.',
    "Đề cương văn hóa Việt Nam (1943)":
      '"Đề cương văn hóa Việt Nam" (1943), do Tổng Bí thư Trường Chinh khởi thảo và được Ban Thường vụ Trung ương Đảng thông qua, là cương lĩnh đầu tiên của Đảng về văn hóa. Văn kiện nêu mục tiêu xây dựng nền văn hóa mới, chống văn hóa nô dịch, phong kiến, thoái bộ; dựa trên ba nguyên tắc: Dân tộc hóa, Khoa học hóa và Đại chúng hóa. Đề cương đề ra nhiệm vụ về tư tưởng, văn nghệ, ngôn ngữ và khẳng định vai trò lãnh đạo của Đảng, mở đường cho sự phát triển nền văn hóa cách mạng Việt Nam.',
    "Kháng chiến nhất định thắng lợi (1947)":
      'Tác phẩm "Kháng chiến nhất định thắng lợi" xuất bản 9/1947 do Tổng Bí thư Trường Chinh chấp bút, tập hợp các bài trên báo Sự thật (3–8/1947). Sách phân tích đường lối, phương châm, chiến lược và chiến thuật của cuộc kháng chiến chống thực dân Pháp, khẳng định niềm tin vào thắng lợi cuối cùng; được coi là văn kiện lịch sử có giá trị lý luận và thực tiễn lớn trong suốt thời kỳ kháng chiến.',
    "Chủ nghĩa Mác và vấn đề văn hóa Việt Nam (1948)":
      '"Chủ nghĩa Mác và vấn đề văn hóa Việt Nam" (1948) là báo cáo tại Hội nghị Văn hóa toàn quốc lần II. Tác phẩm vận dụng chủ nghĩa Mác–Lênin vào lĩnh vực văn hóa, phát triển và cụ thể hóa "Đề cương về Văn hóa Việt Nam" (1943), khẳng định ba tính chất cốt lõi của nền văn hóa mới (dân tộc, khoa học, đại chúng), đề cao vai trò xung kích của văn hóa trong kháng chiến và kiến quốc, phê phán các quan điểm sai lầm và định hướng công tác văn hóa, văn nghệ của Đảng.',
    "Bàn về cách mạng Việt Nam (1951)":
      '"Bàn về cách mạng Việt Nam" (1951) là báo cáo quan trọng của Trường Chinh trình bày tại Đại hội II Đảng Lao động Việt Nam. Báo cáo nhấn mạnh nhiệm vụ cơ bản của cách mạng: đánh đuổi đế quốc Pháp, giành độc lập và thống nhất, xóa bỏ tàn dư phong kiến để xây dựng chế độ dân chủ nhân dân, chuẩn bị cơ sở cho CNXH. Cùng năm, kháng chiến ghi dấu sự thành lập Mặt trận Liên Việt và chiến dịch Hòa Bình.',
  };
  return (
    <section
      id="gallery"
      className="py-16 md:py-24 bg-white/5 border-y border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 flex items-center gap-2">
          <ImgIcon /> Hình ảnh & Tác phẩm
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {works.map((w, i) => (
            <motion.div
              key={i}
              onClick={() => {
                const body = detailMap[w];
                if (body && onOpenModal) onOpenModal(w, body);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  const body = detailMap[w];
                  if (body && onOpenModal) onOpenModal(w, body);
                }
              }}
              className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900 to-black hover:border-[var(--accent)]/60 cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[3/4] relative">
                {imageMap[w] ? (
                  <img
                    src={imageMap[w]}
                    alt={w}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,0,0,0.3),transparent)]" />
                    <div className="w-16 h-16 rounded-full bg-yellow-300/80" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="text-white font-semibold">
                  {w.split("(")[0].trim()}
                </h4>
                <p className="text-white/60 text-sm">{w}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 p-6 rounded-3xl bg-white/5 border border-white/10">
          <blockquote className="text-xl text-white/90 italic">
            “Đổi mới là yêu cầu sống còn của cách mạng.”
          </blockquote>
          <p className="text-white/60 mt-2">
            — Định hướng tại Đại hội VI (1986)
          </p>
        </div>
      </div>
    </section>
  );
}

// ==========================
// AUDIO / TTS CONTROLS
// ==========================
function AudioTTS({ segments, onBoundarySection, tts, fullText }) {
  const {
    voices,
    voiceIndex,
    setVoiceIndex,
    speak,
    pause,
    resume,
    stop,
    speaking,
    paused,
    hasVietnameseLocal,
    azureKey,
    azureRegion,
    setAzureKey,
    setAzureRegion,
    playMp3Url,
  } = tts;
  const [muted, setMuted] = useState(false);
  const [mp3Url, setMp3Url] = useState("");

  const handleSpeak = () => {
    if (speaking && !paused) {
      pause();
      return;
    }
    if (paused) {
      resume();
      return;
    }
    speak(fullText, (e) => {
      // Simple boundary mapping by rough proportion
      const progress = e.charIndex / fullText.length;
      const idx = Math.min(
        segments.length - 1,
        Math.floor(progress * segments.length)
      );
      onBoundarySection?.(segments[idx].id);
    });
  };

  return (
    <section
      id="audio"
      className="py-16 md:py-24 max-w-6xl mx-auto px-4 md:px-6"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
        Âm thanh – Trợ lý thuyết minh
      </h2>
      <p className="text-white/70 mb-4">
        Bật nghe để website tự động highlight phần tương ứng.
      </p>
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-3xl bg-white/5 border border-white/10">
        <button
          onClick={handleSpeak}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold hover:shadow focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          {speaking && !paused ? <Pause size={18} /> : <Play size={18} />}{" "}
          {speaking && !paused
            ? "Tạm dừng"
            : paused
              ? "Tiếp tục"
              : "Bắt đầu đọc"}
        </button>
        <button
          onClick={() => {
            const blob = new Blob([fullText], {
              type: "text/plain;charset=utf-8",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "truong-chinh-noi-dung.txt";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          Tải văn bản .txt
        </button>
        <button
          onClick={stop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <Square size={18} /> Dừng
        </button>
        <button
          onClick={() => setMuted(!muted)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}{" "}
          {muted ? "Tắt tiếng" : "Âm lượng"}
        </button>
        <div className="ml-auto flex items-center gap-2 text-white/80">
          <Mic2 size={18} />
          <label className="text-sm" htmlFor="voice">
            Giọng đọc:
          </label>
          <select
            id="voice"
            className="bg-black/40 border border-white/10 rounded-lg px-2 py-1"
            value={voiceIndex}
            onChange={(e) => setVoiceIndex(parseInt(e.target.value))}
          >
            {voices.map((v, i) => (
              <option key={i} value={i}>
                {v.name || v.lang}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <input
          type="url"
          placeholder="Dán URL file MP3 để phát thay cho TTS"
          className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-white/40"
          value={mp3Url}
          onChange={(e) => setMp3Url(e.target.value)}
        />
        <button
          onClick={() => mp3Url && playMp3Url(mp3Url)}
          className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:shadow focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          Phát MP3
        </button>
      </div>
      {!hasVietnameseLocal && (
        <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-white/80 text-sm">
            Trình duyệt không có giọng tiếng Việt. Bạn có thể dùng Azure TTS
            (HoaiMy/vi-VN) bằng cách nhập thông tin dưới đây. Thông tin được lưu
            cục bộ trong trình duyệt.
          </p>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <input
              type="password"
              placeholder="Azure Cognitive Services Key"
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-white/40"
              value={azureKey}
              onChange={(e) => setAzureKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="Azure Region (e.g. eastasia, southeastasia)"
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-white/40"
              value={azureRegion}
              onChange={(e) => setAzureRegion(e.target.value)}
            />
          </div>
          {!azureKey || !azureRegion ? (
            <p className="text-xs text-white/60 mt-2">
              Chưa cấu hình đủ – Narration sẽ dùng giọng mặc định của máy.
            </p>
          ) : (
            <p className="text-xs text-white/60 mt-2">
              Đã cấu hình Azure. Bấm Bắt đầu đọc để dùng giọng vi-VN HoaiMy.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

// ==========================
// FOOTER
// ==========================
function Footer() {
  return (
    <footer className="py-10 text-center text-white/60">
      <div className="flex items-center justify-center gap-2">
        <span>© {new Date().getFullYear()} E-learning Trường Chinh</span>
        <span>•</span>
        <a className="underline decoration-yellow-400/70" href="#bio">
          Tìm hiểu thêm
        </a>
      </div>
      {/* <div className="mt-2 text-xs">
        Nguồn dữ liệu: Wikipedia – CC BY-SA 4.0
      </div> */}
    </footer>
  );
}

// ==========================
// MAIN APP
// ==========================
export default function App() {
  const [modal, setModal] = useState({ open: false, title: "", body: "" });
  const [highlightId, setHighlightId] = useState(null);

  // Simple MP3 player (no AI)
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    audioRef.current = new Audio(narrationMp3);
    const a = audioRef.current;
    a.onended = () => setPlaying(false);
    return () => {
      a.pause();
      a.onended = null;
    };
  }, []);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play();
      setPlaying(true);
    }
  };

  const handleBoundary = (id) => {
    setHighlightId(id);
    const el = document.getElementById(id);
    // Auto-scroll the focused section into view while narrating
    if (el) {
      const rect = el.getBoundingClientRect();
      const topSafe = 96; // leave room for fixed header
      const bottomSafe = 96;
      if (rect.top < topSafe || rect.bottom > window.innerHeight - bottomSafe) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleSelectEvent = (m) => {
    setModal({ open: true, title: `${m.year} – ${m.title}`, body: m.text });
    // Also highlight approximate section by year
    if (m.year < 1941) setHighlightId("cach-mang");
    else if (m.year < 1954) setHighlightId("lanh-dao");
    else if (m.year < 1960) setHighlightId("ccrd");
    else if (m.year < 1985) setHighlightId("nhung-nam");
    else setHighlightId("cuoi-doi");
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[var(--bg-start)] via-[var(--bg-mid)] to-[var(--bg-end)]">
      <ThemeStyles />
      <ParticleBG />
      <Navbar />
      <Hero onTogglePlay={togglePlay} playing={playing} />

      <BiographySection highlightId={highlightId} />

      <Contributions />
      <Gallery
        onOpenModal={(title, body) => setModal({ open: true, title, body })}
      />

      <Timeline onSelect={handleSelectEvent} />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <h3 className="text-2xl font-bold">Di sản & Vinh danh</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-semibold text-white">Huân chương</h4>
              <ul className="list-disc pl-6 text-white/80 mt-2 space-y-1">
                {DATA.vinh_danh.huan_chuong_viet_nam
                  .concat(DATA.vinh_danh.huan_chuong_quoc_te)
                  .map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Khác</h4>
              <ul className="list-disc pl-6 text-white/80 mt-2 space-y-1">
                {DATA.vinh_danh.khac.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 text-xs text-white/60 flex items-center gap-2">
            <ExternalLink size={14} /> Bài viết gốc: {DATA.metadata.source} /{" "}
            {DATA.metadata.article}
          </div>
        </div>
      </section>

      <Footer />

      <Modal
        open={modal.open}
        onClose={() => setModal((s) => ({ ...s, open: false }))}
        title={modal.title}
      >
        <p>{modal.body}</p>
      </Modal>
    </div>
  );
}
