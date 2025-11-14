import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    Image as ImgIcon,
} from "lucide-react";
import narrationMp3 from "./assets/truong_chinh_ten_that_dang_xuan_khu_19071988_5d5601d2-863f-41e1-bbd0-dbe3911644c1.mp3";

// ==========================
// MOCK DATA (from provided JSON)
// ==========================
export const TRUONG_CHINH_DATA = {
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

// Build structured timeline
export const TRUONG_CHINH_TIMELINE = [
    { year: 1907, title: "Sinh ra", text: TRUONG_CHINH_DATA.thong_tin_ca_nhan.sinh },
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
    { year: 1988, title: "Qua đời", text: TRUONG_CHINH_DATA.thong_tin_ca_nhan.mat },
];

// ==========================
// UTILS & HOOKS
// ==========================
export function useParallax(offsetSpeed = 0.2) {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const o = (window.innerHeight - rect.top) * offsetSpeed;
            setOffset(o);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [offsetSpeed]);

    return { ref, offset };
}

export function classNamesUtil(...c) {
    return c.filter(Boolean).join(" ");
}

// Theme styles
export function TruongChinhThemeStyles() {
    return (
        <style>{`/* theme */
      :root {
        --bg-start: #0b0c10;
        --bg-mid: #0b0a0a;
        --bg-end: #050507;
        --panel: rgba(255,255,255,0.05);
        --border: rgba(255,255,255,0.08);
        --muted: rgba(255,255,255,0.78);
        --muted-2: rgba(255,255,255,0.64);
        --accent: #f59e0b;
        --accent-2: #ef4444;
        --accent-3: #facc15;
      }
    `}</style>
    );
}

// Particle background
export function TruongChinhParticleBackground() {
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

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > 1) p.vx *= -1;
                if (p.y < 0 || p.y > 1) p.vy *= -1;
                const gx = p.x * w;
                const gy = p.y * h;
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

// Simple local MP3 hook (for narrationMp3)
export function useSimpleNarration() {
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

    return { playing, togglePlay };
}

// A small BioCard reused by BiographySection
export function TruongChinhBioCard({ title, content, side = "left", id, active, imageUrl }) {
    return (
        <motion.article
            id={id}
            className={classNamesUtil(
                "grid md:grid-cols-2 gap-6 items-center my-10",
                side === "left" ? "" : "md:grid-flow-dense"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div
                className={classNamesUtil(
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
                        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
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

export const TRUONG_CHINH_DOI_MOI_TIMELINE = [
    {
        year: 1983,
        title: "Nhìn lại cơ chế bao cấp",
        text: "Đầu thập niên 1980, nền kinh tế khủng hoảng, lạm phát cao, cơ chế bao cấp bộc lộ nhiều hạn chế; Trường Chinh bắt đầu tổ chức các đoàn đi thực tế, lắng nghe ý kiến cơ sở về đổi mới quản lý kinh tế.",
    },
    {
        year: 1984,
        title: "Tư duy mới về kinh tế",
        text: "Trong nhiều báo cáo và tham luận, ông gợi mở cần chuyển từ cơ chế tập trung quan liêu bao cấp sang cơ chế hạch toán kinh doanh xã hội chủ nghĩa, coi trọng hiệu quả và động lực của người lao động.",
    },
    {
        year: 1985,
        title: "Chuẩn bị cho bước ngoặt",
        text: "Dù cải cách Giá-Lương-Tiền không đạt kết quả như mong muốn, những tổng kết thực tiễn và trao đổi lý luận trong giai đoạn này đặt nền cho việc xây dựng đường lối Đổi mới sau đó.",
    },
    {
        year: 1986,
        title: "Tổng Bí thư của Đổi mới",
        text: "Trên cương vị Tổng Bí thư trước và trong Đại hội VI, Trường Chinh chủ trì quá trình chuẩn bị văn kiện, định hướng chấp nhận đổi mới toàn diện, mở đường cho cơ chế kinh tế mới sau 1986.",
    },
];
