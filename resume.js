var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var skills = [];
document.addEventListener('DOMContentLoaded', function () {
    var addSkillButton = document.getElementById("add-skill-btn");
    var generateResumeButton = document.getElementById("generateResume");
    addSkillButton.addEventListener("click", addSkill);
    generateResumeButton.addEventListener("click", generateResume);
});
function addSkill() {
    var skillInput = document.getElementById("skill-input");
    var skillValue = skillInput.value.trim();
    if (skillValue) {
        skills.push(skillValue);
        skillInput.value = '';
        renderSkills();
    }
    else {
        alert('Please enter a skill.');
    }
}
function renderSkills() {
    var skillsList = document.getElementById("skills-list");
    skillsList.innerHTML = '';
    skills.forEach(function (skill, index) {
        var _a;
        var skillRow = document.createElement("div");
        skillRow.classList.add("skill-row");
        skillRow.innerHTML = "\n        <span>".concat(skill, "</span>\n        <button type=\"button\" class=\"remove-skill-btn\">Remove</button>\n      ");
        (_a = skillRow.querySelector(".remove-skill-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            skills.splice(index, 1);
            renderSkills();
        });
        skillsList.appendChild(skillRow);
    });
}
function generateResume() {
    var _a;
    var resumeData = {
        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        education: document.getElementById("education").value,
        email: document.getElementById("email").value,
        imageUrl: "",
        gender: ((_a = document.querySelector('input[name="gender"]:checked')) === null || _a === void 0 ? void 0 : _a.value) || '',
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        skills: __spreadArray([], skills, true),
        workExperience: document.getElementById("work-experience").value,
        objective: document.getElementById("objective").value
    };
    var imageInput = document.getElementById("image-upload");
    if (imageInput.files && imageInput.files[0]) {
        var reader_1 = new FileReader();
        reader_1.readAsDataURL(imageInput.files[0]);
        reader_1.onload = function () {
            resumeData.imageUrl = reader_1.result;
            displayResume(resumeData);
        };
    }
    else {
        displayResume(resumeData);
    }
}
function displayResume(data) {
    var resumeWindow = window.open("", "_blank");
    if (resumeWindow) {
        resumeWindow.document.write("\n        <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n          <meta charset=\"UTF-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n          <title>Generated Resume</title>\n          <style>\n            body {\n              background-color: #dad6d6;\n              width: 100%;\n              height: 100% !important;\n              margin: 0 auto;\n            }\n              .main-content {\n              max-width:900px;\n              background-color:white;\n              border-radius: 5px;\n              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n              width: 100%;\n              height: 100% ;\n              margin: 20px auto;\n             \n            }\n            .resume-container {\n            max-width:900px;\n              display: flex;\n              margin: 20px;\n            }\n            .left-section {\n              width: 30%;\n              padding: 20px;\n              background-color:rgb(26, 7, 197);\n              color: white;\n              text-align: center;\n              padding: 40px;\n            }\n            .profile-img {\n              height: 150px;\n              width: 150px;\n              border-radius: 50%;\n              margin-bottom: 10px;\n            }\n            .right-section {\n             height:100% !important;\n              width: 70%;\n              padding: 40px;\n            \n\n            }\n            h1 {\n            font-size: 40px;\n            font-weight: bold;\n            font-style: italic;\n            font-family:Times New Roman', Times, serif;\n              margin: 10px 0;\n            }\n              h2 {\n              font-size: 30px;\n              font-style: italic;\n              font-family:Times New Roman', Times, serif;\n              margin: 10px 0;\n              text-decoration: underline;\n            }\n            p {\n              margin: 5px 0;\n              font-family:Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n              font-size:20px;\n              line-height: 1.5;\n            }\n            .skills-list, .work-experience, .objective-section {\n              margin-top: 20px;\n            }\n          </style>\n        </head>\n        <body>\n        <div class=\"main-content\">\n          <div class=\"resume-container\">\n            <div class=\"left-section\">\n              ".concat(data.imageUrl ? "<img src=\"".concat(data.imageUrl, "\" alt=\"Profile Image\" class=\"profile-img\">") : "", "\n              <h1>").concat(data.name, "</h1>\n              <p><strong>Age:</strong> ").concat(data.age, "</p>\n              <p><strong>Gender:</strong> ").concat(data.gender, "</p>\n              <p><strong>Address:</strong> ").concat(data.address, "</p>\n              <p><strong>Contact Us:</strong> ").concat(data.phone, "</p>\n              <p><strong>Email:</strong> ").concat(data.email, "</p>\n            </div>\n            <div class=\"right-section\">\n              <div class=\"objective-section\">\n                <h2>Objective:</h2>\n                <p>").concat(data.objective || "N/A", "</p>\n              </div>\n              <div class=\"objective-section\">\n              <h2>Education:</h2>\n              <p>").concat(data.education || "N/A", "</p>\n              </div>\n\n              <div class=\"skills-list\">\n                <h2>Skills:</h2>\n                <ul>").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "</ul>\n              </div>\n              <div class=\"work-experience\">\n                <h2>Work Experience:</h2>\n                <p>").concat(data.workExperience || "N/A", "</p>\n              </div>\n            </div>\n          </div>\n          </div>\n        </body>\n        </html>\n      "));
        resumeWindow.document.close();
    }
}
