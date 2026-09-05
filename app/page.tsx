'use client'
import { useState, useEffect, useRef, ReactNode } from 'react'
import Image from 'next/image'
import {
  Linkedin, Mail, Download, GraduationCap, Briefcase, Code,
  Brain, Users, BookOpen, Award, Menu, X, Globe, FileText, Github,
  ArrowUpRight, MapPin, Plus,
} from 'lucide-react'

// ── Types & helpers ───────────────────────────────────────────────────────────

type Lang = 'en' | 'pt'
type B = { en: string; pt: string }
const tx = (b: B, lang: Lang) => b[lang]

// ── Content data ──────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: { en: 'Work', pt: 'Trajetória' }, href: '#experience' },
  { label: { en: 'Education', pt: 'Educação' }, href: '#education' },
  { label: { en: 'Projects', pt: 'Projetos' }, href: '#projects' },
  { label: { en: 'Skills', pt: 'Habilidades' }, href: '#skills' },
  { label: { en: 'Awards', pt: 'Prêmios' }, href: '#awards' },
  { label: { en: 'Contact', pt: 'Contato' }, href: '#contact' },
]

const BIO: B = {
  en: "I'm a Mechatronics Engineering student at Unicamp (Top 2 in class) working at the intersection of AI, engineering and entrepreneurship. I've built autonomous perception systems, generative models for medical imaging and quantitative finance models, and I've published research. I also lead the largest entrepreneurship organization at my university.",
  pt: 'Sou estudante de Engenharia Mecatrônica na Unicamp (Top 2 da turma) trabalhando na interseção entre IA, engenharia e empreendedorismo. Construí sistemas de percepção autônoma, modelos generativos para imagens médicas, modelos de finanças quantitativas e publiquei pesquisa, além de liderar a maior organização de empreendedorismo da minha universidade.',
}

const STATS = [
  { label: { en: 'Students impacted', pt: 'Estudantes impactados' }, value: 3000, suffix: '+' },
  { label: { en: 'Research projects', pt: 'Projetos de pesquisa' }, value: 5, suffix: '' },
  { label: { en: 'Papers', pt: 'Artigos' }, value: 2, suffix: '' },
  { label: { en: 'Books published', pt: 'Livros publicados' }, value: 3, suffix: '' },
]

interface Exp {
  id: string
  type: 'professional' | 'volunteer'
  period: B
  org: string
  location: string
  role: B
  project?: B
  description: B
  tags: string[]
  iconName: string
  isCurrent: boolean
}

