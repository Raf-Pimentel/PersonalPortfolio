'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  Linkedin, Mail, Download, GraduationCap, Briefcase, Code,
  Brain, Users, BookOpen, Award, Menu, X, Globe, FileText, Github,
} from 'lucide-react'

// ── Types & helpers ───────────────────────────────────────────────────────────

type Lang = 'en' | 'pt'
type B = { en: string; pt: string }
const tx = (b: B, lang: Lang) => b[lang]

// ── Content data ──────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: { en: 'About', pt: 'Sobre' }, href: '#about' },
  { label: { en: 'Experience', pt: 'Experiência' }, href: '#experience' },
  { label: { en: 'Education', pt: 'Educação' }, href: '#education' },
  { label: { en: 'Projects', pt: 'Projetos' }, href: '#projects' },
  { label: { en: 'Skills', pt: 'Habilidades' }, href: '#skills' },
  { label: { en: 'Notes', pt: 'Notas' }, href: '#notes' },
  { label: { en: 'Awards', pt: 'Prêmios' }, href: '#awards' },
  { label: { en: 'Contact', pt: 'Contato' }, href: '#contact' },
]

const TYPED_ROLES: Record<Lang, string[]> = {
  en: [
    'NVIDIA-Supported CV Researcher',
    'Visiting Researcher @ Czech Republic',
    'Entrepreneurship League President',
    'Brain MRI Synthesis Researcher',
    'Autonomous Systems Engineer',
    'Mechatronics Engineer @ Unicamp',
  ],
  pt: [
    'Pesquisador de VC Apoiado pela NVIDIA',
    'Pesquisador Visitante na Rep. Tcheca',
    'Presidente da Liga Empreendedora',
    'Pesquisador de Síntese de RM Cerebral',
    'Engenheiro de Sistemas Autônomos',
    'Engenheiro Mecatrônico @ Unicamp',
  ],
}

const BIO: B = {
  en: 'Mechatronics Engineering student at Unicamp (Top 2 in class, GPA 3.6). Participated in 5 research projects — including NVIDIA-supported research in Diffusion Models, a visiting researcher exchange in Czech Republic, and a published journal article on Remote Sensing. President of Unicamp\'s Entrepreneurship League, impacting 2,000+ students.',
  pt: 'Estudante de Engenharia Mecatrônica na Unicamp (Top 2 da turma, GPA 3,6). Participou de 5 projetos de pesquisa — incluindo pesquisa apoiada pela NVIDIA em Modelos de Difusão, intercâmbio de pesquisador visitante na República Tcheca, e artigo publicado em periódico internacional de Sensoriamento Remoto. Presidente da Liga Empreendedora da Unicamp, impactando mais de 2.000 estudantes.',
}

const STATS = [
  { label: { en: 'Students Impacted', pt: 'Estudantes Impactados' }, value: 2000, suffix: '+' },
  { label: { en: 'Research Projects', pt: 'Projetos de Pesquisa' }, value: 5, suffix: '' },
  { label: { en: 'Scientific Papers', pt: 'Artigos Científicos' }, value: 2, suffix: '' },
  { label: { en: 'Books Published', pt: 'Livros Publicados' }, value: 3, suffix: '' },
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
  dotColor: string
  iconColor: string
  isCurrent: boolean
}

