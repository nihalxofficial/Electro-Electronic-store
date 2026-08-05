import { MegaMenuPanel } from './MegaMenuPanel';
import { MEGA_MENU_PANELS } from '@/data/navbarMenuData';

export function ComputersAccessoriesMegaMenu() {
  const config = MEGA_MENU_PANELS['laptops-computers'] || MEGA_MENU_PANELS['computers'];
  return <MegaMenuPanel minWidth="700px" {...config} />;
}

export function MobilesTabletsMegaMenu() {
  const config = MEGA_MENU_PANELS['mobiles-tablets'];
  return <MegaMenuPanel minWidth="680px" {...config} />;
}

export function WatchesEyewearMegaMenu() {
  const config = MEGA_MENU_PANELS['watches-eyewear'];
  return <MegaMenuPanel minWidth="660px" {...config} />;
}

export function CamerasMegaMenu() {
  const config = MEGA_MENU_PANELS['cameras-audio'];
  return <MegaMenuPanel minWidth="580px" {...config} />;
}

export function MoviesGamesMegaMenu() {
  const config = MEGA_MENU_PANELS['movies-games'];
  return <MegaMenuPanel minWidth="620px" {...config} />;
}

export function TvAudioMegaMenu() {
  const config = MEGA_MENU_PANELS['tv-audio'];
  return <MegaMenuPanel minWidth="620px" {...config} />;
}

export function CarMotorbikeMegaMenu() {
  const config = MEGA_MENU_PANELS['car-motorbike'];
  return <MegaMenuPanel minWidth="620px" {...config} />;
}

export function AccessoriesMegaMenu() {
  const config = MEGA_MENU_PANELS['accessories'];
  return <MegaMenuPanel minWidth="580px" {...config} />;
}
