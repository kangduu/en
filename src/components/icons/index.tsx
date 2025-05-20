import Muted from "./muted";
import Pause from "./pause";
import Play from "./play";
import Sound from "./sound";
import withIconTriggerHOC from "./withIconTriggerHOC";

// media controls
export const Media = {
  Play: withIconTriggerHOC(Play),
  Pause: withIconTriggerHOC(Pause),
  Sound: withIconTriggerHOC(Sound),
  Muted: withIconTriggerHOC(Muted),
};
