/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  X,
  Eye,
  Images,
  GraduationCap,
  Trophy,
  Palette,
  Building2,
  CalendarDays,
  Camera,
  ArrowRight,
} from "lucide-react";

/* ---------------------------------------------------------
   Design tokens
--------------------------------------------------------- */
const NAVY = "#020816";
const SKY = "#60BADC";
const GOLD = "#F5C330";

/* ---------------------------------------------------------
   Data — swap `src` values for real school photography.
   `size` controls the card's aspect ratio in the masonry grid.
--------------------------------------------------------- */
const galleryItems = [
  { id: "1", src: "/ACADEMICS7.JPG", alt: "Student holding flag", title: "Graduation", category: "academics", size: "wide" },
  { id: "camp-1", src: "/Camps/camp1.jpg", alt: "Students participating in camp activity 1", title: "Summer Camp Activity", category: "events", size: "wide" },
  { id: "19", src: "/play3.jpg", alt: "Basketball team celebrating a win", title: "Championship Match", category: "sports", size: "md" },
  { id: "18", src: "/playground.jpg", alt: "Students", title: "Students Activities", category: "activities", size: "tall" },
  { id: "9", src: "/IMG_4097.JPG", alt: "Group of students laughing together outdoors", title: "Between Classes", category: "campus", size: "md" },
  { id: "2", src: "/ACADEMICS1.JPG", alt: "Student reaching for a book on a tall shelf", title: "Finding the Right Book", category: "academics", size: "wide" },
  { id: "art-comp-1", src: "/ArtCompetition/art1.jpg", alt: "Students creating artwork during art competition", title: "Art Competition", category: "events", size: "wide" },
  { id: "20", src: "/play.jpg", alt: "Backetball ", title: "Team Huddle", category: "sports", size: "wide" },
  { id: "act-1", src: "/Activity-1.JPG", alt: "Student carefully shaping a clay pot by hand on a table", title: "Pottery & Clay Sculpting", category: "activities", size: "wide" },
  { id: "14", src: "/IMG_4093.JPG", alt: "Students pointing at campus architecture", title: "Campus Tour", category: "campus", size: "wide" },
  { id: "bts-1", src: "/BackToSchool/Image1.jpeg", alt: "Students welcoming the new academic session", title: "Back to School Welcome", category: "academics", size: "wide" },
  { id: "camp-2", src: "/Camps/camp2.jpg", alt: "Students participating in camp activity 2", title: "Outdoor Camp Excursion", category: "events", size: "md" },
  { id: "ten-1", src: "/Houses/tennis1.JPG", alt: "Students playing table tennis match", title: "Table Tennis Match", category: "sports", size: "wide" },
  { id: "act-2", src: "/Activity-2.JPG", alt: "Circular arrangement of student desks in the outdoor courtyard", title: "Open-Air Learning Arena", category: "activities", size: "md" },
  { id: "15", src: "/IMG_4095.JPG", alt: "Two students walking with backpacks and books", title: "Heading to Class", category: "campus", size: "wide" },
  { id: "8", src: "/ACADEMICS2.JPG", alt: "Teacher writing on the whiteboard", title: "Morning Lecture", category: "academics", size: "wide" },
  { id: "5", src: "/IMG_2348.JPG", alt: "Teacher giving a speech at the podium", title: "Annual Address", category: "events", size: "wide" },
  { id: "ten-2", src: "/Houses/tennis2.JPG", alt: "Table tennis rally during sports house competition", title: "House Sports Rally", category: "sports", size: "wide" },
  { id: "act-3", src: "/Activity-3.JPG", alt: "Students working at open-air art desks during pottery workshop", title: "Outdoor Sculpting Session", category: "activities", size: "wide" },
  { id: "17", src: "/IMG_4096.JPG", alt: "Student reading on the campus lawn", title: "Outdoor Reading", category: "campus", size: "wide" },
  { id: "bts-2", src: "/BackToSchool/Image2.jpeg", alt: "Students interacting on the first day of school", title: "First Day Orientation", category: "academics", size: "md" },
  { id: "camp-3", src: "/Camps/camp3.jpg", alt: "Students participating in camp activity 3", title: "Team Building Workshop", category: "events", size: "tall" },
  { id: "ten-3", src: "/Houses/tennis3.JPG", alt: "Table tennis player serving ball", title: "Precision Serve", category: "sports", size: "wide" },
  { id: "act-4", src: "/Activity-4.JPG", alt: "Student focusing on crafting clay coils during art class", title: "Clay Coil Modeling", category: "activities", size: "tall" },
  { id: "24", src: "/IMG_4097.JPG", alt: "Wide view of the school building facade", title: "Main Building", category: "campus", size: "wide" },
  { id: "10", src: "/ACADEMICS6.JPG", alt: "Student portrait holding folders", title: "Class of 2026", category: "academics", size: "tall" },
  { id: "art-comp-2", src: "/ArtCompetition/art2.jpg", alt: "Students painting on canvas at annual art event", title: "Annual Art Event", category: "events", size: "md" },
  { id: "ten-4", src: "/Houses/tennis4.JPG", alt: "Intense table tennis tournament moment", title: "Tournament Action", category: "sports", size: "wide" },
  { id: "act-5", src: "/Activity-5.JPG", alt: "Art teacher demonstrating clay techniques to outdoor class", title: "Guided Art Instruction", category: "activities", size: "wide" },
  { id: "25", src: "/audi4.jpg", alt: "Students in auditorium for a session", title: "Auditorium Session", category: "campus", size: "md" },
  { id: "11", src: "/ACADEMICS5.JPG", alt: "Students examining an anatomy model", title: "Science Lab", category: "academics", size: "wide" },
  { id: "camp-4", src: "/Camps/camp4.jpg", alt: "Students participating in camp activity 4", title: "Camp Exploration", category: "events", size: "wide" },
  { id: "ten-5", src: "/Houses/tennis5.JPG", alt: "Students engaging in indoor table tennis game", title: "Indoor Tennis Game", category: "sports", size: "wide" },
  { id: "act-6", src: "/Activity-6.JPG", alt: "Teacher guiding students as they roll and shape clay", title: "Hands-on Mentorship", category: "activities", size: "md" },
  { id: "bts-3", src: "/BackToSchool/Image3.jpeg", alt: "Classroom learning and teacher interaction", title: "Classroom Reconnection", category: "academics", size: "tall" },
  { id: "6", src: "/pintober1 (1).jpeg", alt: "certificate distribution", title: "Pintober Event", category: "events", size: "wide" },
  { id: "ten-6", src: "/Houses/tennis6.JPG", alt: "Table tennis player focusing on returning stroke", title: "Focused Return", category: "sports", size: "wide" },
  { id: "def-4", src: "/defenceday4.jpg", alt: "Defence Day celebration", title: "Defence Day", category: "activities", size: "wide" },
  { id: "sci-exp-1", src: "/Science Experiment/Sci-exper1.jpeg", alt: "Students conducting science experiment in laboratory", title: "Science Experiment", category: "academics", size: "wide" },
  { id: "camp-5", src: "/Camps/camp5.jpg", alt: "Students participating in camp activity 5", title: "Camping Adventure", category: "events", size: "md" },
  { id: "ten-7", src: "/Houses/tennis7.JPG", alt: "Fast-paced table tennis match point", title: "Match Point", category: "sports", size: "wide" },
  { id: "act-7", src: "/Activity-7.JPG", alt: "Students working attentively on individual clay projects outdoors", title: "Creative Expression Workshop", category: "activities", size: "wide" },
  { id: "sci-exp-2", src: "/Science Experiment/Sci-exper2.jpeg", alt: "Hands-on chemistry and biology experiment", title: "Hands-on Lab Experiment", category: "academics", size: "md" },
  { id: "art-comp-3", src: "/ArtCompetition/art3.jpg", alt: "Creative painting during school art contest", title: "Creative Painting Contest", category: "events", size: "tall" },
  { id: "ten-8", src: "/Houses/tennis8.JPG", alt: "Table tennis doubles / singles competition", title: "House Championship", category: "sports", size: "wide" },
  { id: "act-8", src: "/Activity-8.JPG", alt: "Student rolling clay coils using reference blueprint sheet", title: "Handcrafted Clay Designs", category: "activities", size: "tall" },
  { id: "sci-exp-3", src: "/Science Experiment/Sci-exper3.jpeg", alt: "Students working with science apparatus", title: "Scientific Discovery", category: "academics", size: "tall" },
  { id: "camp-6", src: "/Camps/camp6.jpg", alt: "Students participating in camp activity 6", title: "Camp Fun & Games", category: "events", size: "tall" },
  { id: "ten-9", src: "/Houses/tennis9.JPG", alt: "Student practicing forehand technique in table tennis", title: "Forehand Practice", category: "sports", size: "wide" },
  { id: "act-9", src: "/Activity-9.JPG", alt: "Students enjoying interactive clay crafting in the school garden", title: "Interactive Clay Crafting", category: "activities", size: "wide" },
  { id: "bts-4", src: "/BackToSchool/Image4.jpeg", alt: "Students enthusiastic about the new term", title: "New Academic Term", category: "academics", size: "wide" },
  { id: "7", src: "/pintober2.jpeg", alt: "certificate distribution", title: "Pintober Event", category: "events", size: "wide" },
  { id: "ten-10", src: "/Houses/tennis10.JPG", alt: "Table tennis match in progress at sports complex", title: "Sports Complex Match", category: "sports", size: "wide" },
  { id: "def-5", src: "/defenceday5.jpg", alt: "Defence Day celebration", title: "Defence Day", category: "activities", size: "wide" },
  { id: "sci-exp-4", src: "/Science Experiment/Sci-exper4.jpeg", alt: "Teacher demonstrating physics and chemistry reaction", title: "Lab Demonstration", category: "academics", size: "wide" },
  { id: "camp-7", src: "/Camps/camp7.jpg", alt: "Students participating in camp activity 7", title: "Leadership Camp Session", category: "events", size: "wide" },
  { id: "ten-11", src: "/Houses/tennis11.JPG", alt: "Table tennis tournament round", title: "Tournament Round", category: "sports", size: "wide" },
  { id: "act-10", src: "/Activity-10.JPG", alt: "Students wearing aprons crafting ceramic art outdoors", title: "Ceramics & Craft Studio", category: "activities", size: "md" },
  { id: "sci-exp-5", src: "/Science Experiment/Sci-exper5.jpeg", alt: "Students observing chemical reactions in beaker", title: "Chemical Reaction Lab", category: "academics", size: "md" },
  { id: "art-comp-4", src: "/ArtCompetition/art4.jpg", alt: "Students displaying artwork at art competition", title: "Art Exhibition & Contest", category: "events", size: "wide" },
  { id: "ten-12", src: "/Houses/tennis12.JPG", alt: "Students cheering during table tennis game", title: "Team Spirit", category: "sports", size: "wide" },
  { id: "act-11", src: "/dentistvisit1.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "wide" },
  { id: "sci-exp-6", src: "/Science Experiment/Sci-exper6.jpeg", alt: "Interactive science practical session", title: "Interactive Science Lab", category: "academics", size: "wide" },
  { id: "camp-8", src: "/Camps/camp8.jpg", alt: "Students participating in camp activity 8", title: "Nature Camp Outing", category: "events", size: "md" },
  { id: "ten-13", src: "/Houses/tennis13.JPG", alt: "Student preparing powerful shot in table tennis", title: "Power Shot", category: "sports", size: "wide" },
  { id: "act-12", src: "/dentistvisit2.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "wide" },
  { id: "bts-5", src: "/BackToSchool/Image5.jpg", alt: "Students gathering for morning school assembly", title: "Morning Assembly Greeting", category: "academics", size: "md" },
  { id: "hyd-1", src: "/hydolympic1.jpeg", alt: "Student at the Olympic games", title: "Olympic", category: "events", size: "wide" },
  { id: "ten-14", src: "/Houses/tennis14.JPG", alt: "High energy table tennis rally", title: "High Energy Rally", category: "sports", size: "wide" },
  { id: "act-13", src: "/dentistvisit3.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "wide" },
  { id: "sci-exp-7", src: "/Science Experiment/Sci-exper7.jpeg", alt: "Student measuring solutions in test tubes", title: "Precision Measurement", category: "academics", size: "tall" },
  { id: "camp-9", src: "/Camps/camp9.jpg", alt: "Students participating in camp activity 9", title: "Youth Camp Gathering", category: "events", size: "tall" },
  { id: "ten-15", src: "/Houses/tennis15.JPG", alt: "Table tennis sports house duel", title: "House Sports Duel", category: "sports", size: "wide" },
  { id: "def-3", src: "/defenceday3.jpg", alt: "Defence Day celebration", title: "Defence Day", category: "activities", size: "wide" },
  { id: "sci-exp-8", src: "/Science Experiment/Sci-exper8.jpeg", alt: "Group science experiment project", title: "Group Science Project", category: "academics", size: "wide" },
  { id: "art-comp-5", src: "/ArtCompetition/art5.jpg", alt: "Student focusing on sketching during competition", title: "Art Sketching Session", category: "events", size: "md" },
  { id: "ten-16", src: "/Houses/tennis16.JPG", alt: "Student celebrating table tennis point", title: "Winning Moment", category: "sports", size: "wide" },
  { id: "act-14", src: "/dentistvisit4.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "md" },
  { id: "sci-exp-9", src: "/Science Experiment/Sci-exper9.jpeg", alt: "Student analyzing experimental results", title: "Data Analysis & Science", category: "academics", size: "md" },
  { id: "camp-10", src: "/Camps/camp10.jpg", alt: "Students participating in camp activity 10", title: "Camp Activity Workshop", category: "events", size: "wide" },
  { id: "ten-17", src: "/Houses/tennis17.JPG", alt: "Table tennis championship finalists", title: "Finals Showdown", category: "sports", size: "wide" },
  { id: "act-15", src: "/dentistvisit5.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "wide" },
  { id: "bts-6", src: "/BackToSchool/Image6.jpg", alt: "Students engaging in back to school activities", title: "Back to School Activities", category: "academics", size: "wide" },
  { id: "hyd-2", src: "/hydolympic2.jpeg", alt: "Student at the Olympic games", title: "Olympic", category: "events", size: "wide" },
  { id: "ten-18", src: "/Houses/tennis18.JPG", alt: "Table tennis championship finalists", title: "Finals Showdown", category: "sports", size: "wide" },
  { id: "def-2", src: "/defenceday2.jpg", alt: "Defence Day celebration", title: "Defence Day", category: "activities", size: "wide" },
  { id: "sci-exp-10", src: "/Science Experiment/Sci-exper10.jpeg", alt: "Science laboratory practical testing", title: "Science Fair Practical", category: "academics", size: "wide" },
  { id: "camp-11", src: "/Camps/camp11.jpg", alt: "Students participating in camp activity 11", title: "Summer Camp Activity", category: "events", size: "md" },
  { id: "house-sport-1", src: "/Houses/sport1.jpg", alt: "Students participating in house sports competition 1", title: "House Sports Competition", category: "sports", size: "wide" },
  { id: "act-16", src: "/dentistvisit6.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "md" },
  { id: "sci-exp-11", src: "/Science Experiment/Sci-exper11.jpeg", alt: "Students wearing safety goggles in science class", title: "Lab Safety & Experiment", category: "academics", size: "tall" },
  { id: "art-comp-6", src: "/ArtCompetition/art6.jpg", alt: "Vibrant colors on canvas during art festival", title: "Canvas Painting Festival", category: "events", size: "wide" },
  { id: "house-sport-2", src: "/Houses/sport2.jpg", alt: "Students participating in house sports competition 2", title: "Athletic Sports Day", category: "sports", size: "md" },
  { id: "act-17", src: "/dentistvisit7.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "wide" },
  { id: "sci-exp-12", src: "/Science Experiment/Sci-exper12.jpeg", alt: "Students examining specimens under guidance", title: "Microscopic Exploration", category: "academics", size: "wide" },
  { id: "camp-12", src: "/Camps/camp12.jpg", alt: "Students participating in camp activity 12", title: "Outdoor Camp Excursion", category: "events", size: "tall" },
  { id: "house-sport-3", src: "/Houses/sport3.jpg", alt: "Students participating in house sports competition 3", title: "Sports House Championship", category: "sports", size: "tall" },
  { id: "def-6", src: "/defenceday6.jpg", alt: "Defence Day celebration", title: "Defence Day", category: "activities", size: "wide" },
  { id: "sci-exp-13", src: "/Science Experiment/Sci-exper13.jpeg", alt: "STEM science experiment activity", title: "STEM Science Workshop", category: "academics", size: "md" },
  { id: "hyd-3", src: "/hydolympic3.jpeg", alt: "Student at the Olympic games", title: "Olympic", category: "events", size: "wide" },
  { id: "house-sport-4", src: "/Houses/sport4.jpg", alt: "Students participating in house sports competition 4", title: "Inter-House Sports Tournament", category: "sports", size: "wide" },
  { id: "act-18", src: "/dentistvisit8.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "wide" },
  { id: "bts-7", src: "/BackToSchool/Image7.jpg", alt: "Student welcome ceremony and activities", title: "Student Welcome Ceremony", category: "academics", size: "tall" },
  { id: "camp-13", src: "/Camps/camp13.jpg", alt: "Students participating in camp activity 13", title: "Team Building Workshop", category: "events", size: "wide" },
  { id: "house-sport-5", src: "/Houses/sport5.jpg", alt: "Students participating in house sports competition 5", title: "Track & Field Competition", category: "sports", size: "md" },
  { id: "def-7", src: "/defenceday7.jpg", alt: "Defence Day celebration", title: "Defence Day", category: "activities", size: "wide" },
  { id: "sci-exp-14", src: "/Science Experiment/Sci-exper14.jpeg", alt: "Students recording observations during science lab", title: "Experimental Observations", category: "academics", size: "wide" },
  { id: "art-comp-7", src: "/ArtCompetition/art7.jpg", alt: "Students collaborating on group art project", title: "Group Art Showcase", category: "events", size: "tall" },
  { id: "house-sport-6", src: "/Houses/sport6.jpg", alt: "Students participating in house sports competition 6", title: "Team Sports Event", category: "sports", size: "tall" },
  { id: "def-1", src: "/defenceday1.jpg", alt: "Defence Day celebration", title: "Defence Day", category: "activities", size: "wide" },
  { id: "sci-exp-15", src: "/Science Experiment/Sci-exper15.jpeg", alt: "Student completing science experiment activity", title: "Practical Science Test", category: "academics", size: "wide" },
  { id: "camp-14", src: "/Camps/camp14.jpg", alt: "Students participating in camp activity 14", title: "Camp Exploration", category: "events", size: "md" },
  { id: "house-sport-7", src: "/Houses/sport7.jpg", alt: "Students participating in house sports competition 7", title: "Sports House Challenge", category: "sports", size: "wide" },
  { id: "act-19", src: "/dentistvisit9.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "wide" },
  { id: "sci-exp-16", src: "/Science Experiment/Sci-exper16.jpeg", alt: "Students collaborating on science research", title: "Science Lab Research", category: "academics", size: "wide" },
  { id: "hyd-4", src: "/hydolympic6.jpeg", alt: "Student at the Olympic games", title: "Olympic", category: "events", size: "wide" },
  { id: "house-sport-8", src: "/Houses/sport8.jpg", alt: "Students participating in house sports competition 8", title: "Student Athletes in Action", category: "sports", size: "md" },
  { id: "act-20", src: "/dentistvisit10.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "md" },
  { id: "bts-8", src: "/BackToSchool/Image8.jpg", alt: "Back to school campus excitement", title: "Back to School Celebration", category: "academics", size: "wide" },
  { id: "camp-15", src: "/Camps/camp15.jpg", alt: "Students participating in camp activity 15", title: "Camping Adventure", category: "events", size: "tall" },
  { id: "house-sport-9", src: "/Houses/sport9.jpg", alt: "Students participating in house sports competition 9", title: "Field Sports Meet", category: "sports", size: "tall" },
  { id: "act-21", src: "/dentistvisit11.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "wide" },
  { id: "13", src: "/ACADEMICS3.JPG", alt: "Student reading in the library aisle", title: "Quiet Corner", category: "academics", size: "wide" },
  { id: "art-comp-8", src: "/ArtCompetition/art8.jpg", alt: "Young artists displaying creative drawings", title: "Young Artists Showcase", category: "events", size: "wide" },
  { id: "house-sport-10", src: "/Houses/sport10.jpg", alt: "Students participating in house sports competition 10", title: "Annual House Sports", category: "sports", size: "wide" },
  { id: "act-22", src: "/dentistvisit12.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "md" },
  { id: "bts-9", src: "/BackToSchool/Image9.jpg", alt: "Classroom energy and academic focus", title: "Classroom Energy", category: "academics", size: "md" },
  { id: "camp-16", src: "/Camps/camp16.jpg", alt: "Students participating in camp activity 16", title: "Camp Fun & Games", category: "events", size: "wide" },
  { id: "house-sport-11", src: "/Houses/sport11.jpg", alt: "Students participating in house sports competition 11", title: "House Sports Competition", category: "sports", size: "md" },
  { id: "act-23", src: "/dentistvisit13.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "wide" },
  { id: "16", src: "/ACADEMICS4.JPG", alt: "Student thinking with a thoughtful expression", title: "Deep in Thought", category: "academics", size: "md" },
  { id: "hyd-5", src: "/hydolympic9.jpeg", alt: "Student at the Olympic games", title: "Olympic", category: "events", size: "wide" },
  { id: "house-sport-12", src: "/Houses/sport12.jpg", alt: "Students participating in house sports competition 12", title: "Athletic Sports Day", category: "sports", size: "tall" },
  { id: "act-24", src: "/dentistvisit14.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "md" },
  { id: "camp-17", src: "/Camps/camp17.jpg", alt: "Students participating in camp activity 17", title: "Leadership Camp Session", category: "events", size: "md" },
  { id: "house-sport-13", src: "/Houses/sport13.jpg", alt: "Students participating in house sports competition 13", title: "Sports House Championship", category: "sports", size: "wide" },
  { id: "def-9", src: "/defenceday9.jpg", alt: "Defence Day celebration", title: "Defence Day", category: "activities", size: "wide" },
  { id: "art-comp-9", src: "/ArtCompetition/art9.jpg", alt: "Art competition judging and display session", title: "Art Judging & Display", category: "events", size: "md" },
  { id: "house-sport-14", src: "/Houses/sport14.jpg", alt: "Students participating in house sports competition 14", title: "Inter-House Sports Tournament", category: "sports", size: "md" },
  { id: "act-25", src: "/dentistvisit15.jpg", alt: "Day spent with dentist", title: "Dentist Visit", category: "activities", size: "wide" },
  { id: "camp-18", src: "/Camps/camp18.jpg", alt: "Students participating in camp activity 18", title: "Nature Camp Outing", category: "events", size: "tall" },
  { id: "house-sport-15", src: "/Houses/sport15.jpg", alt: "Students participating in house sports competition 15", title: "Track & Field Competition", category: "sports", size: "tall" },
  { id: "mall-1", src: "/mall1.JPG", alt: "Students on an educational mall field trip", title: "Mall Field Trip", category: "activities", size: "wide" },
  { id: "hyd-6", src: "/hydolympic10.jpeg", alt: "Student at the Olympic games", title: "Olympic", category: "events", size: "wide" },
  { id: "house-sport-16", src: "/Houses/sport16.jpg", alt: "Students participating in house sports competition 16", title: "Team Sports Event", category: "sports", size: "wide" },
  { id: "mall-2", src: "/mall2.JPG", alt: "Students exploring the shopping mall", title: "Shopping Mall Visit", category: "activities", size: "md" },
  { id: "camp-19", src: "/Camps/camp19.jpg", alt: "Students participating in camp activity 19", title: "Youth Camp Gathering", category: "events", size: "wide" },
  { id: "house-sport-17", src: "/Houses/sport17.jpg", alt: "Students participating in house sports competition 17", title: "Sports House Challenge", category: "sports", size: "md" },
  { id: "mall-3", src: "/mall3.JPG", alt: "Group activity during mall visit", title: "Mall Group Activity", category: "activities", size: "tall" },
  { id: "art-comp-10", src: "/ArtCompetition/art10.jpg", alt: "Students presenting finished art pieces", title: "Art Competition Finals", category: "events", size: "wide" },
  { id: "house-sport-18", src: "/Houses/sport18.jpg", alt: "Students participating in house sports competition 18", title: "Student Athletes in Action", category: "sports", size: "tall" },
  { id: "mall-4", src: "/mall4.JPG", alt: "Students enjoying mall activity", title: "Field Trip Experience", category: "activities", size: "wide" },
  { id: "camp-20", src: "/Camps/camp20.jpg", alt: "Students participating in camp activity 20", title: "Camp Activity Workshop", category: "events", size: "md" },
  { id: "house-sport-19", src: "/Houses/sport19.jpg", alt: "Students participating in house sports competition 19", title: "Field Sports Meet", category: "sports", size: "wide" },
  { id: "mall-5", src: "/mall5.JPG", alt: "Interactive learning at the mall", title: "Mall Exploration", category: "activities", size: "md" },
  { id: "hyd-7", src: "/hydolympic13.jpeg", alt: "Student at the Olympic games", title: "Olympic", category: "events", size: "wide" },
  { id: "house-sport-20", src: "/Houses/sport20.jpg", alt: "Students participating in house sports competition 20", title: "Annual House Sports", category: "sports", size: "md" },
  { id: "mall-6", src: "/mall6.JPG", alt: "Students participating in mall event", title: "Mall Activity Session", category: "activities", size: "wide" },
  { id: "camp-21", src: "/Camps/camp21.jpg", alt: "Students participating in camp activity 21", title: "Summer Camp Activity", category: "events", size: "tall" },
  { id: "house-sport-21", src: "/Houses/sport21.jpg", alt: "Students participating in house sports competition 21", title: "House Sports Competition", category: "sports", size: "tall" },
  { id: "mall-7", src: "/mall7.JPG", alt: "Outdoor activity near the mall", title: "Mall Field Excursion", category: "activities", size: "tall" },
  { id: "art-comp-11", src: "/ArtCompetition/art11.jpg", alt: "Student working with watercolors at competition", title: "Watercolor Workshop", category: "events", size: "tall" },
  { id: "house-sport-22", src: "/Houses/sport22.jpg", alt: "Students participating in house sports competition 22", title: "Athletic Sports Day", category: "sports", size: "wide" },
  { id: "mall-8", src: "/mall8.JPG", alt: "Students gathering at the mall", title: "Educational Mall Tour", category: "activities", size: "wide" },
  { id: "camp-22", src: "/Camps/camp22.jpg", alt: "Students participating in camp activity 22", title: "Outdoor Camp Excursion", category: "events", size: "wide" },
  { id: "house-sport-23", src: "/Houses/sport23.jpg", alt: "Students participating in house sports competition 23", title: "Sports House Championship", category: "sports", size: "md" },
  { id: "mall-9", src: "/mall9.JPG", alt: "Class trip to the shopping center", title: "Shopping Center Excursion", category: "activities", size: "md" },
  { id: "hyd-8", src: "/hydolympic15.jpeg", alt: "Student at the Olympic games", title: "Olympic", category: "events", size: "wide" },
  { id: "house-sport-24", src: "/Houses/sport24.jpg", alt: "Students participating in house sports competition 24", title: "Inter-House Sports Tournament", category: "sports", size: "tall" },
  { id: "mall-10", src: "/mall10.JPG", alt: "Students at the mall courtyard", title: "Mall Outing", category: "activities", size: "wide" },
  { id: "camp-23", src: "/Camps/camp23.jpg", alt: "Students participating in camp activity 23", title: "Team Building Workshop", category: "events", size: "md" },
  { id: "house-sport-25", src: "/Houses/sport25.jpg", alt: "Students participating in house sports competition 25", title: "Track & Field Competition", category: "sports", size: "wide" },
  { id: "mall-11", src: "/mall11.JPG", alt: "Fun activities during mall visit", title: "Interactive Mall Outing", category: "activities", size: "tall" },
  { id: "art-comp-12", src: "/ArtCompetition/art12.jpg", alt: "Artistic expression during annual art event", title: "Artistic Expression Contest", category: "events", size: "wide" },
  { id: "house-sport-26", src: "/Houses/sport26.jpg", alt: "Students participating in house sports competition 26", title: "Team Sports Event", category: "sports", size: "md" },
  { id: "mall-12", src: "/mall12.JPG", alt: "Group photo at the mall", title: "Mall Group Tour", category: "activities", size: "wide" },
  { id: "camp-24", src: "/Camps/camp24.jpg", alt: "Students participating in camp activity 24", title: "Camp Exploration", category: "events", size: "tall" },
  { id: "house-sport-27", src: "/Houses/sport27.jpg", alt: "Students participating in house sports competition 27", title: "Sports House Challenge", category: "sports", size: "tall" },
  { id: "mall-13", src: "/mall13.JPG", alt: "Students spending time at the mall", title: "Mall Recreation Activity", category: "activities", size: "md" },
  { id: "22", src: "/ID4.JPG", alt: "Students at the annual fall festival", title: "Fall Festival", category: "events", size: "md" },
  { id: "house-sport-28", src: "/Houses/sport28.jpg", alt: "Students participating in house sports competition 28", title: "Student Athletes in Action", category: "sports", size: "wide" },
  { id: "mall-14", src: "/mall14.JPG", alt: "Students concluding the mall field trip", title: "Mall Trip Highlights", category: "activities", size: "wide" },
  { id: "camp-25", src: "/Camps/camp25.jpg", alt: "Students participating in camp activity 25", title: "Camping Adventure", category: "events", size: "wide" },
  { id: "house-sport-29", src: "/Houses/sport29.jpg", alt: "Students participating in house sports competition 29", title: "Field Sports Meet", category: "sports", size: "md" },
  { id: "def-8", src: "/defenceday8.jpg", alt: "Defence Day celebration", title: "Defence Day", category: "activities", size: "wide" },
  { id: "art-comp-13", src: "/ArtCompetition/art13.jpg", alt: "Students sketching portraits at art gala", title: "Portrait Sketching Contest", category: "events", size: "md" },
  { id: "house-sport-30", src: "/Houses/sport30.jpg", alt: "Students participating in house sports competition 30", title: "Annual House Sports", category: "sports", size: "tall" },
  { id: "camp-26", src: "/Camps/camp26.jpg", alt: "Students participating in camp activity 26", title: "Camp Fun & Games", category: "events", size: "md" },
  { id: "house-sport-31", src: "/Houses/sport31.jpg", alt: "Students participating in house sports competition 31", title: "House Sports Competition", category: "sports", size: "wide" },
  { id: "23", src: "/ID3.JPG", alt: "Student receiving an award on stage", title: "Honors Ceremony", category: "events", size: "md" },
  { id: "house-sport-32", src: "/Houses/sport32.jpg", alt: "Students participating in house sports competition 32", title: "Athletic Sports Day", category: "sports", size: "md" },
  { id: "camp-27", src: "/Camps/camp27.jpg", alt: "Students participating in camp activity 27", title: "Leadership Camp Session", category: "events", size: "tall" },
  { id: "house-sport-33", src: "/Houses/sport33.jpg", alt: "Students participating in house sports competition 33", title: "Sports House Championship", category: "sports", size: "tall" },
  { id: "art-comp-14", src: "/ArtCompetition/art14.jpg", alt: "Award winning artwork display", title: "Award Winning Art", category: "events", size: "wide" },
  { id: "house-sport-34", src: "/Houses/sport34.jpg", alt: "Students participating in house sports competition 34", title: "Inter-House Sports Tournament", category: "sports", size: "wide" },
  { id: "camp-28", src: "/Camps/camp28.jpg", alt: "Students participating in camp activity 28", title: "Nature Camp Outing", category: "events", size: "wide" },
  { id: "house-sport-35", src: "/Houses/sport35.jpg", alt: "Students participating in house sports competition 35", title: "Track & Field Competition", category: "sports", size: "md" },
  { id: "camp-29", src: "/Camps/camp29.jpg", alt: "Students participating in camp activity 29", title: "Youth Camp Gathering", category: "events", size: "md" },
  { id: "house-sport-36", src: "/Houses/sport36.jpg", alt: "Students participating in house sports competition 36", title: "Team Sports Event", category: "sports", size: "tall" },
  { id: "art-comp-15", src: "/ArtCompetition/art15.jpg", alt: "Student putting finishing touches on painting", title: "Final Touches on Canvas", category: "events", size: "tall" },
  { id: "house-sport-37", src: "/Houses/sport37.jpg", alt: "Students participating in house sports competition 37", title: "Sports House Challenge", category: "sports", size: "wide" },
  { id: "camp-30", src: "/Camps/camp30.jpg", alt: "Students participating in camp activity 30", title: "Camp Activity Workshop", category: "events", size: "tall" },
  { id: "house-sport-38", src: "/Houses/sport38.jpg", alt: "Students participating in house sports competition 38", title: "Student Athletes in Action", category: "sports", size: "md" },
  { id: "camp-31", src: "/Camps/camp31.jpg", alt: "Students participating in camp activity 31", title: "Summer Camp Activity", category: "events", size: "wide" },
  { id: "house-sport-39", src: "/Houses/sport39.jpg", alt: "Students participating in house sports competition 39", title: "Field Sports Meet", category: "sports", size: "tall" },
  { id: "art-comp-16", src: "/ArtCompetition/art16.jpg", alt: "Students engaged in creative drawing competition", title: "Creative Drawing Event", category: "events", size: "wide" },
  { id: "house-sport-40", src: "/Houses/sport40.jpg", alt: "Students participating in house sports competition 40", title: "Annual House Sports", category: "sports", size: "wide" },
  { id: "camp-32", src: "/Camps/camp32.jpg", alt: "Students participating in camp activity 32", title: "Outdoor Camp Excursion", category: "events", size: "md" },
  { id: "house-sport-41", src: "/Houses/sport41.jpg", alt: "Students participating in house sports competition 41", title: "House Sports Competition", category: "sports", size: "md" },
  { id: "camp-33", src: "/Camps/camp33.jpg", alt: "Students participating in camp activity 33", title: "Team Building Workshop", category: "events", size: "tall" },
  { id: "art-comp-17", src: "/ArtCompetition/art17.jpg", alt: "Art exhibition hall with student paintings", title: "Student Art Exhibition", category: "events", size: "md" },
  { id: "camp-34", src: "/Camps/camp34.jpg", alt: "Students participating in camp activity 34", title: "Camp Exploration", category: "events", size: "wide" },
  { id: "camp-35", src: "/Camps/camp35.jpg", alt: "Students participating in camp activity 35", title: "Camping Adventure", category: "events", size: "md" },
  { id: "art-comp-18", src: "/ArtCompetition/art18.jpg", alt: "Young painters working on poster designs", title: "Poster Design Contest", category: "events", size: "wide" },
  { id: "camp-36", src: "/Camps/camp36.jpg", alt: "Students participating in camp activity 36", title: "Camp Fun & Games", category: "events", size: "tall" },
  { id: "camp-37", src: "/Camps/camp37.jpg", alt: "Students participating in camp activity 37", title: "Leadership Camp Session", category: "events", size: "wide" },
  { id: "art-comp-19", src: "/ArtCompetition/art19.jpg", alt: "Fine arts showcase during school competition", title: "Fine Arts Showcase", category: "events", size: "tall" },
  { id: "camp-38", src: "/Camps/camp38.jpg", alt: "Students participating in camp activity 38", title: "Nature Camp Outing", category: "events", size: "md" },
  { id: "camp-39", src: "/Camps/camp39.jpg", alt: "Students participating in camp activity 39", title: "Youth Camp Gathering", category: "events", size: "tall" },
  { id: "art-comp-20", src: "/ArtCompetition/art20.jpg", alt: "Students painting colorful themes on easel", title: "Theme Painting Contest", category: "events", size: "wide" },
  { id: "camp-40", src: "/Camps/camp40.jpg", alt: "Students participating in camp activity 40", title: "Camp Activity Workshop", category: "events", size: "wide" },
  { id: "camp-41", src: "/Camps/camp41.jpg", alt: "Students participating in camp activity 41", title: "Summer Camp Activity", category: "events", size: "md" },
  { id: "art-comp-21", src: "/ArtCompetition/art21.jpg", alt: "Students interacting at art exhibition booth", title: "Art Exhibition Booth", category: "events", size: "md" },
  { id: "camp-42", src: "/Camps/camp42.jpg", alt: "Students participating in camp activity 42", title: "Outdoor Camp Excursion", category: "events", size: "tall" },
  { id: "camp-43", src: "/Camps/camp43.jpg", alt: "Students participating in camp activity 43", title: "Team Building Workshop", category: "events", size: "wide" },
  { id: "art-comp-22", src: "/ArtCompetition/art22.jpg", alt: "Student drawing nature scene during competition", title: "Nature Painting Contest", category: "events", size: "wide" },
  { id: "camp-44", src: "/Camps/camp44.jpg", alt: "Students participating in camp activity 44", title: "Camp Exploration", category: "events", size: "md" },
  { id: "camp-45", src: "/Camps/camp45.jpg", alt: "Students participating in camp activity 45", title: "Camping Adventure", category: "events", size: "tall" },
  { id: "art-comp-23", src: "/ArtCompetition/art23.jpg", alt: "Art teachers evaluating student paintings", title: "Art Evaluation & Judging", category: "events", size: "tall" },
  { id: "camp-46", src: "/Camps/camp46.jpg", alt: "Students participating in camp activity 46", title: "Camp Fun & Games", category: "events", size: "wide" },
  { id: "camp-47", src: "/Camps/camp47.jpg", alt: "Students participating in camp activity 47", title: "Leadership Camp Session", category: "events", size: "md" },
  { id: "art-comp-24", src: "/ArtCompetition/art24.jpg", alt: "Creative oil painting by student finalist", title: "Finalist Oil Painting", category: "events", size: "wide" },
  { id: "camp-48", src: "/Camps/camp48.jpg", alt: "Students participating in camp activity 48", title: "Nature Camp Outing", category: "events", size: "tall" },
  { id: "camp-49", src: "/Camps/camp49.jpg", alt: "Students participating in camp activity 49", title: "Youth Camp Gathering", category: "events", size: "wide" },
  { id: "art-comp-25", src: "/ArtCompetition/art25.jpg", alt: "Student sketching with charcoal during art event", title: "Charcoal Sketching Event", category: "events", size: "md" },
  { id: "camp-50", src: "/Camps/camp50.jpg", alt: "Students participating in camp activity 50", title: "Camp Activity Workshop", category: "events", size: "md" },
  { id: "camp-51", src: "/Camps/camp51.jpg", alt: "Students participating in camp activity 51", title: "Summer Camp Activity", category: "events", size: "tall" },
  { id: "art-comp-26", src: "/ArtCompetition/art26.jpg", alt: "Art competition participants with certificates", title: "Art Certificate Distribution", category: "events", size: "wide" },
  { id: "camp-52", src: "/Camps/camp52.jpg", alt: "Students participating in camp activity 52", title: "Outdoor Camp Excursion", category: "events", size: "wide" },
  { id: "camp-53", src: "/Camps/camp53.jpg", alt: "Students participating in camp activity 53", title: "Team Building Workshop", category: "events", size: "md" },
  { id: "art-comp-27", src: "/ArtCompetition/art27.jpg", alt: "Student artwork displayed in gallery hall", title: "Gallery Art Display", category: "events", size: "tall" },
  { id: "camp-54", src: "/Camps/camp54.jpg", alt: "Students participating in camp activity 54", title: "Camp Exploration", category: "events", size: "tall" },
  { id: "camp-55", src: "/Camps/camp55.jpg", alt: "Students participating in camp activity 55", title: "Camping Adventure", category: "events", size: "wide" },
  { id: "art-comp-28", src: "/ArtCompetition/art28.jpg", alt: "Acrylic painting competition session", title: "Acrylic Painting Session", category: "events", size: "wide" },
  { id: "camp-56", src: "/Camps/camp56.jpg", alt: "Students participating in camp activity 56", title: "Camp Fun & Games", category: "events", size: "md" },
  { id: "camp-57", src: "/Camps/camp57.jpg", alt: "Students participating in camp activity 57", title: "Leadership Camp Session", category: "events", size: "tall" },
  { id: "art-comp-29", src: "/ArtCompetition/art29.jpg", alt: "Student showing completed artwork", title: "Completed Canvas Showcase", category: "events", size: "md" },
  { id: "camp-58", src: "/Camps/camp58.jpg", alt: "Students participating in camp activity 58", title: "Nature Camp Outing", category: "events", size: "wide" },
  { id: "camp-59", src: "/Camps/camp59.jpg", alt: "Students participating in camp activity 59", title: "Youth Camp Gathering", category: "events", size: "md" },
  { id: "art-comp-30", src: "/ArtCompetition/art30.jpg", alt: "Junior art competition participants working", title: "Junior Art Contest", category: "events", size: "wide" },
  { id: "camp-60", src: "/Camps/camp60.jpg", alt: "Students participating in camp activity 60", title: "Camp Activity Workshop", category: "events", size: "tall" },
  { id: "camp-61", src: "/Camps/camp61.jpg", alt: "Students participating in camp activity 61", title: "Summer Camp Activity", category: "events", size: "wide" },
  { id: "art-comp-31", src: "/ArtCompetition/art31.jpg", alt: "Senior art competition painting session", title: "Senior Art Championship", category: "events", size: "tall" },
  { id: "camp-62", src: "/Camps/camp62.jpg", alt: "Students participating in camp activity 62", title: "Outdoor Camp Excursion", category: "events", size: "md" },
  { id: "camp-63", src: "/Camps/camp63.jpg", alt: "Students participating in camp activity 63", title: "Team Building Workshop", category: "events", size: "tall" },
  { id: "art-comp-32", src: "/ArtCompetition/art32.jpg", alt: "Students holding their paintings after event", title: "Art Contest Winners", category: "events", size: "wide" },
  { id: "camp-64", src: "/Camps/camp64.jpg", alt: "Students participating in camp activity 64", title: "Camp Exploration", category: "events", size: "wide" },
  { id: "camp-65", src: "/Camps/camp65.jpg", alt: "Students participating in camp activity 65", title: "Camping Adventure", category: "events", size: "md" },
  { id: "art-comp-33", src: "/ArtCompetition/art33.jpg", alt: "Students painting together in art courtyard", title: "Courtyard Art Contest", category: "events", size: "md" },
  { id: "camp-66", src: "/Camps/camp66.jpg", alt: "Students participating in camp activity 66", title: "Camp Fun & Games", category: "events", size: "tall" },
  { id: "camp-67", src: "/Camps/camp67.jpg", alt: "Students participating in camp activity 67", title: "Leadership Camp Session", category: "events", size: "wide" },
  { id: "art-comp-34", src: "/ArtCompetition/art34.jpg", alt: "Mixed media art creation during competition", title: "Mixed Media Art Event", category: "events", size: "wide" },
  { id: "camp-68", src: "/Camps/camp68.jpg", alt: "Students participating in camp activity 68", title: "Nature Camp Outing", category: "events", size: "md" },
  { id: "camp-69", src: "/Camps/camp69.jpg", alt: "Students participating in camp activity 69", title: "Youth Camp Gathering", category: "events", size: "tall" },
  { id: "art-comp-35", src: "/ArtCompetition/art35.jpg", alt: "Students displaying abstract paintings", title: "Abstract Art Exhibition", category: "events", size: "tall" },
  { id: "camp-70", src: "/Camps/camp70.jpg", alt: "Students participating in camp activity 70", title: "Camp Activity Workshop", category: "events", size: "wide" },
  { id: "camp-71", src: "/Camps/camp71.jpg", alt: "Students participating in camp activity 71", title: "Summer Camp Activity", category: "events", size: "md" },
  { id: "art-comp-36", src: "/ArtCompetition/art36.jpg", alt: "Art competition opening ceremony", title: "Art Competition Opening", category: "events", size: "wide" },
  { id: "camp-72", src: "/Camps/camp72.jpg", alt: "Students participating in camp activity 72", title: "Outdoor Camp Excursion", category: "events", size: "tall" },
  { id: "camp-73", src: "/Camps/camp73.jpg", alt: "Students participating in camp activity 73", title: "Team Building Workshop", category: "events", size: "wide" },
  { id: "art-comp-37", src: "/ArtCompetition/art37.jpg", alt: "Student working diligently on art project", title: "Art Project Session", category: "events", size: "md" },
  { id: "camp-74", src: "/Camps/camp74.jpg", alt: "Students participating in camp activity 74", title: "Camp Exploration", category: "events", size: "md" },
  { id: "camp-75", src: "/Camps/camp75.jpg", alt: "Students participating in camp activity 75", title: "Camping Adventure", category: "events", size: "tall" },
  { id: "art-comp-38", src: "/ArtCompetition/art38.jpg", alt: "Creative artwork on display at annual fest", title: "Annual Fest Art Gallery", category: "events", size: "wide" },
  { id: "camp-76", src: "/Camps/camp76.jpg", alt: "Students participating in camp activity 76", title: "Camp Fun & Games", category: "events", size: "wide" },
  { id: "camp-77", src: "/Camps/camp77.jpg", alt: "Students participating in camp activity 77", title: "Leadership Camp Session", category: "events", size: "md" },
  { id: "art-comp-39", src: "/ArtCompetition/art39.jpg", alt: "Student artist posing next to painting", title: "Student Artist Spotlight", category: "events", size: "tall" },
  { id: "camp-78", src: "/Camps/camp78.jpg", alt: "Students participating in camp activity 78", title: "Nature Camp Outing", category: "events", size: "tall" },
  { id: "camp-79", src: "/Camps/camp79.jpg", alt: "Students participating in camp activity 79", title: "Youth Camp Gathering", category: "events", size: "wide" },
  { id: "art-comp-40", src: "/ArtCompetition/art40.jpg", alt: "Group photo of art competition participants", title: "Art Competition Participants", category: "events", size: "wide" },
  { id: "camp-80", src: "/Camps/camp80.jpg", alt: "Students participating in camp activity 80", title: "Camp Activity Workshop", category: "events", size: "md" },
  { id: "camp-81", src: "/Camps/camp81.jpg", alt: "Students participating in camp activity 81", title: "Summer Camp Activity", category: "events", size: "tall" },
  { id: "camp-82", src: "/Camps/camp82.jpg", alt: "Students participating in camp activity 82", title: "Outdoor Camp Excursion", category: "events", size: "wide" },
  { id: "camp-83", src: "/Camps/camp83.jpg", alt: "Students participating in camp activity 83", title: "Team Building Workshop", category: "events", size: "md" },
  { id: "camp-84", src: "/Camps/camp84.jpg", alt: "Students participating in camp activity 84", title: "Camp Exploration", category: "events", size: "tall" },
  { id: "camp-85", src: "/Camps/camp85.jpg", alt: "Students participating in camp activity 85", title: "Camping Adventure", category: "events", size: "wide" },
  { id: "camp-86", src: "/Camps/camp86.jpg", alt: "Students participating in camp activity 86", title: "Camp Fun & Games", category: "events", size: "md" },
  { id: "camp-87", src: "/Camps/camp87.jpg", alt: "Students participating in camp activity 87", title: "Leadership Camp Session", category: "events", size: "tall" },
  { id: "camp-88", src: "/Camps/camp88.jpg", alt: "Students participating in camp activity 88", title: "Nature Camp Outing", category: "events", size: "wide" },
  { id: "camp-89", src: "/Camps/camp89.jpg", alt: "Students participating in camp activity 89", title: "Youth Camp Gathering", category: "events", size: "md" },
  { id: "camp-90", src: "/Camps/camp90.jpg", alt: "Students participating in camp activity 90", title: "Camp Activity Workshop", category: "events", size: "tall" },
  { id: "camp-91", src: "/Camps/camp91.jpg", alt: "Students participating in camp activity 91", title: "Summer Camp Activity", category: "events", size: "wide" },
  { id: "camp-92", src: "/Camps/camp92.jpg", alt: "Students participating in camp activity 92", title: "Outdoor Camp Excursion", category: "events", size: "md" },
  { id: "camp-93", src: "/Camps/camp93.jpg", alt: "Students participating in camp activity 93", title: "Team Building Workshop", category: "events", size: "tall" },
  { id: "camp-94", src: "/Camps/camp94.jpg", alt: "Students participating in camp activity 94", title: "Camp Exploration", category: "events", size: "wide" },
  { id: "camp-95", src: "/Camps/camp95.jpg", alt: "Students participating in camp activity 95", title: "Camping Adventure", category: "events", size: "md" },
  { id: "camp-96", src: "/Camps/camp96.jpg", alt: "Students participating in camp activity 96", title: "Camp Fun & Games", category: "events", size: "tall" },
  { id: "camp-97", src: "/Camps/camp97.jpg", alt: "Students participating in camp activity 97", title: "Leadership Camp Session", category: "events", size: "wide" },
  { id: "camp-98", src: "/Camps/camp98.jpg", alt: "Students participating in camp activity 98", title: "Nature Camp Outing", category: "events", size: "md" },
  { id: "camp-99", src: "/Camps/camp99.jpg", alt: "Students participating in camp activity 99", title: "Youth Camp Gathering", category: "events", size: "tall" },
  { id: "camp-100", src: "/Camps/camp100.jpg", alt: "Students participating in camp activity 100", title: "Camp Activity Workshop", category: "events", size: "wide" },
  { id: "camp-101", src: "/Camps/camp101.jpg", alt: "Students participating in camp activity 101", title: "Summer Camp Activity", category: "events", size: "md" },
  { id: "camp-102", src: "/Camps/camp102.jpg", alt: "Students participating in camp activity 102", title: "Outdoor Camp Excursion", category: "events", size: "tall" },
  { id: "camp-103", src: "/Camps/camp103.jpg", alt: "Students participating in camp activity 103", title: "Team Building Workshop", category: "events", size: "wide" },
  { id: "camp-104", src: "/Camps/camp104.jpg", alt: "Students participating in camp activity 104", title: "Camp Exploration", category: "events", size: "md" },
  { id: "camp-105", src: "/Camps/camp105.jpg", alt: "Students participating in camp activity 105", title: "Camping Adventure", category: "events", size: "tall" },
  { id: "camp-106", src: "/Camps/camp106.jpg", alt: "Students participating in camp activity 106", title: "Camp Fun & Games", category: "events", size: "wide" },
  { id: "camp-107", src: "/Camps/camp107.jpg", alt: "Students participating in camp activity 107", title: "Leadership Camp Session", category: "events", size: "md" },
  { id: "camp-108", src: "/Camps/camp108.jpg", alt: "Students participating in camp activity 108", title: "Nature Camp Outing", category: "events", size: "tall" },
  { id: "camp-109", src: "/Camps/camp109.jpg", alt: "Students participating in camp activity 109", title: "Youth Camp Gathering", category: "events", size: "wide" },
  { id: "camp-110", src: "/Camps/camp110.jpg", alt: "Students participating in camp activity 110", title: "Camp Activity Workshop", category: "events", size: "md" },
  { id: "camp-111", src: "/Camps/camp111.jpg", alt: "Students participating in camp activity 111", title: "Summer Camp Activity", category: "events", size: "tall" },
  { id: "camp-112", src: "/Camps/camp112.jpg", alt: "Students participating in camp activity 112", title: "Outdoor Camp Excursion", category: "events", size: "wide" },
  { id: "camp-113", src: "/Camps/camp113.jpg", alt: "Students participating in camp activity 113", title: "Team Building Workshop", category: "events", size: "md" },
  { id: "camp-114", src: "/Camps/camp114.jpg", alt: "Students participating in camp activity 114", title: "Camp Exploration", category: "events", size: "tall" },
  { id: "camp-115", src: "/Camps/camp115.jpg", alt: "Students participating in camp activity 115", title: "Camping Adventure", category: "events", size: "wide" },
  { id: "camp-116", src: "/Camps/camp116.jpg", alt: "Students participating in camp activity 116", title: "Camp Fun & Games", category: "events", size: "md" },
  { id: "camp-117", src: "/Camps/camp117.jpg", alt: "Students participating in camp activity 117", title: "Leadership Camp Session", category: "events", size: "tall" },
  { id: "camp-118", src: "/Camps/camp118.jpg", alt: "Students participating in camp activity 118", title: "Nature Camp Outing", category: "events", size: "wide" }
];

const categories = [
  { id: "all", label: "All Memories", icon: Images },
  { id: "academics", label: "Academics", icon: GraduationCap },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "activities", label: "Activities", icon: Palette },
  { id: "campus", label: "Campus", icon: Building2 },
  { id: "events", label: "Events", icon: CalendarDays },
];

const categoryMeta = {
  academics: { label: "Academics", color: SKY },
  sports: { label: "Sports", color: "#E24C4C" },
  activities: { label: "Activities", color: "#F08A2B" },
  campus: { label: "Campus", color: "#4FAE6E" },
  events: { label: "Events", color: "#8A63D2" },
};

const aspectMap = {
  sm: { cls: "aspect-[4/5]", ratio: 4 / 5 },
  md: { cls: "aspect-[3/4]", ratio: 3 / 4 },
  lg: { cls: "aspect-[5/4]", ratio: 5 / 4 },
  tall: { cls: "aspect-[3/5]", ratio: 3 / 5 },
  wide: { cls: "aspect-[16/10]", ratio: 16 / 10 },
};

const PAGE_SIZE = 8;

/* ---------------------------------------------------------
   Hero
--------------------------------------------------------- */
function GalleryHero() {
  return (
    <section className="relative w-full overflow-hidden flex items-center min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]" style={{ background: NAVY }}>
      {/* dot grid texture, top-left */}
      <div
        className="absolute left-0 top-0 h-full w-full opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* school photo, right half, blended into navy */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/school-hero-banner/1600/900')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      {/* mobile fallback: fixed backgrounds behave inconsistently on touch devices, so use a static cover image there */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/school-hero-banner/1600/900')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #020816 0%, rgba(2,8,22,0.88) 20%, rgba(2,8,22,0.55) 48%, rgba(2,8,22,0.7) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(2,8,22,0.15) 0%, rgba(2,8,22,0.35) 100%)" }}
      />

      {/* decorative arc, top-right */}
      <svg
        className="pointer-events-none absolute -right-16 -top-24 hidden h-72 w-72 sm:block lg:h-96 lg:w-96"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="199" stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.55" />
      </svg>

      <div className="relative z-10 w-full px-6 py-12 sm:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8" style={{ background: GOLD }} />
            <span
              className="text-[9.9px] font-bold uppercase tracking-[0.22em]"
              style={{ color: GOLD, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
            >
              Around the Campus
            </span>
          </div>

          <h1
            className="font-extrabold text-white"
            style={{
              fontSize: "clamp(43.2px, 5.85vw, 73.8px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
            }}
          >
            Gallery
          </h1>

          <div className="mb-6 mt-5 h-[3px] w-16" style={{ background: SKY }} />

          <p className="max-w-sm text-[13.5px] leading-relaxed text-white/80">
            Capturing the moments, memories and milestones that make our school special.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Section header
--------------------------------------------------------- */
function GalleryHeader() {
  return (
    <motion.div
      className="mb-10 mt-16 text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        {/* <span className="h-px w-8" style={{ background: NAVY }} />
        <span
          className="text-[11px] font-extrabold uppercase tracking-[0.2em]"
          style={{ color: NAVY, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
        >
          Around the Campus
        </span>
        <span className="h-px w-8" style={{ background: NAVY }} /> */}
      </div>
      <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-tight" style={{ color: NAVY }}>
        School <span style={{ color: GOLD }}>Gallery</span>
      </h2>
      <div className="mx-auto mt-3 h-1 w-16" style={{ background: SKY }} />
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Filters
--------------------------------------------------------- */
function GalleryFilters({ active, onChange }) {
  return (
    <div className="flex justify-center px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 border border-slate-100 bg-white p-2 shadow-[0_8px_30px_-12px_rgba(2,8,22,0.15)]">
        {categories.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors duration-300 cursor-pointer"
              style={{
                color: isActive ? "#ffffff" : "#475569",
                background: isActive ? NAVY : "transparent",
              }}
            >
              <Icon size={15} />
              {label}

              {isActive && (
                <motion.span
                  layoutId="filterUnderline"
                  className="absolute -bottom-[6px] left-1/2 h-[3px] w-6 -translate-x-1/2"
                  style={{ background: GOLD }}
                  transition={{
                    type: "spring",
                    stiffness: 120, // Speed ko slow karne ke liye (pehle 300 tha)
                    damping: 20,    // Smoothness control karne ke liye
                    delay: 0.15     // Click ke baad 0.15 seconds ka halt/delay dene ke liye
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Card
--------------------------------------------------------- */
function GalleryCard({ item, onClick, index, stretch }) {
  const meta = categoryMeta[item.category];
  return (
    <motion.button
      onClick={onClick}
      type="button"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4) }}
      className={`group relative block w-full cursor-pointer overflow-hidden bg-slate-100 shadow-[0_10px_30px_-14px_rgba(2,8,22,0.35)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-14px_rgba(2,8,22,0.45)] ${stretch ? "min-h-0 flex-1" : aspectMap[item.size].cls
        }`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[500ms] ease-out group-hover:scale-[1.08]"
      />
      {/* sky-blue tinted gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(2,8,22,0.88) 0%, rgba(96,186,220,0.28) 55%, rgba(96,186,220,0.05) 100%)",
        }}
      />
      <span
        className="absolute left-3.5 top-3.5 -translate-y-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ background: meta.color }}
      >
        {meta.label}
      </span>
      <span
        className="absolute right-3.5 top-3.5 flex h-9 w-9 -translate-y-1.5 items-center justify-center opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ background: GOLD, color: NAVY }}
      >
        <Eye size={16} />
      </span>
      <p className="absolute bottom-4 left-4 right-4 translate-y-2 text-left text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {item.title}
      </p>
    </motion.button>
  );
}

/* ---------------------------------------------------------
   Masonry grid
--------------------------------------------------------- */
function useColumnCount() {
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w < 640) setCols(1);
      else if (w < 1024) setCols(2);
      else if (w < 1280) setCols(3);
      else setCols(4);
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return cols;
}

// Greedy shortest-column placement: every new card goes into whichever
// column currently has the least accumulated height, so columns stay
// balanced and no column is left short with a gap at the bottom.
function distributeMasonry(items, colCount) {
  const columns = Array.from({ length: colCount }, () => []);
  const heights = Array(colCount).fill(0);
  items.forEach((item) => {
    let shortest = 0;
    for (let i = 1; i < colCount; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(item);
    heights[shortest] += 1 / aspectMap[item.size].ratio;
  });
  return columns;
}

function GalleryGrid({ items, onSelect }) {
  const cols = useColumnCount();
  const columns = useMemo(() => distributeMasonry(items, cols), [items, cols]);

  return (
    <div className="flex items-stretch gap-5">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-1 flex-col gap-5">
          {column.map((item, itemIndex) => {
            const globalIndex = items.indexOf(item);
            return (
              <GalleryCard
                key={item.id}
                item={item}
                index={globalIndex}
                stretch={itemIndex === column.length - 1}
                onClick={() => onSelect(globalIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Lightbox modal (masonry gallery)
--------------------------------------------------------- */
function GalleryModal({ items, activeIndex, onClose, onNavigate }) {
  const isOpen = activeIndex !== null;
  const item = isOpen ? items[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goPrev, goNext, onClose]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md"
          style={{ background: "rgba(2,8,22,0.92)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center bg-white/10 text-white transition-colors duration-300 hover:text-[#020816]"
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous image"
            className="absolute left-3 flex h-11 w-11 items-center justify-center bg-white/10 text-white transition-colors duration-300 hover:text-[#020816] sm:left-6"
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <ChevronLeft size={22} />
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-[calc(100vw-3.5rem)] sm:max-w-3xl overflow-hidden"
          >
            <img src={item.src} alt={item.alt} className="max-h-[80vh] w-auto object-contain" />
            <div className="flex items-center justify-between px-5 py-3" style={{ background: NAVY }}>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs font-mono uppercase tracking-widest text-white/50">
                {activeIndex + 1} / {items.length}
              </p>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next image"
            className="absolute right-3 flex h-11 w-11 items-center justify-center bg-white/10 text-white transition-colors duration-300 hover:text-[#020816] sm:right-6"
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <ChevronRight size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------
   Load more
--------------------------------------------------------- */
function LoadMoreButton({ hasMore, showLess, onLoadMore, onLoadLess }) {
  if (!hasMore && !showLess) return null;
  return (
    <div className="flex justify-center gap-4 pb-20 pt-10">
      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          className="group relative overflow-hidden px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white  transition-colors duration-300"
          style={{ background: NAVY }}
        >
          <span
            className="absolute inset-0 -z-0 w-0 transition-all duration-400 group-hover:w-full"
            style={{ background: SKY }}
          />
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#020816]">
            Load More Photos
          </span>
        </button>
      )}
      {showLess && (
        <button
          type="button"
          onClick={onLoadLess}
          className="group relative cursor-pointer overflow-hidden px-8 py-3.5 text-sm font-semibold transition-colors duration-300"
          style={{ color: NAVY, border: `1.5px solid ${NAVY}` }}
        >
          <span
            className="absolute inset-0 -z-0 w-0 transition-all duration-400 group-hover:w-full"
            style={{ background: GOLD }}
          />
          <span className="relative z-10">Show Less</span>
        </button>
      )}
    </div>
  );
}

/* ================================================================
   HOUSES SECTION — data, lightbox, previews and house sections
================================================================ */
const HOUSES = [
  {
    id: "peridots",
    name: "House of Peridots",
    gem: "Peridot",
    tagline: "Growth • Curiosity • Resilience",
    description:
      "Peridots channel their energy into inquiry, championing curiosity in every classroom, lab and field they enter.",
    color: "#6E9B3A",
    tint: "#EEF5E4",
    icon: "/Peridot.png",
    images: [
      { id: "per-1", src: "https://picsum.photos/seed/peridot-house-1/900/700", caption: "House assembly", category: "student-life" },
      { id: "per-2", src: "https://picsum.photos/seed/peridot-house-2/900/700", caption: "Science fair build", category: "events" },
      { id: "per-3", src: "https://picsum.photos/seed/peridot-house-3/900/700", caption: "Inter-house football", category: "sports" },
      { id: "per-4", src: "https://picsum.photos/seed/peridot-house-4/900/700", caption: "Green wing corridor", category: "facilities" },
      { id: "per-5", src: "https://picsum.photos/seed/peridot-house-5/900/700", caption: "Study circle", category: "student-life" },
      { id: "per-6", src: "https://picsum.photos/seed/peridot-house-6/900/700", caption: "Annual prize giving", category: "events" },
    ],
  },
  {
    id: "celestites",
    name: "House of Celestites",
    gem: "Celestite",
    tagline: "Calm • Clarity • Cooperation",
    description:
      "Celestites bring a steady, collaborative spirit to everything from debate finals to the quiet corners of the library.",
    color: "#4E8FB8",
    tint: "#E7F1F7",
    icon: "/Celestite.png",
    images: [
      { id: "cel-1", src: "https://picsum.photos/seed/celestite-house-1/900/700", caption: "Debate finals", category: "events" },
      { id: "cel-2", src: "https://picsum.photos/seed/celestite-house-2/900/700", caption: "Basketball practice", category: "sports" },
      { id: "cel-3", src: "https://picsum.photos/seed/celestite-house-3/900/700", caption: "Blue wing library nook", category: "facilities" },
      { id: "cel-4", src: "https://picsum.photos/seed/celestite-house-4/900/700", caption: "House orientation", category: "student-life" },
      { id: "cel-5", src: "https://picsum.photos/seed/celestite-house-5/900/700", caption: "Robotics workshop", category: "events" },
      { id: "cel-6", src: "https://picsum.photos/seed/celestite-house-6/900/700", caption: "Morning house huddle", category: "student-life" },
    ],
  },
  {
    id: "garnets",
    name: "House of Garnets",
    gem: "Garnet",
    tagline: "Courage • Drive • Discipline",
    description:
      "Garnets lead with grit — first on the track, loudest at the finals, and always first to volunteer.",
    color: "#A13D3D",
    tint: "#F6E7E5",
    icon: "/Garnet.jpg",
    images: [
      { id: "gar-1", src: "https://picsum.photos/seed/garnet-house-1/900/700", caption: "Track & field day", category: "sports" },
      { id: "gar-2", src: "https://picsum.photos/seed/garnet-house-2/900/700", caption: "Debate & MUN expo", category: "events" },
      { id: "gar-3", src: "https://picsum.photos/seed/garnet-house-3/900/700", caption: "Red wing common room", category: "facilities" },
      { id: "gar-4", src: "https://picsum.photos/seed/garnet-house-4/900/700", caption: "Cricket finals", category: "sports" },
      { id: "gar-5", src: "https://picsum.photos/seed/garnet-house-5/900/700", caption: "House captain briefing", category: "student-life" },
      { id: "gar-6", src: "https://picsum.photos/seed/garnet-house-6/900/700", caption: "Founders' day march", category: "events" },
    ],
  },
  {
    id: "amethyst",
    name: "House of Amethyst",
    gem: "Amethyst",
    tagline: "Creativity • Expression • Imagination",
    description:
      "Amethysts turn every hallway into a canvas, bringing colour, music and story to campus life.",
    color: "#7B4FA0",
    tint: "#F1E9F7",
    icon: "/Amethyst.png",
    images: [
      { id: "ame-1", src: "https://picsum.photos/seed/amethyst-house-1/900/700", caption: "Art & culture expo", category: "events" },
      { id: "ame-2", src: "https://picsum.photos/seed/amethyst-house-2/900/700", caption: "Drama rehearsal", category: "student-life" },
      { id: "ame-3", src: "https://picsum.photos/seed/amethyst-house-3/900/700", caption: "Purple wing studio", category: "facilities" },
      { id: "ame-4", src: "https://picsum.photos/seed/amethyst-house-4/900/700", caption: "Badminton meet", category: "sports" },
      { id: "ame-5", src: "https://picsum.photos/seed/amethyst-house-5/900/700", caption: "Music showcase", category: "events" },
      { id: "ame-6", src: "https://picsum.photos/seed/amethyst-house-6/900/700", caption: "House bonding day", category: "student-life" },
    ],
  },
];

function HouseLightbox({ images, title, accentColor, index, onClose, onNext, onPrev }) {
  const img = images[index];

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md"
      style={{ background: "rgba(2,8,22,0.92)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        aria-label="Previous photo"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next photo"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <motion.div
        key={img.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden shadow-2xl">
          <img src={img.src} alt={img.caption} className="max-h-[75vh] w-full object-cover" />
        </div>
        <div className="mt-4 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5" style={{ background: accentColor }} />
            <p className="text-sm font-semibold text-white">{img.caption}</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/50">
            {index + 1} / {images.length} — {title}
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function HouseSection({ house, delay }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section id={`house-${house.id}`} className="scroll-mt-24 px-6 py-16 sm:py-20 lg:px-12" style={{ background: house.tint }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay }}
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex h-15 w-15 flex-shrink-0 items-center justify-center shadow-sm"
                style={{ background: house.color }}
              >
                <img src={house.icon} alt={`${house.name} crest`} className="h-15 w-15 object-contain" />
              </span>
              <span
                className="text-[9.9px] font-extrabold uppercase tracking-[0.18em]"
                style={{ color: house.color, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                {house.tagline}
              </span>
            </div>

            <h2 className="text-[clamp(1.75rem,3.06vw,2.5rem)] font-extrabold leading-tight" style={{ color: NAVY }}>
              {house.name}
            </h2>
            <div className="mt-3 h-1 w-16" style={{ background: house.color }} />
          </div>

          {/* <p className="max-w-md text-sm leading-relaxed text-slate-600">{house.description}</p> */}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {house.images.map((img, i) => (
            <motion.div
              key={img.id}
              className="group relative cursor-pointer overflow-hidden border-t-4 bg-white shadow-sm transition-shadow hover:shadow-xl"
              style={{ borderTopColor: house.color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.05 * i }}
              whileHover={{ y: -6 }}
              onClick={() => setLightboxIndex(i)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/0 transition-colors group-hover:bg-slate-950/30" />
                <Camera className="absolute right-3 top-3 h-4 w-4 text-white/0 transition-colors group-hover:text-white/90" />
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <HouseLightbox
            images={house.images}
            title={house.name}
            accentColor={house.color}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNext={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % house.images.length))}
            onPrev={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + house.images.length) % house.images.length))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function HousePreviewCard({ house, onView, delay }) {
  return (
    <motion.div
      className="group border border-slate-100 bg-white p-6 shadow-[0_8px_30px_-16px_rgba(2,8,22,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(2,8,22,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay }}
    >
      <div className="mb-1 flex items-center gap-3">
        <span
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center"
          style={{ background: `${house.color}17` }}
        >
          <img src={house.icon} alt={`${house.name} crest`} className="h-11 w-11 object-contain" />
        </span>
        <h3 className="text-[13.5px] font-extrabold leading-tight" style={{ color: house.color }}>
          {house.name}
        </h3>
      </div>
      <p className="mb-4 ml-[3.5rem] text-xs font-medium text-slate-500">{house.tagline}</p>

      <div className="mb-5 grid grid-cols-4 gap-2">
        {house.images.slice(0, 4).map((img) => (
          <div key={img.id} className="relative aspect-square overflow-hidden bg-slate-100">
            <img src={img.src} alt={img.caption} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `${house.color}99` }}
            />
          </div>
        ))}
      </div>

      {/* comment button for temporary */}
      {/* <button
        type="button"
        onClick={onView}
        className="flex w-full items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-transform duration-200 hover:scale-[1.02]"
        style={{ background: house.color }}
      >
        View Moments <ArrowRight size={14} />
      </button> */}
    </motion.div>
  );
}

function HousesGallery() {
  const [activeHouse, setActiveHouse] = useState("all");

  const visibleHouses = activeHouse === "all" ? HOUSES : HOUSES.filter((h) => h.id === activeHouse);

  const scrollToHouse = (id) => {
    setActiveHouse(id);
    requestAnimationFrame(() => {
      const el = document.getElementById(`house-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="w-full" id="houses-gallery-section">
      <section style={{ background: "#F8FAFC" }} className="px-6 py-16 sm:py-20 lg:px-12">
        <div className="mx-auto mb-12 flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: SKY }} />
              <span
                className="text-[9.9px] font-bold uppercase tracking-[0.18em]"
                style={{ color: SKY, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                Four Houses, One School
              </span>
            </div>

            <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-tight" style={{ color: NAVY }}>
              Life Across Our <span style={{ color: SKY }}>Houses</span>
            </h2>
            <div className="mb-5 mt-3 h-1 w-16" style={{ background: GOLD }} />
            <p className="text-sm leading-relaxed text-slate-500">
              Every student belongs to one of four houses — Peridots, Celestites, Garnets, and
              Amethyst — each with its own spirit, colours, and moments captured here.
            </p>
          </div>

          {/* segmented house tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 lg:flex-nowrap" style={{ background: NAVY }}>
            {[{ id: "all", name: "All Houses", color: GOLD }, ...HOUSES.map((h) => ({ id: h.id, name: h.name.replace("House of ", ""), color: h.color }))].map((h) => {
              const isActive = activeHouse === h.id;
              return (
                <button
                  key={h.id}
                  onClick={() => setActiveHouse(h.id)}
                  className="relative overflow-hidden px-5 py-2.5 text-xs font-semibold uppercase tracking-wider sm:text-sm"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHouseTab"
                      className="absolute inset-0 z-0"
                      style={{ background: h.color, border: h.id === "all" ? `1.5px solid ${GOLD}` : "none" }}
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    />
                  )}
                  <span
                    className="relative z-10 transition-colors duration-300"
                    style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.65)" }}
                  >
                    {h.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* preview cards */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOUSES.map((house, i) => (
            <HousePreviewCard key={house.id} house={house} delay={i * 0.05} onView={() => scrollToHouse(house.id)} />
          ))}
        </div>
      </section>

      {visibleHouses.map((house, i) => (
        <HouseSection key={house.id} house={house} delay={i * 0.05} />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Page — masonry gallery + houses section together
--------------------------------------------------------- */
export default function GalleryPreview() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState(null);

  // On mount: check sessionStorage for a scroll target set by ActivitiesView
  useEffect(() => {
    const target = sessionStorage.getItem("galleryScrollTarget");
    if (!target) return;
    sessionStorage.removeItem("galleryScrollTarget");

    // Poll until the element appears in the DOM (handles AnimatePresence delay)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const el = document.getElementById(target);
      if (el) {
        clearInterval(interval);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts >= 30) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const filteredItems = useMemo(
    () =>
      activeCategory === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const visibleItems = filteredItems.slice(0, visibleCount);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className="bg-white" id="gallery-view-container" style={{ zoom: 0.95 }}>
      <GalleryHero />
      <GalleryHeader />
      <GalleryFilters active={activeCategory} onChange={handleCategoryChange} />

      <section className="mx-auto max-w-[1350px] px-4 pt-12 sm:px-6 lg:px-8">
        <GalleryGrid items={visibleItems} onSelect={setActiveIndex} />
        <LoadMoreButton
          hasMore={visibleCount < filteredItems.length}
          showLess={visibleCount > PAGE_SIZE}
          onLoadMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
          onLoadLess={() => setVisibleCount(PAGE_SIZE)}
        />
      </section>

      <GalleryModal
        items={filteredItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />

      <HousesGallery />
    </main>
  );
}