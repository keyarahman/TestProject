import SQLite from "react-native-sqlite-storage"
export const db = SQLite.openDatabase({ name: 'DB', location: "default" },
    () => { },
    (err) => console.log("Error on opening database 'second'", err)
);

