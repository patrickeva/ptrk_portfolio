import {
  LuAppWindow, LuArrowLeft, LuArrowRight, LuBadgeCheck, LuBookMarked, LuBookOpen, LuBot, LuBraces,
  LuBrain, LuBriefcase, LuBuilding2, LuCalendar, LuCalendarCheck, LuChartColumn, LuCheck,
  LuCircleHelp, LuClapperboard, LuCode, LuCodeXml, LuCoffee, LuDownload, LuDumbbell, LuExternalLink,
  LuEye, LuEyeOff, LuFileText, LuGauge, LuGitBranch, LuGitCommitHorizontal, LuGlobe,
  LuGraduationCap, LuHandshake, LuHeart, LuImage, LuImages, LuKeyRound, LuLayers, LuLayoutGrid,
  LuListChecks, LuMail, LuMap, LuMapPin, LuMenu, LuMessageCircle, LuMessagesSquare, LuMilestone,
  LuMoon, LuMusic, LuPencilRuler, LuPlus, LuReceipt, LuRefreshCw, LuRepeat, LuRocket, LuScale,
  LuSend, LuServer, LuSettings, LuShieldCheck, LuSlidersHorizontal, LuSmartphone, LuStore, LuSun,
  LuUser, LuUserCheck, LuUserPlus, LuWrench, LuX,
} from "react-icons/lu";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

const icons = {
  "app-window": LuAppWindow,
  "arrow-left": LuArrowLeft,
  "arrow-right": LuArrowRight,
  "badge-check": LuBadgeCheck,
  "bar-chart": LuChartColumn,
  "book-content": LuBookMarked,
  "book-open": LuBookOpen,
  bot: LuBot,
  brain: LuBrain,
  briefcase: LuBriefcase,
  building: LuBuilding2,
  calendar: LuCalendar,
  "calendar-check": LuCalendarCheck,
  check: LuCheck,
  "code": LuCode,
  "code-block": LuCodeXml,
  "code-curly": LuBraces,
  coffee: LuCoffee,
  conversation: LuMessagesSquare,
  download: LuDownload,
  dumbbell: LuDumbbell,
  "external-link": LuExternalLink,
  eye: LuEye,
  "eye-off": LuEyeOff,
  facebook: FaFacebook,
  file: LuFileText,
  gauge: LuGauge,
  "git-branch": LuGitBranch,
  "git-commit": LuGitCommitHorizontal,
  github: FaGithub,
  globe: LuGlobe,
  graduation: LuGraduationCap,
  grid: LuLayoutGrid,
  handshake: LuHandshake,
  heart: LuHeart,
  help: LuCircleHelp,
  image: LuImage,
  images: LuImages,
  key: LuKeyRound,
  layers: LuLayers,
  linkedin: FaLinkedin,
  "list-checks": LuListChecks,
  mail: LuMail,
  map: LuMap,
  "map-pin": LuMapPin,
  menu: LuMenu,
  message: LuMessageCircle,
  milestone: LuMilestone,
  moon: LuMoon,
  movie: LuClapperboard,
  music: LuMusic,
  pencil: LuPencilRuler,
  plus: LuPlus,
  receipt: LuReceipt,
  refresh: LuRefreshCw,
  repeat: LuRepeat,
  rocket: LuRocket,
  scale: LuScale,
  send: LuSend,
  server: LuServer,
  settings: LuSettings,
  shield: LuShieldCheck,
  sliders: LuSlidersHorizontal,
  smartphone: LuSmartphone,
  store: LuStore,
  sun: LuSun,
  user: LuUser,
  "user-check": LuUserCheck,
  "user-plus": LuUserPlus,
  wrench: LuWrench,
  x: LuX,
};

// Renders inside an <i> so existing `.foo i` styles (size, color, transforms) keep applying.
export default function Icon({ name, className = "" }) {
  const Svg = icons[name];
  if (!Svg) {
    if (import.meta.env.DEV) console.warn(`Unknown icon: ${name}`);
    return null;
  }
  return (
    <i className={`ic ${className}`.trim()} aria-hidden="true">
      <Svg />
    </i>
  );
}

// Fluent 3D icons (Microsoft, MIT license), served from /public/icons/3d.
export function Icon3D({ name, size = 128, className = "" }) {
  return (
    <img
      className={`icon-3d ${className}`.trim()}
      src={`/icons/3d/${name}.webp`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  );
}
