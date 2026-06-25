import { ProjectGroup } from "./types";

const RAW_INITIAL_GROUPS: ProjectGroup[] = [
  // --- EMERE01MA --- (Orientador: Sandro Dias Martins)
  {
    id: "g1",
    classCode: "EMERE01MA",
    advisor: "Sandro Dias Martins",
    groupNumber: 1,
    participants: ["Rafael Yasin Rodrigues", "Felipe Fonseca Ferreira", "Lorenzo Beroldt de Souza", "Henrique Rodrigues Maciel", "Pedro Antônio Alliardi Lopes"],
    title: "A influência da qualidade do sono no desempenho escolar",
    evaluators: ["5", "6"],
    x: 15, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  },
  {
    id: "g2",
    classCode: "EMERE01MA",
    advisor: "Sandro Dias Martins",
    groupNumber: 2,
    participants: ["Pedro Henrique da Silva Lopes", "Iury Russo Jesus", "Pedro dos Santos Pinho", "Raphael Nunes da Silva", "Henrique Hanatzky Freitas", "Kauã Cardoso Garcêz"],
    title: "Barreiras enfrentadas por pessoas com Transtorno do Espectro Autista na inclusão social e profissional",
    evaluators: ["25", "12"],
    x: 45, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "teal", isActive: true
  },
  {
    id: "g3",
    classCode: "EMERE01MA",
    advisor: "Sandro Dias Martins",
    groupNumber: 3,
    participants: ["Gabriel da Silva Belloli", "Maria Eduarda Rodrigues de Paula", "Raquel Gaspar Marques", "Laíz Maryah Vargas Fontoura", "Samuel Lopes Sampaio", "Nicolas Espindola Boeira", "Adan Lucas Severo Franco"],
    title: "Relacionamento amoroso entre maiores de 14 anos (e menores de 18) com maiores de 18 anos.",
    evaluators: ["30", "15"],
    x: 75, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "indigo", isActive: true
  },
  {
    id: "g4",
    classCode: "EMERE01MA",
    advisor: "Sandro Dias Martins",
    groupNumber: 4,
    participants: ["Antônia Torresini Miranda de Carvalho", "Nicole de Souza Lichtenstein", "Sophia Santos Lykawka", "Luiza Farias da Silveira", "Rafaela Costa Werlang", "Eduarda Santos da Silva"],
    title: "Incidência de assédio sexual contra mulheres no transporte coletivo e seus impactos psicológicos",
    evaluators: ["16", "31"],
    x: 30, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g5",
    classCode: "EMERE01MA",
    advisor: "Sandro Dias Martins",
    groupNumber: 5,
    participants: ["Gabriella Saraiva Oliveira", "Sofia Barbosa Toresan", "Bibiana Silveira Porto", "Yasmin Podewils Gomes", "Fernanda Biaggio Kalisz"],
    title: "Os impactos do tabagismo na economia e na sociedade",
    evaluators: ["1", "20"],
    x: 60, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "emerald", isActive: true
  },

  // --- EMERE01MB --- (Orientadora: Júlia Luíza da Silva de Oliveira)
  {
    id: "g6",
    classCode: "EMERE01MB",
    advisor: "Júlia Luíza da Silva de Oliveira",
    groupNumber: 6,
    participants: ["Lucas Henrique da Silva Ferreira", "Rudinei Dalmoro Filho", "Artur Bonilha Valadan", "Lucas Stein Figueiró", "João Henrique da Silva Gonçalves", "Vinícius Techera de Mello"],
    title: "Apostas esportivas e futebol brasileiro: riscos, impactos e adversidades",
    evaluators: ["33", "22"],
    x: 15, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "emerald", isActive: true
  },
  {
    id: "g7",
    classCode: "EMERE01MB",
    advisor: "Júlia Luíza da Silva de Oliveira",
    groupNumber: 7,
    participants: ["Isabella Maciel dos Santos", "Camila Rocha de Souza", "Davi Valério Ross", "Guilherme Schuwarz Torales", "Victória Klaudat e Silva", "Alice Ramos"],
    title: "Dark Web e crimes digitais: Mitos, riscos e realidade do que existe na internet invisível.",
    evaluators: ["19", "34"],
    x: 45, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g8",
    classCode: "EMERE01MB",
    advisor: "Júlia Luíza da Silva de Oliveira",
    groupNumber: 8,
    participants: ["Rodrigo Groth Rodrigues de Oliveira", "Arthur Alexsander Padia Pires", "Cauã Andrade Porsdmann Gonçalves", "João Victor Andrade Barufi da Rosa", "Lucas Meurer Stein", "Victor Henrique Oliveira Medeiros", "João Victor Ribeiro de Paula"],
    title: "Uso de telas antes de dormir e a qualidade do sono.",
    evaluators: ["24", "30"],
    x: 75, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  },
  {
    id: "g9",
    classCode: "EMERE01MB",
    advisor: "Júlia Luíza da Silva de Oliveira",
    groupNumber: 9,
    participants: ["Laura Chalmes Payeras", "Karine Jovanovich da Rosa", "Lauren Raquel Coca dos Santos", "João Raupp Procópio Neto", "Bernardo Fagundes Pereira Martins", "Vitor Alves Moreira"],
    title: "A misoginia na internet e seus impactos na violência contra mulher.",
    evaluators: ["5", "13"],
    x: 30, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "amber", isActive: true
  },
  {
    id: "g10",
    classCode: "EMERE01MB",
    advisor: "Júlia Luíza da Silva de Oliveira",
    groupNumber: 10,
    participants: ["Sofia Dávila Rodrigues", "Mathias Neres Castello", "Isabela Morais Ferreira Cardoso", "Rafael Messaggi de Souza", "Felipe Messaggi de Souza", "Martin da Silva Kliar", "Isadora Olmos Dias"],
    title: "O uso excessivo de fones de ouvido: como ele pode influenciar a audição de jovens e crianças?",
    evaluators: ["4", "15"],
    x: 60, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "indigo", isActive: true
  },

  // --- EMERE01MC --- (Orientador: Sandro Dias Martins)
  {
    id: "g11",
    classCode: "EMERE01MC",
    advisor: "Sandro Dias Martins",
    groupNumber: 11,
    participants: ["Bianca Torres Schatzmann", "Sophia Michael Stefani", "Ísis Cabrera Maganha", "Pietra Nicolini Guedes", "Gabriela Bertoni Bonaldo", "Gabriela Sanhudo Sparrenberger da Rosa"],
    title: "Produção de membranas adsorventes a base de quitosana para a remoção de corantes sintéticos",
    evaluators: ["3", "9"],
    x: 15, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "amber", isActive: true
  },
  {
    id: "g12",
    classCode: "EMERE01MC",
    advisor: "Sandro Dias Martins",
    groupNumber: 12,
    participants: ["Isaque Rebelo Colasa", "Leonardo Ardenghi de Abreu", "Davi Müller Keim", "Pedro Duarte Claudino", "Pietro Canal Carmona", "Arthur Rosa Baierle"],
    title: "Enchentes Em Porto Alegre (2024)",
    evaluators: ["29", "7"],
    x: 45, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  },
  {
    id: "g13",
    classCode: "EMERE01MC",
    advisor: "Sandro Dias Martins",
    groupNumber: 13,
    participants: ["Julia Trombetta Bocuzzi", "Kimberlyn Beatriz Oliveira da Costa", "Pietra Carrabba Boeckel", "Larissa Costa Ramos", "Gabriela Fernandes Ribeiro", "Monique Slivinski Borges"],
    title: "Epigenética",
    evaluators: ["21", "10"],
    x: 75, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "emerald", isActive: true
  },
  {
    id: "g14",
    classCode: "EMERE01MC",
    advisor: "Sandro Dias Martins",
    groupNumber: 14,
    participants: ["Cauã Lucca de Borba Menezes", "Matheo Petry", "Davi Rodrigues", "Paulo Ricardo Nunes Limberger", "Gustavo Mattos de Oliveira", "Caio Lutinski Pires"],
    title: "Segurança de dados e Privacidade na era digital",
    evaluators: ["19", "34"],
    x: 15, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g15",
    classCode: "EMERE01MC",
    advisor: "Sandro Dias Martins",
    groupNumber: 15,
    participants: ["Gabriel da Silva Morais", "Tiago Serafim Carneiro", "Gabriela Neves da Paz", "Artur Pinto Pedroso", "Élika Mesquita Fernandes"],
    title: "Inteligência Artificial na Educação",
    evaluators: ["4", "28"],
    x: 45, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "indigo", isActive: true
  },
  {
    id: "g16",
    classCode: "EMERE01MC",
    advisor: "Sandro Dias Martins",
    groupNumber: 16,
    participants: ["Rebeca de Medeiros Aguiar", "Flávia Yohana Marques Schmitt", "Alice Melo de Mattos Valle", "Victor Pacheco Oliveira"],
    title: "Sedentarismo e saúde cardiovascular juvenil",
    evaluators: ["1", "13"],
    x: 75, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "teal", isActive: true
  },

  // --- EMERE01MD --- (Orientadora: Miriam Ramos Dutra)
  {
    id: "g17",
    classCode: "EMERE01MD",
    advisor: "Miriam Ramos Dutra",
    groupNumber: 17,
    participants: ["Isabella Evadro Xavier Nunes", "Eduardo Isquierdo Santos", "Lorenzo Conceição Vencato", "Lucas Pereira Francisco", "Sarah Victoria Hoffmann Rivas"],
    title: "Prevenção de lesões no ambiente escolar",
    evaluators: ["10", "17"],
    x: 15, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "teal", isActive: true
  },
  {
    id: "g18",
    classCode: "EMERE01MD",
    advisor: "Miriam Ramos Dutra",
    groupNumber: 18,
    participants: ["Ana Paula Ilha Zancan", "Clara Paiva Ramos", "Nicole Olimpia Mendes Casagrande", "Lucas Santos Vargas", "Lucas Cunha Dias", "Bruno Borges Padilha"],
    title: "Envelhecimento saudável: Estratégias de prevenção e retardo do Alzheimer",
    evaluators: ["32", "33"],
    x: 40, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  },
  {
    id: "g19",
    classCode: "EMERE01MD",
    advisor: "Miriam Ramos Dutra",
    groupNumber: 19,
    participants: ["Luiza Mel dos Santos Braga", "Alice Martins Euzébio", "Angelina Teixeira Kurtz", "Júlia dos Santos Campos", "Bruno Abraao Tauchen de Figueiredo da Silva"],
    title: "Eficácia dos meios de acessibilidade das vias públicas",
    evaluators: ["29", "22"],
    x: 65, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g20",
    classCode: "EMERE01MD",
    advisor: "Miriam Ramos Dutra",
    groupNumber: 20,
    participants: ["Laura Gonçalves Brambila", "Gabriel Timotheo Carvalho", "Gabriela Leite Machado", "Camile Vitória Figueiredo Jobim", "Théo Jung Susin"],
    title: "Desempenho escolar: uma análise dos fatores além do mérito individual",
    evaluators: ["12", "24"],
    x: 90, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "indigo", isActive: true
  },
  {
    id: "g21",
    classCode: "EMERE01MD",
    advisor: "Miriam Ramos Dutra",
    groupNumber: 21,
    participants: ["Renata da Costa Nunes", "Luísa Helena Madruga Wiethaus", "Valentina Ramires Brum", "Marcos Fernando Dias da Silva", "Grazyelle da Silva Lemos"],
    title: "Descarte inadequado de papel no ambiente escolar",
    evaluators: ["27", "34"],
    x: 25, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "emerald", isActive: true
  },
  {
    id: "g22",
    classCode: "EMERE01MD",
    advisor: "Miriam Ramos Dutra",
    groupNumber: 22,
    participants: ["Murillo Magno Daudt de Almeida", "Elyakim Nathaniel Ortiz Ferreira", "Arthur de Souza Jordani", "Davi Kesterke", "Dennis Luchini Renck"],
    title: "A invisibilidade do câncer de mama em homens: conscientização e diagnóstico precoce",
    evaluators: ["3", "21"],
    x: 50, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "amber", isActive: true
  },
  {
    id: "g23",
    classCode: "EMERE01MD",
    advisor: "Miriam Ramos Dutra",
    groupNumber: 23,
    participants: ["Davi Solari da Silva", "Wenner Bruno Dutra Andrade", "Bernardo Soares Colossi Gonçalves", "Lara Cazuza Vieira", "Vitória Guerreiro Gesswein Martins"],
    title: "O papel da medicação no tratamento de transtornos psicológicos e sua relação com o funcionamento cognitivo e criativo",
    evaluators: ["30", "9"],
    x: 75, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },

  // --- EMERE02MA --- (Orientadora: Luciane Souza Bomfim)
  {
    id: "g24",
    classCode: "EMERE02MA",
    advisor: "Luciane Souza Bomfim",
    groupNumber: 24,
    participants: ["Mirele Ferreira Garcia", "Arthur da Conceição Marder", "Samuel da Silva Pacheco", "Luan Dornelles Duarte", "Thomas Daniel Schröder", "Gustavo Silveira Bitelo"],
    title: "O Burnout digital infantil causado pelo uso desrregulado de eletrônicos",
    evaluators: ["6", "24"],
    x: 15, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "indigo", isActive: true
  },
  {
    id: "g25",
    classCode: "EMERE02MA",
    advisor: "Luciane Souza Bomfim",
    groupNumber: 25,
    participants: ["Bernardo Silva dos Santos", "Giovana de Moraes Brum", "Davi Gonçalves Sousa", "João Fernando Bessa dos Santos", "Sophia Alencar Frantz"],
    title: "Sustentabilidade em grandes eventos: gestão de efluentes e dejetos.",
    evaluators: ["14", "27"],
    x: 45, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "emerald", isActive: true
  },
  {
    id: "g26",
    classCode: "EMERE02MA",
    advisor: "Luciane Souza Bomfim",
    groupNumber: 26,
    participants: ["Arthur Giroleti Fernandes", "Bryan Oliveira de Souza", "Kauan Sonnesen da Silva", "Davi Mendes de Oliveira", "Pedro Augusto Pinheiro Vieira", "João Vítor Serafim Carneiro"],
    title: "O impacto da ausência paterna no desenvolvimento da criança e do adolescente.",
    evaluators: ["13", "22"],
    x: 75, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  },
  {
    id: "g27",
    classCode: "EMERE02MA",
    advisor: "Luciane Souza Bomfim",
    groupNumber: 27,
    participants: ["João Felipe Alves Bernardo", "Emanuel Natã Mendoza de Oliveira", "Jean de Dieu Briand Minsongui Júnior", "Mariana de Campos Santos Lopes", "Emanuelly Santos dos Santos", "Júlia Dutra de Candido"],
    title: "Desenvolvimento de uma barrinha de cereais fortificada com ferro para gestantes",
    evaluators: ["14", "28"],
    x: 15, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "amber", isActive: true
  },
  {
    id: "g28",
    classCode: "EMERE02MA",
    advisor: "Luciane Souza Bomfim",
    groupNumber: 28,
    participants: ["Eduarda Santos Clarindo", "Matheus Roldão Boza", "Aline Goulart Fortunato", "Lara Lay Faustino Azevedo", "Yasmin de Oliveira Bernardes"],
    title: "Depressão: alterações nos neurotransmissores cerebrais e efeitos dos tratamentos do sistema nervoso",
    evaluators: ["1", "16"],
    x: 45, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g29",
    classCode: "EMERE02MA",
    advisor: "Luciane Souza Bomfim",
    groupNumber: 29,
    participants: ["Pedro Henrique Cavalheiro de Oliveira", "Ana Carolina Fante", "Rafaela Lacrout Severo", "Lucas Gabriel da Silva Alberti", "Gabriel Machado Garcia", "Beatriz de Freitas Dias Santos"],
    title: "Síndrome de burnout em profissionais da saúde que trabalham em emergência ou urgência",
    evaluators: ["31", "10"],
    x: 75, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "teal", isActive: true
  },
  {
    id: "g30",
    classCode: "EMERE02MA",
    advisor: "Luciane Souza Bomfim",
    groupNumber: 30,
    participants: ["Arthur Luís da Silva Dames", "Eduardo de Lima Rosa", "Benício dos Santos Borges Luz", "Felipe Ficher de Assumpção", "Arthur Cavalcante Nunes da Silva", "Vicenzo da Silva Rossoni"],
    title: "Impactos causados pelo uso de cigarros eletrônicos no desenvolvimento do adolescente",
    evaluators: ["5", "15"],
    x: 45, y: 45, width: 14, height: 18, rotation: 0, colorTheme: "amber", isActive: true
  },

  // --- EMERE02MB --- (Orientador: Tobias Santos de Souza)
  {
    id: "g31",
    classCode: "EMERE02MB",
    advisor: "Tobias Santos de Souza",
    groupNumber: 31,
    participants: ["Arthur Pereira dos Santos", "Leonardo Nunes Monteiro", "Renan Bicca Matuchak", "Eduardo Oliveira de Mattos Bastos", "Samuel Schleintvein Heffner"],
    title: "Os impactos do carro eletrônico no meio ambiente.",
    evaluators: ["4", "27"],
    x: 15, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "emerald", isActive: true
  },
  {
    id: "g32",
    classCode: "EMERE02MB",
    advisor: "Tobias Santos de Souza",
    groupNumber: 32,
    participants: ["Marina Guterres Rodrigues", "Marina Alcay Rodrigues", "Luize Freiberger Charara", "Maria Fernanda Macedo de Freitas", "Gabrielle Figueiredo Konrath", "Benjamin Rosa da Silva"],
    title: "Corpos à venda: o lado invisível da sociedade.",
    evaluators: ["13", "18"],
    x: 45, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g33",
    classCode: "EMERE02MB",
    advisor: "Tobias Santos de Souza",
    groupNumber: 33,
    participants: ["Gabriel Batista Riegel", "Pedro Monteblanco da Silva", "Miguel Silva Teixeira", "André Carvalho Zerbielli", "Renan Roxo Figueiredo"],
    title: "Efeitos biológicos e comportamentais a auto exposição de telas em fases essenciais do desenvolvimento humano.",
    evaluators: ["19", "20"],
    x: 75, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  },
  {
    id: "g34",
    classCode: "EMERE02MB",
    advisor: "Tobias Santos de Souza",
    groupNumber: 34,
    participants: ["Lucas Plettes Machado", "Arthur Prestes Ferreira", "Eduardo Lorensi Colle", "Vitor Fraga Ribas", "Gabriel Guimarães da Silva"],
    title: "O uso do cigarro eletrônico na adolescência: efeitos físicos e psicológicos da utilização do vape.",
    evaluators: ["28", "31"],
    x: 15, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "amber", isActive: true
  },
  {
    id: "g35",
    classCode: "EMERE02MB",
    advisor: "Tobias Santos de Souza",
    groupNumber: 35,
    participants: ["Bia Leon Lamera", "Maria Eduarda Nogueira Ferreira", "Lara Scheibel Baccaro", "Maria Júlia Pereira Reis", "Izadora Luz da Silva", "Tainaa Hunoff Lagranha"],
    title: "Amor ou controle? Relações abusivas entre jovens como fator de perpetuação do feminicídio.",
    evaluators: ["23", "11"],
    x: 45, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "indigo", isActive: true
  },
  {
    id: "g36",
    classCode: "EMERE02MB",
    advisor: "Tobias Santos de Souza",
    groupNumber: 36,
    participants: ["Giovana Martins Zone da Silva", "Maria Eduarda Karquidio Moraes", "Victoria Rodrigues Dorneles", "Rafaela Pereira Moreira", "Sofia de Lima Radé", "Eduarda Bender Jocksch"],
    title: "A busca por remédios emagrecedores e suas consequências no Brasil contemporâneo",
    evaluators: ["3", "25"],
    x: 75, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g37",
    classCode: "EMERE02MB",
    advisor: "Tobias Santos de Souza",
    groupNumber: 37,
    participants: ["Maria Eduarda Braitbach Wiebbelling Aguiar", "Artur Telles Feyerabend", "Julia Pereira Pelagio", "Lauriene Soares Gonçalves"],
    title: "A utilização da garrafa pet em sistema de energia solar.",
    evaluators: ["4", "27"],
    x: 45, y: 45, width: 14, height: 18, rotation: 0, colorTheme: "teal", isActive: true
  },

  // --- EMERE02MC --- (Orientadora: Bianca Cruz Silveira)
  {
    id: "g38",
    classCode: "EMERE02MC",
    advisor: "Bianca Cruz Silveira",
    groupNumber: 38,
    participants: ["Ana Carolina Silva de Carvalho", "Elie Aphna Dashnie Aristilde", "Laura Lemos Mutz", "Luiza Severo Freitas Rodrigues", "Maria Eduarda de Souza Gonçalves Machado", "Yasmin Ferreira Neto"],
    title: "Reconfiguração Neural e Neuroplasticidade: Adaptações Cerebrais Diante as Exigências Acadêmicas",
    evaluators: ["12", "25"],
    x: 15, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "indigo", isActive: true
  },
  {
    id: "g39",
    classCode: "EMERE02MC",
    advisor: "Bianca Cruz Silveira",
    groupNumber: 39,
    participants: ["Pedro Henrique Pacheco de Fraga", "Eduarda Pereira Klettner", "Davi Martins da Silva", "Marco Antonio Ribeiro da Silva", "Rafael Bittencourt Nascimento", "Guilherme Koetz Boff"],
    title: "A limitação do bilinguismo como obstáculo à competitividade profissional no mercado de trabalho do Sul do Brasil)",
    evaluators: ["5", "32"],
    x: 40, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  },
  {
    id: "g40",
    classCode: "EMERE02MC",
    advisor: "Bianca Cruz Silveira",
    groupNumber: 40,
    participants: ["Danúbia Lô Silva", "Julia Lô Silva", "Evelyn dos Santos", "Jôsyane dos Santos Silva", "Matheus Weber Assunção", "Maria Eduarda Fermino Tavares"],
    title: "Sistema prisional e marginalização periférica: UMA ANÁLISE A PARTIR DE ANGELA DAVIS",
    evaluators: ["23", "11"],
    x: 65, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g41",
    classCode: "EMERE02MC",
    advisor: "Bianca Cruz Silveira",
    groupNumber: 41,
    participants: ["Livia Kreibich Pereira", "Gustavo da Silva Xarão", "Davi Gomes Franco", "Clara Luiza Porto de Souza", "Caio Marinho de Moura", "Lorenzo Mendes de Oliveira"],
    title: "Efeitos colaterais das canetas emagrecedoras sem prescrição médica.",
    evaluators: ["25", "22"],
    x: 90, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "amber", isActive: true
  },
  {
    id: "g42",
    classCode: "EMERE02MC",
    advisor: "Bianca Cruz Silveira",
    groupNumber: 42,
    participants: ["Ana Geschuender", "Anabela Pereira Padilha", "Brenda da Rosa Leal", "Juliana Borsatto Zunega", "Roberta da Silva"],
    title: "A INFLUÊNCIA DOS HÁBITOS DE LEITURA NO DESENVOLVIMENTO COGNITIVO E ACADÊMICO DE ADOLESCENTES",
    evaluators: ["6", "23"],
    x: 25, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "emerald", isActive: true
  },
  {
    id: "g43",
    classCode: "EMERE02MC",
    advisor: "Bianca Cruz Silveira",
    groupNumber: 43,
    participants: ["Gabriel Arais de Lima", "Pedro Henrique Severo de Souza", "Bianca Beulke de Lima", "João Vitor de Azevedo Guedes", "Guilherme Giardin da Rosa"],
    title: "Resistência bacteriana: Os perigos do uso indevido de antibióticos",
    evaluators: ["3", "9"],
    x: 50, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "teal", isActive: true
  },
  {
    id: "g44",
    classCode: "EMERE02MC",
    advisor: "Bianca Cruz Silveira",
    groupNumber: 44,
    participants: ["Giovanna de Freitas Moraes", "Lucas de Oliveira de Mattos Rodrigues", "Evelyn da Silva Rodrigues", "Guilherme dos Santos Aristimuno"],
    title: "Dificuldades de integração de estudantes com Transtorno do espectro autista (TEA) na rede de ensino",
    evaluators: ["24", "32"],
    x: 75, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  },

  // --- EMERE03MA --- (Orientador: Luís Eduardo Schneider)
  {
    id: "g45",
    classCode: "EMERE03MA",
    advisor: "Luís Eduardo Schneider",
    groupNumber: 45,
    participants: ["Bruna Pereira Ferreira", "Júlia Waechter Cezano", "Júlia Kaliszewski Silva", "Lavínia Dall Agnese da Silva", "Marina Albuquerque Viegas", "Nicole Slivinski Borges"],
    title: "A INFLUÊNCIA DA MENOPAUSA NA QUALIDADE DE VIDA E NO BEM- ESTAR EMOCIONAL DE MULHERES",
    evaluators: ["34", "11"],
    x: 15, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g46",
    classCode: "EMERE03MA",
    advisor: "Luís Eduardo Schneider",
    groupNumber: 46,
    participants: ["Arthur Pisoni Brozoza", "Bernardo Fachini", "Gabriel Dhein Machado", "Gustavo Resende da Silva", "Elton Vianna Zibenberg", "Leonardo Soares Rodrigues"],
    title: "O IMPACTO DAS TELAS NO DESENVOLVIMENTO INFANTIL",
    evaluators: ["31", "16"],
    x: 45, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  },
  {
    id: "g47",
    classCode: "EMERE03MA",
    advisor: "Luís Eduardo Schneider",
    groupNumber: 47,
    participants: ["Amanda de Sousa Costa", "Ysadora Azevedo Vieira", "Rafaela Rosa de Jesus", "Marta Ingryd Ferreira Fernandes", "Hanna Yasin Rodrigues", "Thafny Dutra Rodrigues da Rosa"],
    title: "Infância violada: o impacto do abuso sexual na vida de crianças e adolescentes",
    evaluators: ["20", "21"],
    x: 75, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g48",
    classCode: "EMERE03MA",
    advisor: "Luís Eduardo Schneider",
    groupNumber: 48,
    participants: ["Miguel Borba da Rocha", "José Pedro Chagas Fernandes", "Jorge Cliver Carati Fontoura", "Mateus Mendiondo Goulart", "Pietro Henrique Fernandes Pedrotti"],
    title: "A influência do uso intensivo de redes sociais na construção da identidade, autoestima e saúde mental de crianças e adolescentes",
    evaluators: ["24", "11"],
    x: 15, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "indigo", isActive: true
  },
  {
    id: "g49",
    classCode: "EMERE03MA",
    advisor: "Luís Eduardo Schneider",
    groupNumber: 49,
    participants: ["Nathália Borges Oling", "Amanda Garrafiel Bombel Wasielewski", "Amanda Lira Pavão", "Mariana Nunes Marchi", "Gisele Machado de Oliveira"],
    title: "O aumento do uso inadequado das canetas emagrecedoras",
    evaluators: ["1", "7"],
    x: 45, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "amber", isActive: true
  },
  {
    id: "g50",
    classCode: "EMERE03MA",
    advisor: "Luís Eduardo Schneider",
    groupNumber: 50,
    participants: ["Lucas Goulart Souza da Silva", "Caio Alves Mascarenhas", "Gabriel Gonçalves Osório", "Lorenzo Silva dos Reis", "Pedro Augusto Nascimento Backes"],
    title: "A IMPORTÂNCIA DAS MICROEMPRESAS NA ECONOMIA BRASILEIRA",
    evaluators: ["29", "18"],
    x: 75, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "emerald", isActive: true
  },

  // --- EMERE03MB --- (Orientadora: Fernanda Ponticelli Zabiela)
  {
    id: "g51",
    classCode: "EMERE03MB",
    advisor: "Fernanda Ponticelli Zabiela",
    groupNumber: 51,
    participants: ["Artur Nunes Gonçalves", "Bernardo Silveira Guerreiro", "Bernardo Raphael Severo de Lima", "Kevin Rian Rodrigues Oliveira", "Miguel Gonçalves"],
    title: "Deficiência Dopaminérgica e a Relação com a Doença de Parkinson.",
    evaluators: ["10", "21"],
    x: 15, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "teal", isActive: true
  },
  {
    id: "g52",
    classCode: "EMERE03MB",
    advisor: "Fernanda Ponticelli Zabiela",
    groupNumber: 52,
    participants: ["Amanda Homes de Fraga", "Bernardo dos Santos Braga", "Gabriela Herrera de Souza Leite", "Gabriel Pereira Pelagio", "Manuela Hermes Velozo de Lima", "Sofia Neves Venier"],
    title: "O Impacto do Déjà Vu na Saúde Mental: Uma Análise da Ansiedade e do Estresse",
    evaluators: ["7", "15"],
    x: 45, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "indigo", isActive: true
  },
  {
    id: "g53",
    classCode: "EMERE03MB",
    advisor: "Fernanda Ponticelli Zabiela",
    groupNumber: 53,
    participants: ["Carolina Figueiredo da Fé", "Larissa Santos da Rocha", "Tiérry Souza de Oliveira", "Vitoria Dias Rodrigues", "Yasmin Nunes Bianchi Lopes"],
    title: "Vigorexia e os Impactos do Treinamento Excessivo na saúde física",
    evaluators: ["16", "15"],
    x: 75, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "amber", isActive: true
  },
  {
    id: "g54",
    classCode: "EMERE03MB",
    advisor: "Fernanda Ponticelli Zabiela",
    groupNumber: 54,
    participants: ["Bárbara Fichtner Sampedro", "Maria Luíza Moraes Straccioni", "Sophia João Duarte"],
    title: "Fatores Neuro Psicanalíticos na Gênese da Violência contra a mulher",
    evaluators: ["18", "20"],
    x: 30, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g55",
    classCode: "EMERE03MB",
    advisor: "Fernanda Ponticelli Zabiela",
    groupNumber: 55,
    participants: ["Beatriz Marques Göebel", "Ricardo Becker Manarins", "Vicente Alves Alves", "João Antônio Sagebin Lange", "Keirrison Correa Cardoso"],
    title: "Uso de Fertilizantes em hortas domésticas: aumento de compostos nitrogênio na água e nos alimentos",
    evaluators: ["14", "28"],
    x: 60, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "emerald", isActive: true
  },

  // --- EMERE03MC --- (Orientadora: Mariângela de Avila Oliveira)
  {
    id: "g56",
    classCode: "EMERE03MC",
    advisor: "Mariângela de Avila Oliveira",
    groupNumber: 56,
    participants: ["Ícaro dos Santos Quadros", "Ana Guedes Tomé da Silva", "Rúbia Geovana Silva Souza", "Vitória Brum de Souza"],
    title: "A relação entre inteligências múltiplas e a aprendizagem no ensino médio.",
    evaluators: ["12", "18"],
    x: 15, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  },
  {
    id: "g57",
    classCode: "EMERE03MC",
    advisor: "Mariângela de Avila Oliveira",
    groupNumber: 57,
    participants: ["Gabriela Heitter da Silva", "Maria Clara Franck de Almeida Machado", "Murilo da Silveira Marcello", "Manuela Araújo Pasquali", "Guilherme Caroly Baumhardt"],
    title: "Impacto do autoconhecimento no desenvolvimento do cérebro",
    evaluators: ["7", "18"],
    x: 45, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "indigo", isActive: true
  },
  {
    id: "g58",
    classCode: "EMERE03MC",
    advisor: "Mariângela de Avila Oliveira",
    groupNumber: 58,
    participants: ["Eduardo Kraemer", "Tiago Vasconcellos Fonseca", "Rafael Brasil de Sousa", "Matheus Machado Wollmann"],
    title: "Impactos no uso da IA generativa nos processos de aprendizagem e autonomia entre jovens",
    evaluators: ["6", "19"],
    x: 75, y: 25, width: 14, height: 18, rotation: 0, colorTheme: "violet", isActive: true
  },
  {
    id: "g59",
    classCode: "EMERE03MC",
    advisor: "Mariângela de Avila Oliveira",
    groupNumber: 59,
    participants: ["Julia Gomes Puntel", "Francieli Vitelli Gamarra dos Santos", "Ana Cecília Schuster Abruzzi", "Pietra Alves de Andrade", "Julia Martins Costa da Silva"],
    title: "Genética comportamental: Até onde a biologia influência nos traços comportamentais e escolhas",
    evaluators: ["14", "9"],
    x: 30, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "amber", isActive: true
  },
  {
    id: "g60",
    classCode: "EMERE03MC",
    advisor: "Mariângela de Avila Oliveira",
    groupNumber: 60,
    participants: ["Lorenzo Rossoni Dornelles", "Antônio Carlos da Costa Ferreira", "Gabriel de Sa Röhrig de Leão", "Anthony Dias Medeiros", "Natan Gomes Lautert"],
    title: "A influência da internet e das redes sociais na política contemporânea: democracia digital, polarização e formação de opinião pública.",
    evaluators: ["33", "22"],
    x: 60, y: 65, width: 14, height: 18, rotation: 0, colorTheme: "blue", isActive: true
  }
];

