import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectGroup } from "../types";
import { MapPin, RotateCw, Trash2, Sliders, Settings, Move, AlertCircle, LayoutGrid } from "lucide-react";

interface TableMapProps {
  groups: ProjectGroup[];
  selectedGroupId: string | null;
  onSelectGroup: (groupId: string) => void;
  isAdminMode: boolean;
  onUpdateGroupPosition: (id: string, x: number, y: number) => void;
  onUpdateGroupDetails: (id: string, updates: Partial<ProjectGroup>) => void;
  currentClass: string;
  selectedQuadra: "Quadra 1" | "Quadra 2";
  onSelectQuadra: (quadra: "Quadra 1" | "Quadra 2") => void;
}

interface Landmark {
  id: string;
  name: string;
  type: "circle" | "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  arrowDirection?: "left" | "right";
}

const QUADRA_1_LANDMARKS: Landmark[] = [
  {
    id: "l1-q1",
    name: "EMERE 02A",
    type: "circle",
    x: 9.5,
    y: 2.0,
    width: 6.5,
    height: 9,
    color: "bg-indigo-950/70 text-indigo-300 border-indigo-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l7-q1",
    name: "EMERE 01D",
    type: "circle",
    x: 16.5,
    y: 42.5,
    width: 6.5,
    height: 9,
    color: "bg-violet-950/70 text-violet-300 border-violet-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l8-q1",
    name: "EMERE 01B",
    type: "circle",
    x: 92.0,
    y: 2.0,
    width: 6.5,
    height: 9,
    color: "bg-teal-950/70 text-teal-300 border-teal-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l2-q1",
    name: "EMERE 01A",
    type: "circle",
    x: 34.5,
    y: 2.0,
    width: 6.5,
    height: 9,
    color: "bg-blue-950/70 text-blue-300 border-blue-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l3-q1",
    name: "ACESSO QUADRA 2",
    type: "rect",
    x: 20.0,
    y: 0.5,
    width: 10,
    height: 9,
    color: "bg-indigo-900/80 text-indigo-300 border-indigo-750 font-bold shadow-3xs",
  },
  {
    id: "l4-q1",
    name: "EMERE 01C",
    type: "circle",
    x: 16.5,
    y: 83.2,
    width: 6.5,
    height: 9,
    color: "bg-amber-950/70 text-amber-300 border-amber-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l9-q1",
    name: "SAÍDA QUADRA 1",
    type: "rect",
    x: 87.8,
    y: 89.5,
    width: 11.0,
    height: 9,
    color: "bg-slate-900 text-slate-400 border-slate-800 font-bold shadow-3xs",
  },
];

const QUADRA_2_LANDMARKS: Landmark[] = [
  {
    id: "l1",
    name: "EMERE 03B",
    type: "circle",
    x: 26.5,
    y: 9,
    width: 6.5,
    height: 9,
    color: "bg-indigo-950/70 text-indigo-300 border-indigo-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l7-q2",
    name: "EMERE 02B",
    type: "circle",
    x: 14.5,
    y: 29.7,
    width: 6.5,
    height: 9,
    color: "bg-violet-950/70 text-violet-300 border-violet-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l8-q2",
    name: "EMERE 02C",
    type: "circle",
    x: 14.5,
    y: 62.0,
    width: 6.5,
    height: 9,
    color: "bg-emerald-950/70 text-emerald-300 border-emerald-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l2",
    name: "EMERE 03C",
    type: "circle",
    x: 82.2,
    y: 9,
    width: 6.5,
    height: 9,
    color: "bg-emerald-950/70 text-emerald-300 border-emerald-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l3",
    name: "ACESSO QUADRA 1",
    type: "rect",
    x: 17,
    y: 83,
    width: 10,
    height: 9,
    color: "bg-indigo-900/80 text-indigo-300 border-indigo-750 font-bold shadow-3xs",
  },
  {
    id: "l4",
    name: "EMERE 03A",
    type: "circle",
    x: 1.5,
    y: 62.7,
    width: 6.5,
    height: 9,
    color: "bg-sky-950/70 text-sky-300 border-sky-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l5",
    name: "PAINEL",
    type: "rect",
    x: 94,
    y: 35,
    width: 4.5,
    height: 18,
    color: "bg-slate-900 text-slate-400 border-slate-800 font-bold shadow-3xs",
  },
  {
    id: "l6",
    name: "PAINEL JESUS",
    type: "circle",
    x: 91,
    y: 61,
    width: 6.5,
    height: 9,
    color: "bg-blue-950/70 text-blue-300 border-blue-800/80 font-bold shadow-2xs text-[7px]",
  },
  {
    id: "l7",
    name: "ENTRADA Q2",
    type: "rect",
    x: 94,
    y: 76,
    width: 4.5,
    height: 18,
    color: "bg-slate-900 text-slate-400 border-slate-800 font-bold shadow-3xs",
  },
];

