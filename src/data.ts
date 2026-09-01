import { NewsItem, EventItem, FacilityItem, FacultyMember } from "./types";

export const NEWS_DATA: NewsItem[] = [
  {
    id: "news-1",
    title: "Admissions Open for Academic Year 2026-2027",
    category: "Announcement",
    date: "July 1, 2026",
    content: "Admissions are now officially open for Pre-Nursery up to O/A Levels. Register online today and secure your child's future with our dual HEI Finland and Cambridge curriculum.",
    isImportant: true,
  },
  {
    id: "news-2",
    title: "Cambridge Assessment International Education (CAIE) Results",
    category: "Achievement",
    date: "June 15, 2026",
    content: "Congratulations to our outstanding O and A Level students for achieving an extraordinary 94% straight A*/A grades in the recent examinations. We are proud of our dedicated instructors and students!",
    isImportant: true,
  },
  {
    id: "news-3",
    title: "Launch of Inquiry-Based STEM Innovation Lab",
    category: "Notice",
    date: "June 10, 2026",
    content: "Our newly designed STEM lab is now fully functional, featuring robotics kits, micro-controllers, and practical inquiry-based learning aids for Middle School and O/A Level physics, chemistry, and biology.",
    isImportant: false,
  },
  {
    id: "news-4",
    title: "Parent-Teacher Interactive Meeting (PTM)",
    category: "Notice",
    date: "July 10, 2026",
    content: "The first term introductory parent-teacher conference is scheduled for Saturday, July 10, from 9:00 AM to 1:00 PM. Parents will meet section heads and homeroom guides to review academic targets.",
    isImportant: false,
  },
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: "event-1",
    title: "Annual Science & STEM Innovation Expo",
    date: "August 15, 2026",
    time: "09:00 AM - 02:00 PM",
    venue: "Main Multipurpose Auditorium",
    description: "Students from Elementary to A Levels will showcase interactive science experiments, automated engineering designs, and Finland-style activity-based models.",
    category: "Academic",
  },
  {
    id: "event-2",
    title: "Inter-House Football & Basketball Championship",
    date: "September 05, 2026",
    time: "08:30 AM - 01:30 PM",
    venue: "Secured Campus Football Ground",
    description: "The annual inter-house sports battle of Red, Blue, and Gold houses kicks off with football and basketball tournaments.",
    category: "Sports",
  },
  {
    id: "event-3",
    title: "Annual Study Trip - Science Museum & Historical Sites",
    date: "October 12, 2026",
    time: "08:00 AM - 04:00 PM",
    venue: "Out of Campus",
    description: "Educational study trip designed to facilitate experiential, out-of-classroom learning for grades 4 to 8.",
    category: "Co-curricular",
  },
  {
    id: "event-4",
    title: "Independence Day Celebrations",
    date: "August 14, 2026",
    time: "08:30 AM - 11:30 AM",
    venue: "Auditorium & Lawns",
    description: "Patriotic school assembly, stage performances, and flag-hoisting ceremony celebrating national heritage.",
    category: "Co-curricular",
  },
];

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: "fac-1",
    name: "Science Laboratories",
    description: "Highly specialized and advanced custom laboratories for Physics, Chemistry, and Biology experiments.",
    imagePlaceholderColor: "bg-teal-50",
    iconName: "Beaker",
    highlights: [
      "Modern apparatus for hands-on, inquiry-based STEM experiments",
      "Strict safety protocols with professional lab coordinators",
      "O and A Level CAIE preparation-ready infrastructure"
    ]
  },
  {
    id: "fac-2",
    name: "Premium Learning Library",
    description: "A peaceful sanctuary of knowledge containing extensive volumes and reading spaces designed to cultivate a lifetime reading habit.",
    imagePlaceholderColor: "bg-indigo-50",
    iconName: "BookOpen",
    highlights: [
      "2,000+ reference, non-fiction, fiction, and curriculum books",
      "Interactive digital cataloging and e-reading desks",
      "Cozy reading nooks and specialized early years storytelling zone"
    ]
  },
  {
    id: "fac-3",
    name: "Secured Campus Sports Grounds",
    description: "Expansive outdoor and indoor facilities promoting physical coordination, sportsmanship, and physical health.",
    imagePlaceholderColor: "bg-emerald-50",
    iconName: "Flame",
    highlights: [
      "Grass-lawn football ground and professional basketball hoop",
      "Secured, safety-padded play areas for Early Years (ECD) play",
      "Well-furnished indoor sports room for table tennis, chess, and carrom"
    ]
  },
  {
    id: "fac-4",
    name: "Multipurpose Auditorium",
    description: "State-of-the-art auditorium equipped with modern acoustics and multi-functional seating arrays.",
    imagePlaceholderColor: "bg-blue-50",
    iconName: "Tv",
    highlights: [
      "300+ seating capacity with professional stage audio-visual systems",
      "Central venue for student assemblies, debate rings, and academic Expos",
      "Climatized environment to support large community events"
    ]
  },
  {
    id: "fac-5",
    name: "Hygienic School Cafeteria",
    description: "School-monitored food service prioritizing student nutrition and hygiene under certified checks.",
    imagePlaceholderColor: "bg-amber-50",
    iconName: "Coffee",
    highlights: [
      "Nutritious, high-quality, and strictly monitored lunch and snack options",
      "Comfortable and spacious eating halls for students to socialize",
      "Carbonated drinks or artificial additives are strictly prohibited"
    ]
  },
  {
    id: "fac-6",
    name: "Managed Campus Transport",
    description: "Dedicated safe transit options operating across multiple city zones with trackable routes.",
    imagePlaceholderColor: "bg-rose-50",
    iconName: "Truck",
    highlights: [
      "Secured and school-supervised van/bus routes with tracking protocols",
      "Experienced and verified professional drivers and transit coordinators",
      "Pick-and-drop locations mapping safe major Hyderabad bypass paths"
    ]
  },
  {
    id: "fac-7",
    name: "Security & CCTV Network",
    description: "A comprehensive, 24/7 security circle that ensures peace of mind for parents and a secure workspace for students.",
    imagePlaceholderColor: "bg-slate-50",
    iconName: "ShieldCheck",
    highlights: [
      "Fully manned secure entry and exit with walk-through metal scanners",
      "24/7 digital CCTV monitoring spanning all corridors and playground margins",
      "Active emergency safety responses and campus security drills"
    ]
  }
];

