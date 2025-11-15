import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  ArrowLeft,
  Search,
  Brain,
  Mic2,
  Sparkles,
  FileText,
  Volume2,
} from "lucide-react";
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

        {/* AI Applications Section */}
        <motion.section
          className="mt-16 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
              <Sparkles className="text-[var(--accent-3)]" size={40} />
              Ứng dụng AI trong dự án
            </h2>
            <p className="text-white/80 text-lg max-w-3xl">
              Dự án này được xây dựng với sự hỗ trợ của các công nghệ AI hiện đại
              để tối ưu hóa trải nghiệm học tập và truyền tải thông tin.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full inline-block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">
                        <div className="flex items-center gap-2">
                          <Brain size={18} className="text-[var(--accent)]" />
                          Công nghệ AI
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">
                        Mô tả
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">
                        Ứng dụng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <motion.tr
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30">
                            <Search className="text-blue-400" size={24} />
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              Tìm kiếm thông tin
                            </div>
                            <div className="text-xs text-white/60 mt-1">
                              AI Search & Research
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-white/80 text-sm leading-relaxed">
                        Sử dụng AI để tìm kiếm, thu thập và xác minh thông tin về
                        Trường Chinh từ các nguồn đáng tin cậy như Wikipedia, tài
                        liệu lịch sử và các nguồn học thuật.
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30">
                          <FileText size={14} />
                          Thu thập dữ liệu
                        </span>
                      </td>
                    </motion.tr>

                    <motion.tr
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
                            <Brain className="text-purple-400" size={24} />
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              Tổng hợp nội dung
                            </div>
                            <div className="text-xs text-white/60 mt-1">
                              AI Content Summarization
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-white/80 text-sm leading-relaxed">
                        AI giúp phân tích, gom nhóm và tóm tắt các nội dung chính
                        từ nhiều nguồn khác nhau, tạo ra cấu trúc thông tin logic
                        và dễ hiểu cho người học.
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium border border-purple-500/30">
                          <Sparkles size={14} />
                          Xử lý nội dung
                        </span>
                      </td>
                    </motion.tr>

                    <motion.tr
                      className="hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-2)]/20 flex items-center justify-center border border-[var(--accent)]/30">
                            <Mic2 className="text-[var(--accent-3)]" size={24} />
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              Text-to-Speech (TTS)
                            </div>
                            <div className="text-xs text-white/60 mt-1">
                              AI Voice Synthesis
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-white/80 text-sm leading-relaxed">
                        Sử dụng Web Speech API và Azure Cognitive Services TTS
                        để chuyển đổi văn bản thành giọng nói tự nhiên bằng tiếng
                        Việt, hỗ trợ người dùng học tập qua audio.
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--accent)]/20 text-[var(--accent-3)] text-xs font-medium border border-[var(--accent)]/30">
                            <Volume2 size={14} />
                            Web Speech API
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--accent-2)]/20 text-[var(--accent-3)] text-xs font-medium border border-[var(--accent-2)]/30">
                            <Mic2 size={14} />
                            Azure TTS
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <motion.div
              className="p-4 rounded-2xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="text-[var(--accent-3)] font-bold text-lg mb-2">
                100% Tự động
              </div>
              <p className="text-white/70 text-sm">
                Quy trình tìm kiếm và xử lý thông tin được tự động hóa hoàn toàn
              </p>
            </motion.div>

            <motion.div
              className="p-4 rounded-2xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="text-[var(--accent-3)] font-bold text-lg mb-2">
                Độ chính xác cao
              </div>
              <p className="text-white/70 text-sm">
                AI được huấn luyện để đảm bảo thông tin chính xác và đáng tin cậy
              </p>
            </motion.div>

            <motion.div
              className="p-4 rounded-2xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="text-[var(--accent-3)] font-bold text-lg mb-2">
                Trải nghiệm tốt
              </div>
              <p className="text-white/70 text-sm">
                Giọng đọc tự nhiên, dễ nghe, hỗ trợ học tập hiệu quả hơn
              </p>
            </motion.div>
          </div>
        </motion.section>

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
