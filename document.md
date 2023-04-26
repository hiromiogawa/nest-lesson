## Web アプリケーション概要

自動車のサーキット走行におけるタイムや自動車の状態を管理する Web アプリケーション。ユーザーは自分の車両情報、サーキット情報、走行レコードを登録・管理できる。また、車両ごとにチューニング情報を登録・管理できる。

### 主要なコレクション

1. users: ユーザー情報を管理
2. cars: 自動車情報を管理（メーカー、車種、駆動方式、エンジンタイプ、馬力、トルク、重量など）
3. circuits: サーキット情報を管理（名称、場所、距離、レイアウト画像など）
4. records: サーキット走行の記録を管理（走行日、天候、気温、コメントなど）
5. mycars: ユーザーが保有する車両情報を管理
6. laptimes: ラップタイム情報を管理
7. tunings: チューニング情報を管理（改造内容、部品名、効果など）

### リレーション

- users コレクションと mycars コレクションは 1 対多のリレーション（ユーザーは複数の車両情報を持つ）
- cars コレクションと mycars コレクションは 1 対多のリレーション（1 台の車両は複数のユーザーによって保有される）
- mycars コレクションと records コレクションは 1 対多のリレーション（ユーザーは複数の走行レコードを持つ）
- cars コレクションと records コレクションは 1 対多のリレーション（1 台の車両は複数の走行レコードを持つ）
- circuits コレクションと records コレクションは 1 対多のリレーション（1 つのサーキットは複数の走行レコードを持つ）
- records コレクションと laptimes コレクションは 1 対多のリレーション（1 つの走行レコードは複数のラップタイムを持つ）
- laptimes コレクションと tunings コレクションは 1 対多のリレーション（1 つのラップタイムは複数のチューニング情報を持つ）

* mycars コレクションと tunings コレクションは 1 対多のリレーション（1 台の車両は複数のチューニング情報を持つ）

### スキーマ定義

- users

  - objectId \_id
  - string username
  - string password
  - string email

- cars

  - objectId \_id
  - string name
  - string modelName
  - string maker
  - string drivetrain
  - string engineType
  - number horsepower
  - number torque
  - number weight

- circuits

  - objectId \_id
  - string name
  - string location
  - number distance
  - string layoutImageUrl

- records

  - objectId \_id
  - objectId mycarId
  - objectId circuitId
  - date date
  - string weather
  - number temperature
  - string comment

- mycars

  - objectId \_id
  - objectId userId
  - objectId carId

- laptimes

  - objectId \_id
  - objectId recordId
  - string time

- tunings
  - objectId \_id
  - objectId laptimeId
  - objectId mycarId
  - string modification
  - string partName
  - string effect

フェーズの分け方は、以下のように提案します。

フェーズ 1: User⇔MyCar⇔Car、MyCar⇔Tuning
フェーズ 2: Circuit、Record（MyCar、Circuit との関連付け）
フェーズ 3: LapTime（Record と Tuning との関連付け）
フェーズ 1 では、ユーザーが車を所有し、チューニング情報を管理できるようにします。フェーズ 2 では、サーキットと走行記録の管理を実装し、フェーズ 3 では、各走行記録に対してラップタイムとチューニング情報を関連付けます。
