// dont edit this as this is autogenerated
// its generated from translation-types.js
export type Keys =
  | "are.you.sure"
  | "capture.pop"
  | "choose.reason"
  | "choose.truck"
  | "current.profile"
  | "close"
  | "confirm"
  | "destination.point"
  | "driver.details"
  | "driver.name"
  | "does.not.exist"
  | "go.back"
  | "go.to.map"
  | "india.prefix"
  | "it.will.be.enabled"
  | "lsp"
  | "mobile.number"
  | "no.trips"
  | "on.road"
  | "other.profiles"
  | "otp.sent"
  | "otp.verified"
  | "pending"
  | "pick.up.date"
  | "pick.up.point"
  | "placeholder"
  | "reached"
  | "requests"
  | "required.weight"
  | "reject"
  | "rice.grain.wheat"
  | "start.trip"
  | "setup.required"
  | "swipe.to.start"
  | "trucks"
  | "truck.type"
  | "trip.id"
  | "trip.details"
  | "trip.tracking.not.available"
  | "uploaded.docs"
  | "verifying";
export type GetTranslationTextType<T> = T extends "are.you.sure"
  ? never
  : T extends "capture.pop"
  ? never
  : T extends "choose.reason"
  ? never
  : T extends "choose.truck"
  ? never
  : T extends "current.profile"
  ? never
  : T extends "close"
  ? never
  : T extends "confirm"
  ? never
  : T extends "destination.point"
  ? never
  : T extends "driver.details"
  ? never
  : T extends "driver.name"
  ? never
  : T extends "does.not.exist"
  ? never
  : T extends "go.back"
  ? never
  : T extends "go.to.map"
  ? never
  : T extends "india.prefix"
  ? never
  : T extends "it.will.be.enabled"
  ? { date: string }
  : T extends "lsp"
  ? never
  : T extends "mobile.number"
  ? never
  : T extends "no.trips"
  ? never
  : T extends "on.road"
  ? never
  : T extends "other.profiles"
  ? never
  : T extends "otp.sent"
  ? never
  : T extends "otp.verified"
  ? { phoneNumber: string }
  : T extends "pending"
  ? never
  : T extends "pick.up.date"
  ? never
  : T extends "pick.up.point"
  ? never
  : T extends "placeholder"
  ? { value: string }
  : T extends "reached"
  ? never
  : T extends "requests"
  ? never
  : T extends "required.weight"
  ? never
  : T extends "reject"
  ? never
  : T extends "rice.grain.wheat"
  ? never
  : T extends "start.trip"
  ? never
  : T extends "setup.required"
  ? never
  : T extends "swipe.to.start"
  ? never
  : T extends "trucks"
  ? never
  : T extends "truck.type"
  ? never
  : T extends "trip.id"
  ? never
  : T extends "trip.details"
  ? never
  : T extends "trip.tracking.not.available"
  ? never
  : T extends "uploaded.docs"
  ? never
  : T extends "verifying"
  ? never
  : never;