export function getInitialFutsalPosition(groupNumber: number): { x: number; y: number; width: number; height: number; rotation: number; colorTheme: string } {
  let mappedGroupNumber = groupNumber;

  // Quadra 2: groups 45 to 60, and also 31 to 44 (moved to Quadra 2)
  if ((mappedGroupNumber >= 45 && mappedGroupNumber <= 60) || (mappedGroupNumber >= 31 && mappedGroupNumber <= 44)) {
    let x = 0;
    let y = 0;
    let colorTheme = "blue"; // default for 3MA (EMERE03MA)

    if (mappedGroupNumber >= 51 && mappedGroupNumber <= 55) {
      colorTheme = "indigo"; // 3MB (EMERE03MB)
    } else if (mappedGroupNumber >= 56 && mappedGroupNumber <= 60) {
      colorTheme = "emerald"; // 3MC (EMERE03MC)
    } else if (mappedGroupNumber >= 31 && mappedGroupNumber <= 37) {
      colorTheme = "violet"; // 2MB (EMERE02MB)
    } else if (mappedGroupNumber >= 38 && mappedGroupNumber <= 44) {
      colorTheme = "emerald"; // 2MC (EMERE02MC)
    }

    if (mappedGroupNumber === 51) { x = 1.5; y = 48; }
    else if (mappedGroupNumber === 56) { x = 38.2; y = 9; }
    else if (mappedGroupNumber === 57) { x = 46.2; y = 9; }
    else if (mappedGroupNumber === 58) { x = 54.2; y = 9; }
    else if (mappedGroupNumber === 59) { x = 62.2; y = 9; }
    else if (mappedGroupNumber === 60) { x = 70.2; y = 9; }
    
    else if (mappedGroupNumber === 31) { x = 26.2; y = 29.7; }
    else if (mappedGroupNumber === 32) { x = 34.2; y = 29.7; }
    else if (mappedGroupNumber === 33) { x = 42.2; y = 29.7; }
    else if (mappedGroupNumber === 34) { x = 50.2; y = 29.7; }
    else if (mappedGroupNumber === 35) { x = 58.2; y = 29.7; }
    else if (mappedGroupNumber === 36) { x = 66.2; y = 29.7; }
    else if (mappedGroupNumber === 37) { x = 74.2; y = 29.7; }
    
    else if (mappedGroupNumber === 38) { x = 26.2; y = 62.0; }
    else if (mappedGroupNumber === 39) { x = 34.2; y = 62.0; }
    else if (mappedGroupNumber === 40) { x = 42.2; y = 62.0; }
    else if (mappedGroupNumber === 41) { x = 50.2; y = 62.0; }
    else if (mappedGroupNumber === 42) { x = 58.2; y = 62.0; }
    else if (mappedGroupNumber === 43) { x = 66.2; y = 62.0; }
    else if (mappedGroupNumber === 44) { x = 74.2; y = 62.0; }
    
    else if (mappedGroupNumber === 52) { x = 1.5; y = 35; }
    else if (mappedGroupNumber === 53) { x = 1.5; y = 22; }
    else if (mappedGroupNumber === 54) { x = 6.5; y = 9; }
    else if (mappedGroupNumber === 55) { x = 14.5; y = 9; }
    
    else if (mappedGroupNumber === 50) { x = 1.5; y = 76.9; }
    else if (mappedGroupNumber === 49) { x = 36.5; y = 83; }
    else if (mappedGroupNumber === 48) { x = 46.5; y = 83; }
    else if (mappedGroupNumber === 47) { x = 56.5; y = 83; }
    else if (mappedGroupNumber === 46) { x = 66.5; y = 83; }
    else if (mappedGroupNumber === 45) { x = 76.5; y = 83; }

    return { x, y, width: 6.8, height: 9.5, rotation: 0, colorTheme };
  }

  // Quadra 1: groups 1 to 30 (cloned layout from Quadra 2)
  if (mappedGroupNumber >= 1 && mappedGroupNumber <= 30) {
    let x = 0;
    let y = 0;
    let colorTheme = "blue"; // default for EMERE01MA

    if (mappedGroupNumber >= 1 && mappedGroupNumber <= 5) {
      colorTheme = "blue"; // EMERE01MA (clones 56 to 60)
      if (mappedGroupNumber === 1) { x = 46.2; y = 2.0; }
      else if (mappedGroupNumber === 2) { x = 54.2; y = 2.0; }
      else if (mappedGroupNumber === 3) { x = 62.2; y = 2.0; }
      else if (mappedGroupNumber === 4) { x = 70.2; y = 2.0; }
      else if (mappedGroupNumber === 5) { x = 78.2; y = 2.0; }
    }
    else if (mappedGroupNumber >= 6 && mappedGroupNumber <= 10) {
      colorTheme = "teal"; // EMERE01MB (clones 51 to 55)
      if (mappedGroupNumber === 6) { x = 92.0; y = 19.7; }
      else if (mappedGroupNumber === 7) { x = 92.0; y = 32.2; }
      else if (mappedGroupNumber === 8) { x = 92.0; y = 44.7; }
      else if (mappedGroupNumber === 9) { x = 92.0; y = 57.2; }
      else if (mappedGroupNumber === 10) { x = 92.0; y = 69.7; }
    }
    else if (mappedGroupNumber >= 11 && mappedGroupNumber <= 16) {
      colorTheme = "amber"; // EMERE01MC (clones 45 to 50)
      if (mappedGroupNumber === 11) { x = 28.2; y = 83.0; }
      else if (mappedGroupNumber === 12) { x = 36.2; y = 83.0; }
      else if (mappedGroupNumber === 13) { x = 44.2; y = 83.0; }
      else if (mappedGroupNumber === 14) { x = 52.2; y = 83.0; }
      else if (mappedGroupNumber === 15) { x = 60.2; y = 83.0; }
      else if (mappedGroupNumber === 16) { x = 68.2; y = 83.0; }
    }
    else if (mappedGroupNumber >= 17 && mappedGroupNumber <= 23) {
      colorTheme = "violet"; // EMERE01MD (clones 31 to 37)
      const offset = mappedGroupNumber - 17;
      x = 28.2 + offset * 8.0;
      y = 42.5;
    }
    else if (mappedGroupNumber >= 24 && mappedGroupNumber <= 30) {
      colorTheme = "indigo"; // EMERE02MA (clones 38 to 44)
      if (mappedGroupNumber === 24) { x = 1.5; y = 9.0; }
      else if (mappedGroupNumber === 25) { x = 1.5; y = 21.5; }
      else if (mappedGroupNumber === 26) { x = 1.5; y = 34.0; }
      else if (mappedGroupNumber === 27) { x = 1.5; y = 46.5; }
      else if (mappedGroupNumber === 28) { x = 1.5; y = 59.0; }
      else if (mappedGroupNumber === 29) { x = 1.5; y = 71.5; }
      else if (mappedGroupNumber === 30) { x = 1.5; y = 84.0; }
    }

    return { x, y, width: 6.8, height: 9.5, rotation: 0, colorTheme };
  }

  // Fallback / original Quadra 1 default coordinates
  let x = 15;
  let y = 25;
  let width = 4.2;
  let height = 8.5;
  let colorTheme = "emerald";

  return { x, y, width, height, rotation: 0, colorTheme };
}

