// Online Quest Smith
// interactive web based system that reads "story" files
function OnlineQuestGame(pathToPages, buttonYes, buttonNo, divText) {
    var quest = this; // context
    // settings
    quest.buttonYes = buttonYes;
    quest.buttonNo  = buttonNo;
    quest.divText   = divText;
    quest.pathToPages = pathToPages;
    //internal
    var pathTaken = "";
    var xhr = new XMLHttpRequest();
    var loadingText = "Loading...";
    var homerepo = "https://github.com/charlesduminil/questgame";

    // Update the quest text
    this.updateText = function(text) {
        document.querySelector(quest.divText).innerHTML = text;
    }

    // Converts the plain text to HTML with line breaks and removes the "choice" lines
    // captures 404
    this.formatOutput = function(text) {
       if (/>404</.test(text)) {
           quest.lockButtons(true);
           return storyContinues;
       }
       formatedText = text.replace(/\n/g,"<br /><br />");
       formatedText = formatedText.replace(/<br( \/)?> +Yes.*$/,"");
       return formatedText;
    }

    // Disable the "choice" buttons true|false
    this.lockButtons = function(lock) {
        document.querySelector(quest.buttonYes).disabled = lock;
        document.querySelector(quest.buttonNo).disabled = lock;
    }

    // Loads new "story" files via the name + newPathTaken
    this.takePath = function(newPathTaken) {
        pathTaken += newPathTaken;
        quest.lockButtons(true);
        quest.updateText(loadingText);
        xhr.open("GET", quest.pathToPages + pathTaken + ".txt");
        xhr.onload = function(){
            //console.log(xhr.responseText);
            quest.lockButtons(false);
            quest.updateText(quest.formatOutput(xhr.responseText));
        }
        xhr.send();
    }

    // Initialise the event handlers
    this.init = function() {
        document.querySelector(quest.buttonYes).onclick = function() { quest.takePath("1");};
        document.querySelector(quest.buttonNo).onclick = function() { quest.takePath("0");};
    }

    quest.init();

} // end of OnlineQuestSmith class