const EXPERIENCES: Exp[] = [
  {
    id: 'tivio',
    type: 'professional',
    period: { en: 'Jul 2026 – Aug 2026', pt: 'Jul 2026 – Ago 2026' },
    org: 'Tivio Capital',
    location: 'São Paulo, Brazil',
    role: { en: 'Fund of Funds Summer Analyst, Quantitative Finance', pt: 'Analista de Verão de Fundo de Fundos, Finanças Quantitativas' },
    project: {
      en: 'Quantitative modeling of the investment process (Total Portfolio Approach)',
      pt: 'Modelagem quantitativa do processo de investimento (Total Portfolio Approach)',
    },
    description: {
      en: 'Summer analyst on the Fund of Funds team, applying quantitative finance and data science to the investment process. Built quantitative models based on the Total Portfolio Approach (TPA), developed a monitoring scorecard using rolling windows, z-scores and percentiles, and compared TPA portfolios against the existing Strategic Asset Allocation.',
      pt: 'Analista de verão no time de Fundo de Fundos, aplicando finanças quantitativas e ciência de dados ao processo de investimento. Construiu modelos quantitativos baseados no Total Portfolio Approach (TPA), desenvolveu um scorecard de monitoramento usando janelas móveis, z-scores e percentis, e comparou carteiras TPA com a Alocação Estratégica de Ativos existente.',
    },
    tags: ['Quantitative Finance', 'Data Science', 'Python', 'Portfolio Modeling', 'TPA'],
    iconName: 'Briefcase',
    isCurrent: false,
  },
  {
    id: 'entrepreneurship',
    type: 'professional',
    period: { en: 'Aug 2025 – Present', pt: 'Ago 2025 – Presente' },
    org: 'Unicamp Entrepreneurship League',
    location: 'Campinas, Brazil',
    role: { en: 'President', pt: 'Presidente' },
    description: {
      en: "Manage a 30-person team developing startups and products to enhance the university's entrepreneurial ecosystem. Impacted 3,000+ students. Interact with Brazil's most influential entrepreneurs and C-suite executives, receiving individualized mentorship and organizing high-impact events. Partners: Itaú, XP, Nubank, Fundação Estudar, Kaszek Ventures, Atlantico VC.",
      pt: 'Gerencia equipe de 30 pessoas desenvolvendo startups e produtos para o ecossistema empreendedor da Unicamp. Impactou mais de 3.000 estudantes. Interage com os empreendedores e executivos mais influentes do Brasil, recebendo mentoria individualizada e organizando eventos de alto impacto. Parceiros: Itaú, XP, Nubank, Fundação Estudar, Kaszek Ventures, Atlantico VC.',
    },
    tags: ['Leadership', 'Entrepreneurship', 'Startups', 'Team Management'],
    iconName: 'Users',
    isCurrent: true,
  },
  {
    id: 'west-bohemia',
    type: 'professional',
    period: { en: 'Jan 2026 – Mar 2026', pt: 'Jan 2026 – Mar 2026' },
    org: 'University of West Bohemia',
    location: 'Plzeň, Czech Republic',
    role: { en: 'Exchange Visiting Researcher', pt: 'Pesquisador Visitante em Intercâmbio' },
    project: {
      en: '3D Vision System for Autonomous Mars Rover (European Rover Challenge)',
      pt: 'Sistema de Visão 3D para Rover Autônomo em Marte (European Rover Challenge)',
    },
    description: {
      en: 'Selected for a merit-based two-month exchange program focusing on robotics and computer vision. Developed the 3D Vision System for an Autonomous Mars Rover to compete in the European Rover Challenge (ERC), using image processing and spatial awareness algorithms. The project resulted in 2 scientific papers submitted to international academic journals.',
      pt: 'Selecionado para programa de intercâmbio de dois meses com base em mérito, com foco em robótica e visão computacional. Desenvolveu o Sistema de Visão 3D para um Rover Autônomo em Marte para o European Rover Challenge (ERC). Resultou em 2 artigos científicos submetidos a periódicos internacionais.',
    },
    tags: ['Computer Vision', '3D Vision', 'Robotics', 'Python', 'Image Processing'],
    iconName: 'Globe',
    isCurrent: false,
  },
  {
    id: 'nvidia-lids',
    type: 'professional',
    period: { en: 'Jun 2025 – Aug 2026', pt: 'Jun 2025 – Ago 2026' },
    org: 'NVIDIA · LIDS, Laboratory of Image Data Science at Unicamp',
    location: 'Campinas, Brazil',
    role: { en: 'Undergraduate Research, Computer Vision', pt: 'Iniciação Científica, Visão Computacional' },
    project: {
      en: 'Synthesis of 3D Brain MRI using Diffusion Models',
      pt: 'Síntese de Imagens de RM Cerebral 3D com Modelos de Difusão',
    },
    description: {
      en: "Selected for a research position by Prof. Dr. Alexandre Xavier Falcão (one of Brazil's most cited CS researchers in Computer Vision). Engaged in graduate-level studies in Deep Learning, Computer Vision, Medical Imaging and Diffusion Models, including auditing a graduate-level Image Processing and Deep Learning course. Research supported by NVIDIA.",
      pt: 'Selecionado pelo Prof. Dr. Alexandre Xavier Falcão (um dos pesquisadores de CV mais citados do Brasil). Realizou estudos em nível de pós-graduação em Deep Learning, Visão Computacional, Imagens Médicas e Modelos de Difusão, auditando curso de pós-graduação em Processamento de Imagens. Pesquisa apoiada pela NVIDIA.',
    },
    tags: ['Diffusion Models', 'Deep Learning', 'Medical Imaging', 'PyTorch', 'Computer Vision'],
    iconName: 'Brain',
    isCurrent: false,
  },
  {
    id: 'lamar',
    type: 'professional',
    period: { en: 'Jun 2025 – Jun 2026', pt: 'Jun 2025 – Jun 2026' },
    org: 'LAMAR, Laboratory of Rotating Machines at Unicamp',
    location: 'Campinas, Brazil',
    role: { en: 'Undergraduate Research, Machine Learning & AI', pt: 'Iniciação Científica, Machine Learning & IA' },
    project: {
      en: 'Numerical Modeling of Journal Short Bearings using ML & AI',
      pt: 'Modelagem Numérica de Mancais Curtos com ML e IA',
    },
    description: {
      en: "Ranked 2nd in a Statics class of 71 students, leading the professor to invite me to research journal bearing dynamics. The study involves numerical modeling of hydrodynamic behavior using Reynolds' equations to build a dataset for ML in predicting dynamic coefficients. Presenting at the MECSOL 2026 International Congress at ITA in Oct/26.",
      pt: 'Classificado em 2º lugar em uma turma de 71 alunos de Estática, o que levou à pesquisa sobre dinâmica de mancais. O estudo envolve modelagem numérica do comportamento hidrodinâmico com equações de Reynolds para dataset de ML. Apresentação no Congresso Internacional MECSOL 2026 no ITA em Out/26.',
    },
    tags: ['Machine Learning', 'Numerical Modeling', 'Python', 'Data Analysis', 'Reynolds Equations'],
    iconName: 'BookOpen',
    isCurrent: false,
  },
  {
    id: 'remote-sensing',
    type: 'professional',
    period: { en: '2025 – May 2026', pt: '2025 – Mai 2026' },
    org: 'Geomatics, Natural Hazards & Risk (International Journal)',
    location: 'Brazil',
    role: { en: 'Researcher, Remote Sensing & Environmental Monitoring', pt: 'Pesquisador, Sensoriamento Remoto e Monitoramento Ambiental' },
    project: {
      en: 'Flood-pulse confounding in wetland disturbance monitoring: Pantanal (2020–2025)',
      pt: 'Confusão de pulso de inundação no monitoramento de perturbação em zonas úmidas: Pantanal (2020–2025)',
    },
    description: {
      en: 'Published article in Geomatics, Natural Hazards & Risk (May 2026): "A reproducible regime-aware unsupervised framework to reduce flood-pulse confounding in wetland disturbance monitoring: Pantanal (2020–2025)". Applied remote sensing and unsupervised machine learning to monitor environmental disturbances in the world\'s largest tropical wetland.',
      pt: 'Artigo publicado no Geomatics, Natural Hazards & Risk (Mai 2026): "A reproducible regime-aware unsupervised framework to reduce flood-pulse confounding in wetland disturbance monitoring: Pantanal (2020–2025)". Aplicou sensoriamento remoto e machine learning não supervisionado para monitorar perturbações ambientais na maior área úmida tropical do mundo.',
    },
    tags: ['Remote Sensing', 'Environmental Monitoring', 'Unsupervised ML', 'Python', 'Pantanal'],
    iconName: 'FileText',
    isCurrent: false,
  },
  {
    id: 'eracing',
    type: 'professional',
    period: { en: 'Apr 2024 – Jul 2025', pt: 'Abr 2024 – Jul 2025' },
    org: 'Unicamp E-racing, Formula Student Team',
    location: 'Campinas, Brazil',
    role: { en: 'Perception Division, Autonomous Vehicles & Robotics', pt: 'Divisão de Percepção, Veículos Autônomos e Robótica' },
    project: {
      en: 'Cone detection with YOLO + LiDAR fusion on ROS2 for autonomous Formula car',
      pt: 'Detecção de cones com fusão YOLO + LiDAR no ROS2 para carro Formula autônomo',
    },
    description: {
      en: "Developed and implemented perception systems for a fully autonomous (driverless) Formula electric car. Progressed from basic to advanced proficiency in Python, Linux, Git, ROS2, Computer Vision and Image Processing in six months. The project secured 3rd place in Brazil's National Autonomous Vehicles Competition against the top 20 universities.",
      pt: 'Desenvolveu e implementou sistemas de percepção para um carro elétrico Formula autônomo. Progrediu de proficiência básica para avançada em Python, Linux, Git, ROS2 e Visão Computacional em seis meses. O projeto garantiu o 3º lugar na Competição Nacional de Veículos Autônomos do Brasil.',
    },
    tags: ['Python', 'ROS2', 'YOLO', 'LiDAR', 'Computer Vision', 'Linux'],
    iconName: 'Briefcase',
    isCurrent: false,
  },
  {
    id: 'harvard',
    type: 'volunteer',
    period: { en: 'Jan 2025 – Mar 2025', pt: 'Jan 2025 – Mar 2025' },
    org: 'Harvard Business School, Aspire Leaders Program',
    location: 'Online (Global)',
    role: { en: 'Program Participant, Business & Leadership', pt: 'Participante, Negócios e Liderança' },
    description: {
      en: "Participated in Harvard University's Aspire Leaders Program. Interacted with a diverse global cohort and connected directly with top educators from Harvard, MIT and Stanford, gaining significant insights into entrepreneurship, robotics and AI.",
      pt: 'Participou do Programa Aspire Leaders da Universidade Harvard. Interagiu com coorte global e se conectou com educadores de elite de Harvard, MIT e Stanford, adquirindo insights sobre empreendedorismo, robótica e IA.',
    },
    tags: ['Leadership', 'Entrepreneurship', 'Business', 'Harvard · MIT · Stanford'],
    iconName: 'Award',
    isCurrent: false,
  },
  {
    id: 'documentary',
    type: 'volunteer',
    period: { en: 'Jan 2021 – Nov 2021', pt: 'Jan 2021 – Nov 2021' },
    org: 'High School Independent Project',
    location: 'Barueri, Brazil',
    role: { en: 'Project Lead, Documentary Film', pt: 'Líder de Projeto, Documentário' },
    project: {
      en: 'Barueri: Comércio e Educação, Documentary on Social Inequality',
      pt: 'Barueri: Comércio e Educação, Documentário sobre Desigualdade Social',
    },
    description: {
      en: 'Led a team of 10 in producing the first feature-length documentary exploring a sociological perspective on my hometown, highlighting social inequality and the consequences of limited education access. Honored with a school-wide award for its impact and pioneering nature.',
      pt: 'Liderou uma equipe de 10 pessoas na produção do primeiro documentário explorando uma perspectiva sociológica sobre a cidade natal, destacando a desigualdade social. Premiado com reconhecimento escolar por seu impacto e natureza pioneira.',
    },
    tags: ['Film Production', 'Leadership', 'Social Impact'],
    iconName: 'BookOpen',
    isCurrent: false,
  },
  {
    id: 'books',
    type: 'volunteer',
    period: { en: 'Jan 2018 – Dec 2021', pt: 'Jan 2018 – Dez 2021' },
    org: '3 Published Books',
    location: 'Brazil',
    role: { en: 'Co-Author & Project Coordinator', pt: 'Co-Autor e Coordenador de Projeto' },
    project: {
      en: 'Além de Belas Palavras · Jovens Entre(linhas) · Cofre de Pensamentos',
      pt: 'Além de Belas Palavras · Jovens Entre(linhas) · Cofre de Pensamentos',
    },
    description: {
      en: 'Co-authored three books during high school, serving as project coordinator for two and leading teams of 50+ people each. Wrote about social, literary and philosophical topics, including societal pressure on individuals and the perception of time in modernity.',
      pt: 'Co-autoria de três livros durante o ensino médio, coordenando dois como líder de projeto e liderando equipes de mais de 50 pessoas cada. Escreveu sobre temas sociais, literários e filosóficos, incluindo pressão social e a percepção do tempo na modernidade.',
    },
    tags: ['Writing', 'Leadership', 'Philosophy', 'Literature'],
    iconName: 'BookOpen',
    isCurrent: false,
  },
]

