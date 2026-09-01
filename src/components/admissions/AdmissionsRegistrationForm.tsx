/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, ChangeEvent } from "react";
import {
  User,
  Users,
  FileText,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { AdmissionFormData } from "../../types";

const initialFormData: AdmissionFormData = {
  studentName: "",
  dob: "",
  gender: "",
  gradeApplied: "",
  previousSchool: "",
  previousGrade: "",
  parentName: "",
  parentCNIC: "",
  parentPhone: "",
  parentWhatsApp: "",
  parentEmail: "",
  parentOccupation: "",
  address: "",
  birthCertificateUploaded: false,
  fatherCnicUploaded: false,
  reportCardUploaded: false,
};

const gradeOptions = [
  "Pre-Nursery",
  "Nursery",
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "O Levels",
  "A Levels",
];

type DocumentKey = "birthCertificateUploaded" | "fatherCnicUploaded" | "reportCardUploaded";

const documentFields: { key: DocumentKey; label: string }[] = [
  { key: "birthCertificateUploaded", label: "Birth Certificate" },
  { key: "fatherCnicUploaded", label: "Father's CNIC" },
  { key: "reportCardUploaded", label: "Previous Report Card" },
];

interface AdmissionsRegistrationFormProps {
  onSubmit?: (data: AdmissionFormData) => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30";

export default function AdmissionsRegistrationForm({
  onSubmit,
}: AdmissionsRegistrationFormProps) {
  const [formData, setFormData] = useState<AdmissionFormData>(initialFormData);
  const [fileNames, setFileNames] = useState<Partial<Record<DocumentKey, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (key: DocumentKey) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({ ...prev, [key]: !!file }));
    setFileNames((prev) => ({ ...prev, [key]: file?.name ?? undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);

    const ref = `ISRA-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(ref);
    setSubmitted(true);
    window.scrollTo({
      top: document.getElementById("admissions-registration")?.offsetTop ?? 0,
      behavior: "smooth",
    });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setFileNames({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-10 text-center shadow-sm">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary-dark">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-bold text-slate-900">
          Application Received
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Thank you, {formData.studentName || "applicant"}. Our admissions
          team will contact you at {formData.parentPhone || "the number provided"} within 2&ndash;3
          working days.
        </p>
        <p className="mt-4 inline-block rounded-md bg-amber-50 px-4 py-2 font-mono text-sm font-bold text-primary-dark">
          Reference ID: {referenceId}
        </p>
        <div>
          <button
            onClick={handleReset}
            className="mt-6 inline-flex items-center gap-2 border-2 border-slate-900 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-100 bg-white p-4 sm:p-10 shadow-sm"
    >
      {/* Student Information */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary/20 text-secondary">
            <User className="h-5 w-5" />
          </span>
          <h3 className="font-serif text-lg font-semibold text-slate-900">
            Student Information
          </h3>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Student's Full Name">
            <input
              required
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Ahmed Khan"
            />
          </Field>
          <Field label="Date of Birth">
            <input
              required
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>
          <Field label="Gender">
            <select
              required
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </Field>
          <Field label="Grade Applying For">
            <select
              required
              name="gradeApplied"
              value={formData.gradeApplied}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select grade</option>
              {gradeOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Previous School (if any)">
            <input
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleChange}
              className={inputClass}
              placeholder="School name"
            />
          </Field>
          <Field label="Previous Grade">
            <input
              name="previousGrade"
              value={formData.previousGrade}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Grade 4"
            />
          </Field>
        </div>
      </div>

      {/* Parent / Guardian Information */}
      <div className="mt-10 border-t border-gray-100 pt-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/20 text-primary-dark">
            <Users className="h-5 w-5" />
          </span>
          <h3 className="font-serif text-lg font-semibold text-slate-900">
            Parent / Guardian Information
          </h3>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Parent / Guardian Name">
            <input
              required
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Full name"
            />
          </Field>
          <Field label="CNIC Number">
            <input
              required
              name="parentCNIC"
              value={formData.parentCNIC}
              onChange={handleChange}
              className={inputClass}
              placeholder="XXXXX-XXXXXXX-X"
            />
          </Field>
          <Field label="Phone Number">
            <input
              required
              type="tel"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              className={inputClass}
              placeholder="+92 3XX XXXXXXX"
            />
          </Field>
          <Field label="WhatsApp Number">
            <input
              type="tel"
              name="parentWhatsApp"
              value={formData.parentWhatsApp}
              onChange={handleChange}
              className={inputClass}
              placeholder="+92 3XX XXXXXXX"
            />
          </Field>
          <Field label="Email Address">
            <input
              required
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              className={inputClass}
              placeholder="name@example.com"
            />
          </Field>
          <Field label="Occupation">
            <input
              name="parentOccupation"
              value={formData.parentOccupation}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Business Owner"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Home Address">
              <textarea
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className={inputClass}
                placeholder="Street, city, postal code"
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="mt-10 border-t border-gray-100 pt-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary/20 text-secondary">
            <FileText className="h-5 w-5" />
          </span>
          <h3 className="font-serif text-lg font-semibold text-slate-900">
            Required Documents
          </h3>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {documentFields.map(({ key, label }) => {
            const uploaded = formData[key];
            return (
              <label
                key={key}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-6 text-center transition-colors ${
                  uploaded
                    ? "border-primary/60 bg-amber-50/50"
                    : "border-gray-200 hover:border-primary/40 hover:bg-slate-50"
                }`}
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange(key)}
                  accept="image/*,.pdf"
                />
                {uploaded ? (
                  <CheckCircle2 className="h-6 w-6 text-primary-dark" />
                ) : (
                  <UploadCloud className="h-6 w-6 text-slate-400" />
                )}
                <span className="text-xs font-semibold text-slate-700">{label}</span>
                <span className="max-w-[10rem] truncate text-[11px] text-slate-500">
                  {uploaded ? fileNames[key] ?? "File attached" : "Click to upload"}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="mt-10 inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold text-slate-900 shadow transition-all hover:shadow-md hover:bg-primary/90 sm:w-auto"
      >
        Submit Application
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-3 text-xs text-slate-500">
        By submitting, you agree to be contacted by our admissions office
        regarding this application.
      </p>
    </form>
  );
}
