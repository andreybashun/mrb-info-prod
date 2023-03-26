
db.myNewCollection1.insertOne( { x: 1 } )

db.createUser(
    {
        roles: [
            {
                role: "readWrite",
                db: "mrb-info",

            }
        ]
    }
);

db.createCollection('mr-info')