document.addEventListener('DOMContentLoaded', function() {
    const nameinput = document.getElementById("nameinput");
    const email = document.getElementById("email");
    const suggest = document.getElementById("Suggest");
    const formpreview = document.getElementById('formpreview');
    const addition = document.getElementById('additionq');

    const previewName = document.getElementById("previewName");
    const previewEmail = document.getElementById("previewEmail");
    const previewVisit = document.getElementById("previewVisit");
    const previewInformative = document.getElementById("previewInformative");
    const previewSuggestion = document.getElementById("previewSuggestion");
    const previewSatisfaction = document.getElementById("previewSatisfaction");
    const previewRecommendation = document.getElementById("previewRecommendation");
    const previewAdditional = document.getElementById("previewAdditional");

    function updatePreview() {
        const visit = document.querySelector("input[name='visiting']:checked");
        const informative = document.querySelector("input[name='informative']:checked");
        const ratingscale = document.querySelector('input[name="satisfaction"]:checked');
        const recomend = document.querySelector('input[name="recommendation"]:checked');

        previewName.textContent = `Name: ${nameinput ?nameinput.value:"empty"}`;
        previewEmail.textContent = `Email: ${email ?email.value:"empty"}`;
        previewVisit.textContent = `Already Visited: ${visit ? visit.value : "Not Selected"}`;
        previewInformative.textContent = `Is the website informative and Easy to navigate: ${informative ? informative.value : "Not Selected"}`;
        previewSuggestion.textContent = `Suggestions: ${suggest? suggest.value:"empty"}`;
        previewSatisfaction.textContent = `Satisfaction Score: ${ratingscale ? ratingscale.value : "Not Selected"}`;
        previewRecommendation.textContent = `Do you Recommend Us?: ${recomend ? recomend.value : "Not Selected"}`;
        previewAdditional.textContent = `Questions & Requests: ${addition ? addition.value:"empty"}`;
    }

    formpreview.addEventListener('click', updatePreview);



    function checkradioinputs() {
        var validityx = false;
        var x = document.getElementsByName('satisfaction');
        for (var i = 0; i < x.length; i++) {
            if (x[i].checked) {
                validityx = true;
                break;
            }
        }
        if (!validityx) {
            alert("Please select one from the rating scale");
        }
        return validityx;
    }

    function checkemailvalidity(email) {
        const validemailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return validemailRegex.test(email);
    }

    document.querySelector('.feedback-form').addEventListener('submit', function(event) {
       
        let isvalids=true;

        if (!checkemailvalidity(email.value)) {
            event.preventDefault();
            alert('Please enter a valid email address');
            isvalids=false;
        }
        if (!checkradioinputs()) {
            event.preventDefault();
            isvalids=false;

        }
        if(isvalids){
            alert('Thank you for your FeedBack')
        }
    });
    
});