import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectGroup, ParentComment, TableInteraction } from "./types";
import { INITIAL_GROUPS, CLASSES_LIST } from "./data";
import TableMap from "./components/TableMap";
import ProjectDetails from "./components/ProjectDetails";
import ScientificLogo from "./components/ScientificLogo";
import {
  Map,
  Users,
  Search,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Heart,
  Sparkles,
  Info,
  Grid,
  Circle,
  TrendingUp,
  Layout,
  Layers,
  ChevronRight,
  BookOpen,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Trash2,
  Share2,
  X,
  Globe,
  Smartphone,
  AlertTriangle,
  Copy
} from "lucide-react";

export default function App() {
  // --- PERSISTENT STATE ---
  const [groups, setGroups] = useState<ProjectGroup[]>([]);
  const [comments, setComments] = useState<ParentComment[]>([]);
  const [interactions, setInteractions] = useState<Record<string, TableInteraction>>({});
  
  // --- APPLICATION STATE ---
  const [selectedQuadra, setSelectedQuadra] = useState<"Quadra 1" | "Quadra 2">("Quadra 2");
  const [currentClass, setCurrentClass] = useState<string>("TODAS");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Automatically reset class filter when quadra changes
  useEffect(() => {
    setCurrentClass("TODAS");
    setSelectedGroupId(null);
  }, [selectedQuadra]);

  // --- INITIALIZE & SYNC WITH LOCALSTORAGE ---
  useEffect(() => {
    // 1. Load Groups (with migration check for new Futsal Court coords)
    const savedGroups = localStorage.getItem("mostra_cientifica_groups");
    const hasFutsalMigration = localStorage.getItem("mostra_cientifica_futsal_v50");
    if (savedGroups && hasFutsalMigration) {
      try {
        const parsed = JSON.parse(savedGroups);
        const enriched = parsed.map((g: any) => {
          if (!g.advisor) {
            const match = INITIAL_GROUPS.find((ig) => ig.id === g.id);
            return { ...g, advisor: match ? match.advisor : "Sandro Dias Martins" };
          }
          return g;
        });
        setGroups(enriched);
      } catch (e) {
        setGroups(INITIAL_GROUPS);
      }
    } else {
      setGroups(INITIAL_GROUPS);
      localStorage.setItem("mostra_cientifica_futsal_v50", "true");
    }

    // 2. Load Comments
    const savedComments = localStorage.getItem("mostra_cientifica_comments");
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch (e) {
        setComments([]);
      }
    } else {
      // Default warm starting comment
      const initialComment: ParentComment = {
        id: "c-start",
        groupId: "g1",
        authorName: "Profa. Júlia de Oliveira",
        relationship: "Professor",
        content: "Sejam bem-vindos à Mostra Científica 2026! Pais e visitantes, fiquem à vontade para visitar os stands e deixar mensagens de apoio para nossos jovens cientistas!",
        timestamp: "23/06/2026 12:00"
      };
      setComments([initialComment]);
    }

    // 3. Load Interactions (claps & visits)
    const savedInteracts = localStorage.getItem("mostra_cientifica_interactions");
    if (savedInteracts) {
      try {
        setInteractions(JSON.parse(savedInteracts));
      } catch (e) {
        setInteractions({});
      }
    } else {
      // Seed default interactions with 0
      const initialInteractions: Record<string, TableInteraction> = {};
      INITIAL_GROUPS.forEach((g) => {
        initialInteractions[g.id] = {
          groupId: g.id,
          claps: 0,
          visits: 0,
        };
      });
      setInteractions(initialInteractions);
    }
  }, []);

  // Sync state changes back to localStorage
  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem("mostra_cientifica_groups", JSON.stringify(groups));
    }
  }, [groups]);

  useEffect(() => {
    localStorage.setItem("mostra_cientifica_comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    if (Object.keys(interactions).length > 0) {
      localStorage.setItem("mostra_cientifica_interactions", JSON.stringify(interactions));
    }
  }, [interactions]);

  // Toast Helper
  const triggerToast = (message: string) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // --- SEARCH IMPLEMENTATION ---
  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return groups.filter((g) => {
      const matchTitle = g.title.toLowerCase().includes(query);
      const matchStudents = g.participants.some((p) => p.toLowerCase().includes(query));
      const matchAdvisor = g.advisor.toLowerCase().includes(query);
      const matchClass = g.classCode.toLowerCase().includes(query);
      const matchEvaluators = g.evaluators.some((e) => e.includes(query));
      return matchTitle || matchStudents || matchAdvisor || matchClass || matchEvaluators;
    });
  }, [searchQuery, groups]);

  const handleSearchResultClick = (group: ProjectGroup) => {
    const isQuadra1 = (group.classCode.startsWith("EMERE01") || group.classCode.startsWith("EMERE02")) && !(group.groupNumber >= 31 && group.groupNumber <= 44);
    setSelectedQuadra(isQuadra1 ? "Quadra 1" : "Quadra 2");
    setCurrentClass(group.classCode);
    setSelectedGroupId(group.id);
    setSearchQuery("");
  };

  // --- VISUAL LAYOUT PRESETS (ADMIN ONLY) ---
  const applyLayoutPreset = (preset: "grid" | "circle" | "rows") => {
    const classGroups = groups.filter((g) => g.classCode === currentClass);
    if (classGroups.length === 0) return;

    let updatedGroups = [...groups];

    if (preset === "grid") {
      // Standard Grid arrangement
      const cols = classGroups.length <= 5 ? 3 : 4;
      classGroups.forEach((group, idx) => {
        const colIdx = idx % cols;
        const rowIdx = Math.floor(idx / cols);
        const spacingX = 85 / (cols - 1 || 1);
        const spacingY = 50;

        const newX = Math.round((colIdx * spacingX + 8) * 10) / 10;
        const newY = Math.round((rowIdx * spacingY + 20) * 10) / 10;

        updatedGroups = updatedGroups.map((g) =>
          g.id === group.id ? { ...g, x: newX, y: newY, rotation: 0, width: 14, height: 18 } : g
        );
      });
      triggerToast("Layout em GRADE aplicado com sucesso!");
    } else if (preset === "circle") {
      // Circular Ring arrangement
      const count = classGroups.length;
      const centerX = 44;
      const centerY = 40;
      const radiusX = 28;
      const radiusY = 22;

      classGroups.forEach((group, idx) => {
        const angle = (idx / count) * 2 * Math.PI;
        const newX = Math.round((centerX + radiusX * Math.cos(angle)) * 10) / 10;
        const newY = Math.round((centerY + radiusY * Math.sin(angle)) * 10) / 10;
        // Face tables outwards/inwards
        const rotationAngle = Math.round((angle * 180) / Math.PI) % 360;

        updatedGroups = updatedGroups.map((g) =>
          g.id === group.id ? { ...g, x: newX, y: newY, rotation: rotationAngle, width: 14, height: 16 } : g
        );
      });
      triggerToast("Layout em ARENA CIRCULAR aplicado!");
    } else if (preset === "rows") {
      // Parallel rows (Dual corridor layout)
      const halfCount = Math.ceil(classGroups.length / 2);
      classGroups.forEach((group, idx) => {
        const isTopRow = idx < halfCount;
        const positionIndex = isTopRow ? idx : idx - halfCount;
        const totalInRow = isTopRow ? halfCount : classGroups.length - halfCount;
        const spacingX = 80 / (totalInRow - 1 || 1);

        const newX = Math.round((positionIndex * spacingX + 10) * 10) / 10;
        const newY = isTopRow ? 20 : 65;
        const rotationAngle = isTopRow ? 0 : 180;

        updatedGroups = updatedGroups.map((g) =>
          g.id === group.id ? { ...g, x: newX, y: newY, rotation: rotationAngle, width: 15, height: 15 } : g
        );
      });
      triggerToast("Layout em FILEIRAS DUPLAS aplicado!");
    }

    setGroups(updatedGroups);
  };

  const resetToInitialLayout = () => {
    if (confirm("Tem certeza que deseja restaurar as coordenadas padrões para TODAS as turmas?")) {
      setGroups(INITIAL_GROUPS);
      triggerToast("Layouts originais redefinidos!");
    }
  };

  const resetAllInteractions = () => {
    if (confirm("Tem certeza que deseja zerar TODAS as estatísticas de curtidas e visitas?")) {
      const zeroed: Record<string, TableInteraction> = {};
      groups.forEach((g) => {
        zeroed[g.id] = {
          groupId: g.id,
          claps: 0,
          visits: 0,
        };
      });
      setInteractions(zeroed);
      localStorage.setItem("mostra_cientifica_interactions", JSON.stringify(zeroed));
      triggerToast("Estatísticas zeradas com sucesso!");
    }
  };

  // --- EXPORT & IMPORT CONFIGURATION ---
  const handleExportConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(groups, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `layout_mostra_cientifica_${currentClass}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast("Configuração exportada com sucesso!");
  };

  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    fileReader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0].classCode) {
          // Merge imported data into current groups array matching by id
          const merged = groups.map((existingGroup) => {
            const imported = parsedData.find((imp) => imp.id === existingGroup.id);
            return imported ? { ...existingGroup, ...imported } : existingGroup;
          });
          setGroups(merged);
          triggerToast("Configuração importada e aplicada com sucesso!");
        } else {
          alert("Formato de arquivo JSON inválido. Certifique-se de importar um arquivo gerado por este aplicativo.");
        }
      } catch (err) {
        alert("Erro ao decodificar arquivo JSON.");
      }
    };
    fileReader.readAsText(files[0]);
  };

  // --- POSITION & DETAILS UPDATE HANDLERS ---
  const handleUpdateGroupPosition = (id: string, x: number, y: number) => {
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, x, y } : g)));
  };

  const handleUpdateGroupDetails = (id: string, updates: Partial<ProjectGroup>) => {
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  // --- INTERACTION MUTATION HANDLERS ---
  const handleAddComment = (
    groupId: string,
    authorName: string,
    relationship: ParentComment["relationship"],
    content: string
  ) => {
    const newComment: ParentComment = {
      id: `c-${Date.now()}`,
      groupId,
      authorName,
      relationship,
      content,
      timestamp: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    setComments((prev) => [newComment, ...prev]);
    triggerToast("Incentivo publicado com sucesso!");
  };

  const handleAddClap = (groupId: string) => {
    setInteractions((prev) => {
      const current = prev[groupId] || { groupId, claps: 0, visits: 0 };
      return {
        ...prev,
        [groupId]: { ...current, claps: current.claps + 1 }
      };
    });
  };

  const handleRegisterVisit = (groupId: string) => {
    setInteractions((prev) => {
      const current = prev[groupId] || { groupId, claps: 0, visits: 0 };
      return {
        ...prev,
        [groupId]: { ...current, visits: current.visits + 1 }
      };
    });
    triggerToast("Presença registrada neste stand! Obrigado.");
  };

  // --- STATISTICS COMPUTATION ---
  const isGroupInQuadra = (group: ProjectGroup, quadra: "Quadra 1" | "Quadra 2") => {
    const code = group.classCode;
    if (quadra === "Quadra 1") {
      return (code.startsWith("EMERE01") || code.startsWith("EMERE02")) && !(group.groupNumber >= 31 && group.groupNumber <= 44);
    } else {
      return code.startsWith("EMERE03") || (group.groupNumber >= 31 && group.groupNumber <= 44);
    }
  };

  const currentClassGroups = useMemo(() => {
    return groups.filter((g) => {
      const inQuadra = isGroupInQuadra(g, selectedQuadra);
      if (!inQuadra) return false;
      if (currentClass !== "TODAS" && g.classCode !== currentClass) return false;
      return g.isActive;
    });
  }, [groups, selectedQuadra, currentClass]);

  const classStats = useMemo(() => {
    let totalClaps = 0;
    let totalVisits = 0;
    const groupClapsMap: { title: string; count: number; mNum: number }[] = [];

    currentClassGroups.forEach((g) => {
      const interaction = interactions[g.id] || { claps: 0, visits: 0 };
      totalClaps += interaction.claps;
      totalVisits += interaction.visits;
      groupClapsMap.push({
        title: g.title,
        count: interaction.claps,
        mNum: g.groupNumber
      });
    });

    // Sort to find most applauded projects
    const topApplauded = groupClapsMap.sort((a, b) => b.count - a.count).slice(0, 3);
    const totalCommentsInClass = comments.filter((c) =>
      currentClassGroups.some((g) => g.id === c.groupId)
    ).length;

    return {
      totalClaps,
      totalVisits,
      totalComments: totalCommentsInClass,
      topApplauded
    };
  }, [currentClassGroups, interactions, comments]);

  const selectedGroup = useMemo(() => {
    if (!selectedGroupId) return null;
    return groups.find((g) => g.id === selectedGroupId) || null;
  }, [selectedGroupId, groups]);

  const selectedGroupInteraction = useMemo(() => {
    if (!selectedGroupId) return { groupId: "", claps: 0, visits: 0 };
    return interactions[selectedGroupId] || { groupId: selectedGroupId, claps: 0, visits: 0 };
  }, [selectedGroupId, interactions]);

  const handleShare = async () => {
    // Dynamically get the current URL origin so it works perfectly when deployed to Cloud Run or shared publicly.
    // If it's the development sandbox, we can still fallback.
    const shareUrl = window.location.origin;
    setIsShareModalOpen(true);
    const shareData = {
      title: "FIC CAMAR 2026 | Mapeamento",
      text: "Acesse o mapa interativo e informações dos estandes da FIC CAMAR 2026!",
      url: shareUrl,
    };

    // 1. Try Native Web Share API first (Excellent for iOS, Android, and Windows supporting browsers)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setSuccessToast("Compartilhado com sucesso!");
        setTimeout(() => setSuccessToast(null), 3000);
        return;
      } catch (err) {
        // If user cancelled, do nothing. If actual error, continue to clipboard fallback
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
      }
    }

    // 2. Clipboard API Fallback (Standard browsers)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setSuccessToast("Link público copiado para a área de transferência!");
          setTimeout(() => setSuccessToast(null), 4000);
        })
        .catch(() => {
          legacyCopyFallback(shareUrl);
        });
    } else {
      legacyCopyFallback(shareUrl);
    }
  };

  const legacyCopyFallback = (text: string) => {
    // 3. Resilient text input select fallback (Older iOS Safari / specific Android WebViews)
    const textArea = document.createElement("textarea");
    textArea.value = text;
    // Set styles to make it invisible and out of view
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        setSuccessToast("Link público copiado com sucesso!");
      } else {
        throw new Error("Unable to copy");
      }
    } catch (err) {
      // Last resort: prompt so user can manually select and copy
      window.prompt("Copie este link público para compartilhar:", text);
    }
    document.body.removeChild(textArea);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans antialiased p-4 sm:p-6 md:p-8">
      {/* GLOBAL TOAST BANNER */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white text-xs font-bold py-3 px-6 rounded-full shadow-lg border border-slate-800 flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER NAVBAR (BENTO STYLE) */}
        <header className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <ScientificLogo className="h-14 w-14 shrink-0" />
            <div>
              <h1 className="font-sans text-lg md:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                FIC CAMAR 2026 <span className="text-slate-400 font-normal">| Mapeamento</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                Feira de Iniciação Científica
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-xs cursor-pointer"
              title="Copiar link de compartilhamento público"
            >
              <Share2 className="h-4 w-4" />
              <span>Compartilhar Mapa</span>
            </button>
          </div>
        </header>

        {/* SEARCH & TURMAS SELECTOR BENTO BOX */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* SEARCH SYSTEM */}
          <div className="relative w-full lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar projeto por título, aluno ou avaliador..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-normal text-slate-800"
            />
            
            {/* Search Autocomplete Dropdown */}
            <AnimatePresence>
              {searchQuery.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto"
                >
                  {filteredSearchResults.length > 0 ? (
                    filteredSearchResults.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => handleSearchResultClick(g)}
                        className="w-full text-left p-3.5 hover:bg-slate-50 border-b border-slate-100 transition-colors flex flex-col gap-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px]">
                            Stand {g.groupNumber} ({g.classCode})
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">Orientador: {g.advisor}</span>
                        </div>
                        <p className="font-medium text-slate-700 line-clamp-1">{g.title}</p>
                        <p className="text-[10px] text-slate-400 line-clamp-1">Alunos: {g.participants.join(", ")}</p>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">
                      Nenhum projeto encontrado para "{searchQuery}"
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CLASS ROOM SELECTOR GRID */}
          <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Selecione a Turma:</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCurrentClass("TODAS");
                  setSelectedGroupId(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                  currentClass === "TODAS"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                Todas
              </button>
              {CLASSES_LIST.filter((c) => {
                if (selectedQuadra === "Quadra 1") {
                  return c.code.startsWith("EMERE01") || c.code === "EMERE02MA";
                } else {
                  return c.code.startsWith("EMERE03") || c.code === "EMERE02MB" || c.code === "EMERE02MC";
                }
              }).map((c) => {
                const isSelected = currentClass === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrentClass(c.code);
                      setSelectedGroupId(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ADMIN WORKSPACE BAR (ONLY VISIBLE IN ADMIN MODE) */}
        {isAdminMode && (
          <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 animate-in fade-in duration-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-indigo-500 text-white text-[9px] font-bold rounded uppercase tracking-wider">
                  Admin Active
                </span>
                <h2 className="text-sm font-black tracking-tight">Painel de Controle do Layout</h2>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Organize stands no mapa em tempo real para os visitantes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-slate-800/60 p-2 rounded-2xl border border-slate-700/50">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider pl-1">Ajustar Layout:</span>
              <button
                onClick={() => applyLayoutPreset("grid")}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/50 text-[10px] font-bold py-1.5 px-3 rounded-xl active:scale-95 transition-all"
                title="Arrumar todos os stands em formato de grade regular"
              >
                <Grid className="h-3.5 w-3.5 text-indigo-400" /> Grade
              </button>
              <button
                onClick={() => applyLayoutPreset("circle")}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/50 text-[10px] font-bold py-1.5 px-3 rounded-xl active:scale-95 transition-all"
                title="Dispor stands em arena circular"
              >
                <Circle className="h-3.5 w-3.5 text-indigo-400" /> Arena
              </button>
              <button
                onClick={() => applyLayoutPreset("rows")}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/50 text-[10px] font-bold py-1.5 px-3 rounded-xl active:scale-95 transition-all"
                title="Dispor stands em duas fileiras paralelas"
              >
                <Layers className="h-3.5 w-3.5 text-indigo-400" /> Fileiras
              </button>
              
              <div className="h-4 w-[1px] bg-slate-700 mx-1" />

              <button
                onClick={handleExportConfig}
                className="flex items-center gap-1 bg-slate-800 hover:bg-indigo-900/50 hover:text-indigo-300 text-white border border-slate-700/50 text-[10px] font-bold py-1.5 px-3 rounded-xl active:scale-95 transition-all"
                title="Salvar layout atual como JSON"
              >
                <Download className="h-3.5 w-3.5" /> Exportar
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 bg-slate-800 hover:bg-indigo-900/50 hover:text-indigo-300 text-white border border-slate-700/50 text-[10px] font-bold py-1.5 px-3 rounded-xl active:scale-95 transition-all"
                title="Carregar layout de arquivo JSON"
              >
                <Upload className="h-3.5 w-3.5" /> Importar
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportConfig}
                accept=".json"
                className="hidden"
              />

              <button
                onClick={resetAllInteractions}
                className="flex items-center gap-1 bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 border border-amber-900/50 text-[10px] font-bold py-1.5 px-3 rounded-xl active:scale-95 transition-all"
                title="Zerar estatísticas de curtidas e visitas"
              >
                <Trash2 className="h-3.5 w-3.5" /> Zerar Estatísticas
              </button>

              <button
                onClick={resetToInitialLayout}
                className="flex items-center gap-1 bg-red-950/40 hover:bg-red-900/40 text-red-300 border border-red-900/50 text-[10px] font-bold py-1.5 px-3 rounded-xl active:scale-95 transition-all"
                title="Restaurar layout de fábrica"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Redefinir
              </button>
            </div>
          </div>
        )}

        {/* WORKSPACE BENTO GRID ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* MAP CANVAS PANEL (LARGEST BENTO BLOCK) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <TableMap
              groups={groups}
              selectedGroupId={selectedGroupId}
              onSelectGroup={setSelectedGroupId}
              isAdminMode={isAdminMode}
              onUpdateGroupPosition={handleUpdateGroupPosition}
              onUpdateGroupDetails={handleUpdateGroupDetails}
              currentClass={currentClass}
              selectedQuadra={selectedQuadra}
              onSelectQuadra={setSelectedQuadra}
            />
          </div>

          {/* SIDEPANEL: MULTI-BLOCK BENTO TILES */}
          <div className="lg:col-span-1 flex flex-col h-full">
            <div className="flex flex-col gap-4 h-full">
              {/* BENTO TILE 1: ADMIN CONTROLS / STATS SUMMARY (HIGH CONTRAST DARK CARD) */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 font-black text-6xl select-none pointer-events-none pr-4 pt-2 text-slate-400">
                  📈
                </div>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-slate-200">Estatísticas Ativas</h3>
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs">⚙️</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/50">
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Curtidas Gerais</p>
                      <p className="text-xl font-extrabold text-indigo-400 mt-1">{classStats.totalClaps}</p>
                    </div>
                    <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/50">
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Visitas</p>
                      <p className="text-xl font-extrabold text-emerald-400 mt-1">{classStats.totalVisits}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-3 text-slate-400">
                  <span>Mural de Mensagens</span>
                  <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md">{classStats.totalComments} publicadas</span>
                </div>
              </div>

              {/* BENTO TILE 2: PARENT QUICK LOOK (EMERALD GREEN DESIGN BOX) */}
              <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-lg flex flex-col justify-between relative overflow-hidden min-h-[160px]">
                <div className="absolute right-3 bottom-1 text-8xl opacity-15 select-none pointer-events-none">💚</div>
                <div>
                  <p className="text-xl font-light mt-1.5">
                    Incentive a <span className="font-bold text-white">Iniciação Científica</span>
                  </p>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-[11px] text-emerald-100/90 leading-relaxed max-w-[200px]">
                    Clique nos stands coloridos no mapa para parabenizar os alunos!
                  </p>
                  <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md text-center text-white border border-white/10 shrink-0">
                    <p className="text-[8px] font-extrabold tracking-widest uppercase">Stand Destaque</p>
                    <p className="text-xs font-bold mt-0.5">
                      {classStats.topApplauded[0] ? `Stand ${classStats.topApplauded[0].mNum}` : "Nenhum"}
                    </p>
                  </div>
                </div>
              </div>

              {/* BENTO TILE 3: LEADERBOARD / DESTAQUES (CLEAN WHITE CARD) */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black text-slate-900 tracking-tight mb-3 flex items-center gap-1.5 uppercase">
                    <TrendingUp className="h-4 w-4 text-indigo-500" /> {currentClass === "TODAS" ? "Destaques da turma" : `Destaques da Turma ${currentClass}`}
                  </h3>
                  
                  <div className="space-y-2.5">
                    {classStats.topApplauded.length > 0 ? (
                      classStats.topApplauded.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-indigo-150 bg-slate-50/50 hover:bg-slate-50 transition-all text-xs"
                        >
                          <div className="h-6 w-6 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="font-bold text-slate-800 text-[11px]">Stand {item.mNum}</span>
                              <span className="text-[9px] font-bold text-indigo-600 flex items-center gap-0.5">
                                <Heart className="h-2.5 w-2.5 fill-indigo-500 text-indigo-500" /> {item.count} curtidas
                              </span>
                            </div>
                            <p className="text-slate-500 line-clamp-1 font-semibold uppercase text-[10px] tracking-tight">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Dê as primeiras curtidas para criar o ranking!</p>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4">
                  <div className="flex gap-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Ativos</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Presença</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /> Apoio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL FOR SELECTED PROJECT DETAILS */}
      <AnimatePresence>
        {selectedGroup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setSelectedGroupId(null)}
            />
            
            {/* Modal Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-2xl bg-white/75 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh] sm:max-h-[90vh] border border-white/50"
            >
              <ProjectDetails
                group={selectedGroup}
                comments={comments}
                interaction={selectedGroupInteraction}
                onAddComment={handleAddComment}
                onAddClap={handleAddClap}
                onRegisterVisit={handleRegisterVisit}
                onClose={() => setSelectedGroupId(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL FOR SHARING MAP */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setIsShareModalOpen(false)}
            />
            
            {/* Modal Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white p-5 relative overflow-hidden flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5 z-10">
                  <Share2 className="h-5 w-5 text-indigo-400" />
                  <div>
                    <h3 className="font-sans font-bold text-sm text-white">Compartilhar Mapa</h3>
                    <p className="text-[10px] text-slate-300 font-medium">Link público para celulares e computadores</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="z-10 p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
                {/* Link Box */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Link do Aplicativo:</label>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-xs text-slate-750 font-mono select-all truncate flex-1 leading-normal">
                      {window.location.origin}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.origin);
                        setSuccessToast("Copiado!");
                        setTimeout(() => setSuccessToast(null), 2500);
                      }}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar</span>
                    </button>
                  </div>
                </div>

                {/* Compatibility Notice / Safari Sandbox Explanation */}
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/50 space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                    <span>⚠️ Aviso sobre Cookie / Login</span>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed font-semibold">
                    O link atual é uma prévia de desenvolvimento do Google AI Studio. 
                  </p>
                  <p className="text-xs text-amber-850 leading-relaxed">
                    Por segurança, navegadores móveis (especialmente <strong>Safari / iPhone / iOS</strong>) podem exibir a tela cinza de <span className="underline italic">"Action required to load your app"</span>.
                  </p>
                  <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                    👉 Se isso ocorrer com você ou com um visitante, basta clicar no botão <strong>"Authenticate in new window"</strong> (Autenticar) para autorizar e abrir o mapa instantaneamente.
                  </p>
                </div>

                {/* How to deploy truly 100% public without login */}
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100/50 space-y-2.5">
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                    <Globe className="h-4 w-4 shrink-0 text-indigo-600" />
                    <span>🚀 Como ter um link 100% livre (Sem Login)</span>
                  </div>
                  <p className="text-xs text-indigo-950 leading-relaxed">
                    Para que <strong>todos os pais e visitantes</strong> acessem diretamente pelo celular <strong>sem qualquer tela de login ou autenticação</strong>, publique o site definitivamente na nuvem!
                  </p>
                  <div className="bg-white/80 border border-indigo-150 p-3 rounded-xl space-y-1 text-[11px] text-indigo-900 font-medium">
                    <p className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-extrabold shrink-0">1.</span>
                      <span>No canto superior direito da sua tela no <strong>Google AI Studio</strong>, clique no botão azul <strong>"Deploy"</strong> ou <strong>"Deploy to Cloud Run"</strong>.</span>
                    </p>
                    <p className="flex items-start gap-1.5 mt-1.5">
                      <span className="text-indigo-600 font-extrabold shrink-0">2.</span>
                      <span>O Google Cloud criará um endereço web totalmente independente (ex: <code>https://meu-mapa-xxx.run.app</code>) que carrega instantaneamente em qualquer Android, iOS ou Windows de forma 100% pública!</span>
                    </p>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-2xl transition-all active:scale-99 cursor-pointer"
                >
                  Entendi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto mt-12 py-8 text-center text-xs text-slate-400 font-medium border-t border-slate-200">
        <p>© 2026 Mostra Científica Colegial. Todos os direitos reservados.</p>
        <p className="mt-1 opacity-75">Plataforma desenvolvida para mapeamento e interação em tempo real de feiras científicas.</p>
      </footer>
    </div>
  );
}
