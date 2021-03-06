const data = [
  {
    minMaxWorkingHours: [
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
    ],
    daysInWeek: ['Pon', 'Uto', 'Sre', 'Cet', 'Pet', 'Sub', 'Ned'],
    weekNum: 22,
    // napomena: ovo je radno vreme na koje ce se podesiti kalendar po danima, jer moze biti da jedan dan radnik radi pre podne drugi popodne, pa da mozes prikazati to u drugoj boji i da moze ili ne moze da se zakaze u odnosu na to.
    workingHoursInWeek: [
      {
        day: 1,
        date: 1601856000000, // datum u milisekundama bez vremena samo godina, mesec, dan, vreme ce se pokupiti iz svake celije
        cell: [
          { time: '08:00', enabled: true },
          { time: '08:30', enabled: true },
          { time: '09:00', enabled: true },
          { time: '09:30', enabled: false },
          { time: '10:00', enabled: true },
          { time: '10:30', enabled: true },
          { time: '11:00', enabled: true },
          { time: '11:30', enabled: false },
          { time: '12:00', enabled: true },
          { time: '12:30', enabled: true },
          { time: '13:00', enabled: true },
          { time: '13:30', enabled: true },
          { time: '14:00', enabled: true },
          { time: '14:30', enabled: true },
          { time: '15:00', enabled: true },
          { time: '15:30', enabled: true },
          { time: '16:00', enabled: true },
          { time: '16:30', enabled: false },
          { time: '17:00', enabled: true },
          { time: '17:30', enabled: true },
          { time: '18:00', enabled: true },
          { time: '18:30', enabled: true },
          { time: '19:00', enabled: true },
          { time: '19:30', enabled: true },
          { time: '20:00', enabled: true },
        ],
      },
      {
        day: 2,
        date: 1601942400000,
        cell: [
          { time: '08:00', enabled: true },
          { time: '08:30', enabled: true },
          { time: '09:00', enabled: true },
          { time: '09:30', enabled: true },
          { time: '10:00', enabled: true },
          { time: '10:30', enabled: true },
          { time: '11:00', enabled: true },
          { time: '11:30', enabled: true },
          { time: '12:00', enabled: true },
          { time: '12:30', enabled: false },
          { time: '13:00', enabled: true },
          { time: '13:30', enabled: true },
          { time: '14:00', enabled: true },
          { time: '14:30', enabled: true },
          { time: '15:00', enabled: true },
          { time: '15:30', enabled: false },
          { time: '16:00', enabled: true },
          { time: '16:30', enabled: true },
          { time: '17:00', enabled: true },
          { time: '17:30', enabled: true },
          { time: '18:00', enabled: true },
          { time: '18:30', enabled: true },
          { time: '19:00', enabled: true },
          { time: '19:30', enabled: true },
          { time: '20:00', enabled: true },
        ],
      },

      {
        day: 3,
        date: 1602028800000,
        cell: [
          { time: '08:00', enabled: true },
          { time: '08:30', enabled: true },
          { time: '09:00', enabled: true },
          { time: '09:30', enabled: true },
          { time: '10:00', enabled: true },
          { time: '10:30', enabled: true },
          { time: '11:00', enabled: true },
          { time: '11:30', enabled: true },
          { time: '12:00', enabled: true },
          { time: '12:30', enabled: false },
          { time: '13:00', enabled: true },
          { time: '13:30', enabled: true },
          { time: '14:00', enabled: true },
          { time: '14:30', enabled: true },
          { time: '15:00', enabled: true },
          { time: '15:30', enabled: false },
          { time: '16:00', enabled: true },
          { time: '16:30', enabled: true },
          { time: '17:00', enabled: true },
          { time: '17:30', enabled: true },
          { time: '18:00', enabled: true },
          { time: '18:30', enabled: true },
          { time: '19:00', enabled: true },
          { time: '19:30', enabled: true },
          { time: '20:00', enabled: true },
        ],
      },

      {
        day: 4,
        date: 1602115200000,
        cell: [
          { time: '08:00', enabled: true },
          { time: '08:30', enabled: true },
          { time: '09:00', enabled: true },
          { time: '09:30', enabled: true },
          { time: '10:00', enabled: true },
          { time: '10:30', enabled: true },
          { time: '11:00', enabled: true },
          { time: '11:30', enabled: true },
          { time: '12:00', enabled: true },
          { time: '12:30', enabled: false },
          { time: '13:00', enabled: true },
          { time: '13:30', enabled: true },
          { time: '14:00', enabled: true },
          { time: '14:30', enabled: true },
          { time: '15:00', enabled: true },
          { time: '15:30', enabled: false },
          { time: '16:00', enabled: true },
          { time: '16:30', enabled: true },
          { time: '17:00', enabled: true },
          { time: '17:30', enabled: true },
          { time: '18:00', enabled: true },
          { time: '18:30', enabled: true },
          { time: '19:00', enabled: true },
          { time: '19:30', enabled: true },
          { time: '20:00', enabled: true },
        ],
      },

      {
        day: 5,
        date: 1602201600000,
        cell: [
          { time: '08:00', enabled: true },
          { time: '08:30', enabled: true },
          { time: '09:00', enabled: true },
          { time: '09:30', enabled: true },
          { time: '10:00', enabled: true },
          { time: '10:30', enabled: true },
          { time: '11:00', enabled: true },
          { time: '11:30', enabled: true },
          { time: '12:00', enabled: true },
          { time: '12:30', enabled: false },
          { time: '13:00', enabled: true },
          { time: '13:30', enabled: true },
          { time: '14:00', enabled: true },
          { time: '14:30', enabled: true },
          { time: '15:00', enabled: true },
          { time: '15:30', enabled: false },
          { time: '16:00', enabled: true },
          { time: '16:30', enabled: true },
          { time: '17:00', enabled: true },
          { time: '17:30', enabled: true },
          { time: '18:00', enabled: true },
          { time: '18:30', enabled: true },
          { time: '19:00', enabled: true },
          { time: '19:30', enabled: true },
          { time: '20:00', enabled: true },
        ],
      },

      {
        day: 6,
        date: 1602288000000,
        cell: [
          { time: '08:00', enabled: true },
          { time: '08:30', enabled: true },
          { time: '09:00', enabled: true },
          { time: '09:30', enabled: true },
          { time: '10:00', enabled: true },
          { time: '10:30', enabled: true },
          { time: '11:00', enabled: true },
          { time: '11:30', enabled: true },
          { time: '12:00', enabled: true },
          { time: '12:30', enabled: false },
          { time: '13:00', enabled: true },
          { time: '13:30', enabled: true },
          { time: '14:00', enabled: true },
          { time: '14:30', enabled: true },
          { time: '15:00', enabled: true },
          { time: '15:30', enabled: false },
          { time: '16:00', enabled: true },
          { time: '16:30', enabled: true },
          { time: '17:00', enabled: true },
          { time: '17:30', enabled: true },
          { time: '18:00', enabled: true },
          { time: '18:30', enabled: true },
          { time: '19:00', enabled: true },
          { time: '19:30', enabled: true },
          { time: '20:00', enabled: true },
        ],
      },

      {
        day: 7,
        date: 1602374400000,
        cell: [
          { time: '08:00', enabled: true },
          { time: '08:30', enabled: true },
          { time: '09:00', enabled: true },
          { time: '09:30', enabled: false },
          { time: '10:00', enabled: true },
          { time: '10:30', enabled: true },
          { time: '11:00', enabled: true },
          { time: '11:30', enabled: true },
          { time: '12:00', enabled: true },
          { time: '12:30', enabled: true },
          { time: '13:00', enabled: true },
          { time: '13:30', enabled: true },
          { time: '14:00', enabled: true },
          { time: '14:30', enabled: true },
          { time: '15:00', enabled: true },
          { time: '15:30', enabled: true },
          { time: '16:00', enabled: true },
          { time: '16:30', enabled: true },
          { time: '17:00', enabled: true },
          { time: '17:30', enabled: true },
          { time: '18:00', enabled: true },
          { time: '18:30', enabled: true },
          { time: '19:00', enabled: true },
          { time: '19:30', enabled: true },
          { time: '20:00', enabled: true },
        ],
      },
    ],
  },
];

export default data;