const EXPERIENCES: Exp[] = [
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
      en: 'Selected for a merit-based two-month exchange program (ended Mar 14, 2026) focusing on robotics and computer vision. Developed the 3D Vision System for an Autonomous Mars Rover to compete in the European Rover Challenge (ERC), utilizing image processing and spatial awareness algorithms. The project resulted in 2 scientific papers submitted to international academic journals.',
      pt: 'Selecionado para programa de intercâmbio de dois meses com base em mérito (encerrado em 14 de março de 2026) com foco em robótica e visão computacional. Desenvolveu o Sistema de Visão 3D para um Rover Autônomo em Marte para o European Rover Challenge (ERC). Resultou em 2 artigos científicos submetidos a periódicos internacionais.',
    },
    tags: ['Computer Vision', '3D Vision', 'Robotics', 'Python', 'Image Processing'],
    iconName: 'Globe',
    dotColor: 'border-cyan-400',
    iconColor: 'text-cyan-400',
    isCurrent: false,
  },
  {
    id: 'nvidia-lids',
    type: 'professional',
    period: { en: 'Jun 2025 – Present', pt: 'Jun 2025 – Presente' },
    org: 'NVIDIA · LIDS – Laboratory of Image Data Science at Unicamp',
    location: 'Campinas, Brazil',
    role: { en: 'Undergraduate Research – Computer Vision', pt: 'Iniciação Científica – Visão Computacional' },
    project: {
      en: 'Synthesis of 3D Brain MRI using Diffusion Models',
      pt: 'Síntese de Imagens de RM Cerebral 3D com Modelos de Difusão',
    },
    description: {
      en: "Selected for a unique research position by Prof. Dr. Alexandre Xavier Falcão (one of Brazil's most cited CS researchers in Computer Vision). Engaged in graduate-level studies in Deep Learning, Computer Vision, Medical Imaging, and Diffusion Models, including auditing a graduate-level Image Processing and Deep Learning course. Research is supported by NVIDIA.",
      pt: 'Selecionado pelo Prof. Dr. Alexandre Xavier Falcão (um dos pesquisadores de CV mais citados do Brasil). Realizando estudos em nível de pós-graduação em Deep Learning, Visão Computacional, Imagens Médicas e Modelos de Difusão. Auditando curso de pós-graduação em Processamento de Imagens. Pesquisa apoiada pela NVIDIA.',
    },
    tags: ['Diffusion Models', 'Deep Learning', 'Medical Imaging', 'PyTorch', 'Computer Vision'],
    iconName: 'Brain',
    dotColor: 'border-green-400',
    iconColor: 'text-green-400',
    isCurrent: true,
  },
  {
    id: 'entrepreneurship',
    type: 'professional',
    period: { en: 'Aug 2025 – Present', pt: 'Ago 2025 – Presente' },
    org: 'Unicamp Entrepreneurship League',
    location: 'Campinas, Brazil',
    role: { en: 'President', pt: 'Presidente' },
    description: {
      en: "Manage a 30-person team developing startups and products to enhance the university's entrepreneurial ecosystem. Impacted 2,000+ students. Interact with Brazil's most influential entrepreneurs and C-suite executives, receiving individualized mentorship and organizing high-impact events. Partners: Itaú, XP, Nubank, Fundação Estudar, Kaszek Ventures, Atlantico VC.",
      pt: 'Gerencia equipe de 30 pessoas desenvolvendo startups e produtos para o ecossistema empreendedor da Unicamp. Impactou mais de 2.000 estudantes. Parceiros: Itaú, XP, Nubank, Fundação Estudar, Kaszek Ventures, Atlantico VC.',
    },
    tags: ['Leadership', 'Entrepreneurship', 'Startups', 'Team Management'],
    iconName: 'Users',
    dotColor: 'border-amber-400',
    iconColor: 'text-amber-400',
    isCurrent: true,
  },
  {
    id: 'lamar',
    type: 'professional',
    period: { en: 'Jun 2025 – Present', pt: 'Jun 2025 – Presente' },
    org: 'LAMAR – Laboratory of Rotating Machines at Unicamp',
    location: 'Campinas, Brazil',
    role: { en: 'Undergraduate Research – Machine Learning & AI', pt: 'Iniciação Científica – Machine Learning & IA' },
    project: {
      en: 'Numerical Modeling of Journal Short Bearings using ML & AI',
      pt: 'Modelagem Numérica de Mancais Curtos com ML e IA',
    },
    description: {
      en: "Ranked 2nd in a Statics class of 71 students, leading the professor to invite me to research journal bearing dynamics. Study involves numerical modeling of hydrodynamic behavior using Reynolds' equations to build a dataset for ML in predicting dynamic coefficients. Presenting at MECSOL 2026 International Congress at ITA (Instituto Tecnológico de Aeronáutica) in Oct/26.",
      pt: 'Classificado em 2º lugar em uma turma de 71 alunos de Estática, o que levou à pesquisa sobre dinâmica de mancais. Estudo envolve modelagem numérica do comportamento hidrodinâmico com equações de Reynolds para dataset de ML. Apresentação no Congresso Internacional MECSOL 2026 no ITA em Out/26.',
    },
    tags: ['Machine Learning', 'Numerical Modeling', 'Python', 'Data Analysis', 'Reynolds Equations'],
    iconName: 'BookOpen',
    dotColor: 'border-blue-400',
    iconColor: 'text-blue-400',
    isCurrent: true,
  },
  {
    id: 'remote-sensing',
    type: 'professional',
    period: { en: '2025 – May 2026', pt: '2025 – Mai 2026' },
    org: 'Geomatics and Natural Hazards & Risk – International Journal',
    location: 'Brazil',
    role: { en: 'Researcher – Remote Sensing & Environmental Monitoring', pt: 'Pesquisador – Sensoriamento Remoto e Monitoramento Ambiental' },
    project: {
      en: 'Flood-pulse confounding in wetland disturbance monitoring: Pantanal (2020–2025)',
      pt: 'Confusão de pulso de inundação no monitoramento de perturbação em zonas úmidas: Pantanal (2020–2025)',
    },
    description: {
      en: 'Published article in Geomatics and Natural Hazards & Risk (May 2026): "A reproducible regime-aware unsupervised framework to reduce flood-pulse confounding in wetland disturbance monitoring: Pantanal (2020–2025)". Research applying remote sensing and unsupervised machine learning to monitor environmental disturbances in the world\'s largest tropical wetland.',
      pt: 'Artigo publicado no Geomatics and Natural Hazards & Risk (Mai 2026): "A reproducible regime-aware unsupervised framework to reduce flood-pulse confounding in wetland disturbance monitoring: Pantanal (2020–2025)". Pesquisa aplicando sensoriamento remoto e machine learning não supervisionado para monitorar perturbações ambientais na maior área úmida tropical do mundo.',
    },
    tags: ['Remote Sensing', 'Environmental Monitoring', 'Unsupervised ML', 'Python', 'Pantanal'],
    iconName: 'FileText',
    dotColor: 'border-emerald-400',
    iconColor: 'text-emerald-400',
    isCurrent: false,
  },
  {
    id: 'eracing',
    type: 'professional',
    period: { en: 'Apr 2024 – Jul 2025', pt: 'Abr 2024 – Jul 2025' },
    org: 'Unicamp E-racing – Formula Student Team',
    location: 'Campinas, Brazil',
    role: { en: 'Perception Division – Autonomous Vehicles & Robotics', pt: 'Divisão de Percepção – Veículos Autônomos e Robótica' },
    project: {
      en: 'Cone detection with YOLO + LiDAR fusion on ROS2 for autonomous Formula car',
      pt: 'Detecção de cones com fusão YOLO + LiDAR no ROS2 para carro Formula autônomo',
    },
    description: {
      en: "Developed and implemented perception systems for a fully autonomous (driverless) Formula electric car. Progressed from basic to advanced proficiency in Python, Linux, Git, ROS2, Computer Vision, and Image Processing in six months. The project secured 3rd place in Brazil's National Autonomous Vehicles Competition against the top 20 universities.",
      pt: 'Desenvolveu e implementou sistemas de percepção para um carro elétrico Formula autônomo. Progrediu de proficiência básica para avançada em Python, Linux, Git, ROS2 e Visão Computacional em seis meses. O projeto garantiu o 3º lugar na Competição Nacional de Veículos Autônomos do Brasil.',
    },
    tags: ['Python', 'ROS2', 'YOLO', 'LiDAR', 'Computer Vision', 'Linux'],
    iconName: 'Briefcase',
    dotColor: 'border-orange-400',
    iconColor: 'text-orange-400',
    isCurrent: false,
  },
  {
    id: 'harvard',
    type: 'volunteer',
    period: { en: 'Jan 2025 – Mar 2025', pt: 'Jan 2025 – Mar 2025' },
    org: 'Harvard Business School – Aspire Leaders Program',
    location: 'Online (Global)',
    role: { en: 'Program Participant – Business & Leadership', pt: 'Participante – Negócios e Liderança' },
    description: {
      en: "Participated in Harvard University's Aspire Leaders Program. Interacted with a diverse global cohort and connected directly with top educators from Harvard, MIT, and Stanford, gaining significant insights into entrepreneurship, robotics, and AI.",
      pt: 'Participou do Programa Aspire Leaders da Universidade Harvard. Interagiu com coorte global e se conectou com educadores de elite de Harvard, MIT e Stanford, adquirindo insights sobre empreendedorismo, robótica e IA.',
    },
    tags: ['Leadership', 'Entrepreneurship', 'Business', 'Harvard · MIT · Stanford'],
    iconName: 'Award',
    dotColor: 'border-purple-400',
    iconColor: 'text-purple-400',
    isCurrent: false,
  },
  {
    id: 'cna',
    type: 'volunteer',
    period: { en: 'Jan 2021 – Jun 2021', pt: 'Jan 2021 – Jun 2021' },
    org: 'CNA School of Idioms',
    location: 'Barueri, Brazil',
    role: { en: 'English Language Instructor', pt: 'Instrutor de Língua Inglesa' },
    description: {
      en: 'Taught English to 30 children and adults across basic and intermediate levels for six months. Pivotal in mastering English fluency (C1) and honing oratory and communication skills.',
      pt: 'Ensinou inglês para 30 crianças e adultos nos níveis básico e intermediário. Fundamental para dominar a fluência em inglês (C1) e aprimorar habilidades de oratória e comunicação.',
    },
    tags: ['Teaching', 'Communication', 'English'],
    iconName: 'BookOpen',
    dotColor: 'border-teal-400',
    iconColor: 'text-teal-400',
    isCurrent: false,
  },
  {
    id: 'documentary',
    type: 'volunteer',
    period: { en: 'Jan 2021 – Nov 2021', pt: 'Jan 2021 – Nov 2021' },
    org: 'High School Independent Project',
    location: 'Barueri, Brazil',
    role: { en: 'Project Lead – Documentary Film', pt: 'Líder de Projeto – Documentário' },
    project: {
      en: 'Barueri: Comércio e Educação – Documentary on Social Inequality',
      pt: 'Barueri: Comércio e Educação – Documentário sobre Desigualdade Social',
    },
    description: {
      en: 'Led a team of 10 in producing the first feature-length documentary exploring a sociological perspective on the hometown, highlighting social inequality and consequences of limited education access. Honored with a school-wide award for its impact and pioneering nature.',
      pt: 'Liderou uma equipe de 10 pessoas na produção do primeiro documentário explorando uma perspectiva sociológica sobre a cidade natal, destacando a desigualdade social. Premiado com reconhecimento escolar por seu impacto e natureza pioneira.',
    },
    tags: ['Film Production', 'Leadership', 'Social Impact'],
    iconName: 'BookOpen',
    dotColor: 'border-rose-400',
    iconColor: 'text-rose-400',
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
      en: 'Co-authored three books during high school, serving as project coordinator for two and leading teams of 50+ people each. Wrote about social, literary, and philosophical topics — including societal pressure on individuals and the perception of time in modernity.',
      pt: 'Co-autoria de três livros durante o ensino médio, coordenando dois como líder de projeto e liderando equipes de mais de 50 pessoas cada. Escreveu sobre temas sociais, literários e filosóficos — incluindo pressão social e a percepção do tempo na modernidade.',
    },
    tags: ['Writing', 'Leadership', 'Philosophy', 'Literature'],
    iconName: 'BookOpen',
    dotColor: 'border-indigo-400',
    iconColor: 'text-indigo-400',
    isCurrent: false,
  },
]

