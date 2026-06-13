export type Language = "ru" | "kz";

export type AppPhase = "language" | "envelope" | "main";

export type Attending = "yes" | "no" | null;

export interface TranslationStrings {
  envHint: string;
  envLetter: string;
  heroEyebrow: string;
  heroEvent: string;
  heroText: string;
  heroCta: string;
  timerEyebrow: string;
  timerTitle: string;
  timerDays: string;
  timerHours: string;
  timerMins: string;
  timerSecs: string;
  timerAt: string;
  timerDateLabel: string;
  eventEyebrow: string;
  eventTitle: string;
  evDateL: string;
  evDateV: string;
  evTimeL: string;
  evPlaceL: string;
  mapBtn: string;
  storyEyebrow: string;
  storyTitle: string;
  storyText: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryNote: string;
  featEyebrow: string;
  featTitle: string;
  f1: string;
  f1d: string;
  f2: string;
  f2d: string;
  f3: string;
  f3d: string;
  f4: string;
  f4d: string;
  f5: string;
  f5d: string;
  rsvpEyebrow: string;
  rsvpTitle: string;
  lblName: string;
  lblAttend: string;
  lblGuests: string;
  lblComment: string;
  lblSubmit: string;
  btnYes: string;
  btnNo: string;
  tyTitle: string;
  tyText: string;
  tyNoText: string;
  navEvent: string;
  navGallery: string;
  navRsvp: string;
  inpNamePh: string;
  inpCommentPh: string;
  companionPh: string;
  submitting: string;
  errName: string;
  errAttend: string;
}

export interface RsvpPayload {
  fullName: string;
  attending: boolean;
  language: Language;
  guestCount: number;
  companions: string[];
  comment: string;
}

export interface GalleryItem {
  id: string;
  emoji: string;
  aspectRatio: string;
  src?: string;
  alt?: string;
}

export interface FeatureItem {
  icon: string;
  titleKey: keyof Pick<
    TranslationStrings,
    "f1" | "f2" | "f3" | "f4" | "f5"
  >;
  descKey: keyof Pick<
    TranslationStrings,
    "f1d" | "f2d" | "f3d" | "f4d" | "f5d"
  >;
}
