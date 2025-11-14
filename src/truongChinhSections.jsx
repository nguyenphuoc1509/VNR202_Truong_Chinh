import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import {
    Play,
    Pause,
    Calendar,
    Image as ImgIcon,
    ExternalLink,
    Quote,
} from "lucide-react";

import {
    TRUONG_CHINH_DATA,
    TRUONG_CHINH_TIMELINE,
    useParallax,
    classNamesUtil,
    TruongChinhParticleBackground,
    TruongChinhThemeStyles,
    TruongChinhBioCard,
    TRUONG_CHINH_DOI_MOI_TIMELINE
} from "./truongChinhDataAndHooks";

// ==========================
// NAVBAR
// ==========================
export function TruongChinhNavbar() {
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
                        <span className="text-white font-bold tracking-wide">Trường Chinh</span>
                    </Link>

                    <button
                        className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10"
                        onClick={() => setOpen(!open)}
                        aria-label="Mở menu"
                    >
                        {open ? "<" : ">"}
                    </button>

                    <ul className={classNamesUtil("md:flex gap-4 hidden", open && "block")}>
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
// HERO & AVATAR
// ==========================
function TruongChinhNarratorAvatar({ speaking }) {
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

export function TruongChinhHeroSection({ onTogglePlay, playing }) {
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
                            Từ một học giả trẻ tuổi đến người hoạch định đường lối Đổi mới – hành trình
                            của trí tuệ, bản lĩnh và trách nhiệm lịch sử.
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
                                <TruongChinhNarratorAvatar speaking={playing} />
                                <div className="text-white/90">
                                    <div className="font-semibold text-black">Nhân vật Trường Chinh</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function TruongChinhIntroSection() {
    return (
        <section
            id="intro"
            className="py-12 md:py-16 max-w-6xl mx-auto px-4 md:px-6"
        >
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                        Giới thiệu dự án
                    </h2>
                    <p className="text-white/80 mb-3">
                        Dự án E-learning về Trường Chinh được xây dựng với mục tiêu giúp
                        học sinh, sinh viên tiếp cận kiến thức lịch sử một cách trực quan,
                        sinh động và dễ ghi nhớ hơn so với cách đọc tài liệu truyền thống.
                    </p>
                    <p className="text-white/80 mb-3">
                        Nhóm lựa chọn nhân vật Trường Chinh vì đây là một trong những nhà
                        lãnh đạo có vai trò đặc biệt quan trọng trong cách mạng Việt Nam:
                        từ Cách mạng Tháng Tám, kháng chiến chống Pháp, cải cách ruộng đất
                        đến giai đoạn mở đường cho công cuộc Đổi mới năm 1986. Việc tìm hiểu
                        sâu về cuộc đời và tư tưởng của ông giúp hiểu rõ hơn những bước ngoặt
                        lớn trong lịch sử hiện đại Việt Nam.
                    </p>
                </div>

                <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
                    <h3 className="text-xl font-bold text-white mb-3">
                        Công nghệ sử dụng
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-white/80 text-sm">
                        <li>
                            React + Vite: xây dựng giao diện đơn trang (SPA), tối ưu hiệu năng
                            và trải nghiệm người dùng.
                        </li>
                        <li>
                            Tailwind CSS: thiết kế giao diện nhanh, thống nhất và dễ tùy biến
                            theo chủ đề lịch sử.
                        </li>
                        <li>
                            Framer Motion: tạo hiệu ứng chuyển động, timeline, thẻ nội dung
                            mượt mà giúp bài học sinh động hơn.
                        </li>
                        <li>
                            React Router: tổ chức nhiều trang như Trang chủ, Đội ngũ, Trắc nghiệm
                            trong cùng một ứng dụng.
                        </li>
                        <li>
                            Text-to-Speech/Audio narration: hỗ trợ người học nghe kể chuyện,
                            phù hợp với người thích học qua âm thanh.
                        </li>
                        <li>
                            Chatbot AI: hỗ trợ trả lời câu hỏi liên quan tới chủ đề
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}


// ==========================
// BIOGRAPHY SECTION
// ==========================
export function TruongChinhBiographySection({ highlightId }) {
    const blocks = [
        {
            id: "than-the",
            title: "Thân thế & Quê quán",
            content: TRUONG_CHINH_DATA.than_the,
            imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/THPT_chuy%C3%AAn_L%C3%AA_H%E1%BB%93ng_Phong_%281923-1926%29.jpg/250px-THPT_chuy%C3%AAn_L%C3%AA_H%E1%BB%93ng_Phong_%281923-1926%29.jpg",
        },
        {
            id: "cach-mang",
            title: "Con đường hoạt động cách mạng",
            content: TRUONG_CHINH_DATA.tham_gia_hoat_dong_cach_mang,
            imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9v0M6PC0opRSyzkMHHU_94FMO-QmQE6r62w&s",
        },
        {
            id: "lanh-dao",
            title: "Trở thành lãnh đạo chủ chốt",
            content: TRUONG_CHINH_DATA.tro_thanh_lanh_dao_chu_chot,
            imageUrl: "https://tuyenquang.dcs.vn/Image/Large/202442695950_146301.JPG",
        },
        {
            id: "ccrd",
            title: "Vai trò trong Cải cách ruộng đất",
            content: TRUONG_CHINH_DATA.vai_tro_trong_cai_cach_ruong_dat,
            imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/C%E1%BA%A3i_c%C3%A1ch_ru%E1%BB%99ng_%C4%91%E1%BA%A5t_th%E1%BA%AFng_l%E1%BB%A3i%2C_n%C3%B4ng_d%C3%A2n_vui_s%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91t_v%C4%83n_t%E1%BB%B1_c%C5%A9.jpg/250px-C%E1%BA%A3i_c%C3%A1ch_ru%E1%BB%99ng_%C4%91%E1%BA%A5t_th%E1%BA%AFng_l%E1%BB%A3i%2C_n%C3%B4ng_d%C3%A2n_vui_s%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91t_v%C4%83n_t%E1%BB%B1_c%C5%A9.jpg",
        },
        {
            id: "nhung-nam",
            title: "Những năm tiếp theo",
            content: TRUONG_CHINH_DATA.nhung_nam_tiep_theo,
            imageUrl:
                "https://nguonluc.com.vn/uploads/images/blog/huongtra/2024/11/12/truong-chinh-1-1731403946.jpg",
        },
        {
            id: "cuoi-doi",
            title: "Hoạt động cuối đời & Đổi mới",
            content: TRUONG_CHINH_DATA.hoat_dong_cuoi_doi,
            imageUrl:
                "https://static.mattran.org.vn/zoom/540/uploaded/dieptmh/2022_02_09/dc-truong-chinh_uxly.jpg",
        },
    ];

    return (
        <section id="bio" className="py-16 md:py-24 max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">Cuộc đời</h2>
            {blocks.map((b, i) => (
                <TruongChinhBioCard
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
// TIMELINE & MODAL
// ==========================
export function TruongChinhTimelineSection({ onSelect }) {
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
                        {TRUONG_CHINH_TIMELINE.map((m, idx) => (
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
                                <div className="text-[var(--accent-3)] font-bold text-lg">{m.year}</div>
                                <div className="text-white mt-1 font-semibold">{m.title}</div>
                                <p className="text-white/70 text-sm mt-1 line-clamp-3">{m.text}</p>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function TruongChinhModal({ open, onClose, children, title }) {
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
// CONTRIBUTIONS & GALLERY & FOOTER
// ==========================
export function TruongChinhContributionsSection() {
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
                    <li>Phát triển kinh tế nhiều thành phần, chuyển đổi cơ cấu đầu tư.</li>
                    <li>Đổi mới quản lý theo cơ chế tự chủ, mở.</li>
                    <li>Chiến tranh nhân dân, toàn dân – toàn diện – lâu dài.</li>
                </ul>
            </div>
        </section>
    );
}

export function TruongChinhGallerySection({ onOpenModal }) {
    const works = TRUONG_CHINH_DATA.sang_tac_van_tho;

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

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
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
                    <p className="text-white/60 mt-2">— Định hướng tại Đại hội VI (1986)</p>
                </div>
            </div>
        </section>
    );
}

export function TruongChinhFooter() {
    return (
        <footer className="py-10 text-center text-white/60">
            <div className="flex items-center justify-center gap-2">
                <span>© {new Date().getFullYear()} E-learning Trường Chinh</span>
                <span>•</span>
                <a className="underline decoration-yellow-400/70" href="#bio">
                    Tìm hiểu thêm
                </a>
            </div>
        </footer>
    );
}

export function TruongChinhLegacySection() {
    return (
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-12">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold">Di sản & Vinh danh</h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 className="font-semibold text-white">Huân chương</h4>
                        <ul className="list-disc pl-6 text-white/80 mt-2 space-y-1">
                            {TRUONG_CHINH_DATA.vinh_danh.huan_chuong_viet_nam
                                .concat(TRUONG_CHINH_DATA.vinh_danh.huan_chuong_quoc_te)
                                .map((x, i) => (
                                    <li key={i}>{x}</li>
                                ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">Khác</h4>
                        <ul className="list-disc pl-6 text-white/80 mt-2 space-y-1">
                            {TRUONG_CHINH_DATA.vinh_danh.khac.map((x, i) => (
                                <li key={i}>{x}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-4 text-xs text-white/60 flex items-center gap-2">
                    <ExternalLink size={14} /> Bài viết gốc: {TRUONG_CHINH_DATA.metadata.source} /{" "}
                    {TRUONG_CHINH_DATA.metadata.article}
                </div>
            </div>
        </section>
    );
}

export function TruongChinhDoiMoiSection() {
    return (
        <section
            id="doi-moi"
            className="py-16 md:py-24 bg-white/5 border-y border-white/10"
        >
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Tiêu đề & mô tả ngắn */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 flex items-center gap-3">
                            <TrendingUp className="text-[var(--accent-3)]" />
                            Trường Chinh và Đổi mới
                        </h2>
                        <p className="text-white/80 max-w-xl">
                            Giai đoạn đầu – giữa thập niên 1980, Trường Chinh là một trong
                            những người đặt nền móng cho công cuộc Đổi mới: từ việc nhìn lại
                            cơ chế bao cấp, tổng kết thực tiễn đến chuẩn bị đường lối tại
                            Đại hội VI (1986).
                        </p>
                    </div>
                    <div className="text-sm text-white/70 bg-black/30 border border-white/10 rounded-2xl px-4 py-3 max-w-sm">
                        Phần này tập trung vào những mốc tư duy quan trọng của Trường Chinh
                        trong chuyển đổi từ cơ chế tập trung bao cấp sang đường lối Đổi mới.
                    </div>
                </div>

                {/* Timeline ngang */}
                <div className="relative overflow-x-auto pb-4">
                    <div className="min-w-[680px]">
                        {/* Trục chính */}
                        <div className="relative h-1 bg-gradient-to-r from-[var(--accent-3)]/70 via-[var(--accent)]/70 to-[var(--accent-2)]/70 rounded-full mb-10" />

                        <div className="grid grid-cols-4 gap-6">
                            {TRUONG_CHINH_DOI_MOI_TIMELINE.map((m, idx) => (
                                <motion.div
                                    key={m.year}
                                    className="relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.45, delay: idx * 0.04 }}
                                >
                                    {/* Điểm trên trục */}
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full bg-[var(--accent-3)] shadow-lg shadow-[var(--accent-3)]/60" />
                                        <span className="mt-2 text-xs font-semibold text-white/80">
                                            {m.year}
                                        </span>
                                    </div>

                                    {/* Card nội dung */}
                                    <div className="mt-6 p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-[var(--accent)]/60 transition-colors h-full flex flex-col">
                                        <h3 className="text-white font-semibold mb-2">
                                            {m.title}
                                        </h3>
                                        <p className="text-white/75 text-sm leading-relaxed flex-1">
                                            {m.text}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Box tổng kết nhanh */}
                <div className="mt-10 grid md:grid-cols-3 gap-5">
                    <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                        <h4 className="text-white font-semibold mb-1">Bối cảnh</h4>
                        <p className="text-white/75 text-sm">
                            Kinh tế khó khăn, lạm phát cao, cơ chế bao cấp bộc lộ nhiều hạn
                            chế, đòi hỏi phải thay đổi tư duy quản lý và tổ chức sản xuất.
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                        <h4 className="text-white font-semibold mb-1">
                            Đổi mới tư duy kinh tế
                        </h4>
                        <p className="text-white/75 text-sm">
                            Trường Chinh nhấn mạnh hạch toán kinh doanh, coi trọng động lực
                            người lao động, mở đường cho kinh tế nhiều thành phần vận hành
                            theo cơ chế thị trường có quản lý.
                        </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                        <h4 className="text-white font-semibold mb-1">
                            Vai trò tại Đại hội VI
                        </h4>
                        <p className="text-white/75 text-sm">
                            Trên cương vị Tổng Bí thư chuẩn bị Đại hội VI, ông góp phần định
                            hình đường lối Đổi mới – một bước ngoặt lịch sử của đất nước.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}