export const FACULTY_DATA: FacultyMember[] = [
  {
    name: "Prof. Dr. Ahmed Waliullah Kazi",
    designation: "Executive Director / Patron",
    qualifications: "Ph.D. in Education Systems, Affiliated Scholar",
    department: "Executive Leadership & Board",
    photoColor: "bg-amber-500",
  },
  {
    name: "Mrs. Sadia Rehman",
    designation: "Head of Cambridge O/A Levels",
    qualifications: "M.Phil. in English Linguistics, CAIE Certified Trainer",
    department: "Cambridge High School",
    photoColor: "bg-sky-500",
  },
  {
    name: "Mr. Muhammad Bilal Shah",
    designation: "Lead STEM & Physics Specialist",
    qualifications: "M.Sc. in Applied Physics, 12+ Years O-Level Experience",
    department: "Sciences",
    photoColor: "bg-teal-500",
  },
  {
    name: "Ms. Elina Virtanen",
    designation: "Curriculum Advisor (Finland HEI Partnership)",
    qualifications: "M.Ed. in Early Childhood Education (Helsinki University)",
    department: "ECD & Junior Section",
    photoColor: "bg-rose-500",
  },
  {
    name: "Mrs. Nida Almani",
    designation: "Senior Mathematics Coordinator",
    qualifications: "M.Sc. in Mathematics, O Level Curriculum Specialist",
    department: "Mathematics",
    photoColor: "bg-indigo-500",
  },
  {
    name: "Mr. Farhan Ali Soomro",
    designation: "Chemistry Instructor & Lab Supervisor",
    qualifications: "M.Phil. in Organic Chemistry, CAIE Lab Assessor",
    department: "Sciences",
    photoColor: "bg-orange-500",
  }
];

export const FAQS_DATA = [
  {
    question: "What makes Isra Foundation Schools different from other schools?",
    answer: "We offer a unique dual academic approach. In the early years (ECD), we combine a Finland-Based HEI Curriculum focusing on child-led, activity-based discovery. For older classes, we smoothly transition into a robust Cambridge Assessment International Education (CAIE) curriculum preparing students for global success, supported by a strong foundation in Islamic ethics and character development."
  },
  {
    question: "What is the age requirement for Pre-Nursery admission?",
    answer: "A child must be 3 years or older at the time of admission for our Pre-Nursery class."
  },
  {
    question: "How do I apply for admission?",
    answer: "We have a simple 3-step process. First, fill out our secure online registration form on our website. Next, our office will contact you for a Placement Test and Parent Interview. Finally, upon successful evaluation, you submit the required documents and deposit the admission fee to secure your child's seat."
  },
  {
    question: "Are there scholarships available?",
    answer: "Yes, Isra Foundation Schools offers merit-based scholarships specifically for students entering Cambridge O and A Levels, based on their previous academic achievements and entrance test evaluations."
  },
  {
    question: "Can I inspect the school's fee structure before applying?",
    answer: "To ensure full transparency and provide customized financial guidance (including available scholarship percentages), the detailed fee breakdown is provided on request. You can request it during your campus visit or by filling out our quick online Inquiry Form."
  },
  {
    question: "What are the school timings?",
    answer: "Our classes run from 8:30 AM to 2:10 PM, Monday to Friday. Our administrative office is open from 8:00 AM to 2:40 PM for parental support and inquiries."
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "STEM Physics Lab Demonstration",
    category: "facilities",
    description: "O Level students conducting hands-on mechanics experiments."
  },
  {
    id: "g2",
    title: "Early Childhood (ECD) Storytelling Zone",
    category: "student-life",
    description: "Activity-based learning inspired by Finland's HEI curriculum."
  },
  {
    id: "g3",
    title: "Inter-House Football League",
    category: "sports",
    description: "Healthy outdoor physical training and team games."
  },
  {
    id: "g4",
    title: "Multipurpose Library Study Desks",
    category: "facilities",
    description: "Quiet zone supporting individual reading and research."
  },
  {
    id: "g5",
    title: "Annual STEM Expo Project Display",
    category: "events",
    description: "Innovative engineering and robotics projects by Middle Schoolers."
  },
  {
    id: "g6",
    title: "School Assembly Hall",
    category: "facilities",
    description: "Multi-functional modern space for assemblies and presentations."
  }
];
