/**
 * Best Time for Bed - Sleep Calculator
 * https://www.besttimeforbed.com/
 *
 * Calculates suggested bedtimes and wake-up times based on 90-minute sleep cycles.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.SleepCalculator = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  var CYCLE_MINUTES = 90;
  var FALL_ASLEEP_MINUTES = 15;
  var MINUTES_PER_DAY = 24 * 60;

  function parseTime(value) {
    var match = /^(\d{1,2}):(\d{2})$/.exec(String(value).trim());
    if (!match) throw new Error('Time must be in "HH:MM" 24-hour format.');
    var h = Number(match[1]);
    var m = Number(match[2]);
    if (h > 23 || m > 59) throw new Error("Time is out of range.");
    return h * 60 + m;
  }

  function formatTime(totalMinutes) {
    var t = ((totalMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
    var h = Math.floor(t / 60);
    var m = t % 60;
    return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
  }

  function describe(cycles) {
    var hours = (cycles * CYCLE_MINUTES) / 60;
    return { cycles: cycles, hoursOfSleep: hours };
  }

  /** Given a wake-up time, suggest bedtimes (6, 5, 4 and 3 cycles). */
  function bedtimesForWakeUp(wakeTime) {
    var wake = parseTime(wakeTime);
    return [6, 5, 4, 3].map(function (cycles) {
      var info = describe(cycles);
      info.time = formatTime(wake - cycles * CYCLE_MINUTES - FALL_ASLEEP_MINUTES);
      return info;
    });
  }

  /** Given a bedtime, suggest wake-up times (3, 4, 5 and 6 cycles). */
  function wakeTimesForBedtime(bedTime) {
    var bed = parseTime(bedTime);
    return [3, 4, 5, 6].map(function (cycles) {
      var info = describe(cycles);
      info.time = formatTime(bed + FALL_ASLEEP_MINUTES + cycles * CYCLE_MINUTES);
      return info;
    });
  }

  return {
    CYCLE_MINUTES: CYCLE_MINUTES,
    FALL_ASLEEP_MINUTES: FALL_ASLEEP_MINUTES,
    bedtimesForWakeUp: bedtimesForWakeUp,
    wakeTimesForBedtime: wakeTimesForBedtime
  };
});