interface Project {
  id: string
  title: B
  description: B
  tags: string[]
  github: string | null
  doi?: string
  iconName: string
  images: string[]
  video?: string
  poster?: string
  fit?: 'cover' | 'contain'
}

const PROJECTS: Project[] = [
  {
    id: 'dark-lands-rpg',
    title: { en: 'Dark Lands, Narrative RPG', pt: 'Dark Lands, RPG Narrativo' },
    description: {
      en: 'Turn-based narrative RPG on the high seas where you battle marine creatures like the Enchanting Mermaid, the Fish-Man and the Kraken across three stages with random events and dropped weapons. Built in Java 21 using the Strategy and Builder design patterns, with Gradle, JAXB and JUnit 5.',
      pt: 'RPG narrativo por turnos em alto-mar no qual você enfrenta criaturas marinhas como a Sereia Encantadora, o Homem-Peixe e o Kraken ao longo de três estágios com eventos aleatórios e armas dropadas. Feito em Java 21 usando os padrões Strategy e Builder, com Gradle, JAXB e JUnit 5.',
    },
    tags: ['Java 21', 'Design Patterns', 'Gradle', 'JAXB', 'JUnit 5'],
    github: 'https://github.com/Raf-Pimentel/SideProject-Dark-Lands-RPG-Game',
    iconName: 'Code',
    images: ['/projects/dark-lands-rpg/cover.jpg'],
  },
  {
    id: 'pantanal-burns',
    title: { en: 'PantanalBurns, Wetland Disturbance Monitoring', pt: 'PantanalBurns, Monitoramento de Distúrbios' },
    description: {
      en: 'Reproducible regime-aware unsupervised framework that separates fire disturbance from seasonal flood-pulse signals in the Brazilian Pantanal, using Landsat NDVI/NBR time series, K-means eco-spectral regimes and a Random Forest. Published in Geomatics, Natural Hazards & Risk (2026).',
      pt: 'Framework reproduzível não-supervisionado que separa distúrbios de fogo dos sinais sazonais de pulso de inundação no Pantanal, usando séries temporais Landsat NDVI/NBR, regimes eco-espectrais por K-means e Random Forest. Publicado no Geomatics, Natural Hazards & Risk (2026).',
    },
    tags: ['Python', 'Remote Sensing', 'Random Forest', 'Scikit-learn', 'Landsat'],
    github: 'https://github.com/Raf-Pimentel/Paper-PantanalBurns',
    doi: 'https://doi.org/10.1080/19475705.2026.2660859',
    iconName: 'FileText',
    images: ['/projects/pantanal-burns/cover.jpg'],
    fit: 'contain',
  },
  {
    id: 'erc-night-task',
    title: { en: 'Night-Task Navigation for Competition Rovers', pt: 'Navegação Noturna para Rovers de Competição' },
    description: {
      en: 'Sim-to-Real pipeline evaluating ArUco marker detection in near-zero-lux conditions for the European Rover Challenge Night Task, using ROS2 Jazzy and Gazebo Harmonic and validated against physical experiments at the University of West Bohemia. Developed for the Artificial Life and Robotics journal.',
      pt: 'Pipeline Sim-to-Real avaliando detecção de marcadores ArUco em condições de luz quase nula para a Night Task do European Rover Challenge, usando ROS2 Jazzy e Gazebo Harmonic e validado com experimentos físicos na Universidade da Boêmia Ocidental. Desenvolvido para o periódico Artificial Life and Robotics.',
    },
    tags: ['Python', 'ROS2', 'Gazebo', 'OpenCV', 'Computer Vision'],
    github: 'https://github.com/Raf-Pimentel/Paper-ERC-Night-Task-Simulation',
    iconName: 'Globe',
    images: [],
    video: '/projects/erc-night-task/visual-odometry.mp4',
    poster: '/projects/erc-night-task/poster.jpg',
  },
  {
    id: 'bearing-ml',
    title: { en: 'ML for Journal Bearing Dynamics', pt: 'ML para Dinâmica de Mancais' },
    description: {
      en: "Numerical modeling of hydrodynamic behavior in journal short bearings using Reynolds' equations and machine learning to predict dynamic coefficients. Presenting at MECSOL 2026 at ITA.",
      pt: 'Modelagem numérica do comportamento hidrodinâmico em mancais curtos com equações de Reynolds e ML para prever coeficientes dinâmicos. Apresentação no MECSOL 2026 no ITA.',
    },
    tags: ['Python', 'Scikit-learn', 'Numerical Modeling', 'NumPy'],
    github: 'https://github.com/Raf-Pimentel/Paper--ML-for-Thrust-Bearings-DynamicCoefficients-',
    iconName: 'Code',
    images: ['/projects/scientific-initiation/image1.jpg', '/projects/scientific-initiation/image2.jpg'],
  },
  {
    id: 'decade-ranking',
    title: { en: 'Brazilian Fixed-Income Fund Ranking', pt: 'Ranking de Fundos de Renda Fixa' },
    description: {
      en: 'Data pipeline that ranks Brazilian fixed-income funds by retail client profile using public CVM and Central Bank data, validating 6.3M rows and producing reproducible top-five rankings for any reference date, with CI and quality reports.',
      pt: 'Pipeline de dados que ranqueia fundos de renda fixa brasileiros por perfil de cliente usando dados públicos da CVM e do Banco Central, validando 6,3 milhões de linhas e gerando rankings top-cinco reproduzíveis para qualquer data de referência, com CI e relatórios de qualidade.',
    },
    tags: ['Python', 'Data Engineering', 'Finance', 'CI'],
    github: 'https://github.com/Raf-Pimentel/decade-fixed-income-ranking',
    iconName: 'Briefcase',
    images: ['/projects/decade-ranking/cover.jpg'],
  },
  {
    id: 'brain-mri',
    title: { en: '3D Brain MRI Synthesis (Diffusion Models)', pt: 'Síntese de RM Cerebral 3D (Modelos de Difusão)' },
    description: {
      en: 'NVIDIA-supported research generating synthetic 3D brain MRI scans using Diffusion Models at LIDS/Unicamp, addressing data scarcity in medical imaging. Graduate-level research.',
      pt: 'Pesquisa apoiada pela NVIDIA gerando exames de RM cerebral 3D sintéticos com Modelos de Difusão no LIDS/Unicamp, abordando escassez de dados em imagens médicas.',
    },
    tags: ['PyTorch', 'Diffusion Models', 'Medical Imaging', 'Deep Learning'],
    github: null,
    iconName: 'Brain',
    images: ['/projects/brain-mri/cover.jpg'],
    fit: 'contain',
  },
  {
    id: 'autonomous-perception',
    title: { en: 'Autonomous Perception (E-racing)', pt: 'Percepção Autônoma (E-racing)' },
    description: {
      en: "Cone detection pipeline using YOLO and LiDAR sensor fusion with ROS2 for a Formula Student driverless electric car. Secured 3rd place in Brazil's National Autonomous Vehicles Competition.",
      pt: 'Pipeline de detecção de cones com fusão YOLO e LiDAR no ROS2 para carro elétrico autônomo da Fórmula Student. 3º lugar nacional em Veículos Autônomos.',
    },
    tags: ['Python', 'ROS2', 'YOLO', 'LiDAR', 'Computer Vision'],
    github: null,
    iconName: 'Code',
    images: ['/projects/autonomous-perception/image1.jpg', '/projects/autonomous-perception/image2.jpg'],
  },
  {
    id: 'ifome',
    title: { en: "'Ifome' Food Delivery App", pt: "App de Delivery 'Ifome'" },
    description: {
      en: 'iFood replica in Java with advanced OOP concepts, design patterns and data structures. MC322, Unicamp.',
      pt: 'Réplica do iFood em Java com POO avançada, padrões de projeto e estruturas de dados. MC322, Unicamp.',
    },
    tags: ['Java', 'OOP', 'Data Structures', 'Design Patterns'],
    github: 'https://github.com/Jpedro-sr/MC322---Projeto-Final---Grupo-3',
    iconName: 'Code',
    images: ['/projects/ifome/cover.jpg'],
  },
  {
    id: 'rubiks',
    title: { en: "Rubik's Cube Solver", pt: 'Solucionador de Cubo Mágico' },
    description: {
      en: "Graphical and gamified Rubik's Cube solving algorithm with step-by-step visualization.",
      pt: 'Algoritmo gráfico e gamificado de resolução de Cubo Mágico com visualização passo a passo.',
    },
    tags: ['Python', 'Algorithms', 'Game Development'],
    github: null,
    iconName: 'Code',
    images: ['/projects/rubiks-cube/image1.jpg', '/projects/rubiks-cube/image2.jpg', '/projects/rubiks-cube/image3.jpg'],
  },
]

