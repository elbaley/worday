import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(timezone);
dayjs.extend(utc);
// dayjs.tz.guess();
const localeList = dayjs.Ls;
dayjs.updateLocale("en", {
  relativeTime: {
    ...localeList["en"].relativeTime,
    future: "in %s",
    past: "%s ago",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
  },
});

export default dayjs;
