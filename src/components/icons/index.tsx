import Muted from "./muted";
import Pause from "./pause";
import Play from "./play";
import Sound from "./sound";
import Light from "./light";
import Dark from "./dark";
import withIconTriggerHOC from "./withIconTriggerHOC";

// media controls
export const Media = {
  Play: withIconTriggerHOC(Play),
  Pause: withIconTriggerHOC(Pause),
  Sound: withIconTriggerHOC(Sound),
  Muted: withIconTriggerHOC(Muted),
};

export const ThemeModel = {
  Dark: withIconTriggerHOC(Dark),
  Light: withIconTriggerHOC(Light),
};
