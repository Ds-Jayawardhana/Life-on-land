const steps = [
    {
        title: "Personal Details",
        prompts: [
            { question: "Full Name", required: true },
            { question: "Location", required: false },
            { question: "Age", required: false },
            { question: "Gender", required: true }
        ]
    },
    {
        title: "Volunteering Tasks",
        prompts: [
            { question: "Reasons to volunteer", required: false,
                suggestions: ["Personal growth", "Give back to community", "Gain experience", "Meet new people", "Support a cause"]
            },
            { question: "Preferred task", required: true,
                suggestions: ["Teaching", "Fundraising", "Event planning", "Administrative work", "Field work"]
             },
            { question: "Preferred location", required: true },
            { question: "Assignment type", required: true,
                suggestions: ["One-time event", "Short-term project", "Long-term commitment", "Remote volunteering"]
             },
            { question: "How got the information about the project", required: false,
                suggestions: ["Social media", "Friend/Family", "Website", "Newspaper", "Community event"]
             }
        ]
    },
    {
        title: "Qualifications",
        prompts: [
            { question: "Main field of study", required: true },
            { question: "Highest education achievement", required: true },
            { question: "University", required: true },
            { question: "Completion year", required: true },
            { question: "Country", required: false }
        ]
    },
    {
        title: "Availability and Contact",
        prompts: [
            { question: "Min hours per week", required: true },
            { question: "Max hours per week", required: true },
            { question: "Phone number", required: false },
            { question: "Email", required: true }
        ]
    }
];

let currentStep = 0;
let currentPrompt = 0;
let userResponses = {};

const startBtn = document.getElementById('start-btn');
const profileBuilder = document.getElementById('profile-builder');
const stepTitle = document.getElementById('step-title');
const promptText = document.getElementById('prompt-text');
const userInput = document.getElementById('user-input');
const nextBtn = document.getElementById('next-btn');
const skipBtn = document.getElementById('skip-btn');
const progress = document.getElementById('progress');
const progressText = document.getElementById('progress-text');
const outputContent = document.getElementById('output-content');

skipBtn.addEventListener('click', () => {
    const currentQuestion = steps[currentStep].prompts[currentPrompt];
    if (currentQuestion.required) {
        showErrorMessage('This field is required.');
    } else {
        userResponses[currentQuestion.question] = 'Skipped';
        currentPrompt++;
        if (currentPrompt >= steps[currentStep].prompts.length) {
            currentStep++;
            currentPrompt = 0;
        }
        updatePrompt();
        updateOutput();
    }
});

function updatePrompt() {
    if (currentStep < steps.length) {
        const step = steps[currentStep];
        if (currentPrompt < step.prompts.length) {
            //suggesion
            const currentQuestion = step.prompts[currentPrompt];
            //display the text of number of current step step title and which question
            stepTitle.textContent = `STEP ${currentStep + 1} ${step.title} | Question ${currentPrompt + 1}/${step.prompts.length}`;
            promptText.innerHTML = `<span class="question-text">${step.prompts[currentPrompt].question}</span>`;
            userInput.value = userResponses[step.prompts[currentPrompt].question] || '';
            
            //Hide or show skip button based on whether the field is required
            if (step.prompts[currentPrompt].required) {
                skipBtn.style.display = 'none';
            } else {
                skipBtn.style.display = 'inline-block';
            }
            nextBtn.textContent = 'Next';
            nextBtn.style.display = 'inline-block';

            // Display suggestions if available
            if (currentQuestion.suggestions) {
                displaySuggestions(currentQuestion.suggestions);
            } else {
                hideSuggestions();
            }

        } else {
            displayStepSummary();
        }
    } else {
        displayFinalProfile();
    }
    updateProgress();
    updateStepIndicator();
}

function updateProgress() {
    const totalPrompts = steps.reduce((total, step) => total + step.prompts.length, 0);
    const completedPrompts = steps.slice(0, currentStep).reduce((total, step) => total + step.prompts.length, 0) + currentPrompt;
    const progressPercentage = Math.round((completedPrompts / totalPrompts) * 100);
    progress.style.width = `${progressPercentage}%`;
    progressText.textContent = `Profile completed ${progressPercentage}%`;
    updateOutput();
}

function updateOutput() {
    let output = '';
    for (let i = 0; i <= currentStep; i++) {
        output += `\n${steps[i].title}:\n`;
        for (let j = 0; j < steps[i].prompts.length; j++) {
            if (i < currentStep || (i === currentStep && j <= currentPrompt)) {
                const prompt = steps[i].prompts[j];
                const response = userResponses[prompt.question];
                if (response !== undefined) {
                    output += `  ${prompt.question}: ${response}\n`;
                }
            }
        }
    }
    outputContent.textContent = output.trim();
    
}

