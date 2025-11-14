import React from "react";
import { motion } from "framer-motion";
import { Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// ===== DỮ LIỆU GIỮ NGUYÊN =====
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Nguyễn Tấn Phước",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenTanPhuoc&accessoriesProbability=0&facialHairProbability=50",
    bio: "Chuyên phát triển giao diện người dùng với React và Tailwind CSS. Đam mê tạo ra những trải nghiệm người dùng tuyệt vời.",
    skills: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 2,
    name: "Phạm	Ngọc Duy Khánh",
    role: "UI/UX Designer",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=DuyKhanh&accessoriesProbability=0&facialHairProbability=50",
    bio: "Thiết kế giao diện và trải nghiệm người dùng. Tập trung vào tính thẩm mỹ và khả năng sử dụng.",
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research"],
  },
  {
    id: 3,
    name: "Đỗ Lê Châu Nhật Minh",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=DoLeChauNhatMinh&accessoriesProbability=0&facialHairProbability=50",
    bio: "Phát triển hệ thống backend và API. Đảm bảo hiệu suất và bảo mật của ứng dụng.",
    skills: ["Node.js", "Python", "Database", "API Design"],
  },
  {
    id: 4,
    name: "Võ Quốc Bình",
    role: "Content Writer",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=VoQuocBinh&accessoriesProbability=0&facialHairProbability=50",
    bio: "Viết nội dung và nghiên cứu tài liệu lịch sử. Đảm bảo tính chính xác và hấp dẫn của nội dung.",
    skills: ["Content Writing", "Research", "Editing", "Vietnamese History"],
  },
];

// ===== THEME (giữ đồng bộ với app chính) =====
function TeamThemeStyles() {
  return (
    <style>{`
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

// ===== COMPONENT CON CARD (cách viết mới) =====
function MemberAvatar({ avatar, name }) {
  return (
    <div className="relative">
      <img
        src={avatar}
        alt={name}
        className="w-24 h-24 rounded-full border-4 border-[var(--accent)]/30 object-cover"
      />
      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-lg">
        <Users size={16} className="text-black" />
      </div>
    </div>
  );
}

function MemberSkills({ skills }) {
  if (!skills?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-3">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function TeamMemberCard({ member, index }) {
  return (
    <motion.article
      className="p-6 rounded-3xl bg-white/5 backdrop-blur border border-white/10 hover:border-[var(--accent)]/60 transition-all flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <MemberAvatar avatar={member.avatar} name={member.name} />

      <h3 className="mt-4 text-xl font-bold text-white">{member.name}</h3>
      <p className="text-[var(--accent-3)] font-semibold mt-1">
        {member.role}
      </p>

      <p className="mt-3 text-white/80 text-sm leading-relaxed">
        {member.bio}
      </p>

      <MemberSkills skills={member.skills} />
    </motion.article>
  );
}

// ===== PAGE CHÍNH =====
export default function TeamMembers() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[var(--bg-start)] via-[var(--bg-mid)] to-[var(--bg-end)]">
      <TeamThemeStyles />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-24">
        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Quay lại trang chủ</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 flex items-center gap-3">
            <Users className="text-[var(--accent-3)]" size={48} />
            Đội ngũ phát triển
          </h1>

          <p className="text-white/80 text-lg max-w-2xl">
            Những người đã góp phần xây dựng và phát triển dự án E-learning về
            Trường Chinh. Nhóm kết hợp kiến thức lịch sử với công nghệ web hiện
            đại để tạo ra trải nghiệm học tập trực quan và dễ tiếp cận.
          </p>
        </motion.header>

        {/* Grid thành viên */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          {TEAM_MEMBERS.map((m, idx) => (
            <TeamMemberCard key={m.id} member={m} index={idx} />
          ))}
        </section>

        {/* Footer Section */}
        <motion.section
          className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Cảm ơn bạn đã ghé thăm!
          </h2>
          <p className="text-white/80 mb-6">
            Nếu bạn có câu hỏi hoặc muốn đóng góp cho dự án, đừng ngần ngại
            liên hệ với chúng tôi.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:shadow-xl transition-all"
          >
            Khám phá dự án
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
