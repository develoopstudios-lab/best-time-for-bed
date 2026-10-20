# Best Time for Bed

A free sleep calculator that tells you the best time to go to bed or wake up, based on 90-minute sleep cycles.

**Try it online:** https://www.besttimeforbed.com/

## How it works

- Enter the time you need to wake up and get suggested bedtimes.
- Enter your bedtime and get suggested wake-up times.
- Suggestions are based on 90-minute sleep cycles and an average of 15 minutes to fall asleep.

Waking up at the end of a sleep cycle, rather than in the middle of one, can make mornings easier.

## Usage

### In the browser

```html
<script src="sleep-calculator.js"></script>
<script>
  console.log(SleepCalculator.bedtimesForWakeUp("07:00"));
</script>
```

Open `index.html` for a small working demo.

### In Node.js

```js
const calc = require("./sleep-calculator");

calc.bedtimesForWakeUp("07:00");
// [{ cycles: 6, hoursOfSleep: 9, time: "21:45" }, ...]

calc.wakeTimesForBedtime("23:00");
// [{ cycles: 3, hoursOfSleep: 4.5, time: "03:45" }, ...]
```

Times use the 24-hour `"HH:MM"` format.

## Note

This is a general-purpose tool and is not medical advice. Individual sleep needs vary.

## License

MIT
