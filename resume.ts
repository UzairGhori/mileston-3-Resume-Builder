interface ResumeData {
    name: string;
    age: number;
    education: string;
    email: string;
    imageUrl: string;
    gender: string;
    address: string;
    phone: string;
    skills: string[];
    workExperience: string;
    objective: string;
  }
  
  const skills: string[] = [];
  
  document.addEventListener('DOMContentLoaded', () => {
    const addSkillButton = document.getElementById("add-skill-btn") as HTMLButtonElement;
    const generateResumeButton = document.getElementById("generateResume") as HTMLButtonElement;
  
    addSkillButton.addEventListener("click", addSkill);
    generateResumeButton.addEventListener("click", generateResume);
  });
  
  function addSkill(): void {
    const skillInput = document.getElementById("skill-input") as HTMLInputElement;
    const skillValue = skillInput.value.trim();
    
    if (skillValue) {
      skills.push(skillValue);
      skillInput.value = '';
      renderSkills();
    } else {
      alert('Please enter a skill.');
    }
  }
  
  function renderSkills(): void {
    const skillsList = document.getElementById("skills-list") as HTMLDivElement;
    skillsList.innerHTML = '';
    skills.forEach((skill, index) => {
      const skillRow = document.createElement("div");
      skillRow.classList.add("skill-row");
      skillRow.innerHTML = `
        <span>${skill}</span>
        <button type="button" class="remove-skill-btn">Remove</button>
      `;
      skillRow.querySelector(".remove-skill-btn")?.addEventListener("click", () => {
        skills.splice(index, 1);
        renderSkills();
      });
      skillsList.appendChild(skillRow);
    });
  }
  
  function generateResume(): void {
    const resumeData: ResumeData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      age: Number((document.getElementById("age") as HTMLInputElement).value),
      education: (document.getElementById("education") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      imageUrl: "",
      gender: (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value || '',
      address: (document.getElementById("address") as HTMLTextAreaElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      skills: [...skills],
      workExperience: (document.getElementById("work-experience") as HTMLTextAreaElement).value,
      objective: (document.getElementById("objective") as HTMLTextAreaElement).value
    };
  
    const imageInput = document.getElementById("image-upload") as HTMLInputElement;
    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(imageInput.files[0]);
      reader.onload = () => {
        resumeData.imageUrl = reader.result as string;
        displayResume(resumeData);
      };
    } else {
      displayResume(resumeData);
    }
  }
  
  function displayResume(data: ResumeData): void {
    const resumeWindow = window.open("", "_blank");
    if (resumeWindow) {
      resumeWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Generated Resume</title>
          <style>
            body {
              background-color: #dad6d6;
              width: 100%;
              height: 100% !important;
              margin: 0 auto;
            }
              .main-content {
              max-width:900px;
              background-color:white;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
              width: 100%;
              height: 100% ;
              margin: 20px auto;
             
            }
            .resume-container {
            max-width:900px;
              display: flex;
              margin: 20px;
            }
            .left-section {
              width: 30%;
              padding: 20px;
              background-color:rgb(26, 7, 197);
              color: white;
              text-align: center;
              padding: 40px;
            }
            .profile-img {
              height: 150px;
              width: 150px;
              border-radius: 50%;
              margin-bottom: 10px;
            }
            .right-section {
             height:100% !important;
              width: 70%;
              padding: 40px;
            

            }
            h1 {
            font-size: 40px;
            font-weight: bold;
            font-style: italic;
            font-family:Times New Roman', Times, serif;
              margin: 10px 0;
            }
              h2 {
              font-size: 30px;
              font-style: italic;
              font-family:Times New Roman', Times, serif;
              margin: 10px 0;
              text-decoration: underline;
            }
            p {
              margin: 5px 0;
              font-family:Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-size:20px;
              line-height: 1.5;
            }
            .skills-list, .work-experience, .objective-section {
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
        <div class="main-content">
          <div class="resume-container">
            <div class="left-section">
              ${data.imageUrl ? `<img src="${data.imageUrl}" alt="Profile Image" class="profile-img">` : ""}
              <h1>${data.name}</h1>
              <p><strong>Age:</strong> ${data.age}</p>
              <p><strong>Gender:</strong> ${data.gender}</p>
              <p><strong>Address:</strong> ${data.address}</p>
              <p><strong>Contact Us:</strong> ${data.phone}</p>
              <p><strong>Email:</strong> ${data.email}</p>
            </div>
            <div class="right-section">
              <div class="objective-section">
                <h2>Objective:</h2>
                <p>${data.objective || "N/A"}</p>
              </div>
              <div class="objective-section">
              <h2>Education:</h2>
              <p>${data.education || "N/A"}</p>
              </div>

              <div class="skills-list">
                <h2>Skills:</h2>
                <ul>${data.skills.map(skill => `<li>${skill}</li>`).join("")}</ul>
              </div>
              <div class="work-experience">
                <h2>Work Experience:</h2>
                <p>${data.workExperience || "N/A"}</p>
              </div>
            </div>
          </div>
          </div>
        </body>
        </html>
      `);
      resumeWindow.document.close();
    }
  }
  