export default function TableMap({
  groups,
  selectedGroupId,
  onSelectGroup,
  isAdminMode,
  onUpdateGroupPosition,
  onUpdateGroupDetails,
  currentClass,
  selectedQuadra,
  onSelectQuadra,
}: TableMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0, groupX: 0, groupY: 0 });

  const getGroupColorTheme = (group: ProjectGroup) => {
    let theme = group.colorTheme;
    
    if (!theme) {
      const code = group.classCode;
      if (code === "EMERE03MA" || code.endsWith("MA")) {
        theme = "blue";
      } else if (code === "EMERE03MB" || code.endsWith("MB")) {
        theme = "indigo";
      } else if (code === "EMERE03MC" || code.endsWith("MC")) {
        theme = "emerald";
      } else {
        theme = "violet";
      }
    }

    switch (theme) {
      case "blue":
      case "sky":
        return {
          bg: "bg-[#1a1b1e]/95 border border-white/[0.04] border-l-[3.5px] border-l-sky-500 text-slate-100 shadow-sm hover:bg-[#25272d] hover:border-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-200 font-bold",
          selectedBg: "bg-sky-500/10 border-sky-500 border-2 text-sky-200 font-black ring-2 ring-sky-500/10 scale-105 z-30",
          textColor: "text-sky-400"
        };
      case "teal":
        return {
          bg: "bg-[#1a1b1e]/95 border border-white/[0.04] border-l-[3.5px] border-l-teal-500 text-slate-100 shadow-sm hover:bg-[#25272d] hover:border-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-200 font-bold",
          selectedBg: "bg-teal-500/10 border-teal-500 border-2 text-teal-200 font-black ring-2 ring-teal-500/10 scale-105 z-30",
          textColor: "text-teal-400"
        };
      case "indigo":
        return {
          bg: "bg-[#1a1b1e]/95 border border-white/[0.04] border-l-[3.5px] border-l-indigo-500 text-slate-100 shadow-sm hover:bg-[#25272d] hover:border-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-200 font-bold",
          selectedBg: "bg-indigo-500/10 border-indigo-500 border-2 text-indigo-200 font-black ring-2 ring-indigo-500/10 scale-105 z-30",
          textColor: "text-indigo-400"
        };
      case "violet":
      case "purple":
        return {
          bg: "bg-[#1a1b1e]/95 border border-white/[0.04] border-l-[3.5px] border-l-violet-500 text-slate-100 shadow-sm hover:bg-[#25272d] hover:border-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-200 font-bold",
          selectedBg: "bg-violet-500/10 border-violet-500 border-2 text-violet-200 font-black ring-2 ring-violet-500/10 scale-105 z-30",
          textColor: "text-violet-400"
        };
      case "emerald":
      case "green":
        return {
          bg: "bg-[#1a1b1e]/95 border border-white/[0.04] border-l-[3.5px] border-l-emerald-500 text-slate-100 shadow-sm hover:bg-[#25272d] hover:border-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-200 font-bold",
          selectedBg: "bg-emerald-500/10 border-emerald-500 border-2 text-emerald-200 font-black ring-2 ring-emerald-500/10 scale-105 z-30",
          textColor: "text-emerald-400"
        };
      case "amber":
      case "yellow":
        return {
          bg: "bg-[#1a1b1e]/95 border border-white/[0.04] border-l-[3.5px] border-l-amber-500 text-slate-100 shadow-sm hover:bg-[#25272d] hover:border-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-200 font-bold",
          selectedBg: "bg-amber-500/10 border-amber-500 border-2 text-amber-200 font-black ring-2 ring-amber-500/10 scale-105 z-30",
          textColor: "text-amber-400"
        };
      default:
        return {
          bg: "bg-[#1a1b1e]/95 border border-white/[0.04] border-l-[3.5px] border-l-slate-500 text-slate-100 shadow-sm hover:bg-[#25272d] hover:border-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-200 font-bold",
          selectedBg: "bg-slate-500/10 border-slate-500 border-2 text-slate-200 font-black ring-2 ring-slate-500/10 scale-105 z-30",
          textColor: "text-slate-400"
        };
    }
  };

  const isGroupInQuadra = (group: ProjectGroup, quadra: "Quadra 1" | "Quadra 2") => {
    const code = group.classCode;
    if (quadra === "Quadra 1") {
      return (code.startsWith("EMERE01") || code.startsWith("EMERE02")) && !(group.groupNumber >= 31 && group.groupNumber <= 44);
    } else {
      return code.startsWith("EMERE03") || (group.groupNumber >= 31 && group.groupNumber <= 44);
    }
  };

  // Filter groups belonging to the active Quadra and active overall
  const quadraGroups = groups.filter((g) => isGroupInQuadra(g, selectedQuadra) && g.isActive);

  // Drag and drop implementation using modern React Pointer Events
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, group: ProjectGroup) => {
    if (!isAdminMode) return;
    e.stopPropagation();
    
    if (!containerRef.current) return;
    
    setDraggingId(group.id);
    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      groupX: group.x,
      groupY: group.y,
    };
    
    onSelectGroup(group.id);
    containerRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingId || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;
    
    // Convert pixel deltas back to container percentages
    const percentDeltaX = (deltaX / rect.width) * 100;
    const percentDeltaY = (deltaY / rect.height) * 100;
    
    let newX = dragStartPos.current.groupX + percentDeltaX;
    let newY = dragStartPos.current.groupY + percentDeltaY;
    
    // Clamp to boundaries (0 to 95% to accommodate table width/height)
    newX = Math.max(0, Math.min(95, Math.round(newX * 10) / 10));
    newY = Math.max(0, Math.min(90, Math.round(newY * 10) / 10));
    
    onUpdateGroupPosition(draggingId, newX, newY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingId && containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
      setDraggingId(null);
    }
  };

  // Get active editing group details
  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  const formatClassCode = (code: string) => {
    return code.replace("EMERE0", "").replace("EMERE", "");
  };

  const activeLandmarks = selectedQuadra === "Quadra 1" ? QUADRA_1_LANDMARKS : QUADRA_2_LANDMARKS;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* 2D CANVAS CONTAINER */}
      <div className="flex-1">
        
        {/* QUADRA TAB SELECTOR */}
        <div className="flex justify-center gap-2 mb-4 border-b border-white/[0.05]">
          <button
            onClick={() => onSelectQuadra("Quadra 1")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold transition-all border-b-2 -mb-[2px] ${
              selectedQuadra === "Quadra 1"
                ? "border-b-indigo-500 text-indigo-300 bg-white/[0.02]"
                : "border-b-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.01]"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Quadra 1</span>
          </button>
          <button
            onClick={() => onSelectQuadra("Quadra 2")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold transition-all border-b-2 -mb-[2px] ${
              selectedQuadra === "Quadra 2"
                ? "border-b-indigo-500 text-indigo-300 bg-white/[0.02]"
                : "border-b-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.01]"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Quadra 2</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h3 className="font-semibold text-slate-200 text-sm tracking-tight">
              {isAdminMode ? "📍 Painel de Ajuste - Arraste os Stands" : "📍 Mapa Quadra - Clique em um Stand"}
            </h3>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Filtro Ativo: <span className="text-indigo-400 font-bold">{currentClass === "TODAS" ? "Todas as Turmas" : currentClass}</span>
          </div>
        </div>

        {/* PHYSICAL FLOORPLAN CONTAINER */}
        <div
          id="pavilion-map-canvas"
          ref={containerRef}
          onPointerMove={handlePointerMove}
          className="relative w-full aspect-[1.5] border border-white/[0.08] rounded-[1.4rem] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_36%),linear-gradient(135deg,#06070a_0%,#0c0f16_100%)] overflow-hidden cursor-default select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        >
          {/* FUTSAL COURT LINES & ELEMENTS */}
          {/* Center Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/[0.03] -translate-x-1/2 select-none pointer-events-none" />
          
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 w-[22%] aspect-square border-2 border-white/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 w-[1.5%] aspect-square bg-white/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none" />

          {/* Left Penalty Area */}
          <div className="absolute top-1/2 left-0 w-[12%] h-[60%] border-2 border-white/[0.03] border-l-0 rounded-r-full -translate-y-1/2 select-none pointer-events-none opacity-85" />
          <div className="absolute top-1/2 left-[8%] w-1 aspect-square bg-white/[0.03] rounded-full -translate-y-1/2 select-none pointer-events-none" />

          {/* Right Penalty Area */}
          <div className="absolute top-1/2 right-0 w-[12%] h-[60%] border-2 border-white/[0.03] border-r-0 rounded-l-full -translate-y-1/2 select-none pointer-events-none opacity-85" />
          <div className="absolute top-1/2 right-[8%] w-1 aspect-square bg-white/[0.03] rounded-full -translate-y-1/2 select-none pointer-events-none" />

          {/* WATERMARK LABEL */}
          <div 
            style={{ transform: "translate(-50%, -50%) rotate(-15deg)" }}
            className="absolute top-1/2 left-1/2 font-sans font-black text-5xl md:text-7xl text-white/[0.015] select-none pointer-events-none uppercase tracking-widest z-0"
          >
            {selectedQuadra}
          </div>



          {/* LANDMARKS */}
          {activeLandmarks.map((lm) => {
            const isCircle = lm.type === "circle";
            const isClickableAccess = lm.name.includes("ACESSO QUADRA");
            
            return (
              <div
                key={lm.id}
                onClick={() => {
                  if (isClickableAccess) {
                    if (lm.name.includes("QUADRA 1")) {
                      onSelectQuadra("Quadra 1");
                    } else if (lm.name.includes("QUADRA 2")) {
                      onSelectQuadra("Quadra 2");
                    }
                  }
                }}
                style={{
                  position: "absolute",
                  left: `${lm.x}%`,
                  top: `${lm.y}%`,
                  width: `${lm.width}%`,
                  height: `${lm.height}%`,
                }}
                className={`
                  absolute flex flex-col items-center justify-center p-1 shadow-2xs text-center border select-none transition-all duration-200
                  ${isCircle ? "rounded-full" : "rounded-xl"}
                  ${lm.color}
                  ${isClickableAccess 
                    ? "cursor-pointer pointer-events-auto hover:bg-slate-900 hover:text-white hover:border-slate-950 hover:scale-105 active:scale-95 z-20 font-black" 
                    : "pointer-events-none z-0"}
                `}
              >
                <span className={`${isCircle ? "text-[7.5px] font-black" : "text-[7.5px] font-extrabold uppercase tracking-tight"} leading-none`}>
                  {lm.name}
                </span>
                {isClickableAccess && (
                  <span className="text-[5.5px] font-bold text-indigo-600 block mt-0.5 animate-pulse uppercase">Clique p/ ir</span>
                )}
              </div>
            );
          })}

          {/* ACTIVE TABLES */}
          <AnimatePresence>
            {quadraGroups.map((group) => {
              const isSelected = group.id === selectedGroupId;
              const isFaded = currentClass !== "TODAS" && group.classCode !== currentClass;
              const colorInfo = getGroupColorTheme(group);
              
              return (
                <motion.div
                  key={group.id}
                  id={`table-node-${group.id}`}
                  style={{
                    position: "absolute",
                    left: `${group.x}%`,
                    top: `${group.y}%`,
                    width: `${group.width}%`,
                    height: `${group.height}%`,
                    transform: `rotate(${group.rotation}deg)`,
                  }}
                  onPointerDown={(e) => handlePointerDown(e, group)}
                  onPointerUp={handlePointerUp}
                  onClick={() => !draggingId && onSelectGroup(group.id)}
                  whileHover={{ scale: isFaded ? 1 : 1.05, zIndex: 30 }}
                  className={`
                    absolute border rounded-xl shadow-2xs flex flex-col items-center justify-center p-1 
                    transition-all duration-200 cursor-pointer overflow-hidden select-none z-10
                    ${isSelected ? colorInfo.selectedBg : colorInfo.bg}
                    ${isFaded ? "opacity-15 grayscale pointer-events-none" : "opacity-100 hover:shadow-sm"}
                    ${draggingId === group.id ? "opacity-75 scale-95 shadow-lg cursor-grabbing z-40" : ""}
                  `}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    <span className="text-[12px] font-black leading-none">{group.groupNumber}</span>
                    <span className="text-[7px] font-bold tracking-wider mt-1 leading-none opacity-85 uppercase">
                      {formatClassCode(group.classCode)}
                    </span>
                  </div>
                  
                  {isAdminMode && (
                    <div className="absolute top-0 right-0 p-0.5 bg-black/10 rounded-bl-md">
                      <Move className="h-1.5 w-1.5 text-white/70" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Helpful hint bar */}
        <div className="mt-3 p-3 bg-[#16171a]/50 border border-white/[0.04] rounded-2xl text-xs text-slate-400 flex items-start gap-2 shadow-2xs">
          <AlertCircle className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
          <div className="leading-relaxed">
            {isAdminMode ? (
              <span>
                <strong className="text-slate-350">Modo Editor:</strong> Clique e arraste os stands diretamente no mapa da quadra selecionada. Use o painel à direita para ajustar com precisão a rotação, tamanho, cores e dados do grupo selecionado.
              </span>
            ) : (
              <span>
                <strong className="text-slate-350">Dica de Interação:</strong> Clique nos stands coloridos no mapa para ver os alunos, orientadores e avaliadores. Deixe um <strong className="text-slate-300">comentário de incentivo</strong> e envie <strong className="text-slate-300">curtidas virtuais</strong> para apoiar o trabalho!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ADMIN CONTROLS FOR SELECTED GROUP */}
      {isAdminMode && (
        <div className="w-full lg:w-80 flex-shrink-0 bg-[#16171a] border border-white/[0.05] rounded-3xl p-5 shadow-md text-slate-200">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/[0.05]">
            <Settings className="h-4 w-4 text-slate-450" />
            <h4 className="font-bold text-slate-200 text-sm">Propriedades do Stand</h4>
          </div>

          {selectedGroup ? (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Grupo Selecionado</span>
                <p className="text-xs font-bold text-white bg-[#0e0f11] px-2 py-1.5 rounded border border-white/[0.04]">
                  Stand {selectedGroup.groupNumber} - {selectedGroup.classCode}
                </p>
              </div>

              {/* Title Input */}
              <div>
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1">Título do Projeto</label>
                <textarea
                  value={selectedGroup.title}
                  onChange={(e) => onUpdateGroupDetails(selectedGroup.id, { title: e.target.value })}
                  rows={2}
                  className="w-full text-xs p-2 bg-[#0e0f11] border border-white/[0.04] text-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 leading-normal"
                />
              </div>

              {/* Coordinators / Advisors */}
              <div>
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1">Orientador(a)</label>
                <input
                  type="text"
                  value={selectedGroup.advisor}
                  onChange={(e) => onUpdateGroupDetails(selectedGroup.id, { advisor: e.target.value })}
                  className="w-full text-xs p-2 bg-[#0e0f11] border border-white/[0.04] text-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Grid Fine Positioning Controls */}
              <div className="space-y-3 p-3 bg-[#0e0f11]/60 rounded-xl border border-white/[0.04]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Sliders className="h-3 w-3 text-indigo-400" /> Posição e Rotação
                </span>
                
                {/* Pos X */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1">
                    <span>Posição X (Horizontal)</span>
                    <span className="font-bold text-slate-300">{selectedGroup.x}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="95"
                    step="0.5"
                    value={selectedGroup.x}
                    onChange={(e) => onUpdateGroupPosition(selectedGroup.id, parseFloat(e.target.value), selectedGroup.y)}
                    className="w-full h-1 bg-white/[0.06] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Pos Y */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1">
                    <span>Posição Y (Vertical)</span>
                    <span className="font-bold text-slate-300">{selectedGroup.y}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="0.5"
                    value={selectedGroup.y}
                    onChange={(e) => onUpdateGroupPosition(selectedGroup.id, selectedGroup.x, parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/[0.06] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Size Width */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1">
                    <span>Largura do Stand</span>
                    <span className="font-bold text-slate-300">{selectedGroup.width}%</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    step="0.1"
                    value={selectedGroup.width}
                    onChange={(e) => onUpdateGroupDetails(selectedGroup.id, { width: parseFloat(e.target.value) })}
                    className="w-full h-1 bg-white/[0.06] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Size Height */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1">
                    <span>Comprimento do Stand</span>
                    <span className="font-bold text-slate-300">{selectedGroup.height}%</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    step="0.1"
                    value={selectedGroup.height}
                    onChange={(e) => onUpdateGroupDetails(selectedGroup.id, { height: parseFloat(e.target.value) })}
                    className="w-full h-1 bg-white/[0.06] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Rotation */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-500">Girar Stand</span>
                  <button
                    onClick={() => {
                      const nextRot = (selectedGroup.rotation + 90) % 360;
                      onUpdateGroupDetails(selectedGroup.id, { rotation: nextRot });
                    }}
                    className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 bg-[#0e0f11] hover:bg-[#1a1b1e] border border-white/[0.04] px-2.5 py-1 rounded-md shadow-xs active:scale-95 transition-all"
                  >
                    <RotateCw className="h-3 w-3" /> {selectedGroup.rotation}°
                  </button>
                </div>
              </div>

              {/* Color Themes */}
              <div>
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Paleta de Cor (Stand)</label>
                <div className="grid grid-cols-6 gap-2">
                  {(["blue", "teal", "indigo", "violet", "emerald", "amber"] as const).map((color) => {
                    const isActiveColor = selectedGroup.colorTheme === color;
                    const colorMap = {
                      blue: "bg-blue-600 border-blue-500",
                      teal: "bg-teal-600 border-teal-500",
                      indigo: "bg-indigo-600 border-indigo-500",
                      violet: "bg-violet-600 border-violet-500",
                      emerald: "bg-emerald-600 border-emerald-500",
                      amber: "bg-amber-600 border-amber-500",
                    };
                    
                    return (
                      <button
                        key={color}
                        onClick={() => onUpdateGroupDetails(selectedGroup.id, { colorTheme: color })}
                        className={`
                          h-7 rounded-lg border flex items-center justify-center transition-all active:scale-90
                          ${colorMap[color]}
                          ${isActiveColor ? "ring-2 ring-indigo-500 border-white" : "border-transparent opacity-80 hover:opacity-100"}
                        `}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Delete / Visibility */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => onUpdateGroupDetails(selectedGroup.id, { isActive: false })}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-red-950/40 text-red-400 border border-red-900/40 rounded-lg text-xs font-bold hover:bg-red-900/30 active:scale-95 transition-all"
                >
                  <Trash2 className="h-3 w-3" /> Ocultar Stand
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 flex flex-col items-center justify-center gap-2">
              <MapPin className="h-8 w-8 opacity-40 text-slate-600" />
              <p className="text-xs font-semibold text-slate-400">Nenhum stand selecionado.</p>
              <p className="text-[10px] text-slate-500">Clique em qualquer stand no mapa para editar suas propriedades.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
