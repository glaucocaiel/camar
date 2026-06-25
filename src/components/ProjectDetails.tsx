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
      <div className="bg-slate-900/95 text-white p-5 sm:p-6 relative overflow-hidden backdrop-blur-md shrink-0 border-b border-white/10">
        {/* Subtle grid accent */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }} />
        
        <div className="relative z-10 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase bg-indigo-600/80 px-2.5 py-1 rounded-full border border-indigo-400/20 tracking-wider">
              Stand {group.groupNumber} • {group.classCode}
            </span>
            <div className="flex items-center gap-2">
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  title="Fechar"
                  type="button"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
          
          <h2 className="font-sans text-base sm:text-lg md:text-xl font-bold leading-tight tracking-tight text-slate-50">
            {group.title}
          </h2>
          
          <div className="flex items-start sm:items-center gap-2 text-xs text-slate-300 border-t border-white/10 pt-2">
            <UserCheck className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5 sm:mt-0" />
            <span className="leading-relaxed">Orientador(a): <strong className="text-white font-semibold">{group.advisor || "Sandro Dias Martins"}</strong></span>
          </div>
        </div>
      </div>

      {/* CORE INFO & COMMENTS */}
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
        {/* PARTICIPANTS SECTION */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Users className="h-4 w-4 text-slate-400" /> Integrantes do Grupo
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.participants.map((student, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors font-medium"
              >
                {student}
              </span>
            ))}
          </div>
        </div>

        {/* METRICS / STATS ROW */}
        <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-5">
          {/* Virtual Applause / Claps */}
          <div className="flex flex-col items-center justify-center p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl relative overflow-hidden text-center group">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Curtidas Virtuais</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-indigo-900 tracking-tight">{interaction.claps}</span>
              <Heart className="h-5 w-5 text-indigo-500 fill-indigo-500 animate-pulse" />
            </div>
            
            {/* Clap Trigger Button */}
            <button
              onClick={handleClapClick}
              className="mt-2.5 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm relative"
            >
              <Heart className="h-3 w-3 fill-white" /> Curtir Trabalho!
              <AnimatePresence>
                {showClapEffect && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 1, y: 0 }}
                    animate={{ scale: 1.8, opacity: 0, y: -25 }}
                    exit={{ opacity: 0 }}
                    className="absolute text-lg pointer-events-none"
                  >
                    ❤️
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Visits / Checked-In */}
          <div className="flex flex-col items-center justify-center p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Visitas no Stand</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-emerald-900 tracking-tight">{interaction.visits}</span>
              <Sparkles className="h-5 w-5 text-emerald-500" />
            </div>
            
            <button
              onClick={() => onRegisterVisit(group.id)}
              className="mt-2.5 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm"
            >
              📍 Já visitei este stand!
            </button>
          </div>
        </div>

        {/* FEED / PARENT MESSAGES */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 text-slate-400" /> Mural de Apoio ({groupComments.length})
          </h3>
          
          {groupComments.length === 0 ? (
            <div className="text-center py-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
              <p className="font-semibold mb-0.5">Mural vazio por enquanto.</p>
              <p>Seja o primeiro a deixar uma mensagem de incentivo para este grupo!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {groupComments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col gap-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">
                      {comment.authorName}
                      <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] bg-slate-200 text-slate-600 font-bold uppercase">
                        {comment.relationship}
                      </span>
                    </span>
                    <span className="text-[9px] text-slate-400 flex items-center gap-0.5 font-medium">
                      <Clock className="h-2.5 w-2.5" /> {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-normal">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WRITE COMMENT FORM */}
        <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4">
          <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1">
            ✍️ Enviar Incentivo aos Alunos
          </h4>
          
          <form onSubmit={handleSubmitComment} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {/* Author name */}
              <div>
                <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria Souza"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Relationship dropdown */}
              <div>
                <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Quem é você?</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value as ParentComment["relationship"])}
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
              <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Sugestões Rápidas:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_MESSAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="text-[9px] font-semibold bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded-md transition-all active:scale-95"
                  >
                    {preset.substring(0, 15)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Comment textarea */}
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Mensagem</label>
              <textarea
                required
                rows={2}
                placeholder="Escreva algo especial para apoiar os alunos neste projeto científico..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-normal"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <Send className="h-3.5 w-3.5" /> Enviar Mensagem de Apoio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
