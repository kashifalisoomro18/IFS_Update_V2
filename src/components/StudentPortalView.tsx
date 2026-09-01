/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { GraduationCap, Lock, User, FileText, Calendar, BookOpen, AlertCircle, LogOut, CheckCircle } from "lucide-react";

export default function StudentPortalView() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please enter both Roll Number and password.");
      return;
    }
    // Simple simulation: log in any valid mock profile
    setIsLoggedIn(true);
    setErrorMessage("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const courses = [
    { name: "O-Level Physics (Theory & Lab)", instructor: "Mr. Muhammad Bilal", grade: "A*" },
    { name: "O-Level Chemistry", instructor: "Mr. Farhan Ali Soomro", grade: "A" },
    { name: "STEM Inquiry Laboratory", instructor: "Mr. Muhammad Bilal", grade: "A*" },
    { name: "Mathematics Syllabus D", instructor: "Mrs. Nida Almani", grade: "A" },
    { name: "English Language CAIE", instructor: "Mrs. Sadia Rehman", grade: "B" },
  ];

  const tasks = [
    { title: "Physics Lab File Report submission", due: "July 15, 2026", status: "Pending" },
    { title: "STEM Robotics design blueprint", due: "July 20, 2026", status: "Submitted" },
    { title: "Mathematics Algebra worksheet", due: "July 12, 2026", status: "Pending" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 fade-in" id="portal-view-container" style={{ zoom: 0.95 }}>
      {!isLoggedIn ? (
        /* 1. LMS LOGIN PAGE */
        <div className="max-w-md mx-auto bg-white border border-slate-100 rounded-sm p-8 sm:p-10 shadow-lg space-y-8 border-t-8 border-primary" id="portal-login-card">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-slate-950 rounded-full flex items-center justify-center border border-primary/20 shadow-md mx-auto">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-slate-900">
              IFS Student LMS Portal
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Provide your school-issued credentials to access grades, lectures, and notice boards.
            </p>
          </div>

          {errorMessage && (
            <div className="flex gap-2.5 items-center text-xs text-red-600 bg-red-50 p-3.5 border border-red-100 rounded-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" id="portal-login-form">
            <div className="space-y-1">
              <label className="text-[9.9px] font-bold uppercase tracking-wider text-slate-700">Roll Number / Student ID *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="IFS-2026-094"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm pl-11 pr-4 py-3 focus:border-primary focus:outline-none focus:bg-white transition-colors text-slate-950"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9.9px] font-bold uppercase tracking-wider text-slate-700">Portal Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-sm pl-11 pr-4 py-3 focus:border-primary focus:outline-none focus:bg-white transition-colors text-slate-950"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-950 hover:bg-slate-900 text-primary py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              Secure Portal Login
            </button>
          </form>

          <div className="bg-slate-50 p-4 rounded-sm border border-slate-100 text-[9.9px] text-slate-600 leading-relaxed text-center">
            <strong>Portal Demo:</strong> You can simulate portal login by typing any roll number and password (e.g. <code>IFS-101</code> / <code>demo</code>) to view the student dashboard!
          </div>
        </div>
      ) : (
        /* 2. LMS PORTAL DASHBOARD */
        <div className="space-y-10 animate-fadeIn" id="portal-dashboard">
          {/* Dashboard Header */}
          <div className="bg-slate-950 text-white p-8 rounded-sm border-l-8 border-primary flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8.1px] font-mono uppercase font-bold text-primary tracking-widest">Logged in Session</span>
              </div>
              <h2 className="font-serif font-bold text-3xl text-white">
                Assalam-o-Alaikum, Muhammad Ali
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-mono">
                Roll Number: {username.toUpperCase()} • Cambridge O-Level Section B
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4 text-primary" />
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Courses & Grades list */}
            <div className="lg:col-span-2 space-y-6" id="courses-col">
              <h3 className="font-serif font-bold text-2xl text-slate-900 border-l-4 border-primary pl-4">
                Active Enrolled Courses & Grades
              </h3>

              <div className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-x-auto custom-scrollbar">
                <div className="min-w-[480px]">
                  <div className="bg-slate-950 text-white p-4 grid grid-cols-3 text-xs font-bold uppercase tracking-widest">
                    <span>Course / Instructor</span>
                    <span>Coordinator Desk</span>
                    <span className="text-right">Current Grade</span>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                    {courses.map((course, idx) => (
                      <div key={idx} className="p-5 grid grid-cols-3 items-center" id={`course-item-${idx}`}>
                        <div className="space-y-1">
                          <span className="font-serif font-bold text-slate-900">{course.name}</span>
                          <p className="text-xs text-slate-400">{course.instructor}</p>
                        </div>
                        <span className="text-slate-500 font-mono text-xs">Active</span>
                        <div className="text-right">
                          <span className="bg-slate-950 text-primary border border-primary/20 px-3 py-1.5 rounded-sm font-bold font-mono text-xs shadow-sm">
                            {course.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Assignments & Tasks column */}
            <div className="space-y-6" id="tasks-col">
              <h3 className="font-serif font-bold text-2xl text-slate-900 border-l-4 border-primary pl-4">
                Learning Tasks
              </h3>

              <div className="space-y-4" id="tasks-list">
                {tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 p-6 rounded-sm shadow-sm space-y-3 hover:border-primary/40 transition-colors"
                    id={`task-item-${idx}`}
                  >
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold uppercase">
                      <span className="text-slate-400">Due: {task.due}</span>
                      <span className={`px-2.5 py-1 rounded-sm font-bold uppercase ${
                        task.status === "Submitted"
                          ? "bg-slate-950 text-primary border border-primary/20"
                          : "bg-primary/10 text-primary-dark animate-pulse border border-primary/20"
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-slate-950 text-sm leading-tight">
                      {task.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
