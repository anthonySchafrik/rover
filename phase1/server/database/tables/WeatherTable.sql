-- create table
CREATE TABLE Weather
(
    Id SERIAL PRIMARY KEY,
    Temperature DECIMAL ,
    Pressure DECIMAL,
    Feet DECIMAL,
    Meters DECIMAL,
    UvIndex DECIMAL,
    TimeColumn TIMESTAMP default current_timestamp
);

-- test data for table
INSERT INTO Weather
    (
    id,
    temperature,
    pressure,
    feet,
    meters,
    uvindex
    )
VALUES
    (
        1,
        76.64,
        30.038688718251624,
        -1648639629.53,
        -502505343,
        0
);