const SKILL_GROUPS = [
  {
    title: { en: 'Programming', pt: 'Programação' },
    items: [
      { name: 'Python', icon: 'python/python-original.svg' },
      { name: 'C', icon: 'c/c-original.svg' },
      { name: 'Java', icon: 'java/java-original.svg' },
      { name: 'SQL', icon: 'postgresql/postgresql-original.svg' },
      { name: 'VHDL', icon: null },
    ],
  },
  {
    title: { en: 'AI & Machine Learning', pt: 'IA & Machine Learning' },
    items: [
      { name: 'PyTorch', icon: 'pytorch/pytorch-original.svg' },
      { name: 'Scikit-learn', icon: 'scikitlearn/scikitlearn-original.svg' },
      { name: 'NumPy', icon: 'numpy/numpy-original.svg' },
      { name: 'Pandas', icon: 'pandas/pandas-original.svg' },
      { name: 'Matplotlib', icon: null },
    ],
  },
  {
    title: { en: 'Tools & Platforms', pt: 'Ferramentas & Plataformas' },
    items: [
      { name: 'Git', icon: 'git/git-original.svg' },
      { name: 'Linux', icon: 'linux/linux-original.svg' },
      { name: 'GitHub', icon: 'github/github-original.svg' },
      { name: 'ROS2', icon: null },
      { name: 'Windows', icon: 'windows8/windows8-original.svg' },
    ],
  },
]

