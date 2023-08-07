const WHITELIST_TEAM_AND_DEV = [
  '4xAsTWmYTmjHHNtEd4rDdaWuF82au2PnjVHLAYHycsDf',  //Dranoel
  'FKGTqczsAKccqQ887RNCasD99wXHEeFJJ3xhPbhsPMjc',  //Alpha de slayer
  'EL1XKkcEp4H5zWQKVcz3gPWUJnYsBCEU3y51fg1dkbFs',  //John
  'CCQCv3E5qC5fzSGJ3KzRhjXyNQXgvra3HnRP2VNsaUWA',  //Dailycasper
  'CfWZYuzCXU3V9GQXL26WZzqqMZJkS3auojD83NECvGjY',  //Harry
  '4KX61JYBojFS2jwNkJhvya3PzirG2D5Juoqf1idyr41L',
  '24iSDfdDwYGYZ33fzvXJRzSsY9mnxNJFw6dsL2kVmbe8'
]

const WHITELIST_ALLOWED_ONLY = [
  'BUd7ncvLrP11UiDYxv7SrsFdUR8xUfRhsaihgkFZUk3',
  '93hJWr79dJmG2yHBmkiH2YeiPB5xwkpvTy6QruwWoLm5',
  '7hPhaUpydpvm8wtiS3k4LPZKUmivQRs7YQmpE1hFshHx',
  'DkTtyvuZrvjoibZqzbMMJENALyrHqRA8VguFF3Nf3UiX',
  'WUaFjLHh76f1168o2esLHxTt2imqTGuUj7RZ6L5uUZ7',
  'EWq4oigjqM4X94cmTyzU2Y79MXJNu1DB6YqpRt6x6ePn',
  '734vkZCfb13bGBFdVjjxL5emCkrPiATfYwgGd5k3Nfrb',
  'BWdgKkaRDWkCyYRG44LEKQyHW4xHkCfjx6FFi1rErLmA',
  '6EshfyioJE2YAksLnTRzjkGT71koNNKWnXmzV95gtWmu',
  'HewTFweF4K4QcXW9kRBMwwRuTYJoRpYHaaHwpjUiscEn',
  '3ExjHNAcssg69BUPJLj3ruUfBFurLnjyqX3cPNWQZUw9',
  '25MA2fdWg3ysSn964ruNq1soXHt7R4sP1nadwoF295Mv',
  '3b3s5FSqowJ3Vs1ytQKVqFHYpXXUm6GoMGMkddUyKdq1',
  'FGTpxr89RkCKR72ggJ5EkDE9jq5mQxpsuvbfDjKCdgZo',
  'GVhyxs6mEBJHMwAuSAdNkKb7voWELya6Ce62sWtnSKyY',
  'DYpuk3Q8baL7o6zzZrj46uDEDDwq6Mnu7Tn5ic6LWdBF',
  'XBTM4wbuak9KCmsLpv9HkfcbxYwmvCgm7HMazAU5Sfh',
  '7qVf9ifuPZ1FPhJ6fDLP8MqaJBo4kvwoKZXU8S9sfZwc',
  '5tbdvmk7Tk4t8cPErztRvoXHAXmp4KvRXYc3Z26fBksW',
  '7GxhubPyDZx8mk9zy7qJ6yzpWZSUfchzaTLfxmk41kM8',
  '6EkaPpxcNidycK2A12rhV3Z6YvpmuMeBxiauYRr7R7cQ',
  '5m16EamrPGe6DCzUZFknX9XWCBfnEPz7MH5tzHKj8Zzy',
  '3kF9XCaJAfy7yykTNTTQskqycMGVasuJVDzm2aYCPFuq',
  '5WcCqAHWK4ppUxG9PcVrcifZzBtM9em7SY8x26p4kM16',
    'GEMe24gyHP9MZ8gor4QQjH6Q75vREbvUTrtKx7VYTnJu'
  
]

const WHITELIST_ALLOWED_ALL = [
  ...WHITELIST_TEAM_AND_DEV,
  ...WHITELIST_ALLOWED_ONLY
]

module.exports = {
  WHITELIST_TEAM_AND_DEV,
  WHITELIST_ALLOWED_ONLY,
  WHITELIST_ALLOWED_ALL
}