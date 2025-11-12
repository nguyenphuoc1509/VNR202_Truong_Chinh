import React from "react";
import { motion } from "framer-motion";
import { Users, Github, Linkedin, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Dữ liệu thành viên (có thể thay đổi theo nhóm thực tế)
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Nguyễn Tấn Phước",
    role: "Frontend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenTanPhuoc&accessoriesProbability=0&facialHairProbability=50",
    bio: "Chuyên phát triển giao diện người dùng với React và Tailwind CSS. Đam mê tạo ra những trải nghiệm người dùng tuyệt vời.",
    skills: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
    
  },
  {
    id: 2,
    name: "Duy Khánh",
    role: "UI/UX Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DuyKhanh&accessoriesProbability=0&facialHairProbability=50",
    bio: "Thiết kế giao diện và trải nghiệm người dùng. Tập trung vào tính thẩm mỹ và khả năng sử dụng.",
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research"],
    
  },
  {
    id: 3,
    name: "Đỗ Lê Châu Nhật Minh",
    role: "Backend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DoLeChauNhatMinh&accessoriesProbability=0&facialHairProbability=50",
    bio: "Phát triển hệ thống backend và API. Đảm bảo hiệu suất và bảo mật của ứng dụng.",
    skills: ["Node.js", "Python", "Database", "API Design"],
    
  },
  {
    id: 4,
    name: "Võ Quốc Bình",
    role: "Content Writer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=VoQuocBinh&accessoriesProbability=0&facialHairProbability=50",
    bio: "Viết nội dung và nghiên cứu tài liệu lịch sử. Đảm bảo tính chính xác và hấp dẫn của nội dung.",
    skills: ["Content Writing", "Research", "Editing", "Vietnamese History"],
    
  },
];

function TeamMemberCard({ member }) {
  return (
    <motion.div
      className="p-6 rounded-3xl bg-white/5 backdrop-blur border border-white/10 hover:border-[var(--accent)]/60 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-24 h-24 rounded-full border-4 border-[var(--accent)]/30 object-cover"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
            <Users size={16} className="text-black" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-[var(--accent-3)] font-semibold mb-3">
          {member.role}
        </p>
        <p className="text-white/80 text-sm mb-4 leading-relaxed">
          {member.bio}
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {member.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
        {/* <div className="flex items-center gap-3 mt-2">
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label={`GitHub của ${member.name}`}
          >
            <Github size={18} />
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label={`LinkedIn của ${member.name}`}
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${member.email}`}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label={`Email của ${member.name}`}
          >
            <Mail size={18} />
          </a>
        </div> */}
      </div>
    </motion.div>
  );
}

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

export default function TeamMembers() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[var(--bg-start)] via-[var(--bg-mid)] to-[var(--bg-end)]">
      <ThemeStyles />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-24">
        {/* Header */}
        <motion.div
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
            Trường Chinh. Chúng tôi tự hào được làm việc cùng nhau để tạo ra
            một trải nghiệm học tập tuyệt vời.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* Footer Section */}
        <motion.div
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
        </motion.div>
      </div>
    </div>
  );
}

