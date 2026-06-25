import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectGroup, ParentComment, TableInteraction } from "../types";
import { Users, BookOpen, UserCheck, Heart, Send, MessageSquare, Clock, Sparkles, X } from "lucide-react";

interface ProjectDetailsProps {
  group: ProjectGroup;
  comments: ParentComment[];
  interaction: TableInteraction;
  onAddComment: (groupId: string, authorName: string, relationship: ParentComment["relationship"], content: string) => void;
  onAddClap: (groupId: string) => void;
  onRegisterVisit: (groupId: string) => void;
  onClose?: () => void;
}

const PRESET_MESSAGES = [
  "Parabéns, projeto brilhante! Orgulho imenso! 🌟",
  "Excelente apresentação e tema super inovador! 🚀",
  "Trabalho incrível, vocês vão longe! Parabéns aos envolvidos! 👏👏",
  "Muito orgulho de ver toda essa dedicação e pesquisa científica! ❤️",
  "Sensacional! Um tema de extrema importância para a sociedade. 💡",
];

export default function ProjectDetails({
  group,
  comments,
  interaction,
  onAddComment,
  onAddClap,
  onRegisterVisit,
  onClose,
}: ProjectDetailsProps) {
  const [authorName, setAuthorName] = useState("");
  const [relationship, setRelationship] = useState<ParentComment["relationship"]>("Pai/Mãe");
  const [commentText, setCommentText] = useState("");
  const [showClapEffect, setShowClapEffect] = useState(false);

  // Filter comments for this group
  const groupComments = comments.filter((c) => c.groupId === group.id);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;
    onAddComment(group.id, authorName.trim(), relationship, commentText.trim());
    setCommentText("");
  };

  const handleClapClick = () => {
    onAddClap(group.id);
    setShowClapEffect(true);
    setTimeout(() => setShowClapEffect(false), 600);
  };

  const handleSelectPreset = (preset: string) => {
    setCommentText(preset);
  };

  return (
    <div className="bg-transparent overflow-hidden flex flex-col h-full">
      {/* HEADER SECTION */}
      <div className="bg-[linear-gradient(135deg,rgba(20,22,29,0.98),rgba(10,12,16,0.98))] text-white p-6 relative overflow-hidden shrink-0 border-b border-white/[0.08]">
        {/* Subtle grid accent */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }} />
        
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[9px] font-bold uppercase bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 tracking-wider text-indigo-300">
              Stand {group.groupNumber} • {group.classCode}
            </span>
            <div className="flex items-center gap-2">
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1.5 bg-white/[0.05] hover:bg-white/[0.10] rounded-full transition-colors text-slate-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/40 cursor-pointer border border-white/[0.08] shadow-[0_6px_20px_rgba(255,255,255,0.04)]"
                  title="Fechar"
                  type="button"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
          
          <h2 className="font-display text-base sm:text-lg md:text-xl font-extrabold leading-snug tracking-tight text-white">
            {group.title}
          </h2>
          
          <div className="flex items-start sm:items-center gap-2 text-xs text-slate-400 border-t border-white/[0.04] pt-3">
            <UserCheck className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5 sm:mt-0" />
            <span className="leading-relaxed">Orientador(a): <strong className="text-slate-100 font-semibold">{group.advisor || "Sandro Dias Martins"}</strong></span>
          </div>
        </div>
      </div>

      {/* CORE INFO & COMMENTS */}
      <div className="flex-1 p-5 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto bg-transparent">
        {/* PARTICIPANTS SECTION */}
        <div>
          <h3 className="font-display text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-indigo-400" /> Integrantes do Grupo
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.participants.map((student, idx) => (
              <span
                key={idx}
                className="text-xs bg-white/[0.02] text-slate-200 px-3.5 py-2 rounded-xl border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all font-semibold shadow-2xs tracking-tight"
              >
                {student}
              </span>
            ))}
          </div>
        </div>

        {/* METRICS / STATS ROW */}
        <div className="grid grid-cols-2 gap-4 border-y border-white/[0.05] py-5">
          {/* Virtual Applause / Claps */}
          <div className="flex flex-col items-center justify-between p-4 bg-[linear-gradient(135deg,rgba(244,114,182,0.08),rgba(236,72,153,0.04))] border border-pink-500/15 hover:border-pink-500/25 rounded-[1rem] relative overflow-hidden text-center group transition-colors duration-250 shadow-[0_8px_24px_rgba(244,114,182,0.06)]">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Curtidas Virtuais</span>
            <div className="flex items-center gap-1.5 my-1">
              <span className="font-display text-3xl font-black text-pink-300 tracking-tight">{interaction.claps}</span>
              <Heart className="h-5 w-5 text-pink-455 fill-pink-400/80 animate-pulse" />
            </div>
            
            {/* Clap Trigger Button */}
            <button
              onClick={handleClapClick}
              className="mt-3 w-full bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 text-[11px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-98 border border-pink-500/15 relative overflow-visible cursor-pointer shadow-[0_8px_24px_rgba(244,114,182,0.08)]"
            >
              <Heart className="h-3 w-3 fill-pink-300 text-pink-300" /> Curtir Trabalho!
              <AnimatePresence>
                {showClapEffect && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 1, y: 0 }}
                    animate={{ scale: 1.8, opacity: 0, y: -25 }}
                    exit={{ opacity: 0 }}
                    className="absolute text-lg pointer-events-none"
                  >
                    🌸
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Visits / Checked-In */}
          <div className="flex flex-col items-center justify-between p-4 bg-[linear-gradient(135deg,rgba(56,189,248,0.08),rgba(14,165,233,0.04))] border border-sky-500/15 hover:border-sky-500/25 rounded-[1rem] text-center transition-colors duration-250 shadow-[0_8px_24px_rgba(56,189,248,0.06)]">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Visitas no Stand</span>
            <div className="flex items-center gap-1.5 my-1">
              <span className="font-display text-3xl font-black text-sky-300 tracking-tight">{interaction.visits}</span>
              <Sparkles className="h-5 w-5 text-sky-400" />
            </div>
            
            <button
              onClick={() => onRegisterVisit(group.id)}
              className="mt-3 w-full bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-[11px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-98 border border-sky-500/15 cursor-pointer shadow-[0_8px_24px_rgba(56,189,248,0.08)]"
            >
              📍 Já visitei o stand!
            </button>
          </div>
        </div>

        {/* FEED / PARENT MESSAGES */}
        <div>
          <h3 className="font-display text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 text-indigo-400" /> Mural de Apoio ({groupComments.length})
          </h3>
          
          {groupComments.length === 0 ? (
            <div className="text-center py-8 bg-white/[0.01] border border-dashed border-white/[0.04] rounded-xl text-slate-500 text-xs">
              <p className="font-semibold mb-0.5">Mural vazio por enquanto.</p>
              <p>Deixe uma linda mensagem de incentivo para este grupo!</p>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
              {groupComments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-[#0e0f11] border border-white/[0.04] rounded-xl p-4 flex flex-col gap-1.5 text-xs hover:bg-[#15161a] hover:border-white/[0.06] transition-all duration-150"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      {comment.authorName}
                      <span className="px-2 py-0.5 rounded-md text-[9px] bg-[#0a0b0d]/80 text-slate-400 border border-white/[0.04] font-mono font-bold uppercase tracking-wider">
                        {comment.relationship}
                      </span>
                    </span>
                    <span className="text-[9px] text-slate-500 flex items-center gap-0.5 font-mono">
                      <Clock className="h-2.5 w-2.5 text-slate-600" /> {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WRITE COMMENT FORM */}
        <div className="bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] border border-white/[0.08] rounded-[1rem] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          <h4 className="font-display text-[10px] font-bold text-slate-200 mb-3.5 flex items-center gap-1 uppercase tracking-wider">
            ✍️ Enviar Incentivo aos Alunos
          </h4>
          
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Author name */}
              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria Souza"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-[#0e0f11] border border-white/[0.04] rounded-lg focus:outline-none focus:border-indigo-500/40 transition-all font-medium text-slate-100 placeholder-slate-600"
                />
              </div>

              {/* Relationship dropdown */}
              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Quem é você?</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value as ParentComment["relationship"])}
                  className="w-full text-xs px-3 py-2.5 bg-[#0e0f11] border border-white/[0.04] rounded-lg focus:outline-none focus:border-indigo-500/40 transition-all font-semibold text-slate-300 cursor-pointer"
                >
                  <option value="Pai/Mãe">Pai / Mãe</option>
                  <option value="Familiar">Familiar</option>
                  <option value="Colega">Colega / Amigo</option>
                  <option value="Professor">Professor(a)</option>
                  <option value="Visitante">Visitante</option>
                </select>
              </div>
            </div>

            {/* Quick Presets for Encouragement */}
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Sugestões Rápidas:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_MESSAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="text-[9px] font-bold bg-[#0e0f11] hover:bg-white/[0.02] text-slate-300 border border-white/[0.04] px-2.5 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer hover:border-white/[0.08]"
                  >
                    {preset.substring(0, 15)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Comment textarea */}
            <div>
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Mensagem</label>
              <textarea
                required
                rows={2}
                placeholder="Escreva algo especial para apoiar os alunos neste projeto científico..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-[#0e0f11] border border-white/[0.04] rounded-lg focus:outline-none focus:border-indigo-500/40 transition-all leading-relaxed font-medium text-slate-100 placeholder-slate-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 hover:text-indigo-200 text-xs font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-98 border border-indigo-500/20 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5 text-indigo-400" /> Enviar Mensagem de Apoio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