function displayStepSummary() {
    stepTitle.textContent = `${steps[currentStep].title} Summary`;
    promptText.textContent = 'Review your answers for this step:';
    userInput.style.display = 'none';
    skipBtn.style.display = 'none';

    if (currentStep === steps.length - 1) {
        nextBtn.textContent = 'Submit';
    } else {
        nextBtn.textContent = 'Next Step';
    }
    
    let summary = `${steps[currentStep].title}:\n`;
    for (const prompt of steps[currentStep].prompts) {
        const response = userResponses[prompt.question];
        if (response !== undefined) {
            summary += `  ${prompt.question}: ${response}\n`;
        } else {
            summary += `  ${prompt.question}: Not answered\n`;
        }
    }
    outputContent.textContent = summary;
    
    hideSuggestions();
}

function displayFinalProfile() {
    stepTitle.textContent = 'Profile Complete';
    promptText.textContent = 'Your profile has been created successfully!';
    userInput.style.display = 'none';
    nextBtn.style.display = 'none';
    skipBtn.style.display = 'none';

    updateOutput();
}
function handleSubmit() {
    
    alert('Profile submitted successfully!');
    
    displayFinalProfile();
}

nextBtn.addEventListener('click', () => {
    if (currentPrompt < steps[currentStep].prompts.length) {
        const currentQuestion = steps[currentStep].prompts[currentPrompt];
        const inputValue = userInput.value.trim();

        if (currentQuestion.required && !inputValue) {
            showErrorMessage('This field is required.');
            return;
        }

        
        switch (currentQuestion.question) {
            case 'Age':
                if (!isValidAge(inputValue)) {
                    showErrorMessage('Please enter a valid age (number between 1 and 120).');
                    return;
                }
                break;
            case 'Gender':
                if (!isValidGender(inputValue)) {
                    showErrorMessage('Please enter Male, Female, or Other.');
                    return;
                }
                break;
            case 'Phone number':
                if (inputValue && !isValidPhoneNumber(inputValue)) {
                    showErrorMessage('Please enter a valid phone number.');
                    return;
                }
                break;
            case 'Email':
                if (!isValidEmail(inputValue)) {
                    showErrorMessage('Please enter a valid email address.');
                    return;
                }
                break;
            case 'Min hours per week':
            case 'Max hours per week':
                if (!isValidHours(inputValue)) {
                    showErrorMessage('Please enter a valid number of hours (between 1 and 24).');
                    return;
                }
                break;
            case 'Completion year':
                if (!isValidYear(inputValue)) {
                    showErrorMessage('Please enter a valid year (YYYY format, between 1900 and current year).');
                    return;
                }
                break;
        }

        if (inputValue !== '') {
            userResponses[currentQuestion.question] = inputValue;
        }else {
            userResponses[currentQuestion.question] = 'Skipped';
        }
        currentPrompt++;
    } else {
        if (currentStep === steps.length - 1) {
           
            handleSubmit();
            return;
        }
        currentStep++;
        currentPrompt = 0;
        userInput.style.display = 'block';
        skipBtn.style.display = 'inline-block';
    
    }
    updatePrompt();
    updateOutput();
});


startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    profileBuilder.style.display = 'block';
    document.querySelector('.container').classList.remove('start-screen');
    updatePrompt();
});2

function updateStepIndicator() {
    const stepIndicators = document.querySelectorAll('.step');
    stepIndicators.forEach((step, index) => {
        if (index <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function showErrorMessage(message) {
    alert(message);
}

function isValidAge(age) {
    return /^\d+$/.test(age) && parseInt(age) > 0 && parseInt(age) < 120;
}

function isValidGender(gender) {
    return ['male', 'female', 'other'].includes(gender.toLowerCase());
}

function isValidPhoneNumber(phone) {
    
    return /^\+?[\d\s-]{10,}$/.test(phone);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidHours(hours) {
    return /^\d+$/.test(hours) && parseInt(hours) > 0 && parseInt(hours) <= 24;
}

function isValidYear(year) {
    return /^\d{4}$/.test(year);
}

updatePrompt();


function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions-container') || createSuggestionsContainer();
    suggestionsContainer.innerHTML = '<p>Suggestions:</p>';
    const suggestionsList = document.createElement('ul');
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            userInput.value = suggestion;
        });
        suggestionsList.appendChild(li);
    });
    suggestionsContainer.appendChild(suggestionsList);
    suggestionsContainer.style.display = 'block';
}

function hideSuggestions() {
    const suggestionsContainer = document.getElementById('suggestions-container');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

function createSuggestionsContainer() {
    const container = document.createElement('div');
    container.id = 'suggestions-container';
    document.getElementById('prompt-container').appendChild(container);
    return container;
}