const PROJECTS = [
  {
    id: 'mars-rover',
    title: { en: '3D Vision System – Mars Rover (ERC)', pt: 'Sistema de Visão 3D – Rover Marciano (ERC)' },
    description: {
      en: 'Developed a 3D Vision System for an Autonomous Mars Rover for the European Rover Challenge at University of West Bohemia, Czech Republic. Resulted in 2 scientific papers submitted to international journals.',
      pt: 'Desenvolveu Sistema de Visão 3D para Rover Autônomo em Marte no European Rover Challenge na Universidade da Boêmia Ocidental. Resultou em 2 artigos científicos submetidos a periódicos internacionais.',
    },
    tags: ['Python', 'Computer Vision', '3D Vision', 'Robotics'],
    github: null as string | null,
    iconName: 'Brain',
    iconColor: 'text-cyan-400',
    images: [] as string[],
  },
  {
    id: 'brain-mri',
    title: { en: '3D Brain MRI Synthesis (Diffusion Models)', pt: 'Síntese de RM Cerebral 3D (Modelos de Difusão)' },
    description: {
      en: 'NVIDIA-supported research generating synthetic 3D brain MRI scans using Diffusion Models at LIDS/Unicamp, addressing data scarcity in medical imaging. Graduate-level research.',
      pt: 'Pesquisa apoiada pela NVIDIA gerando exames de RM cerebral 3D sintéticos com Modelos de Difusão no LIDS/Unicamp, abordando escassez de dados em imagens médicas.',
    },
    tags: ['PyTorch', 'Diffusion Models', 'Medical Imaging', 'Deep Learning'],
    github: null as string | null,
    iconName: 'Brain',
    iconColor: 'text-green-400',
    images: [] as string[],
  },
  {
    id: 'autonomous-perception',
    title: { en: 'Autonomous Perception (E-racing)', pt: 'Percepção Autônoma (E-racing)' },
    description: {
      en: 'Cone detection pipeline using YOLO and LiDAR sensor fusion with ROS2 for a Formula Student driverless electric car. Secured 3rd place in Brazil\'s National Autonomous Vehicles Competition.',
      pt: 'Pipeline de detecção de cones com fusão YOLO e LiDAR no ROS2 para carro elétrico autônomo da Fórmula Student. 3º lugar nacional em Veículos Autônomos.',
    },
    tags: ['Python', 'ROS2', 'YOLO', 'LiDAR', 'Computer Vision'],
    github: null as string | null,
    iconName: 'Brain',
    iconColor: 'text-orange-400',
    images: ['/projects/autonomous-perception/image1.jpg', '/projects/autonomous-perception/image2.jpg'],
  },
  {
    id: 'bearing-ml',
    title: { en: 'ML for Journal Bearing Dynamics', pt: 'ML para Dinâmica de Mancais' },
    description: {
      en: "Numerical modeling of hydrodynamic behavior in journal short bearings using Reynolds' equations and machine learning to predict dynamic coefficients. Presenting at MECSOL 2026 at ITA.",
      pt: 'Modelagem numérica do comportamento hidrodinâmico em mancais curtos com equações de Reynolds e ML para prever coeficientes dinâmicos. Apresentação no MECSOL 2026 no ITA.',
    },
    tags: ['Python', 'Scikit-learn', 'Numerical Modeling', 'NumPy'],
    github: null as string | null,
    iconName: 'Code',
    iconColor: 'text-blue-400',
    images: ['/projects/scientific-initiation/image1.jpg', '/projects/scientific-initiation/image2.jpg'],
  },
  {
    id: 'rubiks',
    title: { en: "Rubik's Cube Solver", pt: 'Solucionador de Cubo Mágico' },
    description: {
      en: 'Graphical and gamified Rubik\'s Cube solving algorithm with step-by-step visualization.',
      pt: 'Algoritmo gráfico e gamificado de resolução de Cubo Mágico com visualização passo a passo.',
    },
    tags: ['Python', 'Algorithms', 'Game Development'],
    github: null as string | null,
    iconName: 'Code',
    iconColor: 'text-yellow-400',
    images: ['/projects/rubiks-cube/image1.jpg', '/projects/rubiks-cube/image2.jpg'],
  },
  {
    id: 'ifome',
    title: { en: "'Ifome' Food Delivery App", pt: "App de Delivery 'Ifome'" },
    description: {
      en: 'iFood replica in Java with advanced OOP concepts, design patterns, and data structures. MC322 – Unicamp.',
      pt: 'Réplica do iFood em Java com POO avançada, padrões de projeto e estruturas de dados. MC322 – Unicamp.',
    },
    tags: ['Java', 'OOP', 'Data Structures', 'Design Patterns'],
    github: null as string | null,
    iconName: 'Code',
    iconColor: 'text-purple-400',
    images: [] as string[],
  },
]

