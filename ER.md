```mermaid
erDiagram
  USER ||--o{ MYCAR : owns
  USER ||--o{ RECORD : logs
  CAR ||--o{ MYCAR : has
  MYCAR ||--o{ RECORD : has
  CAR ||--|{ RECORD : has
  CIRCUIT ||--o{ RECORD : has
  RECORD ||--o{ LAPTIME : has
  LAPTIME ||--o{ TUNING : has
  MYCAR ||--o{ TUNING : has
  USER {
    objectId _id
    string username
    string password
    string email
  }
  CAR {
    objectId _id
    string name
    string modelName
    string maker
    string drivetrain
    string engineType
    number horsepower
    number torque
    number weight
  }
  CIRCUIT {
    objectId _id
    string name
    string location
    number distance
    string layoutImageUrl
  }
  RECORD {
    objectId _id
    objectId mycarId
    objectId circuitId
    date date
    string weather
    number temperature
    string comment
  }
  MYCAR {
    objectId _id
    objectId userId
    objectId carId
  }
  LAPTIME {
    objectId _id
    objectId recordId
    string time
    objectId tuningId
  }
  TUNING {
    objectId _id
    objectId mycarId
    string modification
    string partName
    string effect
  }

```