const HUMAN_LANGS = [
  { flag: '🇧🇷', name: { en: 'Portuguese', pt: 'Português' }, level: { en: 'Native', pt: 'Nativo' } },
  { flag: '🇺🇸', name: { en: 'English', pt: 'Inglês' }, level: { en: 'Fluent (C1)', pt: 'Fluente (C1)' } },
  { flag: '🇫🇷', name: { en: 'French', pt: 'Francês' }, level: { en: 'Intermediate', pt: 'Intermediário' } },
  { flag: '🇪🇸', name: { en: 'Spanish', pt: 'Espanhol' }, level: { en: 'Intermediate', pt: 'Intermediário' } },
]

const AWARDS = [
  {
    title: { en: 'Top 2 in Class, Mechatronics Engineering', pt: 'Top 2 da Turma, Engenharia Mecatrônica' },
    description: { en: 'GPA 3.6/4.0, ranked Top 2 in the Mechatronics Engineering class at Unicamp (Top 3% of the program).', pt: 'GPA 3,6/4,0, classificado Top 2 da turma de Engenharia Mecatrônica da Unicamp (Top 3% do programa).' },
    year: '2024–26',
  },
  {
    title: { en: 'Super Liga X, 1st Place National', pt: 'Super Liga X, 1º Lugar Nacional' },
    description: { en: 'Entrepreneurship competition with 90+ universities and 290+ participants across Brazil. My team won 1st place.', pt: 'Competição empreendedora com mais de 90 universidades e 290+ participantes no Brasil. Minha equipe conquistou o 1º lugar.' },
    year: '2025',
  },
  {
    title: { en: 'Robocar Race, 3rd Place National', pt: 'Robocar Race, 3º Lugar Nacional' },
    description: { en: 'Autonomous vehicle competition against the 20 best universities in Brazil, combining robotics, AI and computer vision.', pt: 'Competição de veículos autônomos contra as 20 melhores universidades do Brasil, combinando robótica, IA e visão computacional.' },
    year: '2025',
  },
  {
    title: { en: 'Merit-Based Research Selections (×2)', pt: 'Seleções por Mérito em Pesquisa (×2)' },
    description: { en: 'Selected for Computer Vision research after the highest grade in Data Structures; selected for ML research after ranking 2nd in Statics (71 students).', pt: 'Selecionado para pesquisa em CV após maior nota em Estruturas de Dados; selecionado para pesquisa em ML após 2º lugar em Estática (71 alunos).' },
    year: '2025',
  },
]

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'
const ICONS = { Brain, Briefcase, Users, BookOpen, Award, Code, Globe, GraduationCap, FileText, Github }

// ── Micro-interaction components ───────────────────────────────────────────────

/** Soft navy glow that trails the cursor across the page. */
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    if (!el) return
    let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y, raf = 0
    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY }
    const loop = () => {
      cx += (x - cx) * 0.14
      cy += (y - cy) * 0.14
      el.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} aria-hidden className="spotlight" />
}

function ScrollProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setW(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="fixed top-0 left-0 h-[2px] bg-navy z-[60] transition-[width] duration-150" style={{ width: `${w}%` }} />
}

/** Button/element that leans toward the cursor on hover. */
function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const r = el.getBoundingClientRect()
    const mx = e.clientX - (r.left + r.width / 2)
    const my = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${mx * 0.22}px, ${my * 0.28}px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </span>
  )
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { rootMargin: '-60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          obs.disconnect()
          const t0 = performance.now()
          const dur = 1600
          const step = (now: number) => {
            const p = Math.min((now - t0) / dur, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setCount(Math.floor(eased * target))
            if (p < 1) requestAnimationFrame(step)
            else setCount(target)
          }
          requestAnimationFrame(step)
        }
      },
      { rootMargin: '-40px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function SectionHead({ num, title, kicker }: { num: string; title: string; kicker?: string }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-muted tabular-nums">{num}</span>
        <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight">{title}</h2>
      </div>
      <div className="mt-5 h-px w-full bg-line" />
      {kicker && <p className="mt-4 text-sm text-muted max-w-2xl leading-relaxed">{kicker}</p>}
    </Reveal>
  )
}

type Zoom = { src: string; alt: string } | null