const SKILL_GROUPS = [
  {
    title: { en: 'Programming Languages', pt: 'Linguagens de Programação' },
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
      { name: 'GitHub', icon: 'github/github-original.svg', invert: true },
      { name: 'ROS2', icon: null },
      { name: 'Windows', icon: 'windows8/windows8-original.svg' },
    ],
  },
]

const HUMAN_LANGS = [
  { flag: '🇧🇷', name: { en: 'Portuguese', pt: 'Português' }, level: { en: 'Native', pt: 'Nativo' } },
  { flag: '🇺🇸', name: { en: 'English', pt: 'Inglês' }, level: { en: 'Fluent – C1', pt: 'Fluente – C1' } },
  { flag: '🇫🇷', name: { en: 'French', pt: 'Francês' }, level: { en: 'Intermediate', pt: 'Intermediário' } },
  { flag: '🇪🇸', name: { en: 'Spanish', pt: 'Espanhol' }, level: { en: 'Intermediate', pt: 'Intermediário' } },
]

const NOTES = [
  {
    id: 'diffusion-mri',
    title: { en: 'Diffusion Models in Medical Imaging', pt: 'Modelos de Difusão em Imagens Médicas' },
    excerpt: {
      en: "How generative AI is addressing data scarcity in medical imaging research, and what we're building at the NVIDIA-supported LIDS lab at Unicamp.",
      pt: 'Como a IA generativa está resolvendo a escassez de dados em imagens médicas, e o que estamos construindo no laboratório LIDS/NVIDIA na Unicamp.',
    },
    tags: ['Deep Learning', 'Medical Imaging', 'Research'],
    accent: 'border-green-400/40 hover:border-green-400/70',
    tagColor: 'bg-green-400/10 text-green-400',
  },
  {
    id: 'autonomous-formula',
    title: { en: 'Building Autonomous Perception for Formula Student', pt: 'Percepção Autônoma para Fórmula Student' },
    excerpt: {
      en: 'Lessons from building a YOLO + LiDAR fusion system for a driverless Formula car from scratch in six months, and reaching 3rd place nationally.',
      pt: 'Lições de construir um sistema YOLO + LiDAR para um carro Formula autônomo do zero em seis meses, chegando ao 3º lugar nacional.',
    },
    tags: ['ROS2', 'Computer Vision', 'Robotics'],
    accent: 'border-orange-400/40 hover:border-orange-400/70',
    tagColor: 'bg-orange-400/10 text-orange-400',
  },
  {
    id: 'startup-ecosystem',
    title: { en: "Building a Startup Ecosystem at Brazil's Top Engineering School", pt: 'Ecossistema de Startups na Unicamp' },
    excerpt: {
      en: "What I've learned leading 30 people, partnering with Kaszek, Nubank and XP, and impacting 1,500+ students at Brazil's top engineering university.",
      pt: 'O que aprendi liderando 30 pessoas, parceirando com Kaszek, Nubank e XP, e impactando mais de 1.500 estudantes na melhor universidade de engenharia do Brasil.',
    },
    tags: ['Entrepreneurship', 'Leadership', 'Startups'],
    accent: 'border-amber-400/40 hover:border-amber-400/70',
    tagColor: 'bg-amber-400/10 text-amber-400',
  },
]

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'

