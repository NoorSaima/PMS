import { DataProps } from "../../example2/columns";

export interface CreatePatientFormValues {
    // Identification
    firstName: string;
    lastName: string;
    middleName: string;
    mi: string;
    suffix: string;
    gender: string;
    birthDate: string; // DOB
    deathDate: string; // DOD
    ssn: string;

    // Contact
    addressLine1: string; // Residence
    city: string;
    state: string;
    zip: string;
    cellPhone: string;
    whatsAppNo: string;
    email: string;

    // Additional Profile Fields
    patientType: string;
    ethnicity: string;
    language: string;
    race: string;

    // Legacy fields
    title: string;
    addressLine2: string;
    countryParishCode: string;
    homePhone: string;
    workPhone: string;
    emergencyContactPerson: string;
    relationship: string;
    contactNo: string;
    confCommPreferences: string;
    confidentialCommDetail: string;
    priPhysician: string;
    defaultLocation: string;
    refPhysician: string;
    subscriber: string;
    comments: string;
    mothersMaidenName: string;
    genderIdentity: string;
    sexualOrientation: string;
    advDirective: boolean;
    multipleBirth: boolean;
    annualIncome: string;
    disabledDate: string;
    deathReason: string;
    familySize: string;
    transitionOfCare: boolean;
    blockReminderCalls: boolean;
    dontSendStatement: boolean;
    dentalPatient: boolean;
    accessRestricted: boolean;
    patientStatus: string;
    maritalStatus: string;
    prevName: string;
    primaryPhone: string;
    interpreterRequired: string;
}

export const defaultValues: CreatePatientFormValues = {
    firstName: "", lastName: "", middleName: "", mi: "", suffix: "",
    gender: "", birthDate: "", deathDate: "", ssn: "",
    addressLine1: "", city: "", state: "", zip: "",
    cellPhone: "", whatsAppNo: "", email: "",
    patientType: "", ethnicity: "", language: "", race: "",

    title: "", addressLine2: "", countryParishCode: "",
    homePhone: "", workPhone: "", emergencyContactPerson: "", relationship: "", contactNo: "",
    confCommPreferences: "", confidentialCommDetail: "",
    priPhysician: "", defaultLocation: "", refPhysician: "", subscriber: "", comments: "",
    mothersMaidenName: "", genderIdentity: "", sexualOrientation: "",
    advDirective: false, multipleBirth: false, annualIncome: "", disabledDate: "",
    deathReason: "", familySize: "", transitionOfCare: false,
    blockReminderCalls: false, dontSendStatement: false, dentalPatient: false, accessRestricted: false,
    patientStatus: "Active", maritalStatus: "", prevName: "", primaryPhone: "", interpreterRequired: "no"
};

export const mapDataToForm = (data: DataProps): CreatePatientFormValues => {
    const names = data.Name ? data.Name.split(" ") : [];
    const firstName = data.FirstName || names[0] || "";
    const lastName = data.LastName || (names.length > 1 ? names.slice(1).join(" ") : "");

    return {
        ...defaultValues,
        firstName,
        lastName,
        middleName: data.MiddleName || "",
        mi: "", // Not in DataProps
        suffix: data.Suffix || "",
        birthDate: data.DOB || "",
        deathDate: "", // Not in DataProps
        ssn: "", // Not in DataProps
        cellPhone: data.CellPhone || "",
        homePhone: "", // Not in DataProps
        whatsAppNo: "", // Not in DataProps
        email: data.Email || "",
        gender: data.Gender?.toLowerCase() || "",
        addressLine1: data.Address || "",
        city: "", // Not available in DataProps (compound Address string)
        state: "", // Not available in DataProps
        zip: "", // Not available in DataProps
        patientType: "", // Not in DataProps
        ethnicity: "", // Not in DataProps
        language: "", // Not in DataProps
        race: "", // Not in DataProps
        patientStatus: data.status || "Active",
    };
};

export const mapApiResponseToForm = (data: any): CreatePatientFormValues => {
    return {
        ...defaultValues,
        firstName: data.FirstName || "",
        lastName: data.LastName || "",
        middleName: data.MiddleName || "",
        mi: "", // Not present in example API response
        suffix: data.Suffix || "",
        birthDate: data.DOB || "",
        deathDate: data.DOD || "",
        ssn: data.SSN || "",
        cellPhone: data.CellNo || "",
        homePhone: data.HomeCellNo || "", // API has HomeCellNo
        whatsAppNo: "", // Not present in example API response
        email: data.Email || "",
        gender: data.Gender === 1 ? "male" : data.Gender === 2 ? "female" : "other",
        addressLine1: data.Address || "",
        city: data.City || "",
        state: data.State || "",
        zip: data.ZipCode || "", // API has ZipCode
        patientType: data.PatientType || "",
        ethnicity: data.Ethnicity || "",
        language: data.Language || "",
        race: data.Race || "",
        patientStatus: data.Status || "Active",
    };
};