function Lightbox({ item, onClose }: { item: Zoom; onClose: () => void }) {
  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [item, onClose])
  if (!item) return null
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
      style={{ background: 'rgba(43,42,40,0.82)', animation: 'fade-up 0.3s ease both' }}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-paper/90 text-ink flex items-center justify-center hover:bg-paper transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
        style={{ animation: 'fade-up 0.4s cubic-bezier(0.22,1,0.36,1) both' }}
      />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)
  const [zoom, setZoom] = useState<Zoom>(null)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])
  const toggle = (id: string) => setExpanded(p => ({ ...p, [id]: !p[id] }))
  const hero = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  })

  return (
    <main className="relative min-h-screen text-ink">
      <Spotlight />
      <ScrollProgress />
      <Lightbox item={zoom} onClose={() => setZoom(null)} />

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-line">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#top" className="font-serif text-lg text-navy tracking-tight">Rafael Melo</a>
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="link-underline text-sm text-ink/70 hover:text-navy transition-colors">
                  {tx(l.label, lang)}
                </a>
              ))}
              <button
                onClick={() => setLang(l => (l === 'en' ? 'pt' : 'en'))}
                className="px-3 py-1.5 rounded-full border border-line hover:border-navy/50 text-ink/70 hover:text-navy text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3 h-3" /> {lang === 'en' ? 'PT' : 'EN'}
              </button>
            </div>
            <button onClick={() => setMobileOpen(o => !o)} className="md:hidden text-ink">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {mobileOpen && (
            <div className="md:hidden pb-4 pt-2 border-t border-line flex flex-col gap-3">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm text-ink/80 hover:text-navy transition-colors">
                  {tx(l.label, lang)}
                </a>
              ))}
              <button
                onClick={() => { setLang(l => (l === 'en' ? 'pt' : 'en')); setMobileOpen(false) }}
                className="w-fit px-3 py-1.5 rounded-full border border-line text-ink/70 text-xs font-semibold flex items-center gap-1.5"
              >
                <Globe className="w-3 h-3" /> {lang === 'en' ? 'Switch to PT' : 'Mudar para EN'}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="top" className="relative mx-auto max-w-6xl px-6 pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="md:col-span-7">
            <p style={hero(0)} className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-muted mb-6">
              <MapPin className="w-3.5 h-3.5" /> Campinas, Brazil
            </p>
            <h1 style={hero(80)} className="font-serif text-6xl md:text-8xl leading-[0.95] tracking-tight text-navy">
              Rafael<br />Melo
            </h1>
            <p style={hero(180)} className="mt-6 text-lg md:text-xl text-ink/80 max-w-xl">
              {lang === 'en'
                ? 'Engineer & researcher, building at the edge of AI, robotics and entrepreneurship.'
                : 'Engenheiro & pesquisador, construindo na fronteira entre IA, robótica e empreendedorismo.'}
            </p>

            <div style={hero(280)} className="mt-7 border-l-2 border-navy/30 pl-4">
              <p className="text-[13px] leading-relaxed text-ink/70">{tx(BIO, lang)}</p>
            </div>

            {/* Now line, reflects the one role still active */}
            <div style={hero(360)} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-1.5 font-semibold text-navy">
                <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse" />
                {lang === 'en' ? 'Now' : 'Agora'}
              </span>
              <span className="text-ink/80">{lang === 'en' ? 'President, Unicamp Entrepreneurship League' : 'Presidente, Liga Empreendedora Unicamp'}</span>
              <span className="text-muted">·</span>
              <span className="text-muted">{lang === 'en' ? 'Previously Tivio Capital, NVIDIA · LIDS' : 'Anteriormente Tivio Capital, NVIDIA · LIDS'}</span>
            </div>

            <div style={hero(440)} className="flex flex-wrap gap-3 mt-8">
              <Magnetic>
                <a href="/cv.pdf" download
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy hover:bg-navy-700 text-paper text-sm rounded-full transition-colors">
                  <Download className="w-4 h-4" /> {lang === 'en' ? 'Download CV' : 'Baixar CV'}
                </a>
              </Magnetic>
              <a href="https://www.linkedin.com/in/rafael-rodrigues-pimentel-de-melo-9588a02b3/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-line hover:border-navy/50 text-ink text-sm rounded-full transition-colors">
                <Linkedin className="w-4 h-4 text-navy" /> LinkedIn
              </a>
              <a href="https://github.com/Raf-Pimentel" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-line hover:border-navy/50 text-ink text-sm rounded-full transition-colors">
                <Github className="w-4 h-4 text-navy" /> GitHub
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div className="md:col-span-5 flex justify-center md:justify-end" style={hero(200)}>
            <button
              onClick={() => setZoom({ src: '/profile-photo.jpg', alt: 'Rafael Melo' })}
              className="group relative block cursor-zoom-in"
              aria-label={lang === 'en' ? 'Enlarge photo' : 'Ampliar foto'}
            >
              <div className="relative w-60 h-[330px] md:w-[300px] md:h-[400px] overflow-hidden rounded-sm bg-panel border border-line">
                <Image src="/profile-photo.jpg" alt="Rafael Melo" fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-paper/90 text-ink text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-3 h-3" /> {lang === 'en' ? 'Zoom' : 'Ampliar'}
                </span>
              </div>
              {/* corner ticks */}
              <span className="absolute -top-2 -left-2 w-5 h-5 border-t border-l border-navy/50" />
              <span className="absolute -top-2 -right-2 w-5 h-5 border-t border-r border-navy/50" />
              <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b border-l border-navy/50" />
              <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b border-r border-navy/50" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-line bg-panel/50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label.en} delay={i * 80}>
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-4xl md:text-5xl text-navy tabular-nums">
                    <Counter target={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-muted text-xs uppercase tracking-wider">{tx(s.label, lang)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="mx-auto max-w-4xl px-6 py-20 md:py-28 scroll-mt-16">
        <SectionHead
          num="01"
          title={lang === 'en' ? 'Work & Research' : 'Trajetória & Pesquisa'}
          kicker={lang === 'en'
            ? 'A path across autonomous systems, generative AI, quantitative finance, research and leadership.'
            : 'Um caminho por sistemas autônomos, IA generativa, finanças quantitativas, pesquisa e liderança.'}
        />
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <Reveal key={exp.id} delay={(i % 4) * 60} className="relative pl-8">
                <span className={`absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 ${exp.isCurrent ? 'border-navy bg-navy' : 'border-line bg-paper'}`} />
                <div className="group">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-muted">{tx(exp.period, lang)}</span>
                    {exp.isCurrent && (
                      <span className="inline-flex items-center gap-1 text-navy text-[11px] font-semibold uppercase tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse" /> {lang === 'en' ? 'Present' : 'Presente'}
                      </span>
                    )}
                    {exp.type === 'volunteer' && (
                      <span className="text-[11px] text-muted uppercase tracking-wide">{lang === 'en' ? 'Volunteer' : 'Voluntário'}</span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-navy mt-1.5 leading-snug">{exp.org}</h3>
                  <p className="text-ink/80 text-sm mt-0.5">{tx(exp.role, lang)}</p>
                  <p className="text-muted text-xs mt-0.5">{exp.location}</p>
                  {exp.project && (
                    <p className="text-navy/80 text-sm italic mt-2">↳ {tx(exp.project, lang)}</p>
                  )}
                  <p className={`text-ink/70 text-sm leading-relaxed mt-2 ${expanded[exp.id] ? '' : 'line-clamp-2'}`}>
                    {tx(exp.description, lang)}
                  </p>
                  <button onClick={() => toggle(exp.id)} className="link-underline text-navy text-xs font-semibold mt-2">
                    {expanded[exp.id] ? (lang === 'en' ? 'Show less' : 'Ver menos') : (lang === 'en' ? 'Read more' : 'Ler mais')}
                  </button>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-panel border border-line text-muted rounded-full text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="mx-auto max-w-4xl px-6 py-20 md:py-28 scroll-mt-16">
        <SectionHead num="02" title={lang === 'en' ? 'Education' : 'Educação'} />
        <Reveal>
          <div className="border border-line rounded-lg p-6 md:p-8 bg-panel/40 hover:border-navy/40 transition-colors">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-6 h-6 text-navy flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-navy">
                    {lang === 'en' ? 'Mechatronics Engineering (Control & Automation)' : 'Engenharia Mecatrônica (Controle e Automação)'}
                  </h3>
                  <p className="text-ink/70 text-sm mt-1">
                    {lang === 'en' ? 'State University of Campinas (Unicamp), BEng' : 'Universidade Estadual de Campinas (Unicamp), Bacharelado'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 border border-navy/30 text-navy text-xs font-semibold rounded-full">Top 3%</span>
                <span className="px-3 py-1 bg-navy text-paper text-xs font-semibold rounded-full">{lang === 'en' ? 'Top 2 in class' : 'Top 2 da turma'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 text-sm">
              <span className="font-mono text-xs text-muted">2024 – 2029</span>
              <span className="text-line">|</span>
              <span className="text-ink/70 font-semibold">GPA 3.6 / 4.0</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-5 pt-5 border-t border-line">
              <div>
                <p className="text-ink text-sm font-semibold mb-2">{lang === 'en' ? 'Perfect grades in' : 'Notas máximas em'}</p>
                <ul className="text-ink/70 text-sm space-y-1.5">
                  {[
                    { en: 'Algorithms & Programming (Python)', pt: 'Algoritmos e Programação (Python)' },
                    { en: 'Data Structures (C)', pt: 'Estruturas de Dados (C)' },
                    { en: 'Calculus I, II & III', pt: 'Cálculo I, II e III' },
                    { en: 'Linear Algebra', pt: 'Álgebra Linear' },
                  ].map(s => (
                    <li key={s.en} className="flex items-start gap-2"><span className="text-navy">•</span><span>{tx(s, lang)}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-ink text-sm font-semibold mb-2">{lang === 'en' ? 'Also covered' : 'Também estudado'}</p>
                <ul className="text-ink/70 text-sm space-y-1.5">
                  {[
                    { en: 'Digital Logic Circuits (VHDL / FPGA)', pt: 'Circuitos Lógicos Digitais (VHDL / FPGA)' },
                    { en: 'Physics Laboratory (NumPy, Matplotlib)', pt: 'Laboratório de Física (NumPy, Matplotlib)' },
                    { en: 'Statics & Dynamics', pt: 'Estática e Dinâmica' },
                  ].map(s => (
                    <li key={s.en} className="flex items-start gap-2"><span className="text-muted">·</span><span>{tx(s, lang)}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-5">
          <div className="border border-line rounded-lg p-6 md:p-8 bg-panel/40 hover:border-navy/40 transition-colors">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Globe className="w-6 h-6 text-navy flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-navy">
                    {lang === 'en' ? 'Visiting Student, Exchange Program' : 'Estudante Visitante, Intercâmbio'}
                  </h3>
                  <p className="text-ink/70 text-sm mt-1">University of West Bohemia, Plzeň, Czech Republic</p>
                </div>
              </div>
              <span className="px-3 py-1 border border-navy/30 text-navy text-xs font-semibold rounded-full">{lang === 'en' ? 'Merit-Based' : 'Por Mérito'}</span>
            </div>
            <span className="block font-mono text-xs text-muted mt-4">Jan 2026 – Mar 2026</span>
            <p className="text-ink/70 text-sm mt-2 leading-relaxed">
              {lang === 'en'
                ? 'Two-month merit-based exchange in robotics and computer vision. Developed a 3D Vision System for an Autonomous Mars Rover for the European Rover Challenge (ERC), resulting in 2 scientific papers submitted to international journals.'
                : 'Intercâmbio de dois meses por mérito em robótica e visão computacional. Desenvolveu um Sistema de Visão 3D para um Rover Autônomo em Marte para o European Rover Challenge (ERC), resultando em 2 artigos científicos submetidos.'}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-28 scroll-mt-16">
        <SectionHead
          num="03"
          title={lang === 'en' ? 'Selected Projects' : 'Projetos Selecionados'}
          kicker={lang === 'en' ? 'Click any image to enlarge it.' : 'Clique em qualquer imagem para ampliá-la.'}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => {
            const Icon = ICONS[p.iconName as keyof typeof ICONS] ?? Code
            return (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <div className="h-full flex flex-col border border-line rounded-lg overflow-hidden bg-paper hover:border-navy/40 hover:-translate-y-1 transition-all duration-300">
                  {p.video ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-panel">
                      <video
                        src={p.video}
                        poster={p.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ) : p.images.length > 0 ? (
                    <button
                      onClick={() => setZoom({ src: p.images[0], alt: tx(p.title, lang) })}
                      className="relative aspect-[16/10] w-full overflow-hidden bg-panel cursor-zoom-in group/img"
                      aria-label={lang === 'en' ? 'Enlarge image' : 'Ampliar imagem'}
                    >
                      <Image src={p.images[0]} alt={tx(p.title, lang)} fill className={`${p.fit === 'contain' ? 'object-contain p-2' : 'object-cover'} transition-transform duration-700 group-hover/img:scale-105`} />
                      <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-paper/90 text-ink text-[10px] opacity-0 group-hover/img:opacity-100 transition-opacity">
                        <Plus className="w-3 h-3" /> {lang === 'en' ? 'Zoom' : 'Ampliar'}
                      </span>
                    </button>
                  ) : (
                    <div className="aspect-[16/10] w-full flex items-center justify-center bg-panel">
                      <Icon className="w-8 h-8 text-navy/40" />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="font-serif text-lg text-navy leading-snug">{tx(p.title, lang)}</h3>
                    <p className="text-ink/70 text-sm leading-relaxed mt-2 flex-1">{tx(p.description, lang)}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-panel border border-line text-muted rounded-full text-[11px]">{t}</span>
                      ))}
                    </div>
                    {(p.github || p.doi) && (
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer"
                            className="link-underline inline-flex items-center gap-1.5 text-navy text-xs font-semibold w-fit">
                            <Github className="w-3.5 h-3.5" /> {lang === 'en' ? 'View on GitHub' : 'Ver no GitHub'} <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                        {p.doi && (
                          <a href={p.doi} target="_blank" rel="noopener noreferrer"
                            className="link-underline inline-flex items-center gap-1.5 text-navy text-xs font-semibold w-fit">
                            <FileText className="w-3.5 h-3.5" /> {lang === 'en' ? 'Read paper (DOI)' : 'Ler artigo (DOI)'} <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="mx-auto max-w-6xl px-6 py-20 md:py-28 scroll-mt-16">
        <SectionHead num="04" title={lang === 'en' ? 'Skills' : 'Habilidades'} />
        <div className="grid md:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.title.en} delay={gi * 80}>
              <div className="border border-line rounded-lg p-6 bg-panel/40 h-full">
                <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4">{tx(group.title, lang)}</h3>
                <div className="flex flex-col gap-2">
                  {group.items.map(s => (
                    <div key={s.name} className="flex items-center gap-3 py-1.5">
                      {s.icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`${DEVICON}${s.icon}`} alt={s.name} width={20} height={20} />
                      ) : (
                        <Code className="w-5 h-5 text-navy/50" />
                      )}
                      <span className="text-ink text-sm">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={180} className="mt-6">
          <div className="border border-line rounded-lg p-6 bg-panel/40">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4">{lang === 'en' ? 'Languages' : 'Idiomas'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {HUMAN_LANGS.map(l => (
                <div key={l.flag} className="flex items-center gap-3">
                  <span className="text-2xl">{l.flag}</span>
                  <div>
                    <p className="text-ink text-sm font-medium">{tx(l.name, lang)}</p>
                    <p className="text-muted text-xs">{tx(l.level, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Awards ── */}
      <section id="awards" className="mx-auto max-w-6xl px-6 py-20 md:py-28 scroll-mt-16">
        <SectionHead num="05" title={lang === 'en' ? 'Awards & Publication' : 'Prêmios & Publicação'} />
        <Reveal className="mb-6">
          <div className="border-l-2 border-navy bg-panel/50 rounded-r-lg p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-navy text-xs font-semibold uppercase tracking-wide">
                <FileText className="w-3.5 h-3.5" /> {lang === 'en' ? 'Published · May 2026' : 'Publicado · Mai 2026'}
              </span>
              <span className="text-muted text-xs">Geomatics, Natural Hazards & Risk</span>
            </div>
            <h3 className="font-serif text-lg md:text-xl text-navy leading-snug mb-2">
              {lang === 'en'
                ? 'A reproducible regime-aware unsupervised framework to reduce flood-pulse confounding in wetland disturbance monitoring: Pantanal (2020–2025)'
                : 'Um framework reproduzível baseado em regimes não-supervisionados para reduzir confundimento de pulso de inundação no monitoramento de distúrbios em zonas úmidas: Pantanal (2020–2025)'}
            </h3>
            <p className="text-ink/70 text-sm leading-relaxed">
              {lang === 'en'
                ? "Remote sensing and unsupervised machine learning to monitor environmental disturbances in the Pantanal, the world's largest tropical wetland, using satellite time-series from 2020 to 2025."
                : 'Sensoriamento remoto e machine learning não-supervisionado para monitorar distúrbios ambientais no Pantanal usando séries temporais de satélites de 2020 a 2025.'}
            </p>
            <a href="https://doi.org/10.1080/19475705.2026.2660859" target="_blank" rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-navy text-xs font-semibold mt-3 w-fit">
              <FileText className="w-3.5 h-3.5" /> {lang === 'en' ? 'Read paper (DOI)' : 'Ler artigo (DOI)'} <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          {AWARDS.map((a, i) => (
            <Reveal key={a.title.en} delay={(i % 2) * 80}>
              <div className="flex items-start gap-4 border border-line rounded-lg p-5 bg-paper hover:border-navy/40 transition-colors h-full">
                <Award className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-base text-navy leading-snug">{tx(a.title, lang)}</h3>
                    <span className="font-mono text-[11px] text-muted flex-shrink-0">{a.year}</span>
                  </div>
                  <p className="text-ink/70 text-sm leading-relaxed mt-1">{tx(a.description, lang)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-20 md:py-28 scroll-mt-16">
        <SectionHead num="06" title={lang === 'en' ? 'Contact' : 'Contato'} />
        <Reveal>
          <p className="font-serif text-2xl md:text-3xl text-navy leading-snug max-w-2xl">
            {lang === 'en'
              ? "Always open to research collaborations, interesting projects, or a good conversation."
              : 'Sempre aberto a colaborações em pesquisa, projetos interessantes ou uma boa conversa.'}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Magnetic>
              <a href="mailto:rafaelrpm10@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy hover:bg-navy-700 text-paper text-sm rounded-full transition-colors">
                <Mail className="w-4 h-4" /> rafaelrpm10@gmail.com
              </a>
            </Magnetic>
            <a href="https://www.linkedin.com/in/rafael-rodrigues-pimentel-de-melo-9588a02b3/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-line hover:border-navy/50 text-ink text-sm rounded-full transition-colors">
              <Linkedin className="w-4 h-4 text-navy" /> LinkedIn
            </a>
            <a href="https://github.com/Raf-Pimentel" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-line hover:border-navy/50 text-ink text-sm rounded-full transition-colors">
              <Github className="w-4 h-4 text-navy" /> GitHub
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-muted text-sm">
          <p className="font-serif text-navy">Rafael Melo</p>
          <p className="text-xs">© {new Date().getFullYear()} · Campinas, SP, Brazil</p>
        </div>
      </footer>
    </main>
  )
}
