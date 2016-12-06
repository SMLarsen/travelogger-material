# Mongo Database

## Database
```
use travelogger
```

## Collections
```
db.createCollection('users')
db.createCollection('trips')
db.createCollection('days')
db.createCollection('buddies')
```

## inserts
### users
```
db.users.insert({
  user: 'stevelarsen01@gmail.com',
  clearance: 5
})
```
### trips
```
db.trips.insert({
  user_id: ObjectId("5846e1b67ce266827e41dd32"),
  trip_name: 'Westworld',
  begin_date: new Date("2016-08-03"),
  begin_location: 'St. Paul, MN',
  end_date: new Date("2016-08-10"),
  end_location: 'Minneapolis, MN',
  travellers: 'Ellen & Steve'
})

db.trips.insert({
  user_id: ObjectId("5846e1b67ce266827e41dd32"),
  trip_name: 'Eastworld',
  begin_date: new Date("2016-06-30"),
  begin_location: 'Oslo, Norway',
  end_date: new Date("2016-07-08"),
  end_location: 'Sister Bay, WI',
  travellers: 'Ellen & Steve'
})
```

### buddies

```
db.buddies.insert({
    user_id: ObjectId("5846e1b67ce266827e41dd32"),
    name: 'Lisa Owens',
    hails_from: 'Cambridge',
    country: 'UK',
    telephone: '0999999999',
    email: 'lisao@xyz.com',
    comment: 'Met in Evora, Portugal'
})

db.buddies.insert({
    user_id: ObjectId("5846e1b67ce266827e41dd32"),
    name: 'Regina Vilkenas',
    hails_from: 'Stockholm',
    country: 'Sweden',
    telephone: '0888888888',
    email: 'regina@xyz.com',
    comment: 'Met at Yanapuma in Cuenca, Ecuador'
})

db.buddies.insert({
    user_id: ObjectId("5846e1b67ce266827e41dd32"),
    name: 'Phil McGlave',
    hails_from: 'St. Paul',
    country: 'USA',
    telephone: '3333333333',
    email: 'phil@aol.com',
    comment: 'Met in Little Compton, RI'
})
```

### days

```
db.days.insert({
    user_id: ObjectId("5846e1b67ce266827e41dd32"),
    trip_id: ObjectId("5846e5057ce266827e41dd34"),
    date: new Date("2016-06-30"),
    end_location: 'Montclair, NJ',
    tag_line: 'Back in the USSA!',
    interesting_locations: [
      {name: 'Montclair, NJ',
        description: 'Just outside of NYC, a beautiful town where John and Cathie live.',
      }
    ],
    routes: [
    {
      name: 'Flight from Oslo',
      distance: '1500 miles',
      duration: '6 hrs with layover in Rekjavik',
      transport_mode: 'Flight',
      specifics: 'Icelandair 239',
      comments: 'Dont mind Icelandair at all'
    },
    {
      name: 'Car service from JFK to Cathy and John',
      distance: '50 miles',
      duration: '80 minutes',
      transport_mode: 'Limo',
      specifics: 'City Limo',
      comments: 'Nice guy, would use again (if Cathy pays)'
    }

    ],
    meals: [
    {
      type: 'Breakfast',
      name: 'Oslo Pancake House',
      location: 'Jernbanetorget 1 | Oestbanehallen, Oslo 0154, Norway',
      description: 'A bit expensive but with the excellent Scandinavian food, very accessible, inside Oslo central station. Very nice staff.',
      reference: 'https://www.tripadvisor.com/Restaurant_Review-g190479-d7696927-Reviews-Fjola-Oslo_Eastern_Norway.html'
    }
    ],
    lodging_name: 'John and Cathies',
    location_address: 'Montclair, NJ',
    description: 'Private Home',
    reference: 'none',
    narrative: 'Travel day - started in Oslo and went via Rekyavik to Stay with Cathy and John',
    recommendations:
    [
    { text: 'Great fast train from Oslo central to airport'},
    { text: 'Check out the food in Rekjavik airport.  Wish we could have spent a night'}
    ],
    weather: 'Foggy'
})

db.days.insert({
    user_id: ObjectId("5846e1b67ce266827e41dd32"),
    trip_id: ObjectId("5846e5057ce266827e41dd34"),
    date: new Date("2016-07-01"),
    end_location: 'Montclair, NJ',
    tag_line: 'Rest and recovery',
    interesting_locations: [
      {name: 'Downtown Montclair',
        description: 'Quaint downtown, amazingly close to NYC'
      }
    ],
    meals: [
    {
      type: 'Breakfast',
      name: 'John is the master chef'
      location: 'Cathy and Johns',
      description: 'Count on John to put together a great spread.  Try his lattes'
    },
    {
      type: 'Refreshments',
      name: 'The Corner'
      location: '115 Grove St',
      description: 'I had brisket hash and poached eggs over homemade cornbread',
      reference: 'thecornermontclair.com'
    }
    ],
    {
    lodging_name: 'John and Cathies',
    location_address: 'Montclair, NJ',
    description: 'Private Home'
    }
    ],
    narrative: 'Took it easy.  Recovering from jet lag.',
    weather: 'Sunny and warm'
})
```
