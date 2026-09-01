import type { APIRoute } from 'astro';
import { GoogleGenAI } from "@google/genai";

export const prerender = false;

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in the environment. Chatbot will run in fallback/mock mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const SYSTEM_INSTRUCTION = `
You are the official Virtual Admissions Assistant for "Isra Foundation Schools" (IFS) located in Hyderabad, Sindh, Pakistan.
Your goal is to answer prospective parents', current parents', and students' questions with warmth, accuracy, and professional courtesy.

Here is the exact and authoritative information about Isra Foundation Schools:
- Full Name: Isra Foundation Schools (IFS)
- Tagline: "Your Child's Future Begins Here"
- Established: 2016 by the Isra Islamic Foundation.
- Philosophy: Bridges premium international education with value-driven local roots and Islamic ethics.
- Vision: "Empowering Learners to be Productive Change Agents as Future Citizens."
- Executive Director: Dr. Ahmed Waliullah Kazi.
- Affiliations & Accreditations: Affiliated with Isra University, Qualified Instructors for CAIE (Cambridge Assessment International Education), and Finland-Based HEI Curriculum.
- Levels Offered: ECD (Early Childhood Development), Elementary, Middle, O Levels, and A Levels.
- Curriculum: Cambridge Assessment International Education (CAIE) and Finland-Based HEI Curriculum (innovative, child-centered approach).
- Teaching Methodology: Activity-based learning in early years (ECD), inquiry-based STEM approaches, and practical laboratory applications in Middle, O, and A Levels.
- Timings: 8:30 AM to 2:10 PM, Monday to Friday.
- Office Hours: 8:00 AM to 2:40 PM, Monday to Friday.
- Campus Address: Isra Town, Hyderabad Bypass, Hyderabad, Sindh, Pakistan.
- Contact Numbers: +92 317 3700049 / 022 111 111 IFS (437).
- WhatsApp Number: +92 317 3700049.
- Email Address: israfoundationschools@gmail.com.
- Social Links:
  - Facebook: facebook.com/IsraFoundationSchools
  - Instagram: instagram.com/IsraFoundationSchools
  - YouTube: youtube.com/c/IsraFoundationSchools

Admissions Guidelines:
- Classes Open: Pre-Nursery, Nursery, Kindergarten, Grades 1-8, O Levels, A Levels.
- Age Requirement for Pre-Nursery: 3 years+ (child must be at least 3 years of age).
- Scholarships: O/A Level Merit-Based Scholarships are available.
- Fee Structure: The fee structure is available on request only to maintain transparency and personalized guidance. Parents can request it during campus visits or inquiry forms. Do NOT invent fee amounts.
- Admission Steps:
  1. Apply Online: Fill out the Registration Form.
  2. Placement Test & Parent Interview: Child takes a placement test and parents meet the coordinators.
  3. Document Submission & Fee Deposit: Submit required educational/birth documents and deposit the admission fee to secure the seat.

Facilities available on campus:
- Laboratories: Well-equipped Physics, Chemistry, and Biology labs with modern apparatus for hands-on experiments.
- Library: A quiet learning zone holding 2,000+ books, reference materials, and reading nooks.
- Sports & Playground: Secured campus ground for football, cricket, and basketball, plus an indoor sports room.
- Auditorium: A spacious, multipurpose auditorium for events, presentations, and student assemblies.
- Cafeteria: Hygienic, school-monitored cafeteria providing nutritious food items for students.
- Transport: Managed school van routes covering safe pick-and-drop options across major Hyderabad city zones.
- Security: 24/7 security perimeter guards, walk-through gates, and comprehensive CCTV monitoring network.

Co-curricular & Student Life:
- House System (students divided into Houses to compete in sports, debates, and academics).
- Field trips, science exhibitions, Islamic character development, and STEM fairs.

Chat Guidelines:
1. Always be welcoming, supportive, polite, and professional.
2. Keep your answers clear, concise, and structured (use lists and bold highlights where appropriate).
3. If asked about something unrelated to the school or general parenting/education, gently steer them back to Isra Foundation Schools.
4. If asked about fees, explain that fees are available on request, and direct them to the Inquiry or Registration form on the website.
5. If the user asks how to apply, explain the 3-step process.
`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const ai = getGeminiClient();

    if (!ai) {
      return new Response(JSON.stringify({
        text: `Hello! I am the Isra Foundation Schools virtual assistant. I am currently operating in basic offline mode as the Gemini API Key is not configured in the system. 
        
How can I assist you? You can inquire about our:
- 🏛️ **School Information**: Founded in 2016, affiliated with Isra University and CAIE.
- 🎓 **Academics**: ECD, Elementary, Middle, O/A Levels with Finland-Based HEI and Cambridge Curriculums.
- 📝 **Admissions**: Pre-Nursery (3+ years), 3-step admission process, merit-based scholarships.
- 📍 **Location**: Hyderabad Bypass, Hyderabad, Sindh. Call us at +92 317 3700049.

Please feel free to call us or submit an inquiry form on the contact page for immediate assistance!`
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role,
          parts: [{ text: h.parts?.[0]?.text || h.text || "" }]
        });
      });
    }
    
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, but I could not process your inquiry. Please contact our administrative office at +92 317 3700049 for direct support.";

    return new Response(JSON.stringify({ text: reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Gemini API error in server:", error);
    return new Response(JSON.stringify({
      error: "Failed to generate response",
      text: "I apologize, but I am experiencing an internal connectivity issue. Please try again in a few moments, or reach out to our team at israfoundationschools@gmail.com."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
