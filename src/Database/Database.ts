import SQLite from "tauri-plugin-sqlite-api";

interface StudentI {
    id: number;
    fName: string;
    lName: string;
    phone: string;
    grade: number;
    divisionId: number;
    subjects: SubjectI[];
    createAt: string;
    editedAt: string;
}

interface DivisionI {
    id: number;
    name: string;
    createAt: string;
    editedAt: string;
}

interface SubjectI {
    id: number;
    name: string;
    divisionId: number;
    createAt: string;
    editedAt: string;
}

interface PaymentI {
    id: number;
    studentId: number;
    subjectId: number;
    amount: number;
    date: Date;
    editedAt: string;
}

export default class Database {
    public connection: SQLite | null = null;
    constructor(public debug: boolean = false) {

    }
    public async connect(): Promise<boolean> {
        if (this.connection) {
            return true;
        } else {
            let rslt = false;
            try {
                this.connection = await SQLite.open("bostan.db");
                if (this.debug) console.log("DB: Opened");
                rslt = true;
            } catch (e) {
                console.error(`Error Opening DB: ${(e as Error).message}`);
                rslt = false;
            }
            return rslt;
        }
    }

    public async close(): Promise<boolean> {
        if (this.connection) {
            let rslt = false;
            try {
                await this.connection.close();
                if (this.debug) console.log("DB: Closed");
                rslt = true;
            } catch (e) {
                console.error(`Error Closing DB: ${(e as Error).message}`);
                rslt = false;
            }
            return rslt;
        } else {
            return true;
        }
    }

    public async createDivisionsTable(): Promise<boolean> {
        let rslt = false;
        if (this.connection) {
            try {
                await this.connection.execute(`
                    CREATE TABLE IF NOT EXISTS divisions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT null,
                        createAt TEXT DEFAULT CURRENT_TIMESTAMP,
                        editedAt TEXT
                    )
                    `)
                if (this.debug) console.log("DB: divisions Table Created");
                rslt = true;
            } catch (e) {
                console.error(`Error Creating divisions Table: ${(e as Error).message}`);
                rslt = false;
            }
        } else {
            console.error("DB: Connection not opened");
            rslt = false;
        }
        return rslt;
    }

    public async createSubjectsTable(): Promise<boolean> {
        let rslt = false;
        if (this.connection) {
            try {
                await this.connection.execute(`
                    CREATE TABLE IF NOT EXISTS subjects (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT null,
                        divisionId INTEGER NOT NULL,
                        createAt TEXT DEFAULT CURRENT_TIMESTAMP,
                        editedAt TEXT
                        FOREIGN KEY (divisionId) REFERENCES divisions(id),
                    )
                    `)
                if (this.debug) console.log("DB: subjects Table Created");
                rslt = true;
            } catch (e) {
                console.error(`Error Creating subjects Table: ${(e as Error).message}`);
                rslt = false;
            }
        } else {
            console.error("DB: Connection not opened");
            rslt = false;
        }
        return rslt;
    }

    public async createStudentsTable(): Promise<boolean> {
        let rslt = false;
        if (this.connection) {
            try {
                await this.connection.execute(`
                    CREATE TABLE IF NOT EXISTS students (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        fName TEXT NOT null,
                        lName TEXT NOT null,
                        phone TEXT NOT null,
                        grade INTEGER NOT null,
                        divisionId INTEGER NOT NULL,
                        createAt TEXT DEFAULT CURRENT_TIMESTAMP,
                        editedAt TEXT,
                        FOREIGN KEY (divisionId) REFERENCES divisions(id)
                    )
                    `)
                if (this.debug) console.log("DB: students Table Created");
                rslt = true;
            } catch (e) {
                console.error(`Error Creating students Table: ${(e as Error).message}`);
                rslt = false;
            }
        } else {
            console.error("DB: Connection not opened");
            rslt = false;
        }
        return rslt;
    }

    public async createPaymentsTable(): Promise<boolean> {
        let rslt = false;
        if (this.connection) {
            try {
                await this.connection.execute(`
                    CREATE TABLE IF NOT EXISTS payments (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        studentId INTEGER NOT NULL,
                        subjectId INTEGER NOT NULL,
                        amount REAL NOT NULL,
                        date TEXT DEFAULT CURRENT_TIMESTAMP,
                        editedAt TEXT,
                        FOREIGN KEY (studentId) REFERENCES students(id),
                        FOREIGN KEY (subjectId) REFERENCES subjects(id)
                    )
                    `)
                if (this.debug) console.log("DB: payments Table Created");
                rslt = true;
            } catch (e) {
                console.error(`Error Creating payments Table: ${(e as Error).message}`);
                rslt = false;
            }
        } else {
            console.error("DB: Connection not opened");
            rslt = false;
        }
        return rslt;
    }

    public async createStudentSubjectTable(): Promise<boolean> {
        let rslt = false;
        if (this.connection) {
            try {
                await this.connection.execute(`
                    CREATE TABLE IF NOT EXISTS student_subject (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        studentId INTEGER NOT NULL,
                        subjectId INTEGER NOT NULL,
                        FOREIGN KEY (studentId) REFERENCES students(id),
                        FOREIGN KEY (subjectId) REFERENCES subjects(id)
                    )
                    `)
                if (this.debug) console.log("DB: student_subject Table Created");
                rslt = true;
            } catch (e) {
                console.error(`Error Creating student_subject Table: ${(e as Error).message}`);
                rslt = false;
            }
        } else {
            console.error("DB: Connection not opened");
            rslt = false;
        }
        return rslt;
    }

    public async createTables(): Promise<boolean> {
        let rslt = false;
        try {
            await this.createDivisionsTable();
            await this.createSubjectsTable();
            await this.createStudentsTable();
            await this.createPaymentsTable();
            await this.createStudentSubjectTable();
            rslt = true;
        } catch (e) {
            console.error(`Error Creating Tables: ${(e as Error).message}`);
            rslt = false;
        }
        return rslt;
    }
}

const db = new Database(true);

// student functions

export async function addStudent(student: Omit<StudentI, "id" | "createAt" | "editedAt">): Promise<boolean> {
    let rslt = false;
    if (await db.connect()) {
        try {
            await db.connection?.execute(`INSERT INTO students (fName, lName, phone, grade, divisionId) VALUES (?, ?, ?, ?, ?)`, [student.fName, student.lName, student.phone, student.grade, student.divisionId]);
            rslt = true;
        } catch (e) {
            console.error(`Error Adding Student: ${(e as Error).message}`);
            rslt = false;
        }
    }
    return rslt;
}