const ICONS = { Brain, Briefcase, Users, BookOpen, Award, Code, Globe, GraduationCap, FileText, Github }

// ── Components ────────────────────────────────────────────────────────────────

function TypeWriter({ lang }: { lang: Lang }) {
  const [text, setText] = useState('')
  const state = useRef({ wordIdx: 0, charIdx: 0, deleting: false })

  useEffect(() => {
    state.current = { wordIdx: 0, charIdx: 0, deleting: false }
    setText('')
    let timer: ReturnType<typeof setTimeout>
    const roles = TYPED_ROLES[lang]

    const tick = () => {
      const s = state.current
      const word = roles[s.wordIdx]
      if (!s.deleting) {
        if (s.charIdx < word.length) {
          s.charIdx++
          setText(word.slice(0, s.charIdx))
          timer = setTimeout(tick, 75)
        } else {
          timer = setTimeout(() => { s.deleting = true; tick() }, 2000)
        }
      } else {
        if (s.charIdx > 0) {
          s.charIdx--
          setText(word.slice(0, s.charIdx))
          timer = setTimeout(tick, 45)
        } else {
          s.deleting = false
          s.wordIdx = (s.wordIdx + 1) % roles.length
          timer = setTimeout(tick, 350)
        }
      }
    }

    timer = setTimeout(tick, 900)
    return () => clearTimeout(timer)
  }, [lang])

  return (
    <div className="text-xl md:text-2xl font-medium h-9 flex items-center mt-2">
      <span className="text-cyan-400">{text}</span>
      <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-blink" />
    </div>
  )
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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
        transform: inView ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
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
          const dur = 1800
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
      { rootMargin: '-50px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  const toggle = (id: string) => setExpanded(p => ({ ...p, [id]: !p[id] }))

  const hero = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#about" className="text-lg font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
              Rafael Melo
            </a>
            <div className="hidden md:flex items-center gap-5">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  {tx(l.label, lang)}
                </a>
              ))}
              <button
                onClick={() => setLang(l => l === 'en' ? 'pt' : 'en')}
                className="ml-2 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-400 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3 h-3" />
                {lang === 'en' ? 'PT' : 'EN'}
              </button>
            </div>
            <button onClick={() => setMobileOpen(o => !o)} className="md:hidden text-slate-300">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {mobileOpen && (
            <div className="md:hidden pb-4 pt-3 border-t border-slate-800 flex flex-col gap-3">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors text-sm">
                  {tx(l.label, lang)}
                </a>
              ))}
              <button
                onClick={() => { setLang(l => l === 'en' ? 'pt' : 'en'); setMobileOpen(false) }}
                className="w-fit px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <Globe className="w-3 h-3" />
                {lang === 'en' ? 'Switch to PT' : 'Switch to EN'}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Splash ── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/profile-photo3.png"
          alt="Rafael Melo"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,14,26,0.4) 0%, rgba(10,14,26,0.65) 70%, rgba(10,14,26,1) 100%)' }}
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-cyan-400 text-xs md:text-sm font-mono tracking-[0.35em] uppercase mb-5">
            {lang === 'en' ? 'Engineer & Researcher' : 'Engenheiro & Pesquisador'}
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Rafael Melo
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-300 text-sm md:text-base">
            <span>Unicamp</span>
            <span className="text-slate-500">·</span>
            <span>NVIDIA</span>
            <span className="text-slate-500">·</span>
            <span>{lang === 'en' ? 'Czech Republic' : 'República Tcheca'}</span>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-400/80">
          <span className="text-[10px] tracking-[0.3em] uppercase">{lang === 'en' ? 'scroll' : 'role'}</span>
          <svg className="animate-bounce" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ── Hero ── */}
      <section id="about" className="container mx-auto px-4 pt-32 pb-12 md:pt-40 md:pb-16 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 items-center">

            {/* Photo – portrait card */}
            <div className="md:col-span-1 flex justify-center" style={hero(0)}>
              <div className="relative mt-2 mb-2 md:mb-0">

                {/* Ambient glow bloom */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    inset: '-40px',
                    background: 'radial-gradient(ellipse at 50% 42%, rgba(6,182,212,0.22) 0%, rgba(99,102,241,0.13) 42%, transparent 68%)',
                    filter: 'blur(22px)',
                  }}
                />

                {/* Gradient border frame */}
                <div
                  className="relative rounded-2xl p-[2px]"
                  style={{ background: 'linear-gradient(148deg, #22d3ee 0%, #6366f1 52%, #a855f7 100%)' }}
                >
                  {/* Photo */}
                  <div className="relative w-52 md:w-60 h-[277px] md:h-80 rounded-[14px] overflow-hidden bg-slate-950">
                    <Image
                      src="/profile-photo.jpg"
                      alt="Rafael Melo"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Subtle vignette at bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                      style={{ background: 'linear-gradient(to top, rgba(10,14,26,0.32) 0%, transparent 100%)' }}
                    />
                  </div>
                </div>

                {/* Bracket corner accents */}
                <div className="absolute -top-[7px] -left-[7px] w-5 h-5 border-t-2 border-l-2 border-cyan-400/65 pointer-events-none" />
                <div className="absolute -top-[7px] -right-[7px] w-5 h-5 border-t-2 border-r-2 border-cyan-400/65 pointer-events-none" />
                <div className="absolute -bottom-[7px] -left-[7px] w-5 h-5 border-b-2 border-l-2 border-violet-400/65 pointer-events-none" />
                <div className="absolute -bottom-[7px] -right-[7px] w-5 h-5 border-b-2 border-r-2 border-violet-400/65 pointer-events-none" />


              </div>
            </div>

            {/* Text */}
            <div className="md:col-span-2 text-center md:text-left">
              <div style={hero(100)} className="flex items-center justify-center md:justify-start gap-3 mb-1">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Rafael Melo
                </h1>
                <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                  <Image src="/unicamp-logo.png" alt="Unicamp" fill className="object-contain" />
                </div>
                <span className="text-3xl md:text-4xl select-none" title="Brazil">🇧🇷</span>
              </div>

              <div style={hero(200)}><TypeWriter lang={lang} /></div>

              <div style={hero(320)} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 mt-5">
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">{tx(BIO, lang)}</p>
              </div>

              <div style={hero(420)} className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
                <a href="https://www.linkedin.com/in/rafael-rodrigues-pimentel-de-melo-9588a02b3/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-slate-200 text-sm transition-all">
                  <Linkedin className="w-4 h-4 text-cyan-400" /> LinkedIn
                </a>
                <a href="https://github.com/Raf-Pimentel" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-slate-200 text-sm transition-all">
                  <Github className="w-4 h-4 text-cyan-400" /> GitHub
                </a>
                <a href="mailto:rafaelrpm10@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-slate-200 text-sm transition-all">
                  <Mail className="w-4 h-4 text-cyan-400" /> Email
                </a>
                <a href="/cv.pdf" download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 border border-cyan-500 rounded-lg text-white text-sm transition-all shadow-lg shadow-cyan-900/30">
                  <Download className="w-4 h-4" /> {lang === 'en' ? 'Download CV' : 'Baixar CV'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <Reveal key={s.label.en} delay={i * 80}>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-cyan-400">
                    <Counter target={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-slate-400 text-xs leading-tight">{tx(s.label, lang)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-8">
            <h2 className="text-4xl font-bold">{lang === 'en' ? 'Experience' : 'Experiência'}</h2>
          </Reveal>

          {/* Timeline */}
          <div className="relative">
            <div
              className="absolute left-5 top-0 bottom-0 w-0.5"
              style={{ background: 'linear-gradient(to bottom, #06b6d4, #3b82f6, #8b5cf6, #10b981, #f59e0b)' }}
            />
            <div className="space-y-6">
              {EXPERIENCES.map((exp, i) => {
                const Icon = ICONS[exp.iconName as keyof typeof ICONS] ?? Code
                return (
                  <Reveal key={exp.id} delay={i * 70} className="relative flex gap-5">
                    {/* Dot */}
                    <div className={`relative z-10 mt-5 flex-shrink-0 w-10 h-10 rounded-full bg-slate-950 border-2 ${exp.dotColor} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${exp.iconColor}`} />
                    </div>
                    {/* Card */}
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                      {/* Header row */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono text-slate-500">{tx(exp.period, lang)}</span>
                            {exp.isCurrent && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                {lang === 'en' ? 'Present' : 'Presente'}
                              </span>
                            )}
                            {exp.type === 'volunteer' && (
                              <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs">
                                {lang === 'en' ? 'Volunteer' : 'Voluntário'}
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-semibold mt-1">{exp.org}</h3>
                          <p className="text-slate-400 text-sm">{tx(exp.role, lang)}</p>
                          {exp.location && (
                            <p className="text-slate-600 text-xs mt-0.5">{exp.location}</p>
                          )}
                        </div>
                      </div>
                      {exp.project && (
                        <p className="text-cyan-400/80 text-sm font-medium mb-2 italic">↳ {tx(exp.project, lang)}</p>
                      )}
                      {/* Description (collapsible) */}
                      {!expanded[exp.id] ? (
                        <>
                          <p className="text-slate-400 text-sm line-clamp-2">{tx(exp.description, lang)}</p>
                          <button onClick={() => toggle(exp.id)} className="text-cyan-400 hover:text-cyan-300 text-xs mt-1.5 font-medium transition-colors flex items-center gap-1">
                            {lang === 'en' ? 'Read more' : 'Ler mais'} ↓
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-slate-300 text-sm leading-relaxed">{tx(exp.description, lang)}</p>
                          <button onClick={() => toggle(exp.id)} className="text-cyan-400 hover:text-cyan-300 text-xs mt-1.5 font-medium transition-colors flex items-center gap-1">
                            {lang === 'en' ? 'Read less' : 'Ler menos'} ↑
                          </button>
                        </>
                      )}
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-400 rounded text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">{lang === 'en' ? 'Education' : 'Educação'}</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {lang === 'en' ? 'Mechatronics Engineering (Control and Automation)' : 'Engenharia Mecatrônica (Controle e Automação)'}
                    </h3>
                    <p className="text-slate-400 text-sm mt-0.5">
                      {lang === 'en' ? 'State University of Campinas (Unicamp) — BEng (Hons)' : 'Universidade Estadual de Campinas (Unicamp) — Bacharelado'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-bold rounded-full border border-amber-400">Top 3%</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white text-xs font-bold rounded-full border border-cyan-400">
                    {lang === 'en' ? 'Top 2 in class' : 'Top 2 da turma'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-mono text-slate-500">2024 – 2029 (6 {lang === 'en' ? 'years' : 'anos'})</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 text-sm font-semibold">GPA 3.6 / 4.0</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <p className="text-slate-300 text-sm font-semibold mb-2">{lang === 'en' ? 'Perfect grades in:' : 'Notas máximas em:'}</p>
                  <ul className="text-slate-400 text-sm space-y-1.5">
                    {[
                      { en: 'Algorithms and Programming (Python)', pt: 'Algoritmos e Programação (Python)' },
                      { en: 'Data Structures (C)', pt: 'Estruturas de Dados (C)' },
                      { en: 'Calculus I, II & III', pt: 'Cálculo I, II e III' },
                      { en: 'Linear Algebra', pt: 'Álgebra Linear' },
                    ].map(s => (
                      <li key={s.en} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span>{tx(s, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-slate-300 text-sm font-semibold mb-2">{lang === 'en' ? 'Also covered:' : 'Também estudado:' }</p>
                  <ul className="text-slate-400 text-sm space-y-1.5">
                    {[
                      { en: 'Digital Logic Circuits (VHDL / FPGA)', pt: 'Circuitos Lógicos Digitais (VHDL / FPGA)' },
                      { en: 'Physics Laboratory (NumPy, Matplotlib)', pt: 'Laboratório de Física (NumPy, Matplotlib)' },
                      { en: 'Statics & Dynamics', pt: 'Estática e Dinâmica' },
                    ].map(s => (
                      <li key={s.en} className="flex items-start gap-2">
                        <span className="text-slate-600 mt-0.5">·</span>
                        <span>{tx(s, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={180} className="mt-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {lang === 'en' ? 'Visiting Student – Exchange Program' : 'Estudante Visitante – Programa de Intercâmbio'}
                    </h3>
                    <p className="text-slate-400 text-sm mt-0.5">University of West Bohemia — Plzeň, Czech Republic</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full">
                  {lang === 'en' ? 'Merit-Based' : 'Por Mérito'}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">Jan 2026 – Mar 2026</span>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                {lang === 'en'
                  ? 'Selected for a two-month merit-based exchange focusing on robotics and computer vision. Developed a 3D Vision System for an Autonomous Mars Rover for the European Rover Challenge (ERC), resulting in 2 scientific papers submitted to international journals.'
                  : 'Selecionado para intercâmbio de dois meses com base em mérito, com foco em robótica e visão computacional. Desenvolveu um Sistema de Visão 3D para um Rover Autônomo em Marte para o European Rover Challenge (ERC), resultando em 2 artigos científicos submetidos.'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">{lang === 'en' ? 'Projects' : 'Projetos'}</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p, i) => {
              const Icon = ICONS[p.iconName as keyof typeof ICONS] ?? Code
              return (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 group h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-5 h-5 ${p.iconColor} group-hover:scale-110 transition-transform`} />
                      <h3 className="text-base font-semibold leading-tight">{tx(p.title, lang)}</h3>
                    </div>
                    {p.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {p.images.slice(0, 2).map((img, ii) => (
                          <div key={ii} className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                            <Image src={img} alt={`${p.id} ${ii + 1}`} fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-slate-400 text-sm leading-relaxed mb-3 flex-1">{tx(p.description, lang)}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-400 rounded text-xs">{t}</span>
                      ))}
                    </div>
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg text-slate-300 text-xs font-medium transition-all w-fit">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">{lang === 'en' ? 'Skills' : 'Habilidades'}</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group, gi) => (
              <Reveal key={group.title.en} delay={gi * 80}>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <h3 className="text-base font-semibold mb-4 text-slate-200">{tx(group.title, lang)}</h3>
                  <div className="flex flex-col gap-2">
                    {group.items.map(s => (
                      <div key={s.name} className="flex items-center gap-3 p-2.5 bg-slate-800 rounded-lg border border-slate-700 hover:border-cyan-500/40 transition-colors">
                        {s.icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`${DEVICON}${s.icon}`}
                            alt={s.name}
                            width={22}
                            height={22}
                            className={(s as { invert?: boolean }).invert ? 'brightness-0 invert opacity-80' : ''}
                          />
                        ) : (
                          <Code className="w-5 h-5 text-slate-500" />
                        )}
                        <span className="text-slate-200 text-sm">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Human Languages */}
          <Reveal delay={200} className="mt-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="text-base font-semibold mb-4 text-slate-200">{lang === 'en' ? 'Languages' : 'Idiomas'}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {HUMAN_LANGS.map(l => (
                  <div key={l.flag} className="flex items-center gap-3 p-2.5 bg-slate-800 rounded-lg border border-slate-700 hover:border-cyan-500/40 transition-colors">
                    <span className="text-xl">{l.flag}</span>
                    <div>
                      <p className="text-slate-200 text-sm font-medium">{tx(l.name, lang)}</p>
                      <p className="text-slate-500 text-xs">{tx(l.level, lang)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Notes ── */}
      <section id="notes" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-4">
            <h2 className="text-4xl font-bold">{lang === 'en' ? 'Notes & Writing' : 'Notas & Escrita'}</h2>
          </Reveal>
          <Reveal delay={60} className="text-center mb-12">
            <p className="text-slate-400 text-sm">
              {lang === 'en'
                ? 'Articles I\'m drafting on research, robotics, and entrepreneurship.'
                : 'Artigos que estou redigindo sobre pesquisa, robótica e empreendedorismo.'}
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {NOTES.map((n, i) => (
              <Reveal key={n.id} delay={i * 80}>
                <div className={`bg-slate-900 border rounded-xl p-5 transition-colors h-full flex flex-col ${n.accent}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {n.tags.map(t => (
                        <span key={t} className={`px-2 py-0.5 rounded text-xs font-medium border ${n.tagColor} bg-opacity-10`}>{t}</span>
                      ))}
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-500">
                      {lang === 'en' ? 'Draft' : 'Rascunho'}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold mb-2 leading-snug flex-1">{tx(n.title, lang)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{tx(n.excerpt, lang)}</p>
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <span className="text-slate-600 text-xs italic">{lang === 'en' ? 'Coming soon…' : 'Em breve…'}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section id="awards" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">{lang === 'en' ? 'Awards & Achievements' : 'Prêmios & Conquistas'}</h2>
          </Reveal>
          {/* Publication highlight */}
          <Reveal delay={80} className="mb-5">
            <div className="bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/40 rounded-xl p-6 hover:border-cyan-500/70 transition-colors">
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <FileText className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded uppercase tracking-wider">
                      {lang === 'en' ? 'Published · May 2026' : 'Publicado · Mai 2026'}
                    </span>
                    <span className="text-slate-500 text-xs">Geomatics, Natural Hazards and Risk</span>
                  </div>
                  <h3 className="text-base font-semibold text-white leading-snug mb-2">
                    {lang === 'en'
                      ? 'A reproducible regime-aware unsupervised framework to reduce flood-pulse confounding in wetland disturbance monitoring: Pantanal (2020–2025)'
                      : 'Um framework reproduzível baseado em regimes não-supervisionados para reduzir confundimento de pulso de inundação no monitoramento de distúrbios em zonas úmidas: Pantanal (2020–2025)'}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {lang === 'en'
                      ? 'Applied remote sensing and unsupervised machine learning to monitor environmental disturbances in the Pantanal — the world\'s largest tropical wetland — using satellite time-series data from 2020 to 2025.'
                      : 'Aplicou sensoriamento remoto e aprendizado de máquina não-supervisionado para monitorar distúrbios ambientais no Pantanal usando séries temporais de satélites de 2020 a 2025.'}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: { en: 'Top 2 in Class – Mechatronics Engineering', pt: 'Top 2 da Turma – Engenharia Mecatrônica' },
                description: { en: 'GPA 3.6/4.0 – Ranked Top 2 in the Mechatronics Engineering class at Unicamp (Top 3% of the program).', pt: 'GPA 3,6/4,0 – Classificado Top 2 da turma de Engenharia Mecatrônica da Unicamp (Top 3% do programa).' },
              },
              {
                title: { en: 'Merit-Based Research Selections (×2)', pt: 'Seleções por Mérito em Pesquisa (×2)' },
                description: { en: 'Selected for Computer Vision research after the highest grade in Data Structures; selected for ML research after ranking 2nd in Statics (71 students).', pt: 'Selecionado para pesquisa em CV após maior nota em Estruturas de Dados; selecionado para pesquisa em ML após 2º lugar em Estática (71 alunos).' },
              },
              {
                title: { en: 'Super Liga X – 1st Place National', pt: 'Super Liga X – 1º Lugar Nacional' },
                description: { en: 'Entrepreneurship competition with 60+ university teams and 280+ participants across Brazil. My 4-person team won 1st place.', pt: 'Competição empreendedora com mais de 60 equipes e 280+ participantes no Brasil. Minha equipe de 4 pessoas conquistou o 1º lugar.' },
              },
              {
                title: { en: 'Robocar Race – 3rd Place National', pt: 'Robocar Race – 3º Lugar Nacional' },
                description: { en: 'Autonomous vehicle competition against the 20 best universities in Brazil, combining robotics, AI, and computer vision.', pt: 'Competição de veículos autônomos contra as 20 melhores universidades do Brasil, combinando robótica, IA e visão computacional.' },
              },
            ].map((a, i) => (
              <Reveal key={a.title.en} delay={(i % 2) * 80}>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors h-full">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">{tx(a.title, lang)}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{tx(a.description, lang)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">{lang === 'en' ? 'Contact' : 'Contato'}</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
              <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                {lang === 'en'
                  ? "Feel free to reach out — I'm always open to research collaborations, interesting projects, or just a good conversation."
                  : 'Fique à vontade para entrar em contato — estou sempre aberto a colaborações em pesquisa, projetos interessantes ou uma boa conversa.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://www.linkedin.com/in/rafael-rodrigues-pimentel-de-melo-9588a02b3/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-slate-100 transition-all">
                  <Linkedin className="w-5 h-5 text-cyan-400" /> LinkedIn
                </a>
                <a href="mailto:rafaelrpm10@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-slate-100 transition-all">
                  <Mail className="w-5 h-5 text-cyan-400" /> rafaelrpm10@gmail.com
                </a>
                <a href="https://github.com/Raf-Pimentel" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-slate-100 transition-all">
                  <Github className="w-5 h-5 text-cyan-400" /> GitHub
                </a>
                <a href="/cv.pdf" download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 border border-cyan-500 rounded-lg text-white transition-all shadow-lg shadow-cyan-900/20">
                  <Download className="w-5 h-5" /> {lang === 'en' ? 'Download CV' : 'Baixar CV'}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>© 2025 Rafael Melo · Campinas, SP, Brazil</p>
          <div className="flex gap-5">
            <a href="https://www.linkedin.com/in/rafael-rodrigues-pimentel-de-melo-9588a02b3/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="mailto:rafaelrpm10@gmail.com" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </a>
            <a href="https://github.com/Raf-Pimentel" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </footer>

    </main>
  )
}
