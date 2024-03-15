import SQLite from "tauri-plugin-sqlite-api";

export interface StudentI {
    id: number;
    fName: string;
    lName: string;
    phone: string;
    grade: number;
    divisionId: number;
    subjects: SubjectI[];
    createdAt: string;
    editedAt: string;
}

export interface DivisionI {
    id: number;
    name: string;
    createdAt: string;
    editedAt: string;
}

export interface SubjectI {
    id: number;
    name: string;
    divisionId: number;
    createdAt: string;
    editedAt: string;
}

export interface PaymentI {
    id: number;
    studentId: number;
    subjectId: number;
    amount: number;
    date: string;
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
                this.connection = await SQLite.open("Bostan.db");
                if (this.debug) console.log("DB: Opened");
                rslt = true;
            } catch (e) {
                console.error(`Error Opening DB: ${(e as Error).message}`, this.connection);
                rslt = false;
            }
            let tst = await SQLite.open("bostan.db")
            console.log(tst);
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
                        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
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
                        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
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
                        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
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

export const db = new Database(true);

// student functions

export async function addStudent(student: Omit<StudentI, "id" | "createdAt" | "editedAt" | "subjects">): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
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

export async function getStudents(): Promise<StudentI[]> {
    let rslt: StudentI[] = [];
    if (db.connection) {
        try {
            let res = await db.connection.select<StudentI[]>(`SELECT * FROM students`);
            if (res) {
                if (res.length > 0) {
                    rslt = res;
                    if (db.debug) console.log("Students: ", rslt);
                } else {
                    if (db.debug) console.log("No Students Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Students: ${(e as Error).message}`);
        }
    }
    return rslt;
}


export async function getStudent(id: number): Promise<StudentI | null> {
    let rslt: StudentI | null = null;
    if (db.connection) {
        try {
            let res = await db.connection.select<StudentI[]>(`SELECT * FROM students WHERE id = ?`, [id]);
            if (res) {
                if (res.length > 0) {
                    rslt = res[0];
                    if (db.debug) console.log("Student: ", rslt);
                } else {
                    if (db.debug) console.log("No Student Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Student: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function updateStudent(student: StudentI): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`UPDATE students SET fName = ?, lName = ?, phone = ?, grade = ?, divisionId = ?, editedAt = CURRENT_TIMESTAMP WHERE id = ?`, [student.fName, student.lName, student.phone, student.grade, student.divisionId, student.id]);
            rslt = true;
        }
        catch (e) {
            console.error(`Error Updating Student: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function deleteStudent(id: number): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`DELETE FROM students WHERE id = ?`, [id]);
            rslt = true;
        }
        catch (e) {
            console.error(`Error Deleting Student: ${(e as Error).message}`);
        }
    }
    return rslt;
}

// division functions

export async function addDivision(division: Omit<DivisionI, "id" | "createdAt" | "editedAt">): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`INSERT INTO divisions (name) VALUES (?)`, [division.name]);
            rslt = true;
        } catch (e) {
            console.error(`Error Adding Division: ${(e as Error).message}`);
            rslt = false;
        }
    }
    return rslt;
}

export async function getDivisions(): Promise<DivisionI[]> {
    let rslt: DivisionI[] = [];
    if (db.connection) {
        try {
            let res = await db.connection.select<DivisionI[]>(`SELECT * FROM divisions`);
            if (res) {
                if (res.length > 0) {
                    rslt = res;
                    if (db.debug) console.log("Divisions: ", rslt);
                } else {
                    if (db.debug) console.log("No Divisions Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Divisions: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function getDivision(id: number): Promise<DivisionI | null> {
    let rslt: DivisionI | null = null;
    if (db.connection) {
        try {
            let res = await db.connection.select<DivisionI[]>(`SELECT * FROM divisions WHERE id = ?`, [id]);
            if (res) {
                if (res.length > 0) {
                    rslt = res[0];
                    if (db.debug) console.log("Division: ", rslt);
                } else {
                    if (db.debug) console.log("No Division Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Division: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function updateDivision(division: Omit<DivisionI, "createdAt" | "editedAt">): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`UPDATE divisions SET name = ?, editedAt = CURRENT_TIMESTAMP WHERE id = ?`, [division.name, division.id]);
            rslt = true;
        }
        catch (e) {
            console.error(`Error Updating Division: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function deleteDivision(id: number): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`DELETE FROM divisions WHERE id = ?`, [id]);
            rslt = true;
        }
        catch (e) {
            console.error(`Error Deleting Division: ${(e as Error).message}`);
        }
    }
    return rslt;
}

// subject functions

export async function addSubject(subject: Omit<SubjectI, "id" | "createdAt" | "editedAt">): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`INSERT INTO subjects (name, divisionId) VALUES (?, ?)`, [subject.name, subject.divisionId]);
            rslt = true;
        } catch (e) {
            console.error(`Error Adding Subject: ${(e as Error).message}`);
            rslt = false;
        }
    }
    return rslt;
}

export async function getSubjects(): Promise<SubjectI[]> {
    let rslt: SubjectI[] = [];
    if (db.connection) {
        try {
            let res = await db.connection.select<SubjectI[]>(`SELECT * FROM subjects`);
            if (res) {
                if (res.length > 0) {
                    rslt = res;
                    if (db.debug) console.log("Subjects: ", rslt);
                } else {
                    if (db.debug) console.log("No Subjects Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Subjects: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function getSubject(id: number): Promise<SubjectI | null> {
    let rslt: SubjectI | null = null;
    if (db.connection) {
        try {
            let res = await db.connection.select<SubjectI[]>(`SELECT * FROM subjects WHERE id = ?`, [id]);
            if (res) {
                if (res.length > 0) {
                    rslt = res[0];
                    if (db.debug) console.log("Subject: ", rslt);
                } else {
                    if (db.debug) console.log("No Subject Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Subject: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function updateSubject(subject: Omit<SubjectI, "createdAt" | "editedAt">): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection.execute(`UPDATE subjects SET name = ?, divisionId = ?, editedAt = CURRENT_TIMESTAMP WHERE id = ?`, [subject.name, subject.divisionId, subject.id]);
            rslt = true;
        }
        catch (e) {
            console.error(`Error Updating Subject: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function deleteSubject(id: number): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection.execute(`DELETE FROM subjects WHERE id = ?`, [id]);
            rslt = true;
        }
        catch (e) {
            console.error(`Error Deleting Subject: ${(e as Error).message}`);
        }
    }
    return rslt;
}

// payment functions

export async function addPayment(payment: Omit<PaymentI, "id" | "date" | "editedAt">): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection.execute(`INSERT INTO payments (studentId, subjectId, amount) VALUES (?, ?, ?)`, [payment.studentId, payment.subjectId, payment.amount]);
            rslt = true;
        } catch (e) {
            console.error(`Error Adding Payment: ${(e as Error).message}`);
            rslt = false;
        }
    }
    return rslt;
}

export async function getPayments(): Promise<PaymentI[]> {
    let rslt: PaymentI[] = [];
    if (db.connection) {
        try {
            let res = await db.connection.select<PaymentI[]>(`SELECT * FROM payments`);
            if (res) {
                if (res.length > 0) {
                    rslt = res;
                    if (db.debug) console.log("Payments: ", rslt);
                } else {
                    if (db.debug) console.log("No Payments Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Payments: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function getPayment(id: number): Promise<PaymentI | null> {
    let rslt: PaymentI | null = null;
    if (db.connection) {
        try {
            let res = await db.connection.select<PaymentI[]>(`SELECT * FROM payments WHERE id = ?`, [id]);
            if (res) {
                if (res.length > 0) {
                    rslt = res[0];
                    if (db.debug) console.log("Payment: ", rslt);
                } else {
                    if (db.debug) console.log("No Payment Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Payment: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function updatePayment(payment: Omit<PaymentI, "editedAt">): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`UPDATE payments SET studentId = ?, subjectId = ?, amount = ?, date = ?, editedAt = CURRENT_TIMESTAMP WHERE id = ?`, [payment.studentId, payment.subjectId, payment.amount, payment.date, payment.id]);
            rslt = true;
        }
        catch (e) {
            console.error(`Error Updating Payment: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function deletePayment(id: number): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`DELETE FROM payments WHERE id = ?`, [id]);
            rslt = true;
        }
        catch (e) {
            console.error(`Error Deleting Payment: ${(e as Error).message}`);
        }
    }
    return rslt;
}

// student_subject functions

export async function addStudentSubject(studentId: number, subjectId: number): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`INSERT INTO student_subject (studentId, subjectId) VALUES (?, ?)`, [studentId, subjectId]);
            rslt = true;
        } catch (e) {
            console.error(`Error Adding Student Subject: ${(e as Error).message}`);
            rslt = false;
        }
    }
    return rslt;
}

export async function getStudentSubjects(studentId: number): Promise<SubjectI[]> {
    let rslt: SubjectI[] = [];
    if (db.connection) {
        try {
            let res = await db.connection.select<SubjectI[]>(`SELECT * FROM subjects WHERE id IN (SELECT subjectId FROM student_subject WHERE studentId = ?)`, [studentId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res;
                    if (db.debug) console.log("Student Subjects: ", rslt);
                } else {
                    if (db.debug) console.log("No Student Subjects Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Student Subjects: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function editStudentSubject(studentId: number, subjectId: number, newSubjectId: number): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`UPDATE student_subject SET subjectId = ? WHERE studentId = ? AND subjectId = ?`, [newSubjectId, studentId, subjectId]);
            rslt = true;
        }
        catch (e) {
            console.error(`Error Editing Student Subject: ${(e as Error).message}`);
        }
    }
    return rslt;
}
export async function deleteStudentSubject(studentId: number, subjectId: number): Promise<boolean> {
    let rslt = false;
    if (db.connection) {
        try {
            await db.connection?.execute(`DELETE FROM student_subject WHERE studentId = ? AND subjectId = ?`, [studentId, subjectId]);
            rslt = true;
        }
        catch (e) {
            console.error(`Error Deleting Student Subject: ${(e as Error).message}`);
        }
    }
    return rslt;
}

// subject division functions

export async function getDivisionSubjects(divisionId: number): Promise<SubjectI[]> {
    let rslt: SubjectI[] = [];
    if (db.connection) {
        try {
            let res = await db.connection.select<SubjectI[]>(`SELECT * FROM subjects WHERE divisionId = ?`, [divisionId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res;
                    if (db.debug) console.log("Division Subjects: ", rslt);
                } else {
                    if (db.debug) console.log("No Division Subjects Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Division Subjects: ${(e as Error).message}`);
        }
    }
    return rslt;
}


// payment student functions

export async function getStudentPayments(studentId: number): Promise<PaymentI[]> {
    let rslt: PaymentI[] = [];
    if (db.connection) {
        try {
            let res = await db.connection.select<PaymentI[]>(`SELECT * FROM payments WHERE studentId = ?`, [studentId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res;
                    if (db.debug) console.log("Student Payments: ", rslt);
                } else {
                    if (db.debug) console.log("No Student Payments Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Student Payments: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function getStudentSubjectPayments(studentId: number, subjectId: number): Promise<PaymentI[]> {
    let rslt: PaymentI[] = [];
    if (db.connection) {
        try {
            let res = await db.connection.select<PaymentI[]>(`SELECT * FROM payments WHERE studentId = ? AND subjectId = ?`, [studentId, subjectId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res;
                    if (db.debug) console.log("Student Subject Payments: ", rslt);
                } else {
                    if (db.debug) console.log("No Student Subject Payments Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Student Subject Payments: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function getStudentSubjectPaymentsTotal(studentId: number, subjectId: number): Promise<number> {
    let rslt = 0;
    if (db.connection) {
        try {
            let res: {total: number}[]= await db.connection.select(`SELECT SUM(amount) as total FROM payments WHERE studentId = ? AND subjectId = ?`, [studentId, subjectId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res[0].total;
                    if (db.debug) console.log("Student Subject Payments Total: ", rslt);
                } else {
                    if (db.debug) console.log("No Student Subject Payments Total Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Student Subject Payments Total: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function getStudentPaymentsTotal(studentId: number): Promise<number> {
    let rslt = 0;
    if (db.connection) {
        try {
            let res: {total: number}[]= await db.connection.select(`SELECT SUM(amount) as total FROM payments WHERE studentId = ?`, [studentId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res[0].total;
                    if (db.debug) console.log("Student Payments Total: ", rslt);
                } else {
                    if (db.debug) console.log("No Student Payments Total Found");
                }
            }
        } catch (e) {
            console.error(`Error Getting Student Payments Total: ${(e as Error).message}`);
        }
    }
    return rslt;
}
export async function getStudentSubjectPaymentsCount(studentId: number, subjectId: number): Promise<number> {
    let rslt = 0;
    if (db.connection) {
        try {
            let res: { count: number }[] = await db.connection.select(`SELECT COUNT(*) as count FROM payments WHERE studentId = ? AND subjectId = ?`, [studentId, subjectId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res[0].count;
                    if (db.debug) console.log("Student Subject Payments Count: ", rslt);
                } else {
                    if (db.debug) console.log("No Student Subject Payments Count Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Student Subject Payments Count: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function getStudentPaymentsCount(studentId: number): Promise<number> {
    let rslt = 0;
    if (db.connection) {
        try {
            let res: { count: number }[] = await db.connection.select(`SELECT COUNT(*) as count FROM payments WHERE studentId = ?`, [studentId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res[0].count;
                    if (db.debug) console.log("Student Payments Count: ", rslt);
                } else {
                    if (db.debug) console.log("No Student Payments Count Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Student Payments Count: ${(e as Error).message}`);
        }
    }
    return rslt;
}

// payment subject division functions

export async function getDivisionPayments(divisionId: number): Promise<PaymentI[]> {
    let rslt: PaymentI[] = [];
    if (db.connection) {
        try {
            let res = await db.connection.select<PaymentI[]>(`SELECT * FROM payments WHERE studentId IN (SELECT id FROM students WHERE divisionId = ?)`, [divisionId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res;
                    if (db.debug) console.log("Division Payments: ", rslt);
                } else {
                    if (db.debug) console.log("No Division Payments Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Division Payments: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function getDivisionSubjectPayments(divisionId: number, subjectId: number): Promise<PaymentI[]> {
    let rslt: PaymentI[] = [];
    if (db.connection) {
        try {
            let res = await db.connection.select<PaymentI[]>(`SELECT * FROM payments WHERE studentId IN (SELECT id FROM students WHERE divisionId = ?) AND subjectId = ?`, [divisionId, subjectId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res;
                    if (db.debug) console.log("Division Subject Payments: ", rslt);
                } else {
                    if (db.debug) console.log("No Division Subject Payments Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Division Subject Payments: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function getDivisionSubjectPaymentsTotal(divisionId: number, subjectId: number): Promise<number> {
    let rslt = 0;
    if (db.connection) {
        try {
            let res: {total: number}[]= await db.connection.select(`SELECT SUM(amount) as total FROM payments WHERE studentId IN (SELECT id FROM students WHERE divisionId = ?) AND subjectId = ?`, [divisionId, subjectId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res[0].total;
                    if (db.debug) console.log("Division Subject Payments Total: ", rslt);
                } else {
                    if (db.debug) console.log("No Division Subject Payments Total Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Division Subject Payments Total: ${(e as Error).message}`);
        }
    }
    return rslt;
}

export async function getDivisionPaymentsTotal(divisionId: number): Promise<number> {
    let rslt = 0;
    if (db.connection) {
        try {
            let res: {total: number}[]= await db.connection.select(`SELECT SUM(amount) as total FROM payments WHERE studentId IN (SELECT id FROM students WHERE divisionId = ?)`, [divisionId]);
            if (res) {
                if (res.length > 0) {
                    rslt = res[0].total;
                    if (db.debug) console.log("Division Payments Total: ", rslt);
                } else {
                    if (db.debug) console.log("No Division Payments Total Found");
                }
            }
        }
        catch (e) {
            console.error(`Error Getting Division Payments Total: ${(e as Error).message}`);
        }
    }
    return rslt;
}

