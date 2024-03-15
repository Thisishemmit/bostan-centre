import {
    addStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    addDivision,
    getDivisions,
    getDivision,
    updateDivision,
    deleteDivision,
    addSubject,
    getSubjects,
    getSubject,
    updateSubject,
    deleteSubject,
    addPayment,
    getPayments,
    getPayment,
    updatePayment,
    deletePayment,
    addStudentSubject,
    getStudentSubjects,
    editStudentSubject,
    deleteStudentSubject,
    getDivisionSubjects,
    getStudentPayments,
    getStudentSubjectPayments,
    getStudentSubjectPaymentsTotal,
    getStudentPaymentsTotal,
    getStudentSubjectPaymentsCount,
    getStudentPaymentsCount,
    getDivisionPayments,
    getDivisionSubjectPayments,
    getDivisionSubjectPaymentsTotal,
    getDivisionPaymentsTotal,
    db,
    PaymentI,
    StudentI,
    SubjectI,
    DivisionI,
} from "./Database"

// Test
(async () => {
    await db.connect();

    await db.createTables();

    //Division
    let divisionA: Omit<DivisionI, "id" | "createdAt" | "editedAt"> = {
        name: "A",
    }

    let divisionB: Omit<DivisionI, "id" | "createdAt" | "editedAt"> = {
        name: "B",
    }

    await addDivision(divisionA);
    await addDivision(divisionB);

    let Math: Omit<SubjectI, "id" | "createdAt" | "editedAt"> = {
        name: "Math",
        divisionId: 1,
    }

    let Science: Omit<SubjectI, "id" | "createdAt" | "editedAt"> = {
        name: "Science",
        divisionId: 1,
    }

    let English: Omit<SubjectI, "id" | "createdAt" | "editedAt"> = {
        name: "English",
        divisionId: 2,
    }

    await addSubject(Math);
    await addSubject(Science);
    await addSubject(English);

    let studentA: Omit<StudentI, "id" | "createdAt" | "editedAt" | "subjects"> = {
        fName: "John",
        lName: "Doe",
        phone: "1234567890",
        grade: 10,
        divisionId: 1,
    }

    let studentB: Omit<StudentI, "id" | "createdAt" | "editedAt" | "subjects"> = {
        fName: "Jane",
        lName: "Doe",
        phone: "1234567890",
        grade: 3,
        divisionId: 2,
    }

    await addStudent(studentA);
    await addStudent(studentB);

    await addStudentSubject(1, 1);
    await addStudentSubject(1, 2);
    await addStudentSubject(2, 3);

    let paymentA: Omit<PaymentI, "id" | "date" | "editedAt"> = {
        studentId: 1,
        amount: 100,
        subjectId: 1,
    }

    let paymentB: Omit<PaymentI, "id" | "date" | "editedAt"> = {
        studentId: 1,
        amount: 200,
        subjectId: 2,
    }

    let paymentC: Omit<PaymentI, "id" | "date" | "editedAt"> = {
        studentId: 2,
        amount: 150,
        subjectId: 3,
    }

    await addPayment(paymentA);
    await addPayment(paymentB);
    await addPayment(paymentC);

    const students: StudentI[]
        = await getStudents();
    console.log(students);

    const student: StudentI | null = await getStudent(1);
    if(student){
        console.log(student);
    }

    studentA.fName = "Johnathan";
    if (student) {
        await updateStudent(student);
    }


    const studentSubjects = await getStudentSubjects(1);
    console.log('Student Subjects:', studentSubjects);

    // Get student payments
    const studentPayments = await getStudentPayments(1);
    console.log('Student Payments:', studentPayments);

    // Get student subject payments
    const studentSubjectPayments = await getStudentSubjectPayments(1, 1);
    console.log('Student Subject Payments:', studentSubjectPayments);

    // Get student subject payments total
    const studentSubjectPaymentsTotal = await getStudentSubjectPaymentsTotal(1, 1);
    console.log('Student Subject Payments Total:', studentSubjectPaymentsTotal);

    // Get division payments
    const divisionPayments = await getDivisionPayments(1);
    console.log('Division Payments:', divisionPayments);

    // Get division subject payments
    const divisionSubjectPayments = await getDivisionSubjectPayments(1, 1);
    console.log('Division Subject Payments:', divisionSubjectPayments);

    // Get division subject payments total
    const divisionSubjectPaymentsTotal = await getDivisionSubjectPaymentsTotal(1, 1);
    console.log('Division Subject Payments Total:', divisionSubjectPaymentsTotal);

    // Clean up
    await db.close();
})();