export const INITIAL_GROUPS: ProjectGroup[] = RAW_INITIAL_GROUPS.map(g => {
  const pos = getInitialFutsalPosition(g.groupNumber);
  return { ...g, ...pos };
});

export const CLASSES_LIST = [
  { code: "EMERE01MA", name: "EMERE01MA", advisor: "Sandro Dias Martins" },
  { code: "EMERE01MB", name: "EMERE01MB", advisor: "Júlia Luíza da Silva de Oliveira" },
  { code: "EMERE01MC", name: "EMERE01MC", advisor: "Sandro Dias Martins" },
  { code: "EMERE01MD", name: "EMERE01MD", advisor: "Miriam Ramos Dutra" },
  { code: "EMERE02MA", name: "EMERE02MA", advisor: "Luciane Souza Bomfim" },
  { code: "EMERE02MB", name: "EMERE02MB", advisor: "Tobias Santos de Souza" },
  { code: "EMERE02MC", name: "EMERE02MC", advisor: "Bianca Cruz Silveira" },
  { code: "EMERE03MA", name: "EMERE03MA", advisor: "Luís Eduardo Schneider" },
  { code: "EMERE03MB", name: "EMERE03MB", advisor: "Fernanda Ponticelli Zabiela" },
  { code: "EMERE03MC", name: "EMERE03MC", advisor: "Mariângela de Avila Oliveira